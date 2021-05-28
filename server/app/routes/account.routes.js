const multer = require('multer')

module.exports = app => {

  const account = require("../controllers/account.controller.js");
  const auth = require("../controllers/auth.controller.js");

  var router = require("express").Router();

  let upload = multer();

  // Create a new account
  router.post("/", upload.none(), account.create);

  // Login account
  router.post("/login", upload.none(), auth.signIn);
  
  // Retrieve all accounts
  router.get("/", account.findAll);

  // Retrieve an account by username
  router.get("/username/:username", account.findOne);

  // Delete an account by username
  router.delete("/:username", account.deleteOne);

  // Delete all accounts
  router.delete("/", account.deleteAll)

  // Update/Edit an account by username
  router.put("/:username", account.edit);

  app.use('/api/account', router);
};
