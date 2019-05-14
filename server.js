const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://web:web1234@ds151076.mlab.com:51076/project');

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//router req
const loginRouter = require('./routes/loginRouter')
const registerRouter = require('./routes/registerRouter')
const technicianRouter = require('./routes/technicianRouter')
const officianRouter = require('./routes/officianRouter')
const officianRepairRouter = require('./routes/offician-repairRouter')
const officianBillRouter = require('./routes/offician-billRouter')
const officianInvoiceRouter = require('./routes/offician-invoiceRouter')
const officianBuyRouter = require('./routes/offician-buyRouter')




//router
app.use('/login', loginRouter)
app.use('/register', registerRouter)
//technician
app.use('/technician', technicianRouter)
//offician
app.use('/offician', officianRouter)
app.use('/offician/repair', officianRepairRouter)
app.use('/offician/bill', officianBillRouter)
app.use('/offician/taxInvoice', officianInvoiceRouter)
app.use('/offician/buy', officianBuyRouter)



app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', '/home/login'));
});

app.listen(port, function() {
    console.log('start port http://localhost:' + port + "/login");
});