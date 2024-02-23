import express from 'express';
import teamInfo from './public/js/teamData.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res, next) => {
    res.render('index');
});

app.get('/about', (req, res, next) => {
    res.render('about', {teamInfo});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



