const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../index');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

const userList = {
  existingUser: 'Minerva',
  existingUser2: 'Artemis',
  newUser: 'Zeus',
}

const userProperties = ['id', 'name']

describe('API Routes', () => {
  before((done) => {
    database.migrate.latest()
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });

  describe('POST /api/v1/login/', () => {
    it('should return user if username exists', done => {
      chai.request(server)
        .post('/api/v1/login/')
        .send({
          userName: userList.existingUser
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          
          const userData = response.body[0]

          userProperties.forEach(userProperty => {
            userData.should.have.property(userProperty)
          })

          userData.name.should.equal(userList.existingUser);
          done();
      })
    })
    
    it('should return create user if username does not exist', done => {
      chai.request(server)
        .post('/api/v1/login/')
        .send({
          userName: userList.newUser
        })
        .end((err, response) => {
          response.should.have.status(201);
          response.should.be.json;
          
          const userData = response.body[0]

          userProperties.forEach(userProperty => {
            userData.should.have.property(userProperty)
          })

          userData.name.should.equal(userList.newUser);
          done();
      })
    })
    
    it('should return 422 error if name value is empty', done => {
      chai.request(server)
        .post('/api/v1/login/')
        .send({
          userName: ''
        })
        .end((err, response) => {
          response.should.have.status(422);
          response.should.be.json;
          done();
      })
    })
  })
});
