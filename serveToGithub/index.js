const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require('./routes/userRoutes');
var passport = require('passport');
var session = require('express-session');
var passportSteam = require('passport-steam');
const User = require("./model/userModel");
const Server = require("./model/serverModel");
var SteamStrategy = passportSteam.Strategy;
var crypto = require('crypto')
var date
var nodemailer = require('nodemailer');

const cookieSession = require("cookie-session");
const { response } = require("express");
const app = express();
require("dotenv").config();


app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());

// Required to get data from user for sessions
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});
  
// Initiate Strategy
passport.use(new SteamStrategy({
    returnURL: 'http://localhost:5000/api/auth/steam/callback',
    realm: 'http://localhost:5000/api/auth/steam/callback',
    apiKey: '519CCBFF12710321B69DBB0497AE131C'
}, function (identifier, profile, done) {
    process.nextTick(function () {
     profile.identifier = identifier;
     return done(null, profile);
    });
   }
));

app.use(session({
    secret: 'ez',
    saveUninitialized: true,
    resave: false,
    cookie: {
     maxAge: 3600000
    }
}))
    

app.use(
    cors({
      origin: ["http://localhost:3000","http://localhost:3001","http://localhost:3002","http://localhost:5500","http://test.pl"],
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    }));

app.use(express.json());
app.use("/api/auth",userRoutes)

mongoose.connect(process.env.URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log(`CONNECT SUCCESFULL`);
})
.catch((err) => {
    console.log(err.message);
});


