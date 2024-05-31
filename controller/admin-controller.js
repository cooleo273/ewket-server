const bcrypt = require('bcrypt');
const Admin = require('../models/adminSchema.js');


const getAdminDetail = async (req, res) => {
    try {
        let admin = await Admin.findById(req.params._id);
        if (admin) {
            admin.password = undefined;
            res.send(admin);
        }
        else {
            res.send({ message: "No admin found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}




module.exports = {  getAdminDetail };