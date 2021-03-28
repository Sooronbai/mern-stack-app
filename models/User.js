const {Schema, model, Types} = require('mongoose')
const bcrypt = require('bcryptjs')

const schema = new Schema({
  userName: {type: String, required: true, unique: true},
  password: {type: String, required: true},
})

const User = model('User', schema)

const saveDataToDB = async function (data) {
  const candidate = await User.findOne({userName: data.userName})
  if (!candidate) {
    const hashedPassword = await bcrypt.hash(data.password, 12)
    const user = new User({userName: data.userName, password: hashedPassword})
    await user.save()
  }
}

// saved once to the DB !!!!
saveDataToDB({userName: 'Admin', password: '13371337'})

module.exports = User
