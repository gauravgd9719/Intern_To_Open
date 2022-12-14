const mongoose = require("mongoose");

const internSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    requried: true,
    uniqure: true,
  },
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    reg: "college",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("inter", internSchema);
