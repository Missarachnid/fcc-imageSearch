const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema(
  { "term": String,
    "when" : Date
  },
  {"timestamps": true}
);

const ModelClass = mongoose.model('history', historySchema);

module.exports = ModelClass;