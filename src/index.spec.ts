import { describe, it } from 'mocha';
import chai from 'chai';
import chaihttp from 'chai-http';
import { app } from './index';

chai.use(chaihttp);
const expect = chai.expect;

describe('Express.js API basics', function () {
    it('should give 404 for non-existent GETs', async function () {
        const r = await chai.request(app).get('/bot');
        expect(r.status).to.eq(404);
    });
    it('should give 404 for non-existent POSTs', async function () {
        const r = await chai.request(app).post('/bot');
        expect(r.status).to.eq(404);
    });
});

describe('Message processing', function () {
    it('should send back requests for message queries', async function () {
        const r = await chai.request(app).post('/botd027b3d59c15')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify({
                message: {
                    message_id: 440,
                    from: {
                        id: 443,
                        first_name: 'Test'
                    },
                    chat: {
                        id: 444
                    },
                    text: '/my'
                }
            }));
        expect(r.status).to.eq(200);
        console.log(r.body);
        expect(r.body.ok).to.eq(true);
    })
})