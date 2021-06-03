module.exports = app => {

    const teacher = require("../controllers/teacher.controller.js");
  
    var router = require("express").Router();
  
    // Create a new teacher
    router.post("/", teacher.create);
    
    // Retrieve all teachers
    router.get("/", teacher.findAll);

    // Retrieve a teacher by id
    router.get("/:id", teacher.findOne);

    // Retrieve a teacher by username
    router.get("/username/:username", teacher.findByUsername);
  
    // Delete a teacher by id
    router.delete("/:id", teacher.deleteOne);
  
    // Delete all teachers
    router.delete("/", teacher.deleteAll)
  
    // Update/Edit a teacher by id
    router.put("/:id", teacher.edit);
  
    app.use('/api/teacher', router);
  };
  