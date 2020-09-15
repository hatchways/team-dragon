const { should } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const User = require("../models/User");

const expect = chai.expect;
chai.use(chaiHttp);

describe("Auth Routes", () => {
  let user;

  before("setup db", async () => {
    await User.deleteMany();

    // create sample user
    user = {
      name: "tester",
      email: "tester@example.com",
      password: "test",
    }
    await User.create(user);
  });

  after("cleanup db", async () => {
    await User.deleteMany();
  });

  describe("POST /users/register", () => {
    it("expects to create a new user", (done) => {
      chai
        .request(app)
        .post("/users/register")
        .send({
          name: "newUser",
          email: "newUser@example.com",
          password: "newUser",
          password2: "newUser",
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("user");
          expect(res.body).to.have.property("token");
          done();
        })
    });
    it("expects to fail if missing name field", (done) => {
      chai
        .request(app)
        .post("/users/register")
        .send({
          email: "fail@example.com",
          password: "123456",
          password2: "123456"
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("success", false);
          expect(res.body).to.have.property("errors");
          done();
        });
    });
    it("expects to fail if missing emailfield", (done) => {
      chai
        .request(app)
        .post("/users/register")
        .send({
          name: "fail",
          password: "123456",
          password2: "123456"
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("success", false);
          expect(res.body).to.have.property("errors");
          done();
        });
    });
    it("expects to fail if missing password field", (done) => {
      chai
        .request(app)
        .post("/users/register")
        .send({
          name: "fail",
          email: "fail@example.com",
          password2: "123456"
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("success", false);
          expect(res.body).to.have.property("errors");
          done();
        });
    });
    it("expects to fail if missing confirm password field", (done) => {
      chai
        .request(app)
        .post("/users/register")
        .send({
          name: "fail",
          email: "fail@example.com",
          password: "123456",
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("success", false);
          expect(res.body).to.have.property("errors");
          done();
        });
    });
    it("expects to fail if passwords do not match", (done) => {
      chai
        .request(app)
        .post("/users/register")
        .send({
          name: "fail",
          email: "fail@example.com",
          password: "123456",
          password2: "654321",
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("success", false);
          expect(res.body).to.have.property("errors");
          done();
        });
    });
    it("expects to fail if password is too short", (done) => {
      chai
        .request(app)
        .post("/users/register")
        .send({
          name: "fail",
          email: "fail@example.com",
          password: "1234",
          password: "1234",
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("success", false);
          expect(res.body).to.have.property("errors");
          done();
        });
    });
    it("expects to fail if email already taken", (done) => {
      chai
        .request(app)
        .post("/users/register")
        .send({
          name: "newUser",
          email: "newUser@example.com",
          password: "newUser",
          password2: "newUser",
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("success", false);
          expect(res.body).to.have.property("message");
          done();
        });
    });
  });

  describe("POST /users/login", () => {
    it("expects to login a user", (done) => {
      chai
        .request(app)
        .post("/users/login")
        .send({
          email: user.email,
          password: user.password,
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("user");
          expect(res.body).to.have.property("token");
          done();
        })
    });
    it("expects to fail if incorrect password", (done) => {
      chai
        .request(app)
        .post("/users/login")
        .send({
          email: user.email,
          password: "wrongpassword",
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("success", false);
          expect(res.body).to.have.property("message");
          done();
        })
    });
    it("expects to fail if missing email", (done) => {
      chai
        .request(app)
        .post("/users/login")
        .send({
          password: user.password,
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("success", false);
          expect(res.body).to.have.property("errors");
          done();
        })
    });
    it("expects to fail if missing password", (done) => {
      chai
        .request(app)
        .post("/users/login")
        .send({
          email: user.email,
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("success", false);
          expect(res.body).to.have.property("errors");
          done();
        })
    });
    it("expects to fail if user does not exist", (done) => {
      chai
        .request(app)
        .post("/users/login")
        .send({
          email: "fail@example.com",
          password: "fail",
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          expect(res.body).to.have.property("success", false);
          expect(res.body).to.have.property("message");
          done();
        })
    });
  });
});

