/*

https://scottdustman.carbonmade.com/

*/

const express = require('express');
const app = express();
const connectDB = require('./config/db')

// Config Parser
app.use(express.json({ extended: false }))

// Config Mongoose
connectDB();

// Config Routes
app.use('/api/portfolios', require('./routes/api/portfolios'));
app.use('/api/resumes', require('./routes/api/resumes'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT =  process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});