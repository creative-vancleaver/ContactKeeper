const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// CONNECT DATABASE
connectDB();

// INIT MIDDLEWARE
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => res.json({ msg: 'Welcome to the ContactKeper API!' }));

// DEFINE ROUTES
app.use('/api/users/', require('./routes/users'));
app.use('/api/auth/', require('./routes/auth'));
app.use('/api/contacts/', require('./routes/contacts'));

// SERVE STATIC ASSETS
if (process.env.NODE_ENV === 'production') {

  // SET STATIC FOLDER
  app.use(express.static('client/build'));

  // CREATE ROUTE (ANYTHING NOT DEFINED ABOVE)
  app.get('*', (req, res) => res.sendFild(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5555;

// app.listen(PORT, () => console.log(`server started on port ${ PORT }`));
app.listen(process.env.PORT || 5555, () => { console.log('server listening on port %d in %s mode', this.address().port, app.settings.env); });

