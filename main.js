const MongoClient = require("mongodb").MongoClient;
const User = require("./user");

MongoClient.connect(
	// TODO: Connection 
	"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.98hil.mongodb.net/m201 people.json",
	{ useNewUrlParser: true },
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	console.log('Connected to MongoDB');
	User.injectDB(client);
})

const express = require('express');
const res = require("express/lib/response");
const app = express()
const port = process.env.PORT || 8000

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Study Room System',
			version: '1.0.0',
		},
	},
	apis: ['./main.js'], // files containing annotations as above
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
	res.send('Welcome to the Study Room Management System')
})

/**
 * @swagger
 * components:
 *   schemas:
 *     details:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           StudentID:
 *             type: string
 *           RoomNumber:
 *             type: string
 *        
 */

/**
 * @swagger
 * /check/{studentID}:
 *   get:
 *     description: Returns Array of the User
 *     parameters:
 *       - in: path
 *         name: StudentID
 *         required: true
 *         schema:
 *             type: string
 *     responses:
 *       200:
 *         description: Student ID is found!
 *         schema:
 *           type: object
 *           properties:
 *             name: 
 *               type: string
 *             Email:
 *               type: string
 *             password: 
 *               type: string
 *             schema: 
 *               $ref : "#/components/schemas/details"
 *       401:
 *         description: Invalid ID !
 */

app.get('/check/:username', async (req, res) => {
	const user = await User.check(req.body.name, req.body.password,req.body.Email,req.body.details)
	res.json(user)
})
/**
 * @swagger
 * /login:
 *   post:
 *     description: Student Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               studentID: 
 *                 type: string
 *               password: 
 *                 type: string
 *     responses:
 *       200:
 *         description: Welcome UTeM Student
 *       401:
 *         description: You are not invited
 */
app.post('/login', async (req, res) => {
	console.log(req.body);


	const user = await User.login(req.body.name, req.body.password,req.body.Email,req.body.details);
	res.status(200).send(user)
})
/**
 * @swagger
 * /register:
 *   post:
 *     description: Register
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               studentID: 
 *                 type: string
 *               Email:
 *                 type: string
 *               password: 
 *                 type: string
 *               schema: 
 *                 $ref : "#/components/schemas/details"
 *     responses:
 *       200:
 *         description: Welcome :)
 *       401:
 *         description: Invalid Student ID
 */
app.post('/register', async (req, res) => {
	//console.log(req.body);
	const user = await User.register(req.body.name, req.body.password,req.body.Email,req.body.details);
	res.json(user)

	// res.json({
	// 	_id: 'B022010084',
	// 	name: 'Ali',
	// 	RoomNumber: 18,
	// })
})

app.patch('/update', async (req,res) => {
	const user = await User.update(req.body.name, req.body.password,req.body.Email,req.body.details)
	res.json(user)
})

app.delete('/delete', async (req,res) => {
	const user = await User.delete(req.body.name, req.body.password,req.body.Email,req.body.details)
	res.json(user)
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
