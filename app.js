const express=require('express')
const app =express()
const path=require('path')


app.use(express.static(path.join(__dirname, 'public')))

// set engine view
app.set('view engine','ejs')


const PORT=3000

app.get('/',(req,res)=>{
    res.render(__dirname + '/view/index.ejs')
})

const server=app.listen(PORT,()=>{
    console.log(`app runnig on port ${PORT}`)
})

const io=require('socket.io')(server)
io.on('connection',(socket)=>{
    console.log('socket connected!!')
    // set username
    socket.username='anonymose'
    socket.on('change_username',(data)=>{
        console.log(data.username)
        socket.username=data.username
    })

    //brodcast the message
    socket.on('new_message',(data)=>{
        console.log(data)
        io.sockets.emit('new_message',{message:data.message,username:socket.username})
    })
    // brodcast typing
    socket.on('typing',(data)=>{
        console.log('user is typing....')
        io.sockets.emit('typing',{username:socket.username})
    })
})
