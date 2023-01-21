const userModel = require("../models/userModel")
const { isValidName, captilize, isValidEmail, isValidPhone, isVaildPass } = require("../validators/validator")
const jwt = require("jsonwebtoken")


const createUser = async function (req, res) {
    try {
        const data = req.body
        const { title, name, phone, email, password } = data
        if (Object.keys(data).length == 0) return res.status(400).send("Body is empty")

        //---------------------------- Title Validation---------------------/
        let titles = ["Mr", "Mrs", "Miss"]
        if (!title) return res.status(400).send("Title is required")
        if (!titles.includes(title.trim())) return res.status(400).send({ status: false, msg: "Please provide the title in these options - Mr || Mrs || Miss" })

        //--------------------- Name Validation----------------------------/
        if (!name) return res.status(400).send("Name is required")
        if (!isValidName(name.trim())) return res.status(400).send({ status: false, msg: "Please provide a valid name with surname" })
        data.name = captilize(name)

        //--------------------------Phone Validation-------------------------/

        if (!phone) return res.status(400).send("Phone is required")
        if (!isValidPhone(phone.trim())) return res.status(400).send({ status: false, msg: "Please provide a valid Phone Number" })
        let uniquePhone = await userModel.findOne({ phone: phone })
        if (uniquePhone) return res.status(400).send({ status: false, message: "Phone is already exist" })

        //----------------------- Email Validation---------------------------/

        if (!email) return res.status(400).send("Email is required")
        if (!isValidEmail(email.trim())) return res.status(400).send({ status: false, msg: "Please provide a valid Email-Id" })
        let uniqueEmail = await userModel.findOne({ email: email })
        if (uniqueEmail) return res.status(400).send({ status: false, message: "Email is already exist" })

        //---------------------------Password Validation--------------------/

        if (!password) return res.status(400).send("Password is required")
        if (!isVaildPass(password.trim())) return res.status(400).send({ status: false, msg: "Please provide a valid Password with min 8 to 15 char with Capatial & special (@#$%^!) char " })


        let saveData = await userModel.create(data)
        return res.status(201).send({ status: true, msg: saveData })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}




const login = async function (req, res) {
    try {

        if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, msg: "login credentials required" })
//console.log(Object.keys(req.body))
        const email = req.body.email
        const password = req.body.password

        if (!email) return res.status(400).send({ status: false, msg: "Email is required" })
        if (!isValidEmail(email)) { return res.status(400).send({ status: false, msg: "Email is not valid" }) }

        if (!password) return res.status(400).send({ status: false, msg: "Password is required" })
        if (!isVaildPass(password)) { return res.status(400).send({ status: false, msg: "Password should contain min 8 char , 1 uppercase , 1 special char" }) }

        if (email && password) {
            const user = await userModel.findOne({ email: email, password: password })
            if (user) {
                const token = jwt.sign({ userId: user._id }, 'vrBest', { expiresIn: "12h" })
                res.setHeader("x-api-key", token);
                return res.status(200).send({ status: true, token: token })
            }
            else {
                return res.status(400).send({ status: false, msg: "invalid credentials" })
            }
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })

    }
}


module.exports= {login,createUser}

//module.exports.createUser = createUser

