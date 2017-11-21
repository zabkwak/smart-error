import Err from '../src';

const expect = require('chai').expect;

const MESSAGE = 'Test Error';
const CODE = 'test';
const PAYLOAD = { field: 'test' };
const DEFAULT_MESSAGE = 'Unknown error';
const DEFAULT_CODE = 'unknown';

describe('Attributes instance', () => {

    it('creates new instance of error with default values', (done) => {
        const e = new Err();
        expect(e instanceof Err).to.be.true;
        expect(e instanceof Error).to.be.true;
        expect(e).to.have.all.keys(['message', 'code']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal('Unknown error');
        expect(e.code).to.be.equal('ERR_UNKNOWN');
        done();
    });

    it('creates new instance of error with string message', (done) => {
        const e = new Err(MESSAGE);
        expect(e instanceof Err).to.be.true;
        expect(e instanceof Error).to.be.true;
        expect(e).to.have.all.keys(['message', 'code']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(MESSAGE);
        expect(e.code).to.be.equal('ERR_UNKNOWN');
        done();
    });

    it('creates new instance of error with string message and code', (done) => {
        const e = new Err(MESSAGE, CODE);
        expect(e instanceof Err).to.be.true;
        expect(e instanceof Error).to.be.true;
        expect(e).to.have.all.keys(['message', 'code']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(MESSAGE);
        expect(e.code).to.be.equal('ERR_TEST');
        done();
    });

    it('creates new instance of error with string message, code and payload', (done) => {
        const e = new Err(MESSAGE, CODE, PAYLOAD);
        expect(e instanceof Err).to.be.true;
        expect(e instanceof Error).to.be.true;
        expect(e).to.have.all.keys(['message', 'code', 'field']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(MESSAGE);
        expect(e.code).to.be.equal('ERR_TEST');
        expect(e.field).to.be.equal('test');
        done();
    });

    it('creates new instance of error with string message, code and payload which have message key', (done) => {
        const e = new Err(MESSAGE, CODE, Object.assign(PAYLOAD, { message: 'Invalid message' }));
        expect(e instanceof Err).to.be.true;
        expect(e instanceof Error).to.be.true;
        expect(e).to.have.all.keys(['message', 'code', 'field']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(MESSAGE);
        expect(e.code).to.be.equal('ERR_TEST');
        expect(e.field).to.be.equal('test');
        done();
    });
});

describe('Node.js Error instance', () => {

    it('creates new instance of error with nodejs Error instance', (done) => {
        const e = new Err(new Error(MESSAGE));
        expect(e instanceof Err).to.be.true;
        expect(e instanceof Error).to.be.true;
        expect(e).to.have.all.keys(['message', 'code']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(MESSAGE);
        expect(e.code).to.be.equal('ERR_UNKNOWN');
        done();
    });

    it('creates new instance of error with nodejs Error instance and custom code', (done) => {
        const e = new Err(new Error(MESSAGE), CODE);
        expect(e instanceof Err).to.be.true;
        expect(e instanceof Error).to.be.true;
        expect(e).to.have.all.keys(['message', 'code']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(MESSAGE);
        expect(e.code).to.be.equal('ERR_TEST');
        done();
    });

    it('creates new instance of error with nodejs Error instance, custom code and payload', (done) => {
        const e = new Err(new Error(MESSAGE), CODE, PAYLOAD);
        expect(e instanceof Err).to.be.true;
        expect(e instanceof Error).to.be.true;
        expect(e).to.have.all.keys(['message', 'code', 'field']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(MESSAGE);
        expect(e.code).to.be.equal('ERR_TEST');
        expect(e.field).to.be.equal('test');
        done();
    });
});

describe('Module Error instance', () => {

    it('creates new instance of error with nodejs Error instance', (done) => {
        const e = new Err(new Err(MESSAGE, 'test', PAYLOAD));
        expect(e instanceof Err).to.be.true;
        expect(e instanceof Error).to.be.true;
        expect(e).to.have.all.keys(['message', 'code', 'field']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(MESSAGE);
        expect(e.code).to.be.equal('ERR_TEST');
        expect(e.field).to.be.equal('test');
        done();
    });
});

describe('Object instance', () => {

    it('creates new instance of error with object message with message', (done) => {
        const e = new Err({ message: MESSAGE });
        expect(e instanceof Err).to.be.true;
        expect(e instanceof Error).to.be.true;
        expect(e).to.have.all.keys(['message', 'code']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(MESSAGE);
        expect(e.code).to.be.equal('ERR_UNKNOWN');
        done();
    });

    it('creates new instance of error with object message with message and code', (done) => {
        const e = new Err({ message: MESSAGE, code: 'ERR_TEST' });
        expect(e instanceof Err).to.be.true;
        expect(e instanceof Error).to.be.true;
        expect(e).to.have.all.keys(['message', 'code']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(MESSAGE);
        expect(e.code).to.be.equal('ERR_TEST');
        done();
    });

    it('creates new instance of error with object message with message, code and payload', (done) => {
        const e = new Err({ message: MESSAGE, code: 'ERR_TEST', payload: PAYLOAD });
        expect(e instanceof Err).to.be.true;
        expect(e instanceof Error).to.be.true;
        expect(e).to.have.all.keys(['message', 'code', 'field']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(MESSAGE);
        expect(e.code).to.be.equal('ERR_TEST');
        expect(e.field).to.be.equal('test');
        done();
    });
});

// TODO clone method
// TODO extend
// TODO register errors for docs