export const host = 'http://localhost:5001';
// auth
export const loginRoute = `${host}/api/auth/login`;
export const registerRoute = `${host}/api/auth/register`;
// room
export const roomRoute = `${host}/api/room/room`;
export const getRoomRoute = `${host}/api/room/getRooms`;
export const leaveRoomRoute = `${host}/api/room/leaveRoom`;
// message
export const sendMessageRoute = `${host}/api/message/addmessage`;
export const getMessagesRoute = `${host}/api/message/getmessages`;
