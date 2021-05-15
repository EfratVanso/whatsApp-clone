const io = require('socket.io')(5000)

io.on('connection', socket => {
    const id = socket.handshake.query.id //socketIo creates socket id 
    socket.join(id)


    socket.on('send-message', ({ recipients, text }) => {
        recipient.forEach(recipient => {
            const newRecipients = recipients.filter(r => r !== recipient)
            newRecipients.push(id)
            socket.broadcast.to(recipient).emit(
                'recieve-message', { recipients: newRecipients, sender: id, text })
        });
    })
})
console.log('connected on port 5000')

// npm run devStart