const app = require('./app');

const {PORT} = process.env

app.listen(PORT||4000, ()=>{
    console.log(`App is running on http://localhost:${PORT}`);
})