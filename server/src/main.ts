import express from 'express';
import dotenv from 'dotenv';
import router from 'router';
import errorHandler from 'shared/error/error-handler';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/api', router);

app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on port ${port}`));
