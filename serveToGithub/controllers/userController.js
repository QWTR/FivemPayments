const User = require("../model/userModel");
const Server = require("../model/serverModel");
const brcypt = require("bcrypt");
const fs = require('fs');
module.exports.login = async (req,res,next)=>{
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username})
        
        if(!user)
            return res.json({msg:"Incorrect username or password", status:false});
        const isPasswordValid = await brcypt.compare(password, user.password);
        if(!isPasswordValid)
            return res.json({msg:"Incorrect username or password", status:false}); 
        delete user.password
      
        return res.json({status: true, user});
    }catch(ex){
        next(ex);
    }
};
module.exports.server = async (req,res,next)=>{
    try{
   

    }catch(ex){
        next(ex);
    }
    
}
module.exports.getUseraAllserver = async (req,res,next)=>{
    try{
        const servers = await Server.find({}).select([
            "server",
            "_id",
            "logo"
        ]);
        
        return res.json({servers: servers,status:true});
    }catch(ex){
        next(ex)
    }  
};
module.exports.getservers = async (req,res,next)=>{
    try{
        const servers = await Server.find({}).select([
            "server",
            "logo",
            "_id",
            "owner",
            "moneyHist",
            "puhHist",
            "LogHist"
          ]);
        return res.json({servers: servers,status:true});
    }catch(ex){
        next(ex)
    }  
};
module.exports.getuserserver = async (req,res,next)=>{
    try{
        
        const data = req.params.id;
     
        const user = await User.findById(data).select(["Server"])
        const server = await Server.findOne({server:user.Server}).select([
            "logo",
            "LogHist",
            "allItems",
            "puhHist",
            "moneyHist",
            "server",
            "discord",
            "socials",
            "owner",
            "lastWidth",
            "accbal",
            "feecode",
            "itemscategory",
            "zestawy",
            "serverStyle"
        ]);
    
        return res.json({server: server,status:true});
    }catch(ex){
        next(ex)
    }  
};
module.exports.register = async (req,res,next)=>{
    try{
        const {owner, password, servername,logo} = req.body;
        const usernameCheck = await User.findOne({username:owner})
        if(usernameCheck){
            return res.json({msg:"Uzytkownik zajety", status:false});
        }
        const serverCheck = await Server.findOne({server:servername})
        if(serverCheck)
            return res.json({msg:"Server zajęty", status:false});
        const hashedPassword = await brcypt.hash(password ,10);
        const user = await User.create({
            username:owner,
            password:hashedPassword,
            Server:servername,
            logo:logo
        });
        const server = await Server.create({
            server:servername,
            logo:logo,
            owner:owner
        });
        delete user.password;
        return res.json({msg:"dzioło",status: true,});
    }catch(ex){
        next(ex);
    }
};
module.exports.addcategory = async (req,res,next)=>{
   
    Server.findOneAndUpdate({server:req.body.serv},{ $push: { itemscategory: { category:req.body.category, remov:true }}}, function (err, docs) {
        if (err){
            console.log(err)
            return res.json({msg:err,status: false,});
        }
    });
    return res.json({msg:"Dodałeś Kategorie Odśwież strone aby ją zobaczyć!",status: true,});
};
module.exports.removecategory = async (req,res,next)=>{
 
    Server.findOneAndUpdate({server:req.body.serv},{ $pull: { itemscategory:{ category:req.body.cat }}}, function (err, docs) {
        if (err){
            console.log(err)
            return res.json({msg:err,status: false,});
        }
    });
    return res.json({msg:"Usunołeś Kategorie Zaaktualizuj Przedmioty!!!",status: true,});
};
module.exports.getserverinfoez = async (req,res,next)=>{
    const server = await Server.findOne({server:req.body.servera}).select([
        "logo",
        "allItems",
        "puhHist",
        "discord",
        "socials",
        "server",
        "itemscategory",
        "zestawy",
        "serverStyle",
        "Addons"
    ])
    return res.json({
        server:server
    })
};
module.exports.getserverinfoid = async (req,res,next)=>{
    const server = await Server.findOne({id:req.body.servera}).select([
        "logo",
        "allItems",
        "puhHist",
        "server",
        "itemscategory",
        "zestawy",
        "serverStyle"
    ])
    return res.json({
        server:server
    })
};
module.exports.addnetitemtoshop = async (req,res,next)=>{ 
    try{
        let values = req.body.value
        let cena = parseFloat(values.cena)
        Server.findOneAndUpdate({server:req.body.sname},{ $push: { allItems: { 
            itemid:values.itemid,
            itemcategory: values.category,
            itemname: values.name,
            itemlabel: values.label,
            itemdesc: values.opis,
            itemprice: cena,
            itemImg: values.link
        }}},function(err,docs){
            if (err){
                console.log(err)
                return res.json({msg:err, status: false,});
            }else{ 
                return res.json({msg:'Dodano pomyślnie nowy przedmiot', status:true})
            }
        })
    }catch(ex){
        next(ex)
    }
};
module.exports.edititemfromshop = async (req,res,next)=>{ 
    try{
        let values = req.body.value
        Server.findOneAndUpdate({server:req.body.sname},{ $pull: { allItems:{ itemid: values.oldName }}},function (err,docss) {
            if (err){
                console.log(err)
                return res.json({msg:err, status: false,});
            }else{
               
                if(req.body.remove == false){
                    let cena = parseFloat(values.cena)
                    if(values.itemid !== undefined){
                        Server.findOneAndUpdate({server:req.body.sname},{ $push: { allItems: { 
                            itemid: values.itemid,
                            itemcategory: values.category,
                            itemname: values.name,
                            itemlabel: values.label,
                            itemdesc: values.opis,
                            itemprice: cena,
                            itemImg: values.link
                        }}},function(err,docs){
                            if (err){
                                console.log(err)
                                return res.json({msg:err, status: false,});
                            }else{ 
                                return res.json({msg:'Zaaktualizowano przedmiot', status:true})
                            } 
                        })
                    }else{
                        Server.findOneAndUpdate({server:req.body.sname},{ $push: { allItems: { 
                            itemid: values.oldName,
                            itemcategory: values.category,
                            itemname: values.name,
                            itemlabel: values.label,
                            itemdesc: values.opis,
                            itemprice: cena,
                            itemImg: values.link
                        }}},function(err,docs){
                            if (err){
                                console.log(err)
                                return res.json({msg:err, status: false,});
                            }else{ 
                                return res.json({msg:'Zaaktualizowano przedmiot', status:true})
                            }
                        })
                    }
                }else{
                    return res.json({msg:'Usunięto Przedmiot', status:true})
                }
            }
        })
    }catch(ex){
    next(ex)
    }
};
module.exports.addnewzestawtoshop = async (req,res,next)=>{
   try{
    let values = req.body.value
    let cena = parseFloat(values.cena)
    Server.findOneAndUpdate({server:req.body.sname},{ $push: { zestawy: { 
        zestawid:values.itemid,
        zestawtTitle: values.label,
        zestawDesc: values.opis,
        zestawOldPrice: parseFloat(values.cenaold),
        zestawPrice: cena,
        zestawImg: values.link
     }}},function(err,docs){
        if (err){
            console.log(err)
            return res.json({msg:err, status: false,});
        }else{ 
     
            return res.json({msg:'Dodano pomyślnie nowy zestaw', status:true})
        }
    })
   }catch(ex){
    next(ex)
   }
};
module.exports.editzestawfromshop = async (req,res,next)=>{ 
    try{
        let values = req.body.value
        Server.findOneAndUpdate({server:req.body.sname},{ $pull: { zestawy:{ zestawid: values.oldName }}},function (err,docss) {
            if (err){
                console.log(err)
                return res.json({msg:err, status: false,});
            }else{
               
                if(req.body.remove == false){
                    let cena = parseFloat(values.cena)
                    if(values.itemid !== undefined){
                        Server.findOneAndUpdate({server:req.body.sname},{ $push: { zestawy: { 
                            zestawid: values.itemid,
                            zestawtTitle: values.label,
                            zestawDesc: values.opis,
                            zestawOldPrice: values.cenaold,
                            zestawPrice: values.cena,
                            zestawImg: values.link,
                        }}},function(err,docs){
                            if (err){
                                console.log(err)
                                return res.json({msg:err, status: false,});
                            }else{ 
                                return res.json({msg:'Zaaktualizowano zestaw', status:true})
                            } 
                        })
                    }else{
                        Server.findOneAndUpdate({server:req.body.sname},{ $push: { zestawy: { 
                            zestawid: values.oldName,
                            zestawtTitle: values.label,
                            zestawDesc: values.opis,
                            zestawOldPrice: values.cenaold,
                            zestawPrice: values.cena,
                            zestawImg: values.link,
                        }}},function(err,docs){
                            if (err){
                                console.log(err)
                                return res.json({msg:err, status: false,});
                            }else{ 
                                return res.json({msg:'Zaaktualizowano zestaw', status:true})
                            }
                        })
                    }
                }else{
                    return res.json({msg:'Usunięto zestaw', status:true})
                }
            }
        })
    }catch(ex){
    next(ex)
    }
};
module.exports.addnewfcodetoshop = async (req,res,next)=>{
    try{
        let values = req.body.value
        Server.findOneAndUpdate({server:req.body.sname},{ $push: { feecode: { 
            code: values.code,
            ussages: parseInt(values.ussages),
            setuse: parseInt(values.ussages),
            pro: parseInt(values.pro)
         }}},function(err,docs){
            if (err){
                console.log(err)
                return res.json({msg:err, status: false,});
            }else{ 
                
                return res.json({msg:'Dodano pomyślnie kod promocyjny', status:true})
            }
        })
       }catch(ex){
        next(ex)
       }
};
module.exports.removefcodefromshop = async (req,res,next)=>{
    try{
       
        Server.findOneAndUpdate({server:req.body.sname},{ $pull: { feecode:{ code: req.body.code }}},function (err,docs) {
            if (err){
                console.log(err)
                return res.json({msg:err, status: false,});
            }else{
                return res.json({msg:'Dodano usunięto kod promocyjny', status:true})
            }
        })
    }catch(ex){
        next(ex)
    }
};
module.exports.addcategory = async (req,res,next)=>{
   
    Server.findOneAndUpdate({server:req.body.serv},{ $push: { socials: { name:req.body.name, icon:req.body.icon, link:req.body.link }}}, function (err, docs) {
        if (err){
            console.log(err)
            return res.json({msg:err,status: false,});
        }
    });
    return res.json({msg:"Dodałeś Kategorie Odśwież strone aby ją zobaczyć!",status: true,});
};
module.exports.removeMedia = async (req,res,next)=>{
 
    Server.findOneAndUpdate({server:req.body.serv},{ $pull: { socials:{ name:req.body.media }}}, function (err, docs) {
        if (err){
            console.log(err)
            return res.json({msg:err,status: false,});
        }
    });
    return res.json({msg:"Usunołeś Social Media Zaaktualizuj Przedmioty!!!",status: true,});
};