console.log("starting");
const mongoose = require('mongoose');
console.log("mongoose");
const express = require('express');
console.log("express");
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jst = require('jsonwebtoken');
const User = require('./models/User');
const Place = require('./models/Place');
const Bookings = require('./models/Bookings');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader'); 
const multer = require('multer');
const fs = require('fs');
console.log("imported all");

require('dotenv').config()
const app = express();
console.log("started server");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'adfas-dfasdfsdfa-asdf';

app.use(express.json());
app.use(cookieParser());
app.use('/Uploads', express.static(__dirname + '/Uploads'));
console.log("started..+.", __dirname);

app.use(cors({
    credentials: true,
    origin: 'https://virbnb.vercel.app',
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('Workinggg');
});
 
app.post('/register', async (req,res) => {
    const {name,email,password} = req.body;  

    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch (e) { 
        res.status(422).json(e);
    } 
});

app.post('/login', async (req, res) => {
    const {email,password} = req.body;
    const userDoc = await User.findOne({email}); 
    if (userDoc) {
        const passOK = bcrypt.compareSync(password, userDoc.password);
        if (passOK) {
            jst.sign({
                email: userDoc.email, 
                id: userDoc._id,
            }, jwtSecret, {}, (err,token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc); 
            });
        } else {
            res.status(422).json("Wrong password"); 
        }
    } else { 
        res.status(422).json('not found');   
    }
})

app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    if (token) {
        jst.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const {name,email,_id} = await User.findById(userData.id);
            res.json({name,email,_id}); 
        })
    } else {
        res.json(null);
    } 
})

app.post('/logout', (req,res) => {
    res.cookie('token', '').json(true);
});

app.post('/upload-by-link', async (req,res) => {
    // const {link} = req.body;
    // const newName = 'photo' + Date.now() + '.jpeg';
    // await imageDownloader.image({
    //     url: link,
    //     dest: __dirname + '/Uploads/' + newName,
    // })
    res.json("not ok");
})


// // const photosMiddleware = multer({dest:'Uploads/'});
// app.post('/upload',photosMiddleware.array('photos', 100), (req,res) => {
//     const uploadedFiles = [];
//     for (let i = 0; i < req.files.length; i++) {
//         const {path, originalname} = req.files[i];
//         const parts = originalname.split('.');
//         const ext = parts[parts.length - 1]; 
//         const newPath = path + '.' + ext;
//         // fs.renameSync(path, newPath);
//         // uploadedFiles.push(newPath.replace("Uploads\\", ''));
//     }
//     res.json(uploadedFiles);
// });

app.post('/places', (req,res) => {
    const {token} = req.cookies;
    const {
        title, address, addedPhotos, 
        description, perks, extraInfo, 
        checkIn, checkOut, maxGuests, price,
    } = req.body;
    jst.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner:userData.id,
            title, address, photos: addedPhotos, 
            description, perks, extraInfo, 
            checkIn, checkOut, maxGuests, price,
        });
        res.json(placeDoc);
    })
});

app.get('/user-places', (req, res) => {
    const {token} = req.cookies;
    jst.verify(token, jwtSecret, {}, async (err, userData) => {
        const {id} = userData;
        res.json( await Place.find({owner:id}) )
    });
});

app.get('/places/:id', async (req,res) => {
    const {id} = req.params; 
    res.json(await Place.findById(id))
})

app.put('/places', async (req, res) => {
    const {token} = req.cookies;
    const {
        id,
        title, address, addedPhotos, 
        description, perks, extraInfo, 
        checkIn, checkOut, maxGuests, price
    } = req.body;
    jst.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: addedPhotos, 
                description, perks, extraInfo, 
                checkIn, checkOut, maxGuests, price
            });
            placeDoc.save();
            res.json('ok');
        }
    });
});

app.get('/places', async (req, res) => {
    res.json( await Place.find() );
});

app.get('/findowner/:owner', async (req, res) => {
    const { owner } = req.params;
    res.json(await User.findById(owner));
});

app.post('/reserve', async (req, res) => {
    const {
        placeId, userId, checkIn, checkOut, nights,
        guests, title, photo, refundable, total
    } = req.body;

    try {
        const booking = await Bookings.create({
            placeId, userId, checkIn, checkOut, nights, 
            guests, title, photo, refundable, total
        });
        res.json(booking);
    } catch (e) {
        res.status(422).json(e);
    }
});

app.get('/bookings', (req, res) => {
    const {token} = req.cookies;
    jst.verify(token, jwtSecret, {}, async (err, userData) => {
        const {id} = userData;
        res.json( await Bookings.find({userId: id}));
    });
});

app.get('/bookings/:id', async (req, res) => {
    const {id} = req.params; 
    res.json(await Bookings.findById(id));
})

app.get('/cancel/:id', async (req, res) => {
    const {id} = req.params;
    await Bookings.findByIdAndDelete(id);
    res.json('ok');
});

app.listen(4000);