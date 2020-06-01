const addUser = require("./controller/user/add.controller")
const listUser = require("./controller/user/list.controller")
const getOne = require("./controller/user/getOne.controller")
const edit = require("./controller/user/edit.controller")
const getHostName = require("./controller/host_name/get.controller")
const setHostName = require("./controller/host_name/set.controller")


var verb = process.argv[2]
var object = process.argv[3]
switch (object) {
    case 'user':
        switch (verb) {
            case 'add':
                addUser.action()
                break

            case 'list':
                listUser.action()
                break
            case 'get':
                var username = process.argv[4]
                getOne.action(username)
                break
            case 'edit':
                var username = process.argv[4]
                edit.action(username)
                break
        }
        break
    case 'host_name':
        switch (verb) {
            case 'get':
                getHostName.action()
                break
            case 'set':
                var hostname = process.argv[4]
                setHostName.action(hostname)
                break
        }
        break
}