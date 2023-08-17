const User = require("../../models/User")

const userCreate = async () => {
        const userBody = {
            firstName: "Jorge",
            lastName: "Uceta",
            email: "jorge@gmail.com",
            password: "J123456789",
            phone: "532147"        
        }
    

     await User.create(userBody)
}

module.exports = userCreate