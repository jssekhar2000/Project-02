const collegeModel = require("../Models/collegeModel");
const internsModel = require("../Models/internsModel");
const validator = require('validator')



//==================================validator function==============================

const isValid= function (value){
    if(typeof value==='undefined' || value === null) return false;
    if(typeof value ==='string' && value.trim().length===0) return false;
    return true;
    }


//================================Create Intern Api=================================

const createInterns = async function(req,res){
    try {
        const data = req.body

//validation for mandatory >>

if(Object.keys(data).length == 0){
    return  res.status(400).send({ status:false,message:"Invalid request,Please Provide Intern Details"})
}

if(!isValid(data.name)){
    return res.status(400).send({status:false,message:" Name is Mandatory"})
}

if(!isValid(data.email)){
    return res.status(400).send({status:false,message:" email is Mandatory"})
}

if(!isValid(data.mobile)){
    return res.status(400).send({status:false,message:" mobile number is Mandatory"})
}

if(!isValid(data.collegeId)){
    return res.status(400).send({status:false,message:" collegeId is Mandatory"})
}

// ======================validation for unique==========================

if(!(validator.isEmail(data.email))){
    return res.status(400).send({status:false,message:"Please Enter a valid email"})
}

 let num1=data.mobile    //mobile number validation
 let num2= (/^[0-9]{10}/.test(data.mobile))
 if(!num2 && num1>10) {
    return res.status(400).send({status:false,message:"Please Enter a valid mobile number"})
 }

//validation for collegeId exist or not
const collegeId= await collegeModel.findOne({_id:data.collegeId})
if(!collegeId){
    return res.status(400).send({status:false,message:"Please Enter a valid collegeId"})
}
if(collegeId.isDeleted===true){
    return res.status(400).send({status:false,message:"This college is deleted"})
}

//validation for mobile and email is already exist or not

let usedEmail= await internsModel.findOne({email:data.email})

if(usedEmail){
    return res.status(400).send({status:false,message:"This email is already exist"})
}

let usedMobile=await internsModel.findOne({mobile:data.mobile})

if(usedMobile){
    return res.status(400).send({status:false,message:"This mobile number is already exist"})
}
        const Interns = await internsModel.create(data);
         return res.status(201).send({ status:true, data: Interns });
    }

    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
};


//==================get all interns Api===================


const getCollegeDetails = async function(req,res){
    try {
       const collegeName = req.query.name
       if(!collegeName){
           return res.status(400).send({status:false, msg: "Please Enter the College Name"})
       }


   const collegeDetails =await collegeModel.findOne({name:collegeName,isDeleted:false})
   if(!collegeDetails){
    return res.status(404).send({status:false, msg: "No Such College Found , Please provide a valid college name"}) 
   }
   const collegeId = collegeDetails._id

   const interns= await internsModel.find({collegeId:collegeId,isDeleted:false}).select({_id:1,name:1,email:1,mobile:1})
   
   if(interns.length === 0){
    return res.status(404).send({status:false, msg: "No Intern applied for internship at this college"})  
   }

   const collegeData ={
       name:collegeDetails.name,
       fullName: collegeDetails.fullName,
       logoLink: collegeDetails.logoLink,
       interest: interns 
   }
    return res.status(200).send({status:true, data: collegeData})
   
    } catch (error) {
       return res.status(500).send({status:false, msg: error.message}) 
    }   
   }




module.exports.createInterns= createInterns
module.exports.getCollegeDetails=getCollegeDetails
