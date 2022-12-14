const express = require('express')
const router = express.Router()

const collegeController = require('../controller/collegeController')
const internController = require('../controller/internController')


router.post('/functionup/colleges', collegeController.createCollege)
router.post('/functionup/interns', internController.createIntern)
router.get('/functionup/collegeDetails', collegeController.getCollegeDetails)





router.all("/*",function(req,res){
    res.status(404).send({msg:"invalid http request"})
})

module.exports = router