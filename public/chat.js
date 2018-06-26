$(function(){
  const sockect=io.connect('http://localhost:3000')


  const message=$('#message')
  const username=$('#username')
  const sendUsername=$('#send_username')
  const chatroom=$('#chatroom')
  const sendMessage=$('#send_message')
  const feedback=$('#feedback')

  //emit an username
  sendUsername.click(()=>{
    console.log('send username'+ username.val())
      sockect.emit('change_username',{username:username.val()})
      //console.log('username socket now' + username.val())
      return false
  })
  sendMessage.click(()=>{
      sockect.emit('new_message',{message:message.val()})
      message.val("")
      return false
  })

  // append messages to chatroom
  sockect.on('new_message',(data)=>{
      console.log(data)
      chatroom.append(`<li>${data.username}: ${data.message}</li>`)
  })
  // add typing event
  message.bind('keypress',()=>{
      console.log('keypress')
      sockect.emit('typing',{})
  })
  sockect.on('typing',(data)=>{
      console.log('typing')
      feedback.html(`<p><i>${data.username}</i> is typing...</p>`)
  })
})