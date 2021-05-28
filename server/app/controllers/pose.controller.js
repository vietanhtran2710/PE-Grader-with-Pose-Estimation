const db = require("../models");
const Pose = db.pose;

exports.create = async (req, res) => {
    // Validate request
    if (!req.body.imageURI || !req.body.poseFileURI) {
        res.status(400).send({
            message: "A content properties cannot by empty"
        })
    }

    // Create a class
    const pose = {
        imageURI: req.body.imageURI,
        poseFileURI: req.body.poseFileURI
    }

    // Save a class in the database
    Pose.create(pose)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the pose."
            })
        })
};

exports.findAll = async (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Pose.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving poses."
            });
        });
};

exports.deleteOne = async (req, res) => {
    const id = req.params.id;

    Pose.destroy({
        where: { poseID: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Pose was deleted successfully!"
            });
        } 
        else {
            res.send({
                message: `Cannot delete pose with id = ${id}. Maybe pose was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete pose with id = " + id + ", " + err
        });
    });
};

exports.deleteAll = async (req, res) => {
    Pose.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} poses were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing all poses."
        });
    });
};

exports.edit = async (req, res) => {
    const id = req.params.id;

    Pose.update(req.body, {
        where: { PoseID: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Poses was updated successfully."
            });
        } 
        else {
            res.send({
                message: `Cannot update pose with id = ${id}. Maybe pose was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating pose with id = " + id
        });
    });
};