import request from 'supertest';
import { app } from '../../app';

// test for creating a user
it('returns a 201 on successful creation',async()=>{
    return request(app)
        .post('/worko/user')
        .send({
            
            email:'test@test.com',
            name:'test',
            city:'test',
            age: 34,
            zipCode: 11111
        })
        .expect(201);
});

it('returns a 400 with an invalid email',async()=>{
    return request(app)
        .post('/worko/user')
        .send({
            email:'sdflkj',
            name:'test',
            city:'test',
            age: 34,
            zipCode: 11111
        })
        .expect(400);
});

//test if jwt is set in a cookie
it('sets a cookie after a successful creation',async()=>{
    const response = await request(app)
        .post('/worko/user')
        .send({
            email:'test@test.com',
            name:'test',
            city:'test',
            age: 34,
            zipCode: 11111
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();  
});


//test for getting all the users
it('gets all the users',async()=>{
    const createUser = await request(app)
        .post('/worko/user')
        .send({
            email:'test@test.com',
            name:'test',
            city:'test',
            age: 34,
            zipCode: 11111
        })
        .expect(201);
        
    const cookie = createUser.get('Set-Cookie');
    const response = await request(app)
        .get('/worko/user')
        .set('Cookie',cookie!)
        .send()
        .expect(200);
});

//test for getting a single user
it('gets a single user',async()=>{
    const createUser = await request(app)
        .post('/worko/user')
        .send({
            email:'test@test.com',
            name:'test',
            city:'test',
            age: 34,
            zipCode: 11111
        })
        .expect(201);
        
    const cookie = createUser.get('Set-Cookie');

     await request(app)
        .get(`/worko/user/${createUser.body._id}`)
        .set('Cookie',cookie!)
        .send()
        .expect(200);
});


//deletes a user by id
it('deletes a user by id',async()=>{
    const createUser = await request(app)
        .post('/worko/user')
        .send({
            email:'test@test.com',
            name:'test',
            city:'test',
            age: 34,
            zipCode: 11111
        })
        .expect(201);
    const cookie = createUser.get('Set-Cookie');

    const response = await request(app)
        .delete(`/worko/user/${createUser.body._id}`)
        .set('Cookie',cookie!)
        .send()
    expect(response.status).toBe(200);
    
})