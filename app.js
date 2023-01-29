import {json, static as staticDir, urlencoded} from "express";
import cors from 'cors';
import rateLimit from 'express-rate-limit'
import authMiddleware from "./middleware/auth.js";
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import {email, auth} from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: {msg: 'Too many requests, please try again in 15min.'}
})

export default async (app) => {
    app.use(limiter)
    app.use(json({limit: '10kb'}));
    app.use(urlencoded({extended: true, limit: '1mb'}));
    app.use(staticDir(__dirname + '/public'));
    app.use(cors());

    await auth(app, '/auth');
    app.use(authMiddleware);
    await email(app, '/email');

    app.use((req, res) => res.status(404).json({message: 'Not found'}).end());
};