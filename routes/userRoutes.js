const express=require('express')
const router=express.Router();
const {register,login,mybookings,viewcars, carbooking,returncar}=require('../controllers/userController');

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/carbooking').post(carbooking);
router.route('/viewcars/:date').get(viewcars);
router.route('/mybookings/:name').get(mybookings);
router.route('/returncar/:carno').get(returncar);
module.exports=router;