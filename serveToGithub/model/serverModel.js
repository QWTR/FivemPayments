const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema({
    server:{
        type: String,
        required: true,
        min: 3,
        max: 50,
    },
    logo:{
        type: String,
        default:"",
    },
    owner:{
        type: String,
        default:"",
    },
    accbal:{
        type: Number,
        default: 0
    },
    discord:{
        type: String,
        default: "https://discord.gg/"
    },
    moneyHist:{
        type: Array,
    },
    puhHist:{
        type: Array,
    },
    Addons:{
        type: Array,
    },
    allItems:{
        type:Array,
    },
    lastWidth:{
        type:Array,
    },
    zestawy:{
        type: Array,
    },
    socials:{
        type: Array,
    },
    itemscategory:{
        type:Array,
        default:{
            "category":"wszystko",
            "remov":false
        }
    },
    serverStyle:{
        type:Array,
        default:{
            "headerMainBg":"#14141F",
            "headerPrzyciskiBg":"#fff",
            "headerPrzyciskiBgHover":"linear-gradient( 132.41deg, #6345ED 18.03%, #DC39FC 81.29%)",
            "headerPrzyciskiFontHover":"#fff",
            "headerPrzyciskiFont":"#000",
            "SwiperKropki":"#DC39FC",
            "iconsColor":"#DC39FC",
            "steamfont":"#fff",
            "S1titleFontColor":"#fff",
            "S1descFontColor":"#fff",
            "S1Bg":"#14161f",
            "S1h3c":"#fff",
            "S1descC":"#ffffffb6",
            "zestawyBg":"#000",
            "ZestawTitle":"#fff",
            "ZestawDesc":"#ffffffb7",
            "ZestawPrzyciskBg":"#fff",
            "ZestawPrzyciskColor":"#000000",
            "ZestawPrzyciskBgHover":"linear-gradient(132.71deg, #6345ED 18.12%, #DC39FC 81.74%)",
            "ZestawPrzyciskColorHover":"#fff",
            "ZestawStaraCena":"#ffffff9c",
            "ZestawShadow":"rgba(100, 69, 237, 0.164)",
            "lcostumersBG":"#030303",
            "S2h3c":"#fff",
            "S2descC":"#ffffffb6",
            "lcostumerBg":"transparent",
            "lcostumerBorder":"rgba(99, 69, 237, 0.1)",
            "lcostumerBgHover":"#2222224b",
            "lcostumerBorderHover":"rgba(100, 69, 237, 0)",
            "S2h6c":"#fff",
            "S2details":"#ffffffb6",
            "lcostumerShadow":"rgba(100, 69, 237, 0.164)",
            "S3bg":"linear-gradient(70deg,#131214,#0c041f 70%)",
            "S3h3c":"#fff",
            "S3descC":"#ffffffb6",
            "catSelectColor":"#fff",
            "catSelecBg":"#000",
            "activehovercolcat":"#DC39FC",
            "itembg":"#191923",
            "itemImgbg":"linear-gradient(132.71deg, #2902d8 18.12%, #9416ad 81.74%)",
            "itemlabelbg":"linear-gradient(124.27deg, #6345ED 15.3%, #DC39FC 69.02%)",
            "itemlabelcolor":"#fff",
            "itemTitle":"#fff",
            "itemDesc":"#ffffffb6",
            "itemPrice":"#fff",
            "itemborder":"#ffffff00",
            "itemborderHover":"#fff",
            "reklamabg":"linear-gradient(132.71deg, #6345ED 18.12%, #DC39FC 81.74%)",
            "reklamaColor":"#f7f7f7",
            "reklamaInputbg":"#fff",
            "reklamaInputColor":"#616161",
            "reklamabuttonBg":"linear-gradient(to left, #6345ED 58.12%, #DC39FC 81.74%)",
            "reklamabuttonIconColor":"#DC39FC",
            "reklamabuttonColor":"#fff",
            "footerbg":"#030303",
            "bottomTborder":"rgba(255, 255, 255, 0.1)",
            "bottomColor":"#FFFFFF99",
            "footerlogoColor":"#fff",
            "footerDescColor":"#FFFFFFCC"
        }
    },
    feecode:{
        type:Array,
    }
})

module.exports = mongoose.model("Server", serverSchema)