const axios = require("axios")
const inquirer = require('inquirer')

module.exports = {
    async action(username) {
        var respond = await axios.get(`http://localhost/api/v1/admin/user/getOne?username=${username}`)
        console.log("Respond detail user : ")
        if (respond.data.success === true) {
            var user = respond.data.payload
            console.log('Id : ' + user.id)
            console.log('Username : ' + user.user_name)
            console.log('Email : ' + user.email)
            console.log('Complete Name : ' + user.complete_name)
            console.log('Status : ' + user.status)
            console.log('Gender : ' + user.gender)
            console.log('Created : ' + user.created)
            console.log('Updated : ' + user.updated)

        } else {
            console.log("Error " + respond.data.message)
        }
    }
}