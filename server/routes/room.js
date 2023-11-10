const { room, getRooms } = require('../controllers/roomController');

const router = require('express').Router();

router.post('/room', room);
router.get('/getRooms', getRooms);

module.exports = router;
