const {Router} = require('express')
const Client = require('../models/Client')
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth.middleware')
const {check, validationResult} = require('express-validator')
const router = Router()

router.post(
  '/',
  [
    check('fullName', 'Введите ФИО').notEmpty(),
    check('address', 'Введите адрес').notEmpty(),
    check('telephone', 'Введите номер').notEmpty(),
    check('inn', 'Введите ИНН').notEmpty(),
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)
    errors
    if (!errors.isEmpty()) {
      return res.status(400).json({
        ...errors.array().reduce((acc, {param,msg}) => {
          acc[param] = msg
          return acc
        }, {}),
        message: 'Некорректный данные при входе в систему'
      })
    }

    const {fullName, telephone, inn, address} = req.body

    const hashedInn = await bcrypt.hash(inn, 12)

    const client = new Client({fullName, telephone, address, inn: hashedInn})

    await client.save()

    res.status(201).json({message: 'Анкета создана'})
  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const clients = await Client.find({})
    res.json(clients)
  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})

module.exports = router
