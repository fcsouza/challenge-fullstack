import app from '../server';
import 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('Basic validations ', () => {
  it("Must allow the translation of an integer", (done) => {
    const id = 1;
    chai.request(app)
      .get(`/translate/${id}`)
      .end((err, res) => {
        chai.expect(res.status).to.eql(200);
        chai.expect(res.body).to.eql("one");
        done();
      });
  });

  it("Must not allow the translation of a decimal number", (done) => {
    const id = 1.5;
    chai.request(app)
      .get(`/translate/${id}`)
      .end((err, res) => {
        chai.expect(res.status).to.eql(400);
        done();
      });
  });

  it("Must not allow the translation of a string", (done) => {
    const id = 'asd';
    chai.request(app)
      .get(`/translate/${id}`)
      .end((err, res) => {
        chai.expect(res.status).to.eql(400);
        done();
      });
  });
});

describe('Minimum and maximum number validation', () => {
  it('Does not allow to translate a number less than one', () => {
    chai.request(app).get('/translate/-1')
      .then((res: any) => {
        chai.expect(res.status).to.eql(400);
      });
  }).timeout(8000);

  it('Does not allow translating more than 999999999999', (done) => {
    const id = 1000000000000;
    chai.request(app)
      .get(`/translate/${id}`)
      .end((err, res) => {
        chai.expect(res.status).to.eql(400);
        done();
      });
  });
});

describe('Testing number translation', () => {
  it('Translate number 10', () => {
    chai.request(app).get('/translate/10')
      .then((res: any) => {
        chai.expect(res.status).to.eql(200);
        chai.expect(res.body).to.eql("ten");
      });
  }).timeout(8000);

  it('Translate number 50', () => {
    chai.request(app).get('/translate/50')
      .then((res: any) => {
        chai.expect(res.status).to.eql(200);
        chai.expect(res.body).to.eql("fifty");
      });
  }).timeout(8000);

  it('Translate number 123', () => {
    chai.request(app).get('/translate/123')
      .then((res: any) => {
        chai.expect(res.status).to.eql(200);
        chai.expect(res.body).to.eql("one hundred twenty-three");
      });
  }).timeout(8000);

  it('Translate number 200', () => {
    chai.request(app).get('/translate/200')
      .then((res: any) => {
        chai.expect(res.status).to.eql(200);
        chai.expect(res.body).to.eql("two hundred");
      });
  }).timeout(8000);

  it('Translate number 1011', () => {
    chai.request(app).get('/translate/1011')
      .then((res: any) => {
        chai.expect(res.status).to.eql(200);
        chai.expect(res.body).to.eql("one thousand eleven");
      });
  }).timeout(8000);

  it('Translate number 125500', () => {
    chai.request(app).get('/translate/125500')
      .then((res: any) => {
        chai.expect(res.status).to.eql(200);
        chai.expect(res.body).to.eql("one hundred twenty-five thousand five hundred");
      });
  }).timeout(8000);

  it('Translate number 12345678', () => {
    chai.request(app).get('/translate/12345678')
      .then((res: any) => {
        chai.expect(res.status).to.eql(200);
        chai.expect(res.body).to.eql("twelve million three hundred forty-five thousand six hundred seventy-eight");
      });
  }).timeout(8000);

  it('Translate number 999999999', () => {
    chai.request(app).get('/translate/999999999')
      .then((res: any) => {
        chai.expect(res.status).to.eql(200);
        chai.expect(res.body).to.eql("nine hundred ninety-nine million nine hundred ninety-nine thousand nine hundred ninety-nine");
      });
  }).timeout(8000);

  it('Translate number 999999999999', () => {
    chai.request(app).get('/translate/999999999999')
      .then((res: any) => {
        chai.expect(res.status).to.eql(200);
        chai.expect(res.body).to.eql("nine hundred ninety-nine billion nine hundred ninety-nine million nine hundred ninety-nine thousand nine hundred ninety-nine");
      });
  }).timeout(8000);

});
