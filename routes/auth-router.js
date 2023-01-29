import jwt from 'jsonwebtoken';

export default (app, path) => {
    app.get(path, (req, res) => {
        const token = jwt.sign({},
            process.env.JWT_SECRET,
            {
                expiresIn: 15 * 60
            });
        res.json({token});
    });
};