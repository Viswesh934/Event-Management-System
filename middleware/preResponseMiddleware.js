// preresponse handler

const preResponseMiddleware = (req, res, next) => {
    res.handleServerError = (err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    };
    next();
}

module.exports = preResponseMiddleware;
