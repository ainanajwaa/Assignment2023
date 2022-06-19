let benr;
const bcrypt = require("bcryptjs")
class User {
	static async injectDB(conn) {
		benr = await conn.db("Study_Management_System").collection("Booking")
	}

	static async register(booking, type, name, pass) {
		// TODO: Check if username exists
		const db = benr 
		const find = await db.findOne({"name":name})
		    if (find) {
				return "Booking Found!"
			}

        // TODO: Hash password
        const saltRounds = 10
        const Pass = await bcrypt.hashSync(password, saltRounds)

        // TODO: Save user to database
			const Result = await db.insertOne({
				reservation : booking ,
				Booking_type : type,
				username : name,
				password : pass 
			})

			if (Result){
				return "Registration successful!"
			}
			return "Registration unsuccessful"
	}

	static async login(booking, type, name, pass) {
		// TODO: Check if username exists
		const db = benr 
		const find = await db.findOne({ "name": name })
			if (find.length == 0) {
				return false
			}

		// TODO: Return user object
		if (pass) {
			return pass
		} else {
			return false
        }
	}
	static async check(booking, type, name, pass) {
		const db = benr
		const find = await db.findOne({
			"name" : name
		})
		if(!find){
			return false
		}
		return find
	}
	static async delete(booking, type, name, pass){
		const db = benr
		const find = await db.findOne({
			"name": name
		})
		if(find){
			await db.deleteOne({
				"name": name
			})
			return "delete successful"
		}
		return "delete unsuccessful"
	}
	static async update(booking, type, name, pass){
		const db = benr
		const find = await db.findOne({
			"name": name
		})
		if(!find){
			return false
		}
		return await db.updateOne({
			"name": name
		},{$set : {password : pass}})
	}


}
module.exports = User;




