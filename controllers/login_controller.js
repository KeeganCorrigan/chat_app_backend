const User = require('../models/user')

module.exports = class LoginController {
  static connectRecipient = async (request, response) => {
    const { recipientName } = request.body
    const recipient = await User.find(recipientName)
  
    if (recipient.length > 0) {
      response.status(201).json(recipient)
    }
    else {
      return response.status(404).send({
        error: `"${recipientName} is not an existing user."`
      })
    }
  }

  static create = async (request, response) => {
    const { userName } = request.body

    if (!userName) {
      return response.status(422).send({
        error: "Username is required"
      })
    }

    const sender = await User.find(userName)

    if (sender.length > 0) {
      response.status(200).json(sender)
    }
    else {
      try {
        const createdUser = await User.create({ name: userName })
        response.status(201).json(createdUser)
      }
      catch (err) {
        response.status(500).json({ err })
      }
    }
  }
}
