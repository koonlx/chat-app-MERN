// dotenv config setting
require('dotenv').config();
// import
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const Room = require('./models/roomModel');

const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer, {
   cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
   },
});

const mongoose = require('mongoose');
const cors = require('cors');

//middleware
app.use(
   cors({
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
   }),
);
app.use(express.json());

//Routing
const authRoutes = require('./routes/auth');
const roomRoutes = require('./routes/room');
const messageRoutes = require('./routes/message');

app.use('/api/auth', authRoutes);
app.use('/api/room', roomRoutes);
app.use('/api/message', messageRoutes);

//mongodb connect
mongoose
   .set('strictQuery', false)
   .set('debug', true)
   .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      console.log('DB Connection Successful');
   })
   .catch(err => {
      console.log(err.message);
   });

httpServer.listen(process.env.PORT, () => console.log(`Server started on ${process.env.PORT}`));
function addUserToRooms(userId, socket) {
   Room.find({ participants: userId })
      .exec()
      .then(rooms => {
         rooms.forEach(room => {
            socket.join(room._id.toString(), err => {
               if (!err) {
                  console.log('User joined room: ', room.name);
               }
            });
         });
      })
      .catch(err => {
         console.error('Error adding user to rooms', err);
      });
}

// socket.io 설정
io.on('connection', socket => {
   console.log('Client Connect');

   socket.on('login', userId => {
      addUserToRooms(userId, socket);
   });

   socket.on('send-message', ({ message, roomId, sender }) => {
      if (roomId) {
         socket.to(roomId).emit('message-from-server', { message, sender });
      }
   });

   socket.on('disconnect', () => {
      console.log('Client disconnected');
   });
});
