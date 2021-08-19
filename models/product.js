var mongoose = require('mongoose');
var Joi =require('@hapi/joi');

var productSchema = mongoose.Schema({
    name:String,
    price:Number,
});

var Product = mongoose.model("Product",productSchema);

function validateProduct(data) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        price: Joi.number().min(0).required(),
    })
    return schema.validate(data);
}
module.exports.Product = Product;
module,exports.validate = validateProduct;