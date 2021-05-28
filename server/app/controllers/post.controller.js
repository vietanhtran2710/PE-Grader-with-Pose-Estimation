const db = require("../models");
const Post = db.post;

exports.create = async (req, res) => {
    // Validate request
    if (!req.body.postName || !req.body.content || !req.body.teacherId || !req.body.classId) {
        res.status(400).send({
            message: "A content properties cannot by empty"
        })
    }

    // Create a class
    const post = {
        postName: req.body.postName,
        content: req.body.content,
        teacherId: req.body.teacherId,
        classId: req.body.classId
    }

    // Save a class in the database
    Post.create(post)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the post."
            })
        })
};

exports.findAll = async (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Post.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving posts."
            });
        });
};

exports.findByClass = async (req, res) => {
    const classId = req.params.id;

    Class.findAll({
        where: { classId: classId}
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving posts with classId = " + classId + ", " + err
        });
    });
};

exports.findByTeacher = async (req, res) => {
    const teacherId = req.params.id;

    Class.findAll({
        where: { teacherId: teacherId}
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving posts with teacherId = " + teacherId + ", " + err
        });
    });
};

exports.deleteOne = async (req, res) => {
    const id = req.params.id;

    Class.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Post was deleted successfully!"
            });
        } 
        else {
            res.send({
                message: `Cannot delete post with id = ${id}. Maybe post was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete post with id = " + id + ", " + err
        });
    });
};

exports.deleteByClass = async (req, res) => {
    const classId = req.params.id;

    Post.destroy({
        where: { classId: classId },
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} posts were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing posts."
        });
    });
};

exports.deleteByTeacher = async (req, res) => {
    const teacherId = req.params.id;

    Pose.destroy({
        where: { teacherId: teacherId },
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} posts were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing posts."
        });
    });
};

exports.deleteAll = async (req, res) => {
    Pose.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} posts were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing all posts."
        });
    });
};

exports.edit = async (req, res) => {
    const id = req.params.id;

    Class.update(req.body, {
        where: { postID: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Post was updated successfully."
            });
        } 
        else {
            res.send({
                message: `Cannot update post with id = ${id}. Maybe post was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating post with id = " + id
        });
    });
};