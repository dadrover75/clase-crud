const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', { products: products })
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const id = req.params.id;
		const product = products.find(product => product.id == id);
		res.render('detail', { product: product });
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},

	// Create -  Method to store
	store: (req, res) => {
		const image = req.file.filename;
		const { name, price, discount, category, description } = req.body;
		const newProduct = {}
		newProduct.id = products[products.length - 1].id + 1;
		newProduct.name = name;
		newProduct.price = toThousand(parseInt(price));
		newProduct.discount = parseInt(discount);
		newProduct.category = category;
		newProduct.description = description;
		newProduct.image = image;


		products.push(newProduct);

		fs.writeFileSync(productsFilePath, JSON.stringify(products));
		res.redirect('/products');
	},

	// Update - Form to edit
	edit: (req, res) => {
		const id = req.params.id;
		const product = products.find(product => product.id == id);
		res.render('product-edit-form', { productToEdit: product });
	},
	// Update - Method to update
	update: (req, res) => {

		 const image = req.file.filename;	
		const id = req.params.id;
		const product = products.find(product => product.id == id);
		const { name, price, discount, category, description } = req.body;

		product.name = name;
		product.price = parseInt(price);
		product.discount = parseInt(discount);
		product.category = category;
		product.description = description;
		product.image = image;

		fs.writeFileSync(productsFilePath, JSON.stringify(products));
		res.redirect('/products');
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {

		const id = req.params.id;
		const product = products.find(product => product.id == id);

		products.splice(products.indexOf(product), 1);

		fs.writeFileSync(productsFilePath, JSON.stringify(products));

		if (fs.existsSync(`public/images/${product.image}`)) {
			fs.unlinkSync(`public/images/${product.image}`);
		}
		res.redirect('/products');
	}
};

module.exports = controller;