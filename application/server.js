const express = require('express');
const aboutRouter = require('./routes/aboutRouter');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', (req, res, next) => {
    res.render('index');
});

app.get('/members', function(req, res) {
    const teamInfo = require('./teamData');
    res.render('member', { teamInfo: teamInfo });
});
// Use the aboutRouter for the /about endpoint
app.use('/about', aboutRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



