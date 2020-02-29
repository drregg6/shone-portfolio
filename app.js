const express = require('express');
const app = express();

// Config Parser
app.use(express.json({ extended: false }))

// Config Mongoose
connectDB();

// Config Routes
app.use('/api/users', require('./routes/api/users'));

app.get('/', (req, res) => {
  res.send('Hello world!');
});

const PORT =  process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});