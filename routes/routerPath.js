const express=require("express");
const {getallfn,getspecificfn,createfn,updatefn,deletefn} = require('../controllers/productController');
const {login1fn,registrationfn}= require('../controllers/userController')
const bycriptfn=require('../middlewares/bycript');
const profileDetailsfn=require('../middlewares/profiledetails')
const jwtfn = require("../middlewares/jwtauthcode");
const router=express.Router()
var passport=require('passport');
// require("../middlewares/passportConfig")(passport)
require("../middlewares/passportConfig")
router.post('/signup',bycriptfn,registrationfn)
router.post('/login',login1fn)
router.get('/tasks',getallfn)
router.get('/tasks/:id',getspecificfn)
router.post('/tasks',createfn)
router.put('/tasks/:id',updatefn)
router.delete('/tasks/:id',deletefn)
//  router.get('/locationsearch',passport.authenticate('jwt',{session:false}),locationsearch)

module.exports=router;