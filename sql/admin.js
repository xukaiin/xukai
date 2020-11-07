const db = require("./db");

const adminSchema = new db.mongoose.Schema({
    "adminId":{type:String},
    "adminName":{type:String},
    "passWord":{type:String},
   
})

module.exports = db.mongoose.model("admin", adminSchema);
