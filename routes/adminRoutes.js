const express=require('express')
const router=express.Router()
const {login,addcar,getCar,getCars,updateCar,deleteCar}=require('../controllers/adminController')

router.route('/login').post(login)
router.route('/addcar').post(addcar)
router.route('/getcars').get(getCars)
router.route('/getcar/:carnumber').get(getCar)
router.route('/updatecar/:carnumber').put(updateCar)
router.route('/deletecar/:carnumber').delete(deleteCar)

module.exports=router;