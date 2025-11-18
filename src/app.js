import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from "./routes/index.js";

const app = express();
// const upload = multer({ dest: 'public/uploads/' });

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', router);

app.use('/uploads', express.static('public/uploads'));



export default app;