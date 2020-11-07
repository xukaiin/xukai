const db = require("./db");

const adminSchema = new db.mongoose.Schema({
    "username": { type: String },
    "password": { type: String },

})

module.exports = db.mongoose.model("users", adminSchema);
