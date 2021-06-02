const db = require("../models");
const Student = db.student;

exports.create = async (req, res) => {
    // Validate request
    if (!req.body.id || !req.body.fullName || !req.body.university || !req.body.email || !req.body.phoneNumber || !req.body.dateOfBirth || !req.body.username) {
        res.status(400).send({
            message: "A content properties cannot by empty"
        })
    }

    // Create a class
    const student = {
        accountUsername: req.body.username,
        id: req.body.id,
        fullName: req.body.fullName,
        university: req.body.university,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        dateOfBirth: req.body.dateOfBirth
    }

    // Save a class in the database
    Student.create(student)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the student."
            })
        })
};

exports.findAll = async (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Student.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving students."
            });
        });
};

exports.findByClass = async (req, res) => {
    const classId = req.params.id;

    Student.findAll({
        where: { classId: classId}
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving students with classId = " + classId + ", " + err
        });
    });
};

exports.findOne = async (req, res) => {
    const id = req.params.id;

    Student.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving student with id = " + id + ", " + err
            });
        });
};

exports.deleteOne = async (req, res) => {
    const id = req.params.id;

    Student.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Student was deleted successfully!"
            });
        } 
        else {
            res.send({
                message: `Cannot delete student with id = ${id}. Maybe student was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete student with id = " + id + ", " + err
        });
    });
};

exports.deleteByClass = async (req, res) => {
    const classId = req.params.id;

    Student.destroy({
        where: { classId: classId },
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} students were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing students."
        });
    });
};

exports.deleteAll = async (req, res) => {
    Student.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} students were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing all students."
        });
    });
};

exports.edit = async (req, res) => {
    const id = req.params.id;

    Student.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Student was updated successfully."
            });
        } 
        else {
            res.send({
                message: `Cannot update student with id = ${id}. Maybe student was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating student with id = " + id
        });
    });
};