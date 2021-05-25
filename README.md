# --------------------
# THIS PROJECT CONTINUE BY DYNOBIRD.COM
# https://dynobird.com
# --------------------


# Database design online
Database design online | History | dbdesigner.id is hobby project from the author. At the first, this project just
learning for use canvas. and now this project grow to be real database design. Thank you for all advise and feedback about this database designer.

## Tech Stack
This Database designer build on vueJS framework, html5, canvasJS, sqlite and nodeJS as backend. Every one can try database designer 
application at https://app.dbdesigner.id 

I was refactoring all this backend engine for make it portable and easy to install in another machine.
This database designer divide to 3 parts.
1. backend locate in directory backend this handle communication with sqlite
2. frontend this vueJS frontend. To run this project need compile vue to `dist` directory.
3. admin is CLI to manage this project like user management and host name configuration


You can install this database designer in your private server too.
## Instalation
```
# clone this repo
# cd frontend
# npm run build
# cd backend
# node app
```

## How to use admin CLI
Database designer user admin CLI to manage all backend. This can make simple  use this database designer in
private server without integration with email. 
`admin/admin.js` is main entry point.
###  Add user
```
# node admin/admin.js add user
```

### List user

```
# node admin/admin.js list user
```

### Edit user
To use edit username is required
```
# node admin/admin.js edit user [username]
```


### Get Detail user
To get detail, username is required
```
# node admin/admin.js get user [username]
```


### Get Hostname
```
# node admin/admin.js get hots_name 
```

### Set Hostname
```
# node admin/admin.js set hots_name [new name]
```

# DBdesigner.id
This is simple and open source db designer based on vueJS framework, html5, canvasJS and nodeJS as backend. 

The goal of this project is to make database management and designer is cheap for every one and have best technology.

I hope this project can help student, small startup to make great app with cheap tools.

I don't know the best of technology for solve everyone problem in database design. I need your feedback for improve this project.

## Home view
![Database designer](docs/images/Home_database_designer.png)
## Open Project
![Database designer](docs/images/Open_project.png)
## Export to database
![Export to database](docs/images/Export_to_database.png)
## Share project
![Share](docs/images/Share_project.png)
