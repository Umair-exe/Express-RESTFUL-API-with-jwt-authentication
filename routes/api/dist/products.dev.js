"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../../models/product'),
    Product = _require.Product;

var validateProduct = require('../../middlewares/validateProduct');

var auth = require('../../middlewares/auth');
/* GET all products. */


router.get('/', auth, function _callee(req, res, next) {
  var page, perPage, skipRecords, products;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(req.user);
          page = Number(req.query.page ? req.query.page : 1);
          perPage = Number(req.query.perPage ? req.query.perPage : 10);
          skipRecords = perPage * (page - 1);
          _context.next = 6;
          return regeneratorRuntime.awrap(Product.find().skip(skipRecords).limit(perPage));

        case 6:
          products = _context.sent;
          return _context.abrupt("return", res.send(products));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}); //Get single product

router.get('/:id', function _callee2(req, res, next) {
  var product;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Product.findById(req.params.id));

        case 3:
          product = _context2.sent;

          if (product) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", res.status(400).send('Product Not found'));

        case 8:
          return _context2.abrupt("return", res.send(product));

        case 9:
          _context2.next = 14;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(400).send("invalid id"));

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
router.put('/:id', validateProduct, function _callee3(req, res) {
  var product;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Product.findById(req.params.id));

        case 2:
          product = _context3.sent;

          if (product) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(400).send("ID NOT FOUND!"));

        case 7:
          product.name = req.body.name;
          product.price = req.body.price;
          _context3.next = 11;
          return regeneratorRuntime.awrap(product.save());

        case 11:
          return _context3.abrupt("return", res.send({
            "message": "Product Updated",
            "data": product
          }));

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router["delete"]('/:id', function _callee4(req, res) {
  var product;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Product.findByIdAndDelete(req.params.id));

        case 3:
          product = _context4.sent;

          if (product) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", res.status(400).send("PRODUCT NOT DELETED!"));

        case 8:
          return _context4.abrupt("return", res.status(200).send({
            "message": "PRODUCT DELETED"
          }));

        case 9:
          _context4.next = 14;
          break;

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", res.status(400).send("INVALID ID"));

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
router.post('/', validateProduct, function _callee5(req, res) {
  var product;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(new Product());

        case 2:
          product = _context5.sent;

          /*  if(req.body.name === "") return res.status(400).send("NAME CANNOT BE NOT NULL!");
            if(req.body.price === null)  return res.status(400).send("PRICE CANNOT BE NULL!");*/
          product.name = req.body.name;
          product.price = req.body.price;
          _context5.next = 7;
          return regeneratorRuntime.awrap(product.save());

        case 7:
          return _context5.abrupt("return", res.status(200).send({
            "message": "Product created",
            "data": product
          }));

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  });
});
module.exports = router;