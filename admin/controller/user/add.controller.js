const axios = require("axios")
const inquirer = require('inquirer')

module.exports = {
    action() {
        var questions = [

            {
                type: 'input',
                name: 'user_name',
                message: "User Name : "
            },
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
            console.log(JSON.stringify(answers, null, '  '));
            var respond = await axios.post("http://localhost/api/v1/admin/user/add", answers)
            console.log("Respond :")
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