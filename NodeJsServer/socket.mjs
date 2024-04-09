import { Server } from 'socket.io';

export function initSocket(server){
    
    const io = new Server(server, {cors: {origin: "*"}});
    io.on('connection', (socket) => {

        function logRooms(){
            io.sockets.adapter.rooms.forEach((clients, roomId)=>{
                console.log('Room', roomId, ":", clients);
            })
        }
        
        /**
         * 
         * @param {string} roomId 
         * @returns {{}} roommates {userId?:string : {name?:string}, ...}
         */
        function getRoommates(roomId){
            let roommates = {}
            let room = io.sockets.adapter.rooms.get(roomId);
            room.forEach((socketId)=>{
                let socket = io.sockets.sockets.get(socketId);
                let id = socket.data.userId;
                let name = socket.data.userName;
                roommates[id] = {name}
            })
            return roommates
        }
      
      
        console.log(`socket connect recieved: ${socket.id}`);
        logRooms()
        
        socket.on('bark', ({userName,guestName}) => {
            socket.rooms.forEach((room) => {
                io.to(room).emit('bark',{msg:   `user ${userName} barked in room ${room}`})
            });
        })
      
        socket.on('join', ({roomId, userName, userId}) => {
            console.log(`join received from user ${userId} ${userName} to room: ${roomId}`);
            socket.data = {userId, userName};
        
            if (io.sockets.adapter.rooms.has(roomId)){
        
                socket.join(roomId)
                let roommates = getRoommates(roomId)
        
                console.log('roommates', roommates );
                console.log(socket.rooms);
        
                io.to(roomId).emit('join',{userName, userId, roommates})
                socket.emit('joined',{roommates})
        
            } else {
                console.log(`${userName} failed to join. Room ${roomId} does not exist`);
                //socket.emit('joined',{})
            }
            logRooms()
        });
      
        socket.on('create', ({roomId, userName, userId}) => {
            console.log(`create received for room ${roomId}`);
            socket.data = {userId, userName};
        
            socket.join(roomId);
            let roommates = getRoommates(roomId)
            io.to(roomId).emit('create',{})
            io.to(roomId).emit('joined',{roommates})
        
            logRooms()
        })
      
        socket.on('start', ({roomId}) => {
            console.log(`start received for room: ${roomId}`)
            io.to(roomId).emit('start',{})
        })
      
        socket.on('choice', ({roomId, userId, userName, questionInd, choices}) => {
            console.log(`choice received for room: ${roomId} from user ${userId} on question ${questionInd} with choice: ${choices}`)
            io.to(roomId).emit('choice',{userId, userName, questionInd, choices})
        })
      
        socket.on('next', ({roomId, questionInd, question}) => {
            console.log(`next received for room: ${roomId} with question (# ${questionInd}): ${question.text}  with choices: ${question.choices}`)
            io.to(roomId).emit('next',{question, questionInd})
        })
      
        socket.on('end', ({roomId}) => {
            console.log(`end received for room: ${roomId}`);
            io.to(roomId).emit('end',{})
        })
      
        socket.on('scores', ({roomId, usersScores}) =>{
            console.log(`result received for room: ${roomId}`);
            io.to(roomId).emit('scores',{usersScores})
        })
      
        socket.on('reveal', ({roomId, correctChoicesInd}) => {
            console.log(`reveal received for room: ${roomId} choiceInd: ${correctChoicesInd}`); 
            io.to(roomId).emit('reveal',{correctChoicesInd})
        })
      
        socket.on('disconnecting', () => {
            console.log(`socket disconnect recieved: ${socket.id}`)
            console.log('socket rooms', socket.rooms)
      
            socket.rooms.forEach((roomId)=>{
                console.log('emit leave to', roomId)
                let roommates = getRoommates(roomId)
                
                roommates[socket.id] = undefined
                io.to(roomId).emit('leave', {userId: socket.data.userId, userName: socket.data.userName, socketId: socket.id, roommates})
            })
      
            socket.on('disconnect', () =>{
                logRooms()
            })
      
        });
      
    });
}