var logger = require('winston');
var server = require('../../app');
var chai = require('chai');
var chaiHttp = require('chai-http');
var seed = require('../../seed/seed');
var User = require('../../models/user');
var expect = require('chai').expect;

chai.should();
chai.use(chaiHttp);

var url = 'http://127.0.0.1:8001';


describe('Users', function() {

  // Before our test suite
  before(function(done) {
    // Start our app on an alternative port for acceptance tests
    server.listen(8001, function() {
      logger.info('Listening at http://localhost:8001 for acceptance tests');

      // Seed the DB with our users
      seed(function(err) {
        done(err);
      });
    });
  });

  describe('/GET users', function() {
    it('should return a list of users', function(done) {
      chai.request(url)
        .get('/users')
        .end(function(err, res) {
          res.body.should.be.a('array');
          res.should.have.status(200);
          res.body.length.should.be.eql(100);
          done();
        });
    });
  });

  describe('/POST users', function() {
    it('should create a single user', function(done) {
      var user = {"gender":"female","name":{"title":"miss","first":"alison","last":"reid"}};

      // Create a new user
      chai.request(url)
        .post('/users')
        .send(user)
        .end(function(err, res) {
          res.should.have.status(201);
          expect(res.header.location).to.be.a('string');

          // Get the new user by id
          chai.request(url)
            .get(res.header.location)
            .end(function(err, userRes) {
              //console.log(userRes);
              userRes.should.have.status(200);
              expect(userRes.body).to.be.a('object');
              expect(userRes.body.name.first).to.be.a('string');
              done();
            });
        });
    });
  });

  describe('/GET users/:id', function() {
    it('should return a single user', function(done) {
      // Find a user in the DB
      User.findOne({}, function(err, user) {
        var id = user._id;

        // Read this user by id
        chai.request(url)
          .get('/users/' + id)
          .end(function(err, res) {
            res.should.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.name.first).to.be.a('string');
            done();
          });
      });
    });
  });

  describe('/DELETE users/:id', function() {
    it('should delete a single user', function(done) {
      // Find a user in the DB
      User.findOne({}, function(err, user) {
        var id = user._id;

        // Delete this user by id
        chai.request(url)
          .delete('/users/' + id)
          .end(function(err, res) {
            res.should.have.status(200);
            User.findById(id, function(err, user) {
              expect(user).to.be.a(null);
              done();
            });
          });
      });
    });
  });
});
