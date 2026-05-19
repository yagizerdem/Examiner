if(process.env.NODE_ENV  == "dev") {
    require('dotenv').config({path: '.dev-env'});
}
else {
    require('dotenv').config({path: '.env'});
}


const {app} = require('./app');

app.listen(3000, ()=> {
    console.log("Server is running on port 3000");
})