const server = app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT} Server Wystartował`);
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/');
}

let serverscfg = {
    ['fancyrp']:{
        money:0
    },
    ['bojowkarp']:{
        money:0
    }
}



app.use("/pay", async function (req,res,next) { 
    try{
        if(req.body.steamlogin && req.body.serv && req.body.hujkurwadupa){
            let canusepromoCode = false
            let itemname
            let price 
            let Stkod = req.body.values.kod
            let promoCode
            let promoCodePro
            let promoCodeUse
            let serss = req.body.serv
            let steamlogin = req.body.steamlogin
            let addons = []
            let tip = req.body.tip

            function makeSteamHex(str){ // .toString(16) only works up to 2^53
                var dec = str.toString().split(''), sum = [], hex = [], i, s
                while(dec.length){
                    s = 1 * dec.shift()
                    for(i = 0; s || i < sum.length; i++){
                        s += (sum[i] || 0) * 10
                        sum[i] = s % 16
                        s = (s - sum[i]) / 16
                    }
                }
                while(sum.length){
                    hex.push(sum.pop().toString(16))
                }
                return hex.join('')
            }
            let steamHex = makeSteamHex(steamlogin._json.steamid)
            let email = req.body.values.email
            Server.findOne({server:serss},function (err, SERVERINFO){                
                if(req.body.values.ssn){
                    for(let i in SERVERINFO.Addons){
                        let addon = SERVERINFO.Addons[i]
                        addons.push({[addon]: req.body.values.ssn})
                    }
                }
                Server.findOne({server:serss},{allItems: {$elemMatch:{itemname: req.body.hujkurwadupa}}}, function (err, docsB) {
                    if (err){
                        console.log(err)
                        return res.json({msg:err,status: false,});
                    }else{
                        
                        if(Stkod != undefined){
                            Server.findOne({server:serss},{feecode: {$elemMatch:{code: Stkod}}}, function (err, docs) {
                                if (err){
                                    console.log(err)
                                    return res.json({msg:err,status: false,});
                                }else{
                                
                                    if(docs.feecode != undefined ){
                                        if(docs.feecode.length > 0){
                                            promoCodePro = docs.feecode[0].pro;
                                            promoCodeUse = docs.feecode[0].ussages;
                                            if(promoCodeUse > 0){
                                                let newUse = promoCodeUse -1
                                                Server.findOneAndUpdate({server:serss, feecode:{$elemMatch: {code:Stkod}}},{$set: {"feecode.$.ussages":newUse}},function (err,docss) {
                                                    if (err){
                                                        console.log(err)
                                                        return res.json({msg:err,status: false,});
                                                    }else{
                                                        canusepromoCode = true
                                                        var redLink;
                                                        var PuhId;
                                                        var accbalance;
                                                        let data = docsB.allItems; 
                                                        
                                                        if(tip){
                                                            price = (data[0].itemprice + (data[0].itemprice*0.05)) - (data[0].itemprice/100*promoCodePro);
                                                        }else{
                                                            price = data[0].itemprice - (data[0].itemprice/100*promoCodePro);
                                                        }
                                                      
                                                        itemname = data[0].itemlabel
                                                        let respon = [];
                                                        let title = data[0].itemlabel;
                                                        let amount = {value:price, currencyCode:"PLN"};
                                                        let description = data[0].itemdesc; 
                                                        let sign = crypto.createHash('sha1').update(title + amount.value + amount.currencyCode + description + "klucz").digest('hex')
                                                        fetch('https://pay.cashbill.pl/testws/rest/payment/test.pl', {
                                                            method: 'POST',
                                                            headers: {
                                                                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                                                            },
                                                            body: new URLSearchParams({ 
                                                                "title": title,
                                                                "amount.value": amount.value,
                                                                "amount.currencyCode":amount.currencyCode,
                                                                "description":description,
                                                                "sign":sign
                                                            })
                                                        })
                                                        
                                                        .then(response => response.json())
                                                        .then((response)=>{respon = response; redLink = respon.redirectUrl;PuhId = respon.id })
                                                        .then(async ()=>{
                                                            let returnUrl = "http://localhost:3000/status";
                                                            let negativeReturnUrl = "http://localhost:3000/status"
                                                            let sign2 = crypto.createHash('sha1').update(respon.id + returnUrl + negativeReturnUrl + "klucz").digest('hex');
                                                            await fetch('https://pay.cashbill.pl/testws/rest/payment/test.pl/'+respon.id, {
                                                                method: 'PUT',
                                                                headers: {
                                                                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                                                                },
                                                                body: new URLSearchParams({ 
                                                                    "returnUrl":returnUrl,
                                                                    "negativeReturnUrl":negativeReturnUrl,
                                                                    "sign":sign2
                                                                })
                                                                
                                                            })
                                                        }).then(()=>{
                                                            Server.findOneAndUpdate({server:serss},{ $push: { puhHist: { 
                                                                id:PuhId,
                                                                nick:steamlogin.displayName,
                                                                avatar:steamlogin.photos[2].value,
                                                                kwotab:price - ((price/100)*23),
                                                                kwotan:price,
                                                                item:itemname,
                                                                status: 'w trackie realizacji',
                                                                date: new Date(),
                                                                email: email,
                                                                wykonano: false,
                                                                ineq:false,
                                                                steamhex:steamHex,
                                                                addons:addons
                                                                }}}, function (err, docs) {
                                                                if (err){
                                                                    console.log(err)
                                                                    return res.json({msg:err,status: false,});
                                                                }
                                                            });
                                                            return res.json({link:redLink,tranId:PuhId})
                                                        })
                                                    }
                                                })
                                            }
                                            
                                        }else{
                                            var redLink;
                                            var PuhId;
                                            var accbalance;
                                            let data = docsB.allItems; 
                                            if(tip){
                                                price = data[0].itemprice + (data[0].itemprice*0.05);
                                            }else{
                                                price = data[0].itemprice;
                                            }
                                            itemname = data[0].itemlabel
                                            let respon = [];
                                            let title = data[0].itemlabel;
                                            let amount = {value:price, currencyCode:"PLN"};
                                            let description = data[0].itemdesc;
                                    
                                            let sign = crypto.createHash('sha1').update(title + amount.value + amount.currencyCode + description + "klucz").digest('hex')
                                            fetch('https://pay.cashbill.pl/testws/rest/payment/test.pl', {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                                                },
                                                body: new URLSearchParams({ 
                                                    "title": title,
                                                    "amount.value": amount.value,
                                                    "amount.currencyCode":amount.currencyCode,
                                                    "description":description,
                                                    "sign":sign
                                                })
                                            })
                                            
                                            .then(response => response.json())
                                            .then((response)=>{respon = response; redLink = respon.redirectUrl;PuhId = respon.id })
                                            .then(async ()=>{
                                                let returnUrl = "http://localhost:3000/status";
                                                let negativeReturnUrl = "http://localhost:3000/status"
                                                let sign2 = crypto.createHash('sha1').update(respon.id + returnUrl + negativeReturnUrl + "klucz").digest('hex');
                                                await fetch('https://pay.cashbill.pl/testws/rest/payment/test.pl/'+respon.id, {
                                                    method: 'PUT',
                                                    headers: {
                                                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                                                    },
                                                    body: new URLSearchParams({ 
                                                        "returnUrl":returnUrl,
                                                        "negativeReturnUrl":negativeReturnUrl,
                                                        "sign":sign2
                                                    })
                                                    
                                                })
                                            }).then(()=>{
                                                Server.findOneAndUpdate({server:serss},{ $push: { puhHist: { 
                                                    id:PuhId,
                                                    nick:steamlogin.displayName,
                                                    avatar:steamlogin.photos[2].value,
                                                    kwotab:price - ((price/100)*23),
                                                    kwotan:price,
                                                    item:itemname,
                                                    status: 'w trackie realizacji',
                                                    date: new Date(),
                                                    email: email,
                                                    wykonano: false,
                                                    ineq:false,
                                                    steamhex:steamHex,
                                                    addons:addons
                                                    }}}, function (err, docs) {
                                                    if (err){
                                                        console.log(err)
                                                        return res.json({msg:err,status: false,});
                                                    }
                                                });
                                                return res.json({link:redLink,tranId:PuhId})
                                            })
                                        }
                                    }else{
                                        var redLink;
                                        var PuhId;
                                        var accbalance;
                                        let data = docsB.allItems; 
                                        if(tip){
                                            price = data[0].itemprice + (data[0].itemprice*0.05);
                                        }else{
                                            price = data[0].itemprice;
                                        }
                                        itemname = data[0].itemlabel
                                        let respon = [];
                                        let title = data[0].itemlabel;
                                        let amount = {value:price, currencyCode:"PLN"};
                                        let description = data[0].itemdesc;
                                
                                        let sign = crypto.createHash('sha1').update(title + amount.value + amount.currencyCode + description + "klucz").digest('hex')
                                        fetch('https://pay.cashbill.pl/testws/rest/payment/test.pl', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                                            },
                                            body: new URLSearchParams({ 
                                                "title": title,
                                                "amount.value": amount.value,
                                                "amount.currencyCode":amount.currencyCode,
                                                "description":description,
                                                "sign":sign
                                            })
                                        })
                                        
                                        .then(response => response.json())
                                        .then((response)=>{respon = response; redLink = respon.redirectUrl;PuhId = respon.id })
                                        .then(async ()=>{
                                            let returnUrl = "http://localhost:3000/status";
                                            let negativeReturnUrl = "http://localhost:3000/status"
                                            let sign2 = crypto.createHash('sha1').update(respon.id + returnUrl + negativeReturnUrl + "klucz").digest('hex');
                                            await fetch('https://pay.cashbill.pl/testws/rest/payment/test.pl/'+respon.id, {
                                                method: 'PUT',
                                                headers: {
                                                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                                                },
                                                body: new URLSearchParams({ 
                                                    "returnUrl":returnUrl,
                                                    "negativeReturnUrl":negativeReturnUrl,
                                                    "sign":sign2
                                                })
                                                
                                            })
                                        }).then(()=>{
                                            Server.findOneAndUpdate({server:serss},{ $push: { puhHist: { 
                                                id:PuhId,
                                                nick:steamlogin.displayName,
                                                avatar:steamlogin.photos[2].value,
                                                kwotab:price - ((price/100)*23),
                                                kwotan:price,
                                                item:itemname,
                                                status: 'w trackie realizacji',
                                                date: new Date(),
                                                email: email,
                                                wykonano: false,
                                                ineq:false,
                                                steamhex:steamHex,
                                                addons:addons
                                                }}}, function (err, docs) {
                                                if (err){
                                                    console.log(err)
                                                    return res.json({msg:err,status: false,});
                                                }
                                            });
                                            return res.json({link:redLink,tranId:PuhId})
                                        })
                                    }
                                    
                                }
                            })
                        }else{
                            var redLink;
                            var PuhId;
                            var accbalance;
                            let data = docsB.allItems; 
                            
                            if(tip){
                                price = data[0].itemprice + (data[0].itemprice*0.05);
                            }else{
                                price = data[0].itemprice;
                            }
                
                            itemname = data[0].itemlabel
                            let respon = [];
                            let title = data[0].itemlabel;
                            let amount = {value:price, currencyCode:"PLN"};
                            let description = data[0].itemdesc;
                            let sign = crypto.createHash('sha1').update(title + amount.value + amount.currencyCode + description + "klucz").digest('hex')
                            fetch('https://pay.cashbill.pl/testws/rest/payment/test.pl', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                                },
                                body: new URLSearchParams({ 
                                    "title": title,
                                    "amount.value": amount.value,
                                    "amount.currencyCode":amount.currencyCode,
                                    "description":description,
                                    "sign":sign
                                })
                            })
                            
                            .then(response => response.json())
                            .then((response)=>{respon = response; redLink = respon.redirectUrl;PuhId = respon.id })
                            .then(async ()=>{
                                let returnUrl = "http://localhost:3000/status";
                                let negativeReturnUrl = "http://localhost:3000/status"
                                let sign2 = crypto.createHash('sha1').update(respon.id + returnUrl + negativeReturnUrl + "klucz").digest('hex');
                                await fetch('https://pay.cashbill.pl/testws/rest/payment/test.pl/'+respon.id, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                                    },
                                    body: new URLSearchParams({ 
                                        "returnUrl":returnUrl,
                                        "negativeReturnUrl":negativeReturnUrl,
                                        "sign":sign2
                                    })
                                    
                                })
                            }).then(()=>{
                                Server.findOneAndUpdate({server:serss},{ $push: { puhHist: { 
                                    id:PuhId,
                                    nick:steamlogin.displayName,
                                    avatar:steamlogin.photos[2].value,
                                    kwotab:price - ((price/100)*27),
                                    kwotan:price,
                                    item:itemname,
                                    status: 'w trackie realizacji',
                                    date: new Date(),
                                    email: email,
                                    wykonano: false,
                                    ineq:false,
                                    steamhex:steamHex,
                                    addons:addons
                                    }}}, function (err, docs) {
                                    if (err){
                                        console.log(err)
                                        return res.json({msg:err,status: false,});
                                    }
                                });
                                return res.json({link:redLink,tranId:PuhId})
                            })
                        }
                        
        
                    }
                })
            })
        }else{
            return res.redirect('http://test.pl')
        }
    }catch(ex){
        next(ex);
    }  
})

app.use("/status",async function (req,res,next) { 
    try{
        let puhId = req.body.puhid
        if(puhId && req.body.server ){
            Server.findOne({server:req.body.server},{puhHist: {$elemMatch:{id: puhId}}} ,function (err, docs) {
                if (err){
                    console.log(err)
                    return res.json({msg:err,status: false});
                }else{
                    
                    if(docs.puhHist[0].wykonano == true){
                        return res.json({msg:'Ta transakcja została już zakończona',status: false});
                    }else{
                        let sign = crypto.createHash('sha1').update(puhId + "klucz").digest('hex')
                        fetch(`https://pay.cashbill.pl/testws/rest/payment/test.pl/${puhId}?sign=${sign}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        }
                    })
                    .then(response => response.json())
                    .then((response)=>{
                        if(response.status == 'PositiveFinish'){
                       
                            Server.findOneAndUpdate({server:req.body.server, puhHist:{$elemMatch: {id: puhId}}},{$set: {"puhHist.$.wykonano":true,"puhHist.$.status":'zrealizowano'}},function (err,docss) {
                                if (err){
                                    console.log(err)
                                    return res.json({msg:err,status: false,});
                                }else{
                                    Server.findOne({server:req.body.server},function (err,docsasdasdasdasds) {
                                        if (err){
                                            console.log(err)
                                            return res.json({msg:err,status: false,});
                                        }else{ 
                                            var elsso = docsasdasdasdasds.accbal + docs.puhHist[0].kwotab
                                            
                                            Server.findOneAndUpdate({server:req.body.server},{$set:{accbal:elsso}},function (err,docsg) {
                                                if (err){
                                                    console.log(err)
                                                    return res.json({msg:err,status: false,});
                                                }else{
                                                    
                                                }
                                            })
                                            
                                        }
                                    })
                                }
                            })
                            serverscfg[req.body.server].money += docs.puhHist[0].kwotab
                            return res.json({data:response.status,status: true});
                        }else{
                            return res.json({data:response.status,status: true});
                        }
                        
                    })
                    }
                }
            })
        }else{
            return res.redirect('http://test.pl')
        }
    }catch(ex){
        next(ex)
    }
})

date = new Date().toLocaleDateString()
var dayInMilliseconds = 5000 * 60;
setInterval(function(){ 
    if(date != new Date().toLocaleDateString()){
        for(i in serverscfg){
            Server.findOneAndUpdate({server:i},{ $push: { moneyHist: { date:new Date().toLocaleDateString(), price:serverscfg[i].money }} }, function (err, docs) {
                if (err){
                    console.log(err)
                }

            });
            serverscfg[i].money = 0
        }
        date = new Date().toLocaleDateString()
    }
},dayInMilliseconds );

//email send


app.use('/api/auth/emailsend',async function(req,res,next){
    const data = req.body
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'smail.lcore@gmail.com',
          pass: 'miiyucjhliybrbhv'
        }
    });
      
    var mailOptions = {
        from: data.email,
        to: 'biuro.lcore@gmail.com',
        subject: data.subject,
        text: `
        ${data.message}
        ===========================================
        imie: ${data.name}
        nazwisko: ${data.sname}
        numer: ${data.number}
        email: ${data.email}
        firma: ${data.company}
        `
    };
      
    transporter.sendMail(mailOptions, await function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });

      
    
})

app.use('/',function(req,res,next){
    res.redirect('http://test.pl');
})
console.log(new Date())