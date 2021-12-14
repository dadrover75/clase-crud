const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		res.render(path.join(__dirname, '../views/index.ejs'));
	},
	search: (req, res) => {
		res.render(path.join(__dirname, '../views/results.ejs'));
	},
};

module.exports = controller;
