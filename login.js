const jwt = require('jsonwebtoken');
const { User } = require('./models/User');

const crypto = require('crypto');

global.secretKey = crypto.randomBytes(32).toString('hex');

exports.login = async (req, res) => {
    console.log("call to /login...");
    try {
        var data = req.body;
        // check if email-password match
        const users = await User.findAll({
            where: {
                email: data.email,
                password: data.password
            },
            attributes: ['userid']
        });

        if(users.length !== 1){
            return res.status(401).json({
                "message": "Email and password do not match.",
            });
        }
        const userid = users[0].userid
        // get jwt token
        const token = jwt.sign({ userid: userid }, secretKey);
        return res.status(200).json({
            "message": "login successful.",
            "token" : token
        });
    }//try
    catch (err) {
        console.log(err);
        res.status(400).json({
            "message": err.message
        });
    }//catch
}
// )//post
