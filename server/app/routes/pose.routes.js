module.exports = app => {

  const pose = require("../controllers/pose.controller.js");

  var router = require("express").Router();

  // Create a new pose
  router.post("/", pose.create);
  
  // Retrieve all poses
  router.get("/", pose.findAll);

  // Delete a pose by Id
  router.delete("/:id", pose.deleteOne);

  // Delete all poses
  router.delete("/", pose.deleteAll)

  // Update/Edit a poses by id
  router.put("/:id", pose.edit);

  app.use('/api/pose', router);
};
