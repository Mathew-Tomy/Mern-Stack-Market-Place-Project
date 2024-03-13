const { Router } = require('express');
const router = Router();
const { cloudinary } = require('../config/cloudinary');
const isAuth = require('../middlewares/isAuth')
const Category= require('../models/Categories');
const Product = require('../models/Product');
const User = require('../models/User');
const moment = require('moment');

const categoryService = require('../services/categoryService');




router.post('/create', async (req, res) => {
    let { title } = req.body;
    try {
        let errors = [];
        if (title.length < 3 || title.length > 50) errors.push('Title should be at least 3 characters long and max 50 characters long; ');
       

        if (errors.length >= 1) throw { message: [errors] };

        let category = new Category({
            title
           
        })

        await category.save()
        
        res.status(201).json({ categoryId: category._id });
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: err.message })
    }
});

router.patch('/edit/:id', isAuth, async (req, res) => {
    //TODO: Rewrite this 
    let { title } = req.body;
    try {
      
        if (title.length < 3 || title.length > 50) errors.push('Title should be at least 3 characters long and max 50 characters long; ');
         else {
            await categoryService.edit(req.params.id, { title });
        }
        res.status(201).json({ message: 'Updated!' });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
})

// Controller function to fetch all categories

router.get('/get', async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

//   router.get('/specific-category/:category', async (req, res) => {
//     try {
//         const product = await Product.find({ category: req.params.category })
//         // const product = await Product.findOne({ category: req.params.category});
//         // If no product is found, return a 404 response
//         if (!product) {
//             return res.status(404).json({ error: 'Product not found' });
//         }
//         // If a product is found, return it as JSON
//         res.json(product);
//         let seller = await (await User.findById(product.seller)).toJSON()
//         product.addedAt = moment(product.addedAt).format('d MMM YYYY (dddd) HH:mm')
//         let jsonRes = {
//             ...product,
//             name: seller.name,
//             phoneNumber: seller.phoneNumber,
//             email: seller.email,
//             createdSells: seller.createdSells.length,
//             avatar: seller.avatar,
//             sellerId: seller._id,
//             isAuth: false
//         }
//         if (req.user) {
//             let user = await User.findById(req.user._id)
//             jsonRes.isSeller = Boolean(req.user._id == product.seller);
//             jsonRes.isWished = user.wishedProducts.includes(req.params.id)
//             jsonRes.isAuth = true
//         }
//         res.status(200).json(jsonRes);
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// });
// router.get('/specific-category/:category', async (req, res) => {
//     try {
//       const product = await Product.find({ category: req.params.category })
//         .populate('seller', 'name phoneNumber email avatar createdSells'); // Populate seller data
  
//       if (!product) {
//         return res.status(404).json({ error: 'Product not found' });
//       }
  
//       product.addedAt = moment(product.addedAt).format('d MMM YYYY (dddd) HH:mm');
  
//       let jsonRes = {
//         ...product.toObject(), // Convert Mongoose document to plain object with toObject()
//         isAuth: false
//       };
  
//       if (req.user) {
//         try {
//           const user = await User.findById(req.user._id);
//           jsonRes.isSeller = Boolean(req.user._id.toString() === product.seller._id.toString()); // Safer comparison
//           jsonRes.isWished = user.wishedProducts.includes(product._id);
//           jsonRes.isAuth = true;
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//           // Handle potential user data fetch error (optional: log or provide a generic message)
//         }
//       }
  
//       res.status(200).json(jsonRes);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });
  
router.get('/categoryfilter', async (req, res) => {
    const { page, search, limit } = req.query;
    try {
        let products;
        if (search !== '' && search !== undefined) {
            // Check if the search term contains special characters
            const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(search);
            if (!hasSpecialChars) {
                // Perform case-insensitive search for products whose titles start with the search term
                products = await Product.find({ active: true, category: { $regex: new RegExp('^' + search, 'i') } });
            } else {
                // Perform text search functionality for multi-word search terms
                products = await Product.find({ active: true, $text: { $search: `"${search}"` } });
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