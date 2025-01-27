const express = require('express');
const Router = express.Router();
const CreateUser = require('../Auth/User/User_Create');
const handleUserLogin = require('../Auth/User/User_login');
const { AddProduct, upload } = require('../Controller/PostApi/AddProduct'); 
const getProduct = require('../Controller/GetApi/GetAllProduct');
const searchProductById = require('../Controller/GetApi/GetProductById');
const addCartItem = require('../Controller/PostApi/CartItemAdd');
const getCartItem = require('../Controller/GetApi/GetCartItem');
const getCartQuantity = require('../Controller/GetApi/GetCartQuantity');
const removeCartItem = require('../Controller/DeleteApi/RemoveItem');
const getCategory = require('../Controller/GetApi/GetCategory');
const productOrder = require('../Controller/PostApi/ProductOrder');
const menItem = require('../Controller/GetApi/GetMenItem');
const womenItem = require('../Controller/GetApi/GetWomenItem');
const kidsItem = require('../Controller/GetApi/GetKidsItem');
const electronicItem = require('../Controller/GetApi/GetElectronicItem');
const updateCartItemPlus = require('../Controller/UpdateApi/UpdateCartItem');
const updateCartminus = require('../Controller/UpdateApi/UpdateCartItemMinus');
const getuser = require('../Controller/GetApi/GetUsers');
const verify = require('../Middleware/Verify.js');
const toggleList = require('../Controller/PostApi/ToggleWatch.js');
const totalWatchItem = require('../Controller/GetApi/Gettotalwatch.js');
const getwatchlist = require('../Controller/GetApi/GetWatchlist.js');
const removeWishList = require('../Controller/DeleteApi/RemoveWish.js');
const getOrderItem = require('../Controller/GetApi/GetOrder.js');
const getEightProduct = require('../Controller/GetApi/GetEightPrduct.js');

//#region POST APIs For E-Commerce
Router.post('/create-user', CreateUser); 
Router.post('/user-login', handleUserLogin); 
Router.post('/add-product', upload.single('mainImage'), upload.array('images'), AddProduct);
Router.post('/add-to-cart', addCartItem);
Router.post('/remove-item', removeCartItem);
Router.post('/add-order', productOrder);
Router.post('/get-user', getuser);
Router.post('/toggle-watchlist', toggleList);
Router.post('/remove-item-watch', removeWishList);
//#endregion

//#region GET APIs For E-Commerce
Router.get('/get-allproduct', getProduct);
Router.get('/products/:id', searchProductById);
Router.get('/get-cartitem', getCartItem);
Router.get('/get-cart-quantity', getCartQuantity);
Router.get('/get-category', getCategory);
Router.get('/get-menitem', menItem);
Router.get('/get-womenitem', womenItem);
Router.get('/get-kidsitem', kidsItem);
Router.get('/get-electronicitem', electronicItem);
Router.get('/get-total-watch', totalWatchItem);
Router.get('/get-watch-item', getwatchlist);
Router.get('/get-order-item', getOrderItem);
Router.get('/get-eight-item', getEightProduct);
//#endregion

//#region Update Item For E-Commerce 
Router.put('/update-item-plus', updateCartItemPlus);
Router.put('/update-item-minus', updateCartminus);
//#endregion


module.exports = Router;
