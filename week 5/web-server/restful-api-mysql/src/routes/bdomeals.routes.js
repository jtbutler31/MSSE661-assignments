const express = require('express');
const {
  getAllBdomeals,
  createBdomeal,
  getBdomeal,
  updateBdomeal,
  deleteBdomeal,
} = require('../controllers/bdomeals.controller');
const canAccess = require('../middleware/auth.middleware');

const bdomealsRoutes = express.Router();

bdomealsRoutes.get('/', canAccess, getAllBdomeals).post('/', canAccess, createBdomeal);


bdomealsRoutes
  .get('/:bdomealId', canAccess, getBdomeal) 
  .put('/:bdomealId', canAccess, updateBdomeal)
  .delete('/:bdomealId', canAccess, deleteBdomeal);

module.exports = bdomealsRoutes;