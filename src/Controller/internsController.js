const internsModel = require("../models/internsModel");


const CreateInterns = async function(req,res){
    try {
        let data = req.body
        let Interns = await internsModel.create(data);

        
        return res.status(201).send({ msg: Interns });
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
};
module.exports.CreateInterns= CreateInterns
