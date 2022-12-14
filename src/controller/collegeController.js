const { default: mongoose } = require('mongoose');
const collegeModel = require('../model/collegeModel');
const internModel = require('../model/internModel');
const {validator} = require('../utils')


const createCollege = async function(req,res){
    try{
        const requestData = req.body;
        const {name, fullName, logoLink} = requestData

        //validation starts
        if(!validator.isValidRequestBody(requestData)){
            return res.status(400).send({status:false, message:`Provide body data`})
        }

        if(!validator.isValidname(name)){
            return res.status(400).send({status: false, message:`Enter a valid name`})
        }

        if(!validator.IsValidate(name)){
            return res.status(400).send({status: false, message:`Enter name`}) 
        }

        const checkName = await collegeModel.findOne({name:name})
        if(checkName){
            return res.status(400).send({status:false, message:`name is already registeredd`})
        }

        if(!validator.IsValidate(fullName)){
            return res.status(400).send({status:false, message:`fullName is required`})
        }

        if(!validator.IsValidate(logoLink)){
            return res.status(400).send({status:false, message:`logoLink is required`})
        }

        if(!validator.isValidLogoLink(logoLink)){
            return res.status(400).send({status:false, message:`invalid logoLInk`})
        }

        //validation End

        const createdCollege = await collegeModel.create(requestData)
        res.status(201).send({status:true, message: createdCollege})
        return

    }catch(error){
        res.status(500).send({status:false, message:error.message})
    }
}

const getCollegeDetails = async function(req,res){
    try{
        const collegeName= req.query.collegeName;

        // start
        if(!collegeName){
            return res.status(400).send({status:false, message:`College Name is mandatory`})
        }

        let collegeId = await collegeModel.find({name: collegeName}).select({_id:1})

        if(collegeId.length == 0){
            return res.status(404).send({status:false, message:`Please enter a valid name abbreviation in lowercase`})
        }
      
        let interns = await internModel.find({collegeId: collegeId}).select({name:1, email:1, mobile:1, _id:1})

        let College = await collegeModel.find({name:collegeName}).select({name:1, fullName:1, logoLink:1, _id:0})  //right
        
        // end

        const obj = {
            name: College[0].name,
            fullName: College[0].fullName,
            logoLink: College[0].logoLink,
            interests: interns
        }

        res.status(200).send({status:true, data:obj})
        return

    }catch(error){
        res.status(500).send({status:false, message:error.message})
        return
    }
}



module.exports = {
    createCollege,
    getCollegeDetails
}