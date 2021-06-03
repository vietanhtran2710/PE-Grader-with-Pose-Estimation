const db = require("../models");
const Teacher = db.teacher;

exports.create = async (req, res) => {
    // Validate request
    if (!req.body.fullName || !req.body.email || !req.body.phoneNumber || !req.body.dateOfBirth || !req.body.username) {
        res.status(400).send({
            message: "A content properties cannot be empty"
        })
    }

    // Create a class
    const teacher = {
        accountUsername: req.body.username,
        fullName: req.body.fullName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        dateOfBirth: req.body.dateOfBirth,
    }

    // Save a class in the database
    Teacher.create(teacher)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the teacher."
            })
        })
}

exports.findAll = async (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Teacher.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving teachers."
            });
        });
}   

exports.findOne = async (req, res) => {
    const id = req.params.id;

    Teacher.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving teacher with id = " + id + ", " + err
            });
        });
}

exports.findByUsername = async (req, res) => {
    const username = req.params.username;

    Teacher.findOne({
        where: { accountUsername: username}
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving teacher with username = " + username + ", " + err
            });
        });
}

exports.deleteOne = async (req, res) => {
    const id = req.params.id;

    Teacher.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Teacher was deleted successfully!"
            });
        } 
        else {
            res.send({
                message: `Cannot delete teacher with id = ${id}. Maybe teacher was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete teacher with id = " + id + ", " + err
        });
    });
}

exports.deleteAll = async (req, res) => {
    Teacher.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} teachers were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing all teachers."
        });
    });
}

exports.edit = async (req, res) => {
    const id = req.params.id;

    Teacher.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Teacher was updated successfully."
            });
        } 
        else {
            res.send({
                message: `Cannot update teacher with id = ${id}. Maybe teacher was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating teacher with id = " + id
        });
    });
}