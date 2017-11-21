import Err from '../src';

const expect = require('chai').expect;

const MESSAGE = 'Test Error';
const CODE = 'test';
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
});

describe('Module Error instance', () => {

    it('creates new instance of error with nodejs Error instance', (done) => {
        const e = new Err(new Err(MESSAGE, 'test'));
        expect(e instanceof Err).to.be.true;
        expect(e instanceof Error).to.be.true;
        expect(e).to.have.all.keys(['message', 'code']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(MESSAGE);
        expect(e.code).to.be.equal('ERR_TEST');
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
   
});