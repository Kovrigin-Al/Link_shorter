const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const {authRouter} = require('./routes/authRoutes');
const {linkRouter} = require('./routes/linkRoutes')
const bodyParser = require('body-parser');
const redirectRouter = require('./routes/redirectRoutes');
const app = express();
const path = require('path')

app.use(bodyParser.json())

app.use('/api/auth', authRouter )
app.use('/api/link',  linkRouter )
app.use('/to',  redirectRouter )

if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req,res)=>{
        res.sendFile(path.resole(__dirname, 'client', 'build', 'index.html '))
    })
}

const PORT = config.get('port')|| 5000;

async function start() {
    try {
        await mongoose.connect(config.get("mongoUri"), {
            useUnifiedTopology: true,
            
        }); 
        app.listen(PORT, () => {console.log(`App has been started on port ${PORT }`)});
    } catch (error) {
        console.log('Server Error',  error.message );
        proccess.exit(1);
    }
}

start();

