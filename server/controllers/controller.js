const bcrypt = require("bcryptjs");

module.exports = {   

  createProgress: (req, res) => {
      const { pic, weight, lbm, date } = req.body;
      const { id } = req.session.user; 
      const db = req.app.get('db');
      db.create_progress( pic, weight, lbm, date, id).then( () => res.sendStatus(200));
  },

  getMeasurements: async (req, res) => {
    const db = req.app.get('db');
    const [measurements] = await db.get_measurements();
    return res.status(200).send([measurements])
  },

  getProgress: async (req, res) => {
    const db = req.app.get('db');
    const [progress] = await db.get_progress();
    return res.status(200).send([progress])
  },

  getTdee: async (req, res) => {
    const db = req.app.get('db');
    const [tdee] = await db.get_tdee();
    return res.status(200).send([tdee])
  },

  // deletePost: async (req, res) => {
  //   const db = req.app.get('db)');
  //   const {id} = req.params;

  //   const [post] = await db.delete_post([id]);
  //   res.status(200).send('Delete successful')
  // }
}