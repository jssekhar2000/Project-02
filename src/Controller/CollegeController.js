const collegeModel = require("../models/collegeModel");



const createCollege = async function (req,res){
    try {
        let data = req.body
        let college = await collegeModel.create(data);
        return res.status(201).send({ msg: college });
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
};
module.exports.createCollege = createCollege;
