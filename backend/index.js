const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {cors: {origins: ['*']}});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    const newInvitation = new Invitation({invitation});
    newInvitation.save();

    const newNotification = new Notification({invitation: newInvitation._id, userId, status: 'pending'});
    newNotification.save();

    socket.broadcast.emit('msg', {user: socket.id, type: 'INVITATION_RECIVED', payload: {invitation: newInvitation._id, userFrom: 'userName', notification: newNotification}});

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        socket.broadcast.emit('msg', {user: socket.id, text: 'ha salido del chat.'});
    });

    socket.on('msg', (message) => {
        console.log('Message received:', message);
        io.emit('msg', message);
    })

    //endpoint de /accept
    const notification = Notificaiton.findById(req.params.notificationId);
    notification = {...notification, status: 'read'};
    Notifacion.findByIdAndUpdate(req.params.notificationId, notification);
    socket.broadcast.emit('msg', {user: socket.id, type: 'INVITATION_ACCEPTED', payload: {invitation: newInvitation._id, userFrom: 'userName', notification: newNotification}});
});

httpServer.listen(3001);