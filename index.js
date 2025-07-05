const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

app.get('/', (req, res) => {
  res.send('Servidor Socket.IO está rodando!')
})

io.on('connection', socket => {
  console.log('Novo cliente conectado:', socket.id)

  socket.emit('mensagem', 'Bem-vindo, cliente!')

  socket.on('mensagem', msg => {
    console.log('Mensagem do cliente:', msg)
    io.emit('mensagem', msg)
  })

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id)
  })
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
