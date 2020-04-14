
exports.CREATE_BDOMEALS_TABLE = `CREATE TABLE IF NOT EXISTS bdomeals(
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  silver_value int NOT NULL,
  created_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(user_id) 
)`;

exports.ALL_BDOMEALS = `SELECT * FROM bdomeals`;


exports.SINGLE_BDOMEAL = `SELECT * FROM bdomeals WHERE id = ?`;


exports.INSERT_BDOMEAL = `INSERT INTO bdomeals (name, silver_value) VALUES (?, ?)`;


exports.UPDATE_BDOMEAL = `UPDATE bdomeals SET name = ?, silver_value = ? WHERE id = ?`;


exports.DELETE_BDOMEAL = `DELETE FROM bdomeals WHERE id = ?`;