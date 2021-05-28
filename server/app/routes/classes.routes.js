module.exports = app => {

  const _class = require("../controllers/classes.controller.js");

  var router = require("express").Router();

  // Create a new class
  router.post("/", _class.create);
  
  // Retrieve all classes
  router.get("/", _class.findAll);

  // Retrieve a class by teacherId
  router.get("/teacher/:id", _class.findByTeacher);

  // Retrieve a class by Id
  router.get("/id/:id", _class.findById);

  // Delete a class by Id
  router.delete("/:id", _class.deleteOne);

  // Delete all classes
  router.delete("/", _class.deleteAll)

  // Update/Edit a class by id
  router.put("/:id", _class.edit);

  app.use('/api/class', router);
};
