const Messages = require('../models/messageModel');
const User = require('../models/userModel');

module.exports.addMessage = async (req, res, next) => {
  try {
    const { room, sender, message } = req.body;
    // console.log(req.body)
    const savedMessage = await Messages.create({
      room: room._id,
      sender: sender._id,
      message,
    });
    if (savedMessage) return res.json({ msg: 'Message added successfully.' });
    else return res.json({ msg: 'Failed to add message to the database' });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getMessages = async (req, res, next) => {
  try {
    const roomId = req.query.roomId;

    if (!roomId) {
      return res.status(400).json({ error: 'Room ID is required' });
    }

    const roomMessages = await Messages.find({ room: roomId });

    const messagesWithSenderInfo = await Promise.all(
      roomMessages.map(async (message) => {
        const sender = await User.findById(message.sender);
        return {
          sender: {
            _id: sender._id,
            username: sender.username,
          },
          message: message.message,
        };
      })
    );

    res.json(messagesWithSenderInfo);
  } catch (ex) {
    next(ex);
  }
};
