const redis = require("redis");
var srs = require('secure-random-string');


const tokenExpireTime = 10
const client = redis.createClient({
    host: 'dev_designer_redis',
    port: 6379,
});

client.on("error", function (error) {
    console.error(error);
});



module.exports = {
    make: async (data) => {
        var token = srs({ length: 256 })
        client.set(token, JSON.stringify({
            id: data.id,
            user_name: data.user_name,
            email: data.email,
            complete_name: data.complete_name,
            verified: data.verified,
            status: data.status
        }), 'EX', tokenExpireTime);
        return token
    },
    read: (token) => {
        return new Promise((resolve, reject) => {
            client.get(token, (err, raw) => {
                if (err) {
                    console.error(err)
                    return resolve(null)
                }

                if (raw === null) {
                    return resolve(null)
                }

                var sessionData = JSON.parse(raw)
                this.updateExpiredTime(token)

                return resolve(sessionData)
            });
        });
    },
    updateExpiredTime: (token) => {
        client.expire(token, tokenExpireTime, err => {
            if (err) {
                console.error(err)
            }
        })
    },    
    updateData: async (token, data) => {

    },
    destroy: async (token) => {
        client.del(token, function (err, response) {
            if (err) {
                throw new Error('Session failure in delete. Delete status ' + deleted)
            }
        })
    }
}