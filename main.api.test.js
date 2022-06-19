const { response } = require('express');
const req = require('express/lib/request');
const supertest = require('supertest');
const request = supertest('http://localhost:8000');

describe('Express Route Test', function (){
	const User = {
		booking: "12345678910MY",
		type: "Single Room",
		name: "Chris Evans",
		//pass: "12345"
	}
	
	it('post', async () => {
	 	return request
			.post('/new')
	 		.send(User)
			.expect('Content-Type',/text/)
			.expect(200).then(res =>{
				expect(res.body).toEqual("Registration successful!")
			})
		});
	
     it('get', async () => {
		return request
        .get('/get')
        .send(User)
        .expect('Content-Type', /text/)
        .expect(200).then(res => {
			expect(res.body).toEqual(
				false)
            
        })
	});

	it('patch', async () => {
		return request
       .patch('/update')
       .send(User)
       .expect('Content-Type', /json/)
       .expect(200).then(res => {
			expect(res.body).toEqual(false)
            
       })
	});

	it('delete', async () => {
		return request
        .delete('/delete')
        .send(User)
        .expect('Content-Type', /json/)
        .expect(200).then(res => {
			expect(res.body).toEqual("delete unsuccessful")
            
        })
	});
});