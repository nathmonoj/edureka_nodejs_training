import assert from 'assert'
import { expect } from "chai";
import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoConnect from '../src/connector/connector.js'
import server from '../src/server/server.js'
chai.use(chaiHttp)
let should = chai.should();
const APP_PORT = parseInt(process.env.APP_PORT)

describe('Check Server & APIs', async () => {
  var appInitiated = false
  var appServerInstance
  var mongoClient

  before(async function () {
    appServerInstance = server.listen(APP_PORT, (err) => {
      appInitiated = true
    })
    mongoClient = await mongoConnect()
  })

  it('Server started without crashing', (done) => {
    expect(appInitiated).to.equal(true)
    done()
  })


  it('GET:: /user/all', (done) => {
    //expect(appInitiated).to.equal(true);
    chai.request(appServerInstance)
      .get('/user/all')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        //res.body.should.be.a('array');
        //res.body.length.should.be.eql(0);
        done();
      })
  })

  after((done) => {
    mongoClient.close().then(() => {
      appServerInstance.close()
      done()
    })
  })
})