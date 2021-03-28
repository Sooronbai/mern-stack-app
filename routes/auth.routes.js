const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const router = Router()

router.post(
  '/login',
  [
    check('userName', 'Введите ФИО').notEmpty(),
    check('password', 'Введите адрес').notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          ...errors.array().reduce((acc, {param,msg}) => {
            acc[param] = msg
            return acc
          }, {}),
          message: 'Некорректный данные при входе в систему'
        })
      }

      const {userName, password} = req.body

      const user = await User.findOne({userName})

      if (!user) {
        return res.status(400).json({message: 'Пользователь не найден'})
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({message: 'Неверный пароль, попробуйте снова'})
      }

      const token = jwt.sign(
        {userId: user.id},
        config.get('jwtSecret'),
        {expiresIn: '1h'}
      )

      res.json({token, userId: user.id})

    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
  })


module.exports = router
