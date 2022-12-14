const collegeModel = require('../model/collegeModel')
const internModel = require('../model/internModel')
const { validator } = require('../utils')

const createIntern = async function(req,res){
    try{

        const requestBody = req.body;
        const {name, email, mobile, collegeName} = requestBody

        //validation Start
        if(!validator.isValidRequestBody(requestBody)){
            return res.status(400).send({ status: false, message:`Provide basics details`});
        }

        if(!validator.IsValidate(name)){
            return res.status(400).send({status:false, message:`Name is required or it should be a vallid Name`})
        }

        if(!validator.isValidEmail(email)){
            return res.status(400).send({status:false,message:`Email required or it should be a valid email`})
        }

        let checkEmail = await internModel.findOne({email:email})
        if(checkEmail){
            return res.status(400).send({status:false, message:`This ${email} is already registered`})
        }

        if(!mobile){
            return res.status(400).send({ status: false, message:`Mobile Number in required`});
        }

        if(!validator.isValidmobile(mobile)){ 
            return res.status(400).send({status:false, message:`This ${mobile} is invalid mobile number`})
        }

        let checkMobile = await internModel.findOne({mobile:mobile})
        if(checkMobile){
            return res.status(400).send({status:false, message: `This ${mobile} is already registered`})
        }
        //==
        const isMatch = await collegeModel.findOne({ name: collegeName });
        if (!isMatch) {
            return res.status(400).send({ status: false, message:`Please enter a valid college name`}); 
        }
        requestBody.collegeId = isMatch._id;
        //==
        const createdIntern = await internModel.create(requestBody)
        res.status(201).send({status:true, data: createdIntern})
        return 

    }catch(error){
        res.status(500).send({status:false, message:error.message})
    }
}

module.exports = {createIntern}

