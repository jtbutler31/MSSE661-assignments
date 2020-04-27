const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const connection = require('../db-config');
const query = require('../utils/query');
const {
  GET_ME_BY_USER_ID,
  GET_ME_BY_USER_ID_WITH_PASSWORD,
  UPDATE_PASSWORD,
  UPDATE_USERNAME
} = require('../queries/user.queries');

exports.getMe = async (req, res) => {
  // verify valid token
  const user = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }

  // take result of middleware check
  if (user.id) {
    // establish a connection
    const con = await connection().catch((err) => {
      throw err;
    });

    const user = await query(con, GET_ME_BY_USER_ID, [user.id]).catch((err) => {
      res.status(500).json({ msg: 'Could not find the user.' });
    });

    if (!user.length) {
      res.status(400).json({ msg: 'No user found.' });
    }
    res.status(200).send(user);
  }
};

exports.updateUsername = async (req, res) => {

  const user = req.user;
  
  if(user.id) {
      const con = await connection().catch((err)=>{
          throw err;
      });
  
      const storedUser = await query(con, GET_ME_BY_USER_ID, [user.id]).
      catch((err) => {
        res.status(500).json({ msg: 'Could not find the user.' });
      });

      const newUsername = mysql.escape(req.body.username);

      if(newUsername === storedUser[0].username) {
          res.json({msg: 'Nothing to update!'});
      }

      const result = await query(con, UPDATE_USERNAME(newUsername, storedUser[0].user_id))
      .catch((err) => {
        res.status(500).json({ msg: 'Could not update username.' });
      });

      if(result.affectedRows != 0) {
          res
          .status(200)
          .json({msg: 'Updated Successfully'});
      }
  }
};

exports.updatePassword = async (req, res) => {

  const user = req.user;
  
  if(user.id) {
      const con = await connection().catch((err)=>{
          throw err;
      });
  
      const storedUser = await query(con,GET_ME_BY_USER_ID_WITH_PASSWORD, [user.id])
      .catch((err) => {
        res.status(500).json({ msg: 'Could not update password.' });
      });

      const passUnchanged = await bcrypt
      .compare(req.body.password, storedUser[0].password)
      .catch((err) => {
        res.status(500).json({ msg: 'Could not update password.' });
      });

      if(passUnchanged) {
          res.json({msg: 'Nothing to update!'});
      }

      if(!passUnchanged) {
          const passHash = bcrypt.hashSync(req.body.password);
          const newPass = mysql.escape(passHash);

          const result = await query(con, UPDATE_PASSWORD(newPass, storedUser[0].user_id))
          .catch((err) => {
        res.status(500).json({ msg: 'Could not update password.' });
      });

          
          if(result.affectedRows === 1) {
              res
              .status(200)
              .json({msg: 'Updated Successfully'});
          }
      }
  }
};