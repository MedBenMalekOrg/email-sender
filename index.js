import express from 'express';
import expressApp from './app.js';
import {config} from 'dotenv';

config();

(async () => {
    const app = express();
    await expressApp(app);

    app.listen(process.env.PORT, () => console.log(`Server up at ${process.env.PORT}`))
        .on('error', err => {
            console.log(err);
            process.exit();
        });
})();