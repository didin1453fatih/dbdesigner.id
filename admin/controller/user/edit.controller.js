const axios = require("axios")
const inquirer = require('inquirer')

module.exports = {
    async action(username) {
        var isUsernameExist = await axios.get(`http://localhost/api/v1/admin/user/getOne?username=${username}`)
        if (isUsernameExist.data.success != true) {
            return console.log("Error " + isUsernameExist.data.message)
        }

        var questions = [
            {
                type: 'input',
                name: 'complete_name',
                message: "Complete Name :"
            },
            {
                type: 'list',
                name: 'gender',

                message: 'Gender : ',
                choices: ['Male', 'Female'],
                filter: function (val) {
                    return val.toLowerCase();
                }
            },
            {
                type: 'input',
                name: 'email',
                message: "Email :"
            },
            {
                type: 'input',
                name: 'password',
                message: "Password :"
            },
            {
                type: 'input',
                name: 'password_confirm',
                message: "Password Confirm :"
            },
        ];

        inquirer.prompt(questions).then(async answers => {

            var respond = await axios.post("http://localhost/api/v1/admin/user/edit", {
                user_name: username,
                complete_name: answers.complete_name,
                gender: answers.gender,
                email: answers.email,
                password: answers.password,
                password_confirm: answers.password_confirm
            })
            if (respond.data.success === true) {
                var user = respond.data.payload
                console.log("Respond :")
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
        });
    }
}