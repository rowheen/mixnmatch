import express from "express";
import bodyParser from "body-parser";
import qr from "qr-image";
import fs from "fs";


const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json()); 
app.use(express.static("public"));

var meal;

app.get("/", (req,res) => {
    const mainId = Math.floor(Math.random() * 6 + 1);
    const sideId = Math.floor(Math.random() * 6 + 1);
    
    switch (mainId) {
        case 1:
            var main = '1PC. BURGER STEAK';
            var posterMain = '/1-pc-Burger-Steak-Solo.png';
            break;
        case 2:
            var main = 'YUMBURGER';
            var posterMain = '/Yumburger-Solo.png';
            break;
        case 3:
            var main = 'JOLLY SPAGHETTI';
            var posterMain = '/Jolly-Spaghetti-Solo.png';
            break;
        case 4:
            var main = 'JOLLY HOTDOG';
            var posterMain = '/Cheesy-Classic-Jolly-Hotdog-Solo.png';
            break;
        case 5:
            var main = 'CHEESY YUMBURGER';
            var posterMain = '/Cheesy-Yumburger-Solo.png';
            break;
        case 6:
            var main = 'CRISPY CHICKEN BURGER';
            var posterMain = '/JBPH-P-SEOUL-THUMBNAIL_SOLO_ORIGINAL_750X750px_FA-min.png';
            break;
        default:
            break;
    }
    switch (sideId) {
        case 1:
            var side = 'SODA FLOAT';
            var posterSide = '/Coke-Float.png';
            break;
        case 2:
            var side = 'PINEAPPLE JUICE';
            var posterSide = '/Pineapple-Juice-Regular.png';
            break;
        case 3:
            var side = 'JOLLY CRISPY FRIES';
            var posterSide = '/Jolly-Crispy-Fries-Regular.png';
            break;
        case 4:
            var side = 'PEACH MANGO PIE';
            var posterSide = '/Peach-Mango-Pie.png';
            break;
        case 5:
            var side = 'CHOCO SUNDAE';
            var posterSide = '/Chocolate-Sundae-Twirl.png';
            break;
        case 6:
            var side = 'ICED LATTE';
            var posterSide = '/iced-latte.png';
            break;
        default:
            break;
    }
    
    meal = {main: main, side: side, posterMain:posterMain, posterSide:posterSide};
    res.render("index.ejs", {meal: meal});

});

app.post("/ticket", (req,res) => {
    const order = {
        main: meal.main,
        side: meal.side,
        
    };
    
    console.log(order);
    var qr_svg = qr.image(JSON.stringify(order));
    qr_svg.pipe(fs.createWriteStream('public/ticket.png'));
    res.render("ticket.ejs")
});


app.listen(port, () => {
    console.log(`server running in port ${port}`);
});