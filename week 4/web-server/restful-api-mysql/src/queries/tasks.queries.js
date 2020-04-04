/**
 * Tables follow syntax:
 * - CREATE TABLE <table_name>(<column_name> <data_type> <options>, ...)
 */
exports.CREATE_BDOTEST_TABLE = `CREATE TABLE IF NOT EXISTS bdotest(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    how_many int NOT NULL,
    silver_value int NOT NULL,
    PRIMARY KEY (id)
  )`;
  
  // Get every task
  exports.ALL_TASKS = `SELECT * FROM bdotest`;
  
  // Get a single task by id
  exports.SINGLE_TASK = `SELECT * FROM bdotest WHERE id = ?`;
 
  exports.INSERT_TASK = `INSERT INTO bdotest (user_id, name) VALUES (?, ?)`;

  
  exports.INSERT_TASK = `INSERT INTO bdotest (name, how_many, silver_value) VALUES (?, ?, ?)`;
  
  exports.UPDATE_TASK = `UPDATE bdotest SET name = ?, how_many = ?, silver_value = ? WHERE id = ?`;
  
  // Delete a task by id
  exports.DELETE_TASK = `DELETE FROM bdotest WHERE id = ?`;