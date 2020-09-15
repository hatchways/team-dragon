const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");

chai.should();
chai.use(chaiHttp);

describe("/POST ping", () => {
  it("it should return 400", done => {
    chai
      .request(app)
      .post(`/ping/`)
      .send({ teamName: "Paul" })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property("response")
          .eql("Paul is not part of the team. Modify your .env");
        done();
      });
  });
});
