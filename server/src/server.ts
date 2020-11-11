import express from 'express';
import path from 'path';
import cors from 'cors';
import exphbs from 'express-handlebars';

import routes from './routes';
import uploadConfig from './config/upload';

const app = express();

app.use(cors());
app.use(express.json());

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);


app.listen(process.env.PORT || 3333);


