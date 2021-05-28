module.exports = app => {

    const post = require("../controllers/post.controller.js");
  
    var router = require("express").Router();
  
    // Create a new post
    router.post("/", post.create);
    
    // Retrieve all posts
    router.get("/", post.findAll);

    // Retrieve all posts in a class
    router.get("/class/:id", post.findByClass);

    // Retrieve all posts by a teacher
    router.get("/teacher/:id", post.findByTeacher);
  
    // Delete a post by id
    router.delete("/:id", post.deleteOne);

    // Delete all post in a class
    router.delete("/class/:id", post.deleteByClass);

    // Delete all post in a class
    router.delete("/teacher/:id", post.deleteByTeacher);
  
    // Delete all posts
    router.delete("/", post.deleteAll)
  
    // Update/Edit a post by ID
    router.put("/:id", post.edit);
  
    app.use('/api/post', router);
  };
  