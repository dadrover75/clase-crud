// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');


// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// ************ Multer ****************
const date = Date.now();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/products/');
    },
    filename: function (req, file, cb) {
        cb(null, date +"_"+file.originalname);
    }
});
const upload = multer({ storage: storage });

// *************** ROUTES *****************	

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/create', upload.single('image') ,productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id',productsController.edit); 
router.put('/edit/:id', upload.single('image'), productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
