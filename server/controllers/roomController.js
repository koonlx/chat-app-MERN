const Room = require('../models/roomModel');

module.exports.room = async (req, res, next) => {
  try {
    const { user, roomName } = req.body;
    // console.log(req.body);
    const existingRoom = await Room.findOne({ name: roomName });

    if (existingRoom) {
      if (existingRoom.participants.includes(user._id)) {
        return res.json({ message: 'User is already in this room', status: false})
      }
      if (!existingRoom.participants.includes(user._id)) {
        existingRoom.participants.push(user._id);
        await existingRoom.save();
      }
        return res.json({ message: 'Joined room successfully', status: true });
    } else {
      const newRoom = new Room({ name: roomName });
      newRoom.participants.push(user._id);
      await newRoom.save();
      return res.json({ message: 'Created a room successfully', status: true });
    }
  } catch (ex) {
    next(ex);
  }
};

module.exports.getRooms = async (req, res, next) => {
  try {
    const userId = req.query.userId;

    Room.find({ participants: userId }, (err, rooms) => {
      if (err) {
        return res.status(500).json({ error: 'Server error' });
      }
      return res.json({ rooms });
    });
  } catch (ex) {
    next(ex);
  }
};
