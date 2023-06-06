const express = require('express');
const connectDB = require('./config/db');

const app = express();

// CONNECT DATABASE
connectDB();

// INIT MIDDLEWARE
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'Welcome to the ContactKeper API!' }));

// DEFINE ROUTES
app.use('/api/users/', require('./routes/users'));
app.use('/api/auth/', require('./routes/auth'));
app.use('/api/contacts/', require('./routes/contacts'));

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => console.log(`server started on port ${ PORT }`));

