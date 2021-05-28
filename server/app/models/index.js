const dbConfig = require("../config/db.config.js");
const { Sequelize, DataTypes } = require("sequelize");
const classesModel = require("./classes.model.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  timezone: '+07:00'
});

account = require('./account.model')(sequelize, Sequelize)
_class = require('./class.model')(sequelize, DataTypes)
pose = require('./pose.model')(sequelize, DataTypes)
post = require('./post.model')(sequelize, DataTypes)
student = require('./student.model')(sequelize, DataTypes)
teacher = require('./teacher.model')(sequelize, DataTypes)

account.hasMany(this.student)
account.hasMany(this.teacher)

_class.hasMany(this.student)
teacher.hasMany(this._class)
_class.hasMany(this.post)
teacher.hasMany(this.post)

const db = {
    account,
    _class,
    pose,
    post,
    student,
    teacher
};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db;