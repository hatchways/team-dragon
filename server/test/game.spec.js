const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiAsPromised = require("chai-as-promised");
const app = require("../app");
const Game = require("../models/Game");
const User = require("../models/User");

const expect = chai.expect;
// chai.use(chaiAsPromised);
chai.use(chaiHttp);

describe("Game Routes", () => {
  let token;
  let user;
  before("setup user", async () => {
    await User.deleteMany();

    // create sample user
    user = {
      name: "tester",
      email: "tester@example.com",
      password: "test",
    };

    await User.create(user);

    const res = await chai.request(app).post("/users/login").send({
      email: user.email,
      password: user.password,
    });
    expect(res.body).to.have.property("token");
    token = res.body.token;
  });

  after("cleanup db", async () => {
    await User.deleteMany();
  });

  describe("POST /create-game", () => {
    it("User expects to create a new game", async () => {
      try {
        const res = await chai
          .request(app)
          .post("/create-game")
          .set({ Authorization: `Bearer ${token}` });
        expect(res).to.have.status(202);
        expect(res.body).to.have.property("game");
      } catch (err) {
        if(err){
            throw err;
        }
      }
    });
  });
});
