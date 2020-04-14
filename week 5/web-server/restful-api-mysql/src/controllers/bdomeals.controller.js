const connection = require('../db-config');
const {
  ALL_BDOMEALS,
  SINGLE_BDOMEAL,
  INSERT_BDOMEAL,
  UPDATE_BDOMEAL,
  DELETE_BDOMEAL,
} = require('../queries/bdomeals.queries');
const query = require('../utils/query');

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

  const bdomeals = await query(con, ALL_BDOMEALS).catch((err) => {
    res.send(err);
  });

  if (bdomeals.length) {
    res.json(bdomeals);
  }
};

exports.getBdomeal = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  const bdomeal = await query(con, SINGLE_BDOMEAL, [req.params.bdomealId]).catch(
    (err) => {
      res.send(err);
    }
  );

  if (bdomeal.length) {
    res.json(bdomeal);
  }
};


exports.createBdomeal = async (req, res) => {
  // verify valid token
  const decoded = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }

  // take result of middleware check
  if (decoded.id) {
    // establish connection
    const con = await connection().catch((err) => {
      throw err;
    });

  
    const result = await query(con, INSERT_BDOMEAL, [req.body.name, req.body.silver_value]).catch(
      (err) => {
        res.send(err);
      }
    );
    console.log(result);

    if (result.affectedRows === 1) {
      res.json({ message: 'Added bdomeal successfully!' });
    }
  }
};

exports.updateBdomeal = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });


  const result = await query(con, UPDATE_BDOMEAL, [
    req.body.name,
    req.body.silver_value,
    req.params.bdomealId,
  ]).catch((err) => {
    res.send(err);
  });

  if (result.affectedRows === 1) {
    res.json(result);
  }
};

exports.deleteBdomeal = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  const result = await query(con, DELETE_BDOMEAL, [req.params.bdomealId]).catch(
    (err) => {
      res.send(err);
    }
  );

  if (result.affectedRows === 1) {
    res.json({ message: 'Deleted successfully.' });
  }
};