const {
  login, 
  getservers,
  server, 
  getuserserver, 
  register, 
  addcategory, 
  removecategory, 
  getserverinfoez, 
  addnetitemtoshop, 
  edititemfromshop,
  addnewzestawtoshop,
  editzestawfromshop,
  addnewfcodetoshop,
  removefcodefromshop,
  getUseraAllserver,
  getserverinfoid,
  removeMedia
} = require('../controllers/userController');
const passport = require('passport');
const router = require('express').Router();
router.post("/panel", login);
router.post("/INpanel", server);
router.post("/getallservers", getservers);
router.post("/getuserserver/:id", getuserserver);
router.post("/registerserver", register);
router.post("/addcategory", addcategory);
router.post("/removecategory", removecategory);
router.post("/getserverinfoez", getserverinfoez);
router.post("/addnetitemtoshop", addnetitemtoshop);
router.post("/edititemfromshop", edititemfromshop);
router.post("/addnewzestawtoshop", addnewzestawtoshop);
router.post("/editzestawfromshop", editzestawfromshop);
router.post("/addnewfcodetoshop", addnewfcodetoshop);
router.post("/removefcodefromshop", removefcodefromshop);
router.post("/getallsuinfo", getUseraAllserver);
router.post("/getserverinfoid", getserverinfoid);
router.post("/removemedia", removeMedia)
router.get('/steam',  
  passport.authenticate('steam', { failureRedirect: '/',successRedirect:'http://localhost:3000/'}));

router.get(
  "/steam/callback",
  passport.authenticate("steam", {failureRedirect: "/login/failed",successRedirect:'http://localhost:3000/'}));

router.get("/steam/success", (req, res) => {
  if (req.user != undefined) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
      
    });
  }
});

router.get("/steam/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get('/steam/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('http://localhost:3000/');
  });
});


module.exports = router;
