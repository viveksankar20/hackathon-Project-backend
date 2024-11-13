// controller.js
const TestModel=require('../model/model')
const apis = {};


apis.employee=async(req,res)=>{
    const {name,email,mobileNumber,experience,education,detailExperience}=req.body
    try{
const Employee = new TestModel({
    name,
    email,
    experience,
    mobileNumber,
    education,
    detailExperience
})
    const saveEmploye = await Employee.save()
    res.status(200).json({
    success:true,
    message:'employee created successfully',
    data:saveEmploye
})
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:'internal server error'
        })
    }
}
apis.getAllemployees=async(req,res)=>{
    try{
const user=await TestModel.find()
if(!user){
    return res.status(404).json({message:"data not found",data:user})
}
res.status(200).json({message:"getted successfully",data:user})
    }
    catch(e){
        res.status(500).json({success:false,message:'internal server error'})
        console.log(e)
    }
}

module.exports = apis;
