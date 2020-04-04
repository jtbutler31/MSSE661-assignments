const con = require('../db-config');
const queries = require('../queries/tasks.queries');

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 */

exports.getAllTasks = function(req, res) {
  con.query(queries.ALL_TASKS, function(err, result, fields) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
};

exports.getTask = function(req, res) {
  con.query(queries.SINGLE_TASKS, [req.params.taskId], function(err, result) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
};

exports.createTask = function(req, res) {
  con.query(queries.INSERT_TASK, [req.body.name, req.body.how_many, req.body.silver_value, req.params.taskId], function(err, result) {
    if (err) {
      res.send(err);
    }
    console.log(result);
    res.json({ message: 'Number of records inserted: ' + result.affectedRows });
  });
};

exports.updateTask = function(req, res) {
  con.query(
    queries.UPDATE_TASK,
    [req.body.name, req.body.how_many, req.body.silver_value, req.params.taskId],
    function(err, data) {
      if (err) {
        res.send(err);
      }
      res.json(data);
    }
  );
};

exports.deleteTask = function(req, res) {
  con.query(queries.DELETE_TASK, [req.params.taskId], function(err) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Deleted successfully.' });
  });
};