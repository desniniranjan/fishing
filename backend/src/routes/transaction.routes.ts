/**
 * Transaction routes
 * Defines routes for comprehensive transaction management endpoints
 */

import { Hono } from 'hono';
import type { Env, Variables } from '../types/index';
import {
  getTransactionsHandler,
  getTransactionHandler,
  createTransactionHandler,
  updateTransactionHandler,
  deleteTransactionHandler,
  getTransactionStatsHandler,
  getTransactionsBySaleHandler,
  createTransactionWithImageHandler,
} from '../handlers/transactions';
import { authenticate, requireEmployee, requireManager, apiRateLimit } from '../middleware';

// Create transaction router
const transactions = new Hono<{ Bindings: Env; Variables: Variables }>();

/**
 * All transaction routes require authentication and rate limiting
 */
transactions.use('*', authenticate);
transactions.use('*', apiRateLimit());

/**
 * Transaction management routes
 */

// GET /transactions - Get all transactions with filtering and pagination
transactions.get('/', requireEmployee, getTransactionsHandler);

// GET /transactions/stats - Get transaction statistics and summary
transactions.get('/stats', requireEmployee, getTransactionStatsHandler);

// GET /transactions/:id - Get a specific transaction by ID
transactions.get('/:id', requireEmployee, getTransactionHandler);

// GET /transactions/sale/:saleId - Get transactions for a specific sale
transactions.get('/sale/:saleId', requireEmployee, getTransactionsBySaleHandler);

// POST /transactions - Create a new transaction
transactions.post('/', requireEmployee, createTransactionHandler);

// POST /transactions/upload - Create transaction with image upload
transactions.post('/upload', requireEmployee, createTransactionWithImageHandler);

// PUT /transactions/:id - Update an existing transaction
transactions.put('/:id', requireManager, updateTransactionHandler);

// DELETE /transactions/:id - Delete a transaction (manager only)
transactions.delete('/:id', requireManager, deleteTransactionHandler);

export { transactions };
