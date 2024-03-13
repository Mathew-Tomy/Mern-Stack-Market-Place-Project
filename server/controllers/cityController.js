const { Router } = require('express');
const router = Router();
const { cloudinary } = require('../config/cloudinary');
const isAuth = require('../middlewares/isAuth')
const City= require('../models/City');
const Product = require('../models/Product');
const User = require('../models/User');
var multer = require('multer');
var bodyParser = require('body-parser');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
const moment = require('moment');

const cityService = require('../services/cityService');
// Multer configuration for file upload
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(_basedir, "uploads"));
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  

  router.post('/create', async (req, res) => {
    let { name } = req.body;
    try {
        let errors = [];
        if (name.length < 3 || name.length > 50) errors.push('City should be at least 3 characters long and max 50 characters long; ');
       

        if (errors.length >= 1) throw { message: [errors] };

        let city= new City({
            name 
           
        })

        await city.save()
        
        res.status(201).json({ cityId: city._id });
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: err.message })
    }
});


// router.post('/create', upload.single('file'), async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ error: 'No file uploaded' });
//         }

//         const workbook = req.file.buffer;
//         let data;
        
//         // Check file format and parse accordingly
//         if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
//             data = await xlsxtojson(workbook, { sheets: ["Sheet1"] });
//         } else {
//             data = await xlstojson(workbook, { sheets: ["Sheet1"] });
//         }

//         // Process the parsed data and create cities
//         for (const cityData of data) {
//             const { name } = cityData;
//             if (name && name.length >= 3 && name.length <= 50) {
//                 // await City.create({ name });
//                 const city = new City({ name });
//                 await city.save();
//             }
//         }

//         res.status(200).json({ message: 'Cities uploaded successfully' });
//     } catch (err) {
//         console.error('Error uploading cities:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });



router.patch('/edit/:id', isAuth, async (req, res) => {
    //TODO: Rewrite this 
    let { name } = req.body;
    try {
      
        if (name.length < 3 || name.length > 50) errors.push('Title should be at least 3 characters long and max 50 characters long; ');
         else {
            await cityService.edit(req.params.id, { name });
        }
        res.status(201).json({ message: 'Updated!' });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
})

router.get('/get', async (req, res) => {
    try {
      const city = await City.find();
      res.json(city);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/fetchproducts', async (req, res) => {
    const { page, search, limit } = req.query;
    try {
        let products;
        if (search !== '' && search !== undefined) {
            // Check if search term has only one word
            const isSingleWord = /^\w+$/.test(search.trim());
            if (isSingleWord) {
                // Perform case-insensitive search for products whose titles start with the search term
                products = await Product.find({ active: true, city: { $regex: new RegExp('^' + search, 'i') } });
            } else {
                // Perform text search functionality for multi-word search terms
                products = await Product.find({ active: true, $text: { $search: search } });
            }
        } else {
            products = await Product.paginate({ active: true }, { page: parseInt(page) || 1, limit: parseInt(limit) || 5 });
        }
        res.status(200).json({ products: products.docs || products, pages: products.pages });
    } catch (error) {
        console.error(error); // Log detailed error for debugging
        res.status(500).json({ message: "An error occurred. Please try again later." });
    }
});

module.exports = router;