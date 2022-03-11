const express = require("express")
const router = express.Router();
const User = require("../module/loginschema")
const { body, param, validationResult } = require('express-validator');
const { json } = require("express/lib/response");
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser')
const secret = "RESETAPI_WITH_AUTHNTICATION"
router.use(bodyParser())

router.post("/ragister", body("email"), body("password"), async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { name, email, password } = req.body
        bcrypt.hash(password, 10,async function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                res.status(400).json({
                    status: "faile",
                    message: "wrong password"
                })
            }

            const user = await User.create({
                name, email, password: hash
            })
            res.json({
                status: "sucsess",
                user
            })
        });
    } catch (e) {
        res.json({
            status: "failed",
            message: e.message
        })
    }
})

router.post("/login", body("email"), body("password"), async(req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { email, password } = req.body
        const user1 = await User.findOne({ email })
        if (!user1) {
            res.status(401).json({
                status: "faile",
                message: "Invalid user"
            })
        }
        bcrypt.compare(password, user1.password, function (err, result) {
            // result == true
            console.log("user1", user1)
            console.log("user1.password", user1.password)
            if (result) {
                console.log("true", result)
                var tokan = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60), //for one houre login time
                    data: user1._id
                }, secret);
                res.json({
                    status: "sucess",
                    tokan
                })
            } else {
                console.log("false res", result)
                res.status(401).json({
                    status: "faile",
                    message: "Not authenticated"
                })
            }
        });
    } catch (e) {
        res.status(401).json({
            status: "failed",
            message: e.message
        })
    }
})

module.exports = router;