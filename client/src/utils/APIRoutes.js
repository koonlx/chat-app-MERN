export const host = 'http://localhost:5001';
// auth
export const loginRoute = `${host}/api/auth/login`;
export const registerRoute = `${host}/api/auth/register`;
export const logoutRoute = `${host}/api/auth/logout`;
// room
export const roomRoute = `${host}/api/room/room`;
export const getRoomRoute = `${host}/api/room/getRooms`;
// message
export const sendMessageRoute = `${host}/api/message/addmessage`;
export const getMessagesRoute = `${host}/api/message/getmessages`;
