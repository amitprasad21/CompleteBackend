import { validateToken } from '../utils/token.utils.js';    


const authmiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token && validateToken(token)) {
        req.user = {name : "Amit", role: "admin", id: "123"}; 
        next();
    } else {
        return res.status(401).send({
            message: 'Invalid token.'
        });
    }

    next();
};

export default authmiddleware;