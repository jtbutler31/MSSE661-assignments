
exports.CREATE_BDOMEALS_TABLE = `CREATE TABLE IF NOT EXISTS bdomeals(
  bdomeal_id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  bdomeal_name varchar(255) NOT NULL,
  silver_value int NOT NULL,
  created_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (bdomeal_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE 
)`;

exports.ALL_BDOMEALS = (userId) => `SELECT * FROM bdomeals WHERE user_id = ${userId}`;


exports.SINGLE_BDOMEAL = (userId, bdomealId) =>
  `SELECT * FROM bdomeals WHERE user_id = ${userId} AND bdomeal_id = ${bdomealId}`;


exports.INSERT_BDOMEAL = (userId, bdomealName, bdomealSilverValue) =>
`INSERT INTO bdomeals (user_id, bdomeal_name, silver_value) VALUES (${userId}, ${bdomealName}, ${bdomealSilverValue})`;


exports.UPDATE_BDOMEAL = (userId, bdomealId, newValues) =>
  'UPDATE bdomeals SET ${newValues} WHERE user_id = ${userId} AND bdomeal_id = ${bdomealId}';


exports.DELETE_BDOMEAL = (userId, bdomealId) =>
`DELETE FROM bdomeals WHERE user_id = ${userId} AND bdomeal_id = ${bdomealId}`;