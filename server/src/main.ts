import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './router';
import errorHandler from './shared/error/error-handler';
import initializeAdmin from './shared/database/initialization/admin';
import initializeUsers from './shared/database/initialization/users';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use('/api', router);
app.use(errorHandler);

console.log('Environment is:', process.env.NODE_ENV);
(async () => {
  if (process.env.NODE_ENV === 'production') {
    await initializeAdmin();
    await initializeUsers();
  }
})();

app.listen(port, () => console.log(`Server listening on port ${port}`));
