const app = require('express')()
const server = require('http').createServer(app)
const cors = require('cors');
const port = process.env.PORT || 4000;
const io = require('socket.io')(server, {
    cors: {
     origin: "*",
      credentials: true
    }
  });
const bodyParser = require('body-parser')

io.on('connection', socket => {
  socket.on('join', roomName => {
    // Join unique user room on socket
    socket.join(roomName);

    socket.on(`emitMessage`, message => {
      Array.from(socket.rooms).forEach(id => {
        // Emit message to socket associated with room      
        socket.to(id).emit('onMessage', message);
      });
    });
  });

  socket.on('onMessage', msg => {
    console.log(msg)
  });

  socket.on('disconnect', () => {
    socket.removeAllListeners();
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const LoginRoutes = require('./routes/login_routes')
const MessageRoutes = require('./routes/message_routes')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.locals.title = 'chat_app_be'

app.use('/api/v1/login', LoginRoutes)
app.use('/api/v1/messages', MessageRoutes)

module.exports = app
