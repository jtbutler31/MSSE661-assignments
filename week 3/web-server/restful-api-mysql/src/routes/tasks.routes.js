const controllers = require('../controllers/tasks.controller');
const express = require('express');

const tasksRoutes = express.Router();
/**
 * Express routes for Tasks.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

tasksRoutes.get('/', controllers.getAllTasks).post('/', controllers.createTask);

tasksRoutes
  .get('/:taskId', controllers.getTask)
  .put('/:taskId', controllers.updateTask)
  .delete('/:taskId', controllers.deleteTask);

module.exports = tasksRoutes;