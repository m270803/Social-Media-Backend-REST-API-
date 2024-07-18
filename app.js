import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes';
import blogrouter from './routes/blog-routes';

const app = express();
app.use(express.json());

app.use("/api/user",router);
app.use("/api/blogs", blogrouter)

mongoose.connect('mongodb+srv://sharmamehul8448:wLnI34laAyhqoBUJ@cluster0.ysl2njo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => app.listen(5000)).then(() => console.log("connected to database")).catch((err) => console.log(err));

