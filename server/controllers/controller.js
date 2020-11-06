const bcrypt = require("bcryptjs");

module.exports = {   

  createProgress: async (req, res) => {
    console.log(req.body)
      const { pic, weight, lbm, date } = req.body;
      const { id } = req.session.cust; 
      const db = req.app.get('db');
      db.create_progress( pic, weight, lbm, date, id).then( () => res.sendStatus(200));
  },

  // getMeasurements: async (req, res) => {
  //   const db = req.app.get('db');
  //   const [measurements] = await db.get_measurements();
  //   return res.status(200).send([measurements])
  //},

  getProgress: async (req, res) => {
    const db = req.app.get('db');
    const [progress] = await db.get_progress();
    return res.status(200).send([progress])
  },

  updateAge: async (req, res) => {
    const db = req.app.get('db');
    const [age] = await db.update_age();
    return res.status(200).send([age])
  },
  deleteAge: async (req, res) => {
    const db = req.app.get('db')
    const [age] = await db.delete_age();
    return res.status(200).send([age])
  },

  getTdee: async (req, res) => {
    const db = req.app.get('db');
    const [tdee] = await db.get_tdee();
    return res.status(200).send([tdee])
  },

  createMacros: async (req, res) => {
    console.log(req.body)
    const db = req.app.get('db')
    const { calories, carbs, fats, protein } = req.body
    const { id } = req.session.cust;
    await db.create_macros( calories, carbs, fats, protein, id)
  },
  getInfo: async (req, res) => {
    const db = req.app.get('db');
    const {id} = req.session.cust;
    const info = await db.get_info(id)
    console.log(info)
    res.status(200).send(info[0])
  },
  getCustInfo: async(req, res) => {
    const db = req.app.get('db');
    const {cust_id} = req.session.cust;
    console.log(cust_id)
    const custInfo = await db.get_cust_info(cust_id)
    console.log(custInfo)
    res.status(200).send(custInfo[0])
  },
  updateMeasurements: async (req,res) => {
    const db = req.app.get('db');
    const {cust_id} = req.session.cust;
    const {rightArm, leftArm, highWaist, waist, rightleg, leftleg, weight, date} = req.body;
    const info = await db.update_measurements(rightArm, leftArm, highWaist, waist, rightleg, leftleg, weight, date, cust_id)
    console.log(info)
    res.status(200).send(info[0])
  },
  updateMacros: async (req,res) => {
    const db = req.app.get('db')
    const {cust_id} = req.session.cust;
    const { calories, fats, protein, carbs} = req.body;
    const info = await db.update_macros( calories, fats, protein, carbs, cust_id)
    console.log(info)
    res.status(200).send(info[0])
  }


  // deletePost: async (req, res) => {
  //   const db = req.app.get('db)');
  //   const {id} = req.params;

  //   const [post] = await db.delete_post([id]);
  //   res.status(200).send('Delete successful')
  // }
}