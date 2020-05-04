const mysql = require('mysql');
const connection = require('../db-config');
const {
  ALL_BDOMEALS,
  SINGLE_BDOMEAL,
  INSERT_BDOMEAL,
  UPDATE_BDOMEAL,
  DELETE_BDOMEAL,
} = require('../queries/bdomeals.queries');
const query = require('../utils/query');
const { serverError } = require('../utils/handlers');

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 */

exports.getAllBdomeals = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  const bdomeals = await query(con, ALL_BDOMEALS(req.user.id), []).catch((err) => {
    res.status(500).json({ msg: 'No Bdo meals available for this user.' });
  });

  if (!bdomeals.length) {
    res.status(200).json({ msg: 'No bdomeals available for this user.'});
  }
    res.json(bdomeals);
  
};

exports.getBdomeal = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  const bdomeal = await query(con, SINGLE_BDOMEAL(req.user.id, req.params.bdomealId)).catch(
    serverError(res));

  if (!bdomeal.length) {
    res.status(400).json({ msg: 'No bdomeals available for this user'});
  }  
  res.json(bdomeal);
  
};


exports.createBdomeal = async (req, res) => {
  // verify valid token
  const user = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }

  // take result of middleware check
  if (user.id) {
    // establish connection
    const con = await connection().catch((err) => {
      throw err;
    });

    const bdomealName = mysql.escape(req.body.bdomeal_name);
    const bdomealSilverValue = mysql.escape(req.body.silver_value);
    const result = await query(con, INSERT_BDOMEAL(user.id, bdomealName, bdomealSilverValue)).catch(
      serverError(res)  
    );

    if (result.affectedRows !== 1) {
      res
      .status(500)
      .json({msg: 'Unable to add bdomeal: ${req.body.bdomeal_name}'});
    }
    res.json({ message: 'Added bdomeal successfully!' });
    
  }
};

const _buildValuesString = (req) => {
  const body = req.body;
  const values = Object.keys(body).map(
    (key) => '${key} = ${mysql.escape(body[key])}'
  );

  values.push('created_date = NOW()');
  values.join(', ');
  return values;  
};



exports.updateBdomeal = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  const values = _buildValuesString(req);

  const result = await query(
    con,
    UPDATE_BDOMEAL(req.user.id, req.params.bdomealId, values)
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    res
      .status(500)
      .json({ msg: `Unable to update bdo meal: '${req.body.bdomeal_name}'` });
  }
  res.json(result);
};
exports.deleteBdomeal = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  const result = await query(con, DELETE_BDOMEAL(req.user.id, req.params.bdomealId)
  ).catch(serverError(res));
  

  if (result.affectedRows !== 1) {
    res
      .status(500)
      .json({msg: 'Unable to delete bdomeal at: ${req.params.bdomealId}'});
  }  
  res.json({ msg: 'Deleted successfully.' });
  
};