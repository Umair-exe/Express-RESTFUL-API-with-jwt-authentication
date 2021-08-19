var express = require('express');
var router = express.Router();
var {Product} = require('../../models/product');
var validateProduct = require('../../middlewares/validateProduct');
const auth = require('../../middlewares/auth');
const admin = require('../../middlewares/admin');


/* GET all products. */
router.get('/',auth, async function (req, res, next) {
  //console.log(req.user);
  let page = Number(req.query.page? req.query.page: 1);
  let perPage = Number(req.query.perPage? req.query.perPage: 10);
  let skipRecords = perPage * (page-1);
  
  let products = await Product.find().skip(skipRecords).limit(perPage);
  return res.send(products);
});
//Get single product
router.get('/:id',auth, async function (req, res, next) {
  try {
  
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).send('Product Not found');
    }
    else {
      return res.send(product);
    }
  } catch (err) {
    return res.status(400).send("invalid id");
  }

});

router.put('/:id',auth,validateProduct, async (req, res) => {

    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).send("ID NOT FOUND!");
    }
    else {
      product.name = req.body.name;
      product.price = req.body.price;
      await product.save();
      return res.send({
        "message":"Product Updated",
        "data": product
      });
    }

})

router.delete('/:id',auth, async (req, res) => {
  try {
    let product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
       return res.status(400).send("PRODUCT NOT DELETED!");
    }
    else {
     return res.status(200).send({
        "message": "PRODUCT DELETED"
      });
    }
  }
  catch (err) {
    return res.status(400).send("INVALID ID");
  }


});

router.post('/',auth,validateProduct, async (req, res) => {


    let product = await new Product();
  /*  if(req.body.name === "") return res.status(400).send("NAME CANNOT BE NOT NULL!");
    if(req.body.price === null)  return res.status(400).send("PRICE CANNOT BE NULL!");*/
    product.name = req.body.name;
    product.price = req.body.price;
    await product.save();
    return res.status(200).send({
      "message": "Product created",
      "data": product
    });
 

  });



module.exports = router;
