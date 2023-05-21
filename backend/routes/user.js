const router = require('express').Router();
const Donor = require("../models/Donor");
const request = require('request');
const {initializePayment, verifyPayment} = require('../config/paystack')(request);

// Assuming you have the required dependencies and configurations already set up

router.post('/paystack/pay', (req, res) => {
  const { fullname, regno, phone, course } = req.body;
  
  if (!fullname || !regno || !phone || !course) {
    return res.status(401).send({error : "All inputs are required"})
  }

  try {
    const form = _.pick(req.body, [
      'amount',
      'email',
      'full_name',
      'regno',
      'phone',
      'course',
      'level',
    ]);

    form.metadata = {
      full_name: form.full_name,
      regno: form.regno,
      phone: form.phone,
      course: form.course,
      level: form.level,
    };

    form.amount *= 100;
    form.subaccount = 'ACCT_o92krz6yfv87xjf';

    const response = initializePayment(form);

    res.json({ authorization_url: response.data.authorization_url });
  } catch (error) {
    // Handle errors
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});




router.get('/paystack/callback', (req,res) => {
    const ref = req.query.reference;
    verifyPayment(ref, (error,body)=>{
        if(error){
            //handle errors routerropriately
            console.log(error)
            return res.redirect('/error');
        }
        response = JSON.parse(body);        

        const data = _.at(response.data, [
            'reference',
            'amount',
            'customer.email',
            'metadata.full_name',
            'metadata.regno',
            'metadata.phone',
            'metadata.course',
            'metadata.level'
        ]);

        [
            reference,
            amount,
            email,
            full_name,
            regno,
            phone,
            course,
            level
        ] =  data;
        
        newDonor = {
            reference,
            amount,
            email,
            full_name,
            regno,
            phone,
            course,
            level
        }

        const donor = new Donor(newDonor)

        donor.save().then((donor)=>{
            if(!donor){
                return res.status(401).send({error: "Unable to save"});
            }
          res.json({ donorId: donor._id });
        }).catch((e)=>{
            return res.status(500).send({error: "Error"});
        })
    })
});

router.get('/receipt/:id', (req, res)=>{
    const id = req.params.id;
    Donor.findById(id).then((donor)=>{
        if(!donor){
            res.redirect('/error')
        }
        res.render('success.pug',{donor});
    }).catch((e)=>{
        res.redirect('/error')
    })
})

router.post('/add', (req,res)=>{

})

router.get('/error', (req, res)=>{
    res.render('error.pug');
})



router.post('/login', (req,res)=>{

  const user = new User({
  username: req.body.username,
  password: req.body.password,
});
req.login(user, (err) => {
  if (err) {
    console.log(err);
  } else {
    passport.authenticate("local")(req, res, () => {
      res.status(200).json({ success: "Login Successfully" });
    });
  }
});
})

router.get('/logout',  (req,res)=>{
     req.logout(function (err) {
   if (err) {
     return next(err);
   }
   res.redirect("/");
 });
})

router.get("/authenticate", (req, res) => {
  if (req.isAuthenticated()) {
    // res.status(200).json({
    // authenticated: true
    // });
    res.json(req.user);
    console.log("Authenticated");
  } else {
    console.log("Not Authenticated");
  }
});

router.get("/findUser", (req, res) => {
  User.find({}, (err, user) => {
    if (!err) {
      return res.send(user);
    } else {
      console.log(err);
    }
  });
});


module.exports = router;