const db = require("../models");
const Account = db.account;

exports.create = async (req, res) => {
    // Validate request
    if (!req.body.username || !req.body.password || !req.body.accountType ) {
        res.status(400).send({
            message: "A content properties cannot be empty"
        })
    }

    // Create an account
    const account = {
        username: req.body.username,
        password: req.body.password,
        accountType: req.body.accountType,
        online: false
    }

    // Save an account in the database
    Account.create(account)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the account."
            })
        })
};

exports.findAll = async (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Account.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving accounts."
            });
        });
};

exports.findOne = async (req, res) => {
    const username = req.params.username;

	Account.findByPk(username)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving account with username = " + username
			});
		});
};

exports.deleteOne = async (req, res) => {
    const username = req.params.username;

    Account.destroy({
        where: { username: username }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Account was deleted successfully!"
            });
        } 
        else {
            res.send({
                message: `Cannot delete account with username = ${username}. Maybe account was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete account with username = " + username + ", " + err
        });
    });
};

exports.deleteAll = async (req, res) => {
    Account.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} accounts were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing all accounts."
        });
    });
};

exports.edit = async (req, res) => {
    const username = req.params.username;

    Account.update(req.body, {
        where: { username: username }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Account was updated successfully."
            });
        } 
        else {
            res.send({
                message: `Cannot update account with id = ${id}. Maybe account was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating account with id = " + id
        });
    });
};