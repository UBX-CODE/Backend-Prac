const LIMIT = 5;
const WINDOW = 10 * 1000; // 10 seconds window
const requests = {};
const lastRequestTime = {};

const rateLimiter = (req, res, next) => {
        const IP = req.ip;
        const now = Date.now();

    if (lastRequestTime[IP] && now - lastRequestTime[IP] < 1000) {
    return res.send("Too fast — ignored duplicate");
  }
    lastRequestTime[IP] = now;
    //initialize if first time
    if(!requests[IP]){
        requests[IP] = {
            count: 1,
            startTime: now
        };
    } else{
        const timePassed = now - requests[IP].startTime;

        if(timePassed < WINDOW){
            requests[IP].count++;
        }  else{
            //reset window
            requests[IP] = {
                count : 1,
                startTime: now
            };
        }
    }
    const remaining = LIMIT - requests[IP].count;
    const resetTime = requests[IP].startTime + WINDOW;

    res.setHeader("X-RateLimit-Limit", LIMIT);
    res.setHeader("X-RateLimit-Remaining", Math.max(remaining, 0));
    res.setHeader("X-RateLimit-Reset", resetTime);

  if (requests[IP].count > LIMIT) {
    return res.status(429).send("Too many requests");
  }
    next();
};

module.exports = rateLimiter;