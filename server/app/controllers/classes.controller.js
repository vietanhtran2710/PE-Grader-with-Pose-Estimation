const db = require("../models");
const Class = db._class;

exports.create = async (req, res) => {
    // Validate request
    if (!req.body.weekDay || !req.body.startTime || !req.body.subject || !req.body.teacherId) {
        res.status(400).send({
            message: "A content properties cannot by empty"
        })
    }

    // Create a class
    const _class = {
        weekDay: req.body.weekDay,
        startTime: req.body.startTime,
        subject: req.body.subject,
        teacherId: req.body.teacherId
    }

    // Save a class in the database
    Class.create(_class)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the class."
            })
        })
};

exports.findAll = async (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Class.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving classes."
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
            message: "Error retrieving class with teacherId = " + teacherId + ", " + err
        });
    });
};

exports.findById = async (req, res) => {
    const id = req.params.id;

    Class.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving class with id = " + id + ", " + err
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
                message: "Class was deleted successfully!"
            });
        } 
        else {
            res.send({
                message: `Cannot delete class with id = ${id}. Maybe class was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete class with id = " + id + ", " + err
        });
    });
}

exports.deleteAll = async (req, res) => {
    Class.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} classes were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing all classes."
        });
    });
}

exports.edit = async (req, res) => {
    const id = req.params.id;

    Class.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Class was updated successfully."
            });
        } 
        else {
            res.send({
                message: `Cannot update class with id = ${id}. Maybe class was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating class with id = " + id
        });
    });
}