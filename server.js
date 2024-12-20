
const { createServer } = require('http');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

let io;
let buzzerActive = true;

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  if (!io) {
    io = new Server(server);
    io.on('connection', (socket) => {
      console.log('New client connected', socket.id);
      socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
      });

      socket.on('buzzer-pressed', (team) => {
        if (buzzerActive){
          buzzerActive = false
          io.emit('buzzer-update', team);
        }
      });

      socket.on('buzzer-reset-pressed',()=>{
        buzzerActive = true
        io.emit('buzzer-reset')
      })
    });
  }

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
