// Complete your server here!
// Do NOT `server.listen()` inside this file!

const projectRouter = require('./projects/projectRouter');
const actionsRouter = require('./actions/actionsRouter');
 
const server = express();
 
server.use(express.json());
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionsRouter);
 
server.get('/', (req, res) => {
 res.send(`<h2>Hard Work pays off!</h2>`);
});
 
module.exports = server;

