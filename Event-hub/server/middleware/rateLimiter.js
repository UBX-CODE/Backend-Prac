const request = {};

const LIMIT = 5;
const WINDOW = 6 * 1000;

const rateLimiter = (req, res, next) => {
    const userId = req.user.userId;
    const now = Date.now();

    if(!request[userId]) {
        request[userId] = {
            count: 1,
            startTime: now
        };
        
        return next();
    }

    const timePassed = now - request[userId].startTime;

    if(timePassed > WINDOW) {
        request[userId] = {
            count:1,
            startTime: now
        };
        return next();
    }
    request[userId].count++;

    if(request[userId].count > LIMIT){
        return res.status(429).json({
            message: "Too many booking attemps"
        });
    }
    next();
};

module.exports = rateLimiter;