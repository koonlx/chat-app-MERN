const { room, getRooms, removeUserFromRoom } = require('../controllers/roomController');

const router = require('express').Router();

router.post('/room', room);
router.get('/getRooms', getRooms);
router.post('/leaveRoom', removeUserFromRoom)

module.exports = router;
