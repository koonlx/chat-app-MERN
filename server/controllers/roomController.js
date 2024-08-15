const Room = require('../models/roomModel');
const Message = require('../models/messageModel');

module.exports.room = async (req, res, next) => {
  try {
    const { user, roomName } = req.body;
    // console.log(req.body);
    const existingRoom = await Room.findOne({ name: roomName });

    if (existingRoom) {
      if (existingRoom.participants.includes(user._id)) {
        return res.json({
          message: 'User is already in this room',
          status: false,
        });
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

module.exports.removeUserFromRoom = async (req, res, next) => {
  try {
    const { roomId, userId } = req.body;
    console.log(roomId, userId);

    const room = await Room.findByIdAndUpdate(
      roomId,
      { $pull: { participants: userId } },
      { new: true }
    );

    if (!room) {
      return res.status(404).json({ message: 'Room not found', status: false });
    }

    if (room.participants.length === 0) {
      await Room.findByIdAndDelete(roomId);
      await Message.deleteMany({ room: roomId });
      return res.json({
        message: 'Room deleted as participants list is empty',
        status: true,
      });
    }

    return res.json({ message: 'User removed from the room', status: true });
  } catch (ex) {
    console.error(ex);
    return res.status(500).json({ message: 'Internal server error', status: false });
  }
};