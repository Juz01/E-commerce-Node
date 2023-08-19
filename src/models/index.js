const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const Purchase = require("./Purchase");
const User = require("./User");



//Product => categoryId
Product.belongsTo(Category) // categoryId
Category.hasMany(Product)

//Cart - > userId
Cart.belongsTo(User)
User.hasMany(Cart)

//Cart - > productId
Cart.belongsTo(Product)
Product.hasMany(Cart)

//purchase -> productId
Purchase.belongsTo(User)
User.hasMany(Purchase)

//Purchase -> productId
Purchase.belongsTo(Product)
Product.hasMany(Purchase)

