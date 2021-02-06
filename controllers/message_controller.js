const Message = require('../models/message')

module.exports = class MessageController {	
  static createMessage = async (request, response) => {
    const message = request.body;

    try {    
      const createdMessage = await Message.create(message);
      response.status(201).json(createdMessage);
    }
    catch (err) {
      response.status(500).json({ err });
    }
  }
  
  static getMessages = async (request, response) => {
    const { limit, room_name } = request.query;

    try {    
      const messages = await Message.getByRoomName(room_name, limit);
      response.status(200).json(messages.rows);
    }
    catch (err) {
      response.status(500).json({ err });
    }
  }
}
