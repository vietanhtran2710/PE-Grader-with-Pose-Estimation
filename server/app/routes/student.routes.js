module.exports = app => {

    const student = require("../controllers/student.controller.js");
  
    var router = require("express").Router();
  
    // Create a new student
    router.post("/", student.create);
    
    // Retrieve all students
    router.get("/", student.findAll);

    // Retrieve all student in a class
    router.get("/class/:id", student.findByClass);

    // Retrieve a student
    router.get("/:id", student.findOne);
  
    // Delete a student by id
    router.delete("/:id", student.deleteOne);

    // Delete all students in a class
    router.delete("/class/:id", student.deleteByClass);
  
    // Delete all students
    router.delete("/", student.deleteAll)
  
    // Update/Edit a student by id
    router.put("/:id", student.edit);
  
    app.use('/api/student', router);
  };
  