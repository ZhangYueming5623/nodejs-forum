//
// app.post('/register',register.create_user)
//
// return register result
//
const dbConnection = require('./database.js')
const { User } = require('./models/User');

exports.create_user = async (req, res) => {
    console.log("call to /create_user...");
    try {
        // const { username, email, password } = req.body;
        var data = req.body;  // data => JS object
        var username = data.username;
        var email = data.email;
        var password = data.password;

        const rowCount = await User.count({
            where: {
                email: email
            }
        });

        if(rowCount == 0) {
            const newUser = await User.create({
                username: username,
                email: email,
                password: password
            });
            return res.status(200).json({
                "message": "User created.",
                "userid": newUser.userid,
            });
        }
        else{
            return res.status(200).json({
                "message": "Email address already exists , cannot create user.",
                "userid": -1,
            })
        }
    }//try
    catch (err) {
        res.status(400).json({
            "message": err.message
        });
    }//catch

}
