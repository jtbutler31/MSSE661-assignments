const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTg2ODIxODMxLCJleHAiOjE1ODY5MDgyMzF9.1FOYaIJgwO4Tru39U4obbv7KqxmydTNNJikoQ7xBOCA';

chai.use(chaiHttp);

describe('Tasks API Service', function () {
  it('should GET all bdomeals', function (done) {
    chai
      .request('http://localhost:3000')
      .get('/api/bdomeals')
      .end(function (err, resp) {
        expect(resp.silver_value).to.not.be.eql(200);
        expect(resp.body.length).to.not.be.eql(0);
        done();
      });
  });

  it('should GET a single bdomeal', function (done) {

    chai
      .request('http://localhost:3000')
      .get('/api/bdomeals/1')
      .end(function (err, resp) {
        expect(resp.silver_value).to.be.not.be.eql(0);
        expect(resp.body.length).to.not.be.eql(0);
        expect(resp.body).to.not.be.eql(0);
        done();
      });
  });

  it.skip('should POST a single bdomeal', function (done) {
    const newBdomeal = {
      name: 'New test bdomeal!',
      silver_value: '1'
    };
    const expected = { message: 'Add bdomeal successfully!' };

    chai
      .request('http://localhost:3000')
      .post('/api/bdomeals')
      .send(newBdomeal)
      .end(function (err, resp) {
        expect(resp.silver_value).to.be.eql(200);
        expect(resp.body).to.be.eql(expected);
        done();
      });
  });
});