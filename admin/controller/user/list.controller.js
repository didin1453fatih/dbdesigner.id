const axios = require("axios")
const inquirer = require('inquirer')

module.exports = {
    action() {
        var questions = [

            {
                type: 'input',
                name: 'keyword',
                message: "Keyword filter : "
            }
        ];

        inquirer.prompt(questions).then(async answers => {
            var respond = await axios.get(`http://localhost/api/v1/admin/user/list?keyword=${answers.keyword}`)
            console.log("Respond get list user : ")
            if (respond.data.success === true) {
                let count = 1;
                console.log("Total : " + respond.data.payload.length)
                respond.data.payload.forEach(user => {
                    console.log(count++ + '. ' + user.user_name + ' [' + user.email + ']')
                });
            } else {
                console.log("Error " + respond.data.message)
            }
        });
    }
}