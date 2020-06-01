var moment = require("moment")
var srs = require('secure-random-string');
module.exports = {
    make: async (data) => {
        var session = Mukmin.getDataModel("utility").session;
        var token = srs({ length: 256 })
        var expiredAt = null
        var expireInHour = 24
        expiredAt = moment().add(expireInHour, 'hour')
        await session.create({
            token: token,
            id: data.id,
            user_name: data.user_name,
            email: data.email,
            complete_name: data.complete_name,
            verified: data.verified,
            status: data.status,
            expired: expiredAt
        });
        return token
    },
    read: async (token) => {
        var session = Mukmin.getDataModel("utility").session;
        var sessionData = await session.findByPk(token)
        if (moment().isAfter(moment(sessionData.expired))) {
            return null
        }
        return sessionData
    },
    updateExpiredTime: async (token) => {

    },
    updateData: async (token) => {

    },
    destroy: async (token) => {
        var session = Mukmin.getDataModel("utility").session;
        var deleted = await session.destroy({
            where: {
                token: token
            }
        })

        if (deleted !== 1) {
            throw new Error('Session failure in delete. Delete status ' + deleted)
        }
    }
}