'use strict';


/**
 * Create a product
 * Creates a new product
 *
 * body Product Create a new Product
 * returns Product
 **/
exports.createProduct = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "price" : 0.8008281904610115,
  "id" : "id",
  "type" : "type",
  "version" : "version"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * List all products
 * Returns all products
 *
 * returns List
 **/
exports.getAllProducts = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "price" : 0.8008281904610115,
  "id" : "id",
  "type" : "type",
  "version" : "version"
}, {
  "price" : 0.8008281904610115,
  "id" : "id",
  "type" : "type",
  "version" : "version"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Find product by ID
 * Returns a single product
 *
 * id String ID of product to get
 * returns Product
 **/
exports.getProductByID = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "price" : 0.8008281904610115,
  "id" : "id",
  "type" : "type",
  "version" : "version"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

