const { addMessage, getMessages } = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmessage/", addMessage);
router.get('/getmessages/', getMessages)

module.exports = router;
