const mongoose = require("mongoose");
const DevicesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  device: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
const Devices = mongoose.model("devices", DevicesSchema);
module.exports = Devices;
