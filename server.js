const express = require('express');
const app = express();
const path = require('path');
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

// Deployment
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});