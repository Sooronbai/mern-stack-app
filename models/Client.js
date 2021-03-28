const {Schema, model} = require('mongoose')

const schema = new Schema({
  fullName: {type: String, required: true},
  telephone: {type: String, required: true},
  address: {type: String, required: true},
  inn: {type: String, required: true},
})

module.exports = model('Client', schema)
