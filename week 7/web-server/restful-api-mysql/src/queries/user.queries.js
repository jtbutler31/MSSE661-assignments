exports.CREATE_USERS_TABLE = `CREATE TABLE IF NOT EXISTS users(
    user_id int NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL UNIQUE,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY (user_id)
  )`;

exports.GET_ME_BY_USER_ID = `SELECT user_id, username, email FROM users WHERE user_id = ?`; // don't return the password

exports.GET_ME_BY_USERNAME = `SELECT user_id, username, email FROM users WHERE username = ?`; // don't return the password

exports.GET_ME_BY_USER_ID_WITH_PASSWORD = `SELECT * FROM users WHERE user_id = ?`;

exports.GET_ME_BY_USERNAME_WITH_PASSWORD = `SELECT * FROM users WHERE username = ?`;

exports.INSERT_NEW_USER = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

exports.UPDATE_USERNAME = (username, user_id) =>
 `UPDATE users SET username = ${username} WHERE user_id = ${user_id}`;

exports.UPDATE_EMAIL = (email, user_id) =>
`UPDATE users SET email = ${email} WHERE user_id = ${user_id}`;

exports.UPDATE_PASSWORD = (password, user_id) =>
`UPDATE users SET password = ${password} WHERE user_id = ${user_id}`;