/**
 * Folders handlers for file organization
 * Provides endpoints for managing file folders and organization
 */

import { z } from 'zod';
import type { HonoContext, PaginationParams } from '../types/index';
import {
  createSuccessResponse,
  createErrorResponse,
  createValidationErrorResponse,
  createNotFoundResponse,
  createPaginatedResponse,
  calculatePagination,
} from '../utils/response';
import {
  applyPagination,
  applySearch,
  getTotalCount,
} from '../utils/db';

// Validation schemas - Updated to match database schema
const createFolderSchema = z.object({
  folder_name: z.string().min(1, 'Folder name is required').max(100, 'Folder name too long'),
  description: z.string().max(500, 'Description too long').optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format').default('#3B82F6'),
  icon: z.string().max(50, 'Icon name too long').default('folder'),
});

const updateFolderSchema = createFolderSchema.partial();

const getFoldersQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  sortBy: z.enum(['folder_name', 'file_count']).default('folder_name'), // Updated to match existing columns
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  search: z.string().optional(),
});

/**
 * Get all folders for the authenticated user with pagination and filtering
 */
export const getFoldersHandler = async (c: HonoContext) => {
  try {
    const queryParams = c.req.query();

    const validation = getFoldersQuerySchema.safeParse(queryParams);
    if (!validation.success) {
      const errors = validation.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return c.json(createValidationErrorResponse(errors, c.get('requestId')), 400);
    }

    const { page, limit, sortBy, sortOrder, search } = validation.data;
    const user = c.get('user');

    if (!user) {
      return c.json(createErrorResponse('User not authenticated', 401, undefined, c.get('requestId')), 401);
    }

    // Build query for folders created by the authenticated user
    let query = c.get('supabase')
      .from('folders')
      .select('*')
      .eq('created_by', user.id);

    // Apply search if provided
    if (search) {
      query = applySearch(query, search, ['folder_name', 'description']);
    }

    // Get total count for pagination - Use direct query since folders table is not in getTotalCount
    const { count: totalCount, error: countError } = await c.get('supabase')
      .from('folders')
      .select('*', { count: 'exact', head: true })
      .eq('created_by', user.id);

    if (countError) {
      throw new Error(`Failed to get folder count: ${countError.message}`);
    }

    // Apply pagination
    query = applyPagination(query, { page, limit, sortBy, sortOrder });

    const { data: folders, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch folders: ${error.message}`);
    }

    const pagination = calculatePagination(page, limit, totalCount || 0);

    return createPaginatedResponse(
      folders || [],
      pagination,
      c.get('requestId')
    );

  } catch (error) {
    console.error('Get folders error:', error);
    return c.json(createErrorResponse('Failed to retrieve folders', 500, { error: error instanceof Error ? error.message : 'Unknown error' }, c.get('requestId')), 500);
  }
};

/**
 * Get a single folder by ID
 */
export const getFolderHandler = async (c: HonoContext) => {
  try {
    const id = c.req.param('id');

    if (!id) {
      return c.json(createErrorResponse('Folder ID is required', 400, undefined, c.get('requestId')), 400);
    }

    const user = c.get('user');
    if (!user) {
      return c.json(createErrorResponse('User not authenticated', 401, undefined, c.get('requestId')), 401);
    }

    // Get folder from database - only folders created by the authenticated user
    const { data: folder, error } = await c.get('supabase')
      .from('folders')
      .select('*')
      .eq('folder_id', id)
      .eq('created_by', user.id)
      .single();

    if (error && error.code === 'PGRST116') {
      return c.json(createNotFoundResponse('Folder', c.get('requestId')), 404);
    }

    if (error) {
      throw new Error(`Failed to fetch folder: ${error.message}`);
    }

    return c.json(createSuccessResponse(folder, 'Folder retrieved successfully', c.get('requestId')));

  } catch (error) {
    console.error('Get folder error:', error);
    return c.json(createErrorResponse('Failed to retrieve folder', 500, { error: error instanceof Error ? error.message : 'Unknown error' }, c.get('requestId')), 500);
  }
};

/**
 * Create a new folder
 */
export const createFolderHandler = async (c: HonoContext) => {
  try {
    console.log('🚀 createFolderHandler called');

    const body = await c.req.json();
    console.log('📝 Request body:', JSON.stringify(body, null, 2));

    const validation = createFolderSchema.safeParse(body);
    console.log('✅ Validation result:', {
      success: validation.success,
      errors: validation.success ? null : validation.error.errors
    });

    if (!validation.success) {
      const errors = validation.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      console.log('❌ Validation failed:', errors);
      return c.json(createValidationErrorResponse(errors, c.get('requestId')), 400);
    }

    const folderData = validation.data;
    console.log('📁 Folder data after validation:', folderData);

    const user = c.get('user');
    console.log('👤 User from context:', user ? { id: user.id, email: user.email } : 'NO USER');

    if (!user) {
      console.log('❌ User not authenticated');
      return c.json(createErrorResponse('User not authenticated', 401, undefined, c.get('requestId')), 401);
    }

    // Create folder in database
    const insertData = {
      ...folderData,
      created_by: user.id,
      file_count: 0,
      total_size: 0,
      // Mark Workers ID Image folder as permanent
      is_permanent: folderData.folder_name === 'Workers ID Image',
    };
    console.log('💾 Data to insert:', insertData);

    const { data: newFolder, error } = await c.get('supabase')
      .from('folders')
      .insert(insertData)
      .select('*')
      .single();

    if (error) {
      console.error('💥 Database error:', error);
      throw new Error(`Failed to create folder: ${error.message}`);
    }

    console.log('✅ Folder created successfully:', newFolder);
    return c.json({
      success: true,
      message: 'Folder created successfully',
      data: newFolder,
      timestamp: new Date().toISOString(),
      requestId: c.get('requestId'),
    }, 201);

  } catch (error) {
    console.error('💥 Create folder error:', error);
    return c.json(createErrorResponse('Failed to create folder', 500, { error: error instanceof Error ? error.message : 'Unknown error' }, c.get('requestId')), 500);
  }
};

/**
 * Update an existing folder
 */
export const updateFolderHandler = async (c: HonoContext) => {
  try {
    const id = c.req.param('id');

    if (!id) {
      return c.json(createErrorResponse('Folder ID is required', 400, undefined, c.get('requestId')), 400);
    }

    const body = await c.req.json();

    const validation = updateFolderSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return c.json(createValidationErrorResponse(errors, c.get('requestId')), 400);
    }

    const updateData = validation.data;
    const user = c.get('user');

    if (!user) {
      return c.json(createErrorResponse('User not authenticated', 401, undefined, c.get('requestId')), 401);
    }

    // Check if folder exists and belongs to user
    const { error: checkError } = await c.get('supabase')
      .from('folders')
      .select('folder_id')
      .eq('folder_id', id)
      .eq('created_by', user.id)
      .single();

    if (checkError && checkError.code === 'PGRST116') {
      return c.json(createNotFoundResponse('Folder', c.get('requestId')), 404);
    }

    if (checkError) {
      throw new Error(`Failed to check folder existence: ${checkError.message}`);
    }

    // Update folder in database
    const { data: updatedFolder, error } = await c.get('supabase')
      .from('folders')
      .update(updateData)
      .eq('folder_id', id)
      .eq('created_by', user.id) // Ensure user can only update their own folders
      .select('*')
      .single();

    if (error) {
      throw new Error(`Failed to update folder: ${error.message}`);
    }

    return c.json(createSuccessResponse(updatedFolder, 'Folder updated successfully', c.get('requestId')));

  } catch (error) {
    console.error('Update folder error:', error);
    return c.json(createErrorResponse('Failed to update folder', 500, { error: error instanceof Error ? error.message : 'Unknown error' }, c.get('requestId')), 500);
  }
};

/**
 * Delete a folder (only if it's empty)
 */
export const deleteFolderHandler = async (c: HonoContext) => {
  try {
    const id = c.req.param('id');

    if (!id) {
      return c.json(createErrorResponse('Folder ID is required', 400, undefined, c.get('requestId')), 400);
    }

    const user = c.get('user');
    if (!user) {
      return c.json(createErrorResponse('User not authenticated', 401, undefined, c.get('requestId')), 401);
    }

    // Check if folder exists and belongs to user
    const { data: folder, error: checkError } = await c.get('supabase')
      .from('folders')
      .select('folder_id, file_count')
      .eq('folder_id', id)
      .eq('created_by', user.id)
      .single();

    if (checkError && checkError.code === 'PGRST116') {
      return c.json(createNotFoundResponse('Folder', c.get('requestId')), 404);
    }

    if (checkError) {
      throw new Error(`Failed to check folder existence: ${checkError.message}`);
    }

    // Check if folder is permanent (cannot be deleted)
    if (folder.is_permanent) {
      return c.json(createErrorResponse('Cannot delete permanent system folder', 400, { error: 'This is a permanent system folder and cannot be deleted' }, c.get('requestId')), 400);
    }

    // Check if folder is empty (has no files)
    if (folder.file_count > 0) {
      return c.json(createErrorResponse('Cannot delete folder with files', 400, { error: 'Folder must be empty before deletion' }, c.get('requestId')), 400);
    }

    // Delete folder from database
    const { error: deleteError } = await c.get('supabase')
      .from('folders')
      .delete()
      .eq('folder_id', id)
      .eq('created_by', user.id);

    if (deleteError) {
      throw new Error(`Failed to delete folder: ${deleteError.message}`);
    }

    return c.json(createSuccessResponse(
      { deleted: true, folder_id: id },
      'Folder deleted successfully',
      c.get('requestId')
    ));

  } catch (error) {
    console.error('Delete folder error:', error);
    return c.json(createErrorResponse('Failed to delete folder', 500, { error: error instanceof Error ? error.message : 'Unknown error' }, c.get('requestId')), 500);
  }
};
