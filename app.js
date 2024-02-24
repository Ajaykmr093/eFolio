import express from 'express';
import morgan from 'morgan';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(morgan('dev'));


app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
