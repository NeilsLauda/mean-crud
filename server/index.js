const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const { mongoose } = require('./database');
//settings
app.set('port', process.env.PORT || 3000);

//Middlewares 
app.use(morgan('dev')); // una ayuda para poder ver en consola los eventos
app.use(express.json()); // ayuda ala conversion para que pueda entenderlos datos
app.use(cors({origin : 'http://localhost:4200'}));

//Routes
app.use('/api/employees', require('./routes/employee.routes'));
//Starting the server

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
