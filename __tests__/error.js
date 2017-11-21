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
        expect(e).to.be.instanceOf(Err);
        expect(e).to.be.instanceOf(Error);
        expect(e).to.have.all.keys(['message', 'code']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal('Unknown error');
        expect(e.code).to.be.equal('ERR_UNKNOWN');
        done();
    });

    it('creates new instance of error with string message', (done) => {
        const e = new Err(MESSAGE);
        expect(e).to.be.instanceOf(Err);
        expect(e).to.be.instanceOf(Error);
        expect(e).to.have.all.keys(['message', 'code']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(MESSAGE);
        expect(e.code).to.be.equal('ERR_UNKNOWN');
        done();
    });

    it('creates new instance of error with string message and code', (done) => {
        const e = new Err(MESSAGE, CODE);
        expect(e).to.be.instanceOf(Err);
        expect(e).to.be.instanceOf(Error);
        expect(e).to.have.all.keys(['message', 'code']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(MESSAGE);
        expect(e.code).to.be.equal('ERR_TEST');
        done();
    });

    it('creates new instance of error with string message, code and payload', (done) => {
        const e = new Err(MESSAGE, CODE, PAYLOAD);
        expect(e).to.be.instanceOf(Err);
        expect(e).to.be.instanceOf(Error);
        expect(e).to.have.all.keys(['message', 'code', 'field']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(MESSAGE);
        expect(e.code).to.be.equal('ERR_TEST');
        expect(e.field).to.be.equal('test');
        done();
    });

    it('creates new instance of error with string message, code and payload which have message key', (done) => {
        const e = new Err(MESSAGE, CODE, Object.assign(PAYLOAD, { message: 'Invalid message' }));
        expect(e).to.be.instanceOf(Err);
        expect(e).to.be.instanceOf(Error);
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
        expect(e).to.be.instanceOf(Err);
        expect(e).to.be.instanceOf(Error);
        expect(e).to.have.all.keys(['message', 'code']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(MESSAGE);
        expect(e.code).to.be.equal('ERR_UNKNOWN');
        done();
    });

    it('creates new instance of error with nodejs Error instance and custom code', (done) => {
        const e = new Err(new Error(MESSAGE), CODE);
        expect(e).to.be.instanceOf(Err);
        expect(e).to.be.instanceOf(Error);
        expect(e).to.have.all.keys(['message', 'code']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(MESSAGE);
        expect(e.code).to.be.equal('ERR_TEST');
        done();
    });

    it('creates new instance of error with nodejs Error instance, custom code and payload', (done) => {
        const e = new Err(new Error(MESSAGE), CODE, PAYLOAD);
        expect(e).to.be.instanceOf(Err);
        expect(e).to.be.instanceOf(Error);
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
        expect(e).to.be.instanceOf(Err);
        expect(e).to.be.instanceOf(Error);
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
        expect(e).to.be.instanceOf(Err);
        expect(e).to.be.instanceOf(Error);
        expect(e).to.have.all.keys(['message', 'code']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(MESSAGE);
        expect(e.code).to.be.equal('ERR_UNKNOWN');
        done();
    });

    it('creates new instance of error with object message with message and code', (done) => {
        const e = new Err({ message: MESSAGE, code: 'ERR_TEST' });
        expect(e).to.be.instanceOf(Err);
        expect(e).to.be.instanceOf(Error);
        expect(e).to.have.all.keys(['message', 'code']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(MESSAGE);
        expect(e.code).to.be.equal('ERR_TEST');
        done();
    });

    it('creates new instance of error with object message with message, code and payload', (done) => {
        const e = new Err({ message: MESSAGE, code: 'ERR_TEST', payload: PAYLOAD });
        expect(e).to.be.instanceOf(Err);
        expect(e).to.be.instanceOf(Error);
        expect(e).to.have.all.keys(['message', 'code', 'field']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(MESSAGE);
        expect(e.code).to.be.equal('ERR_TEST');
        expect(e.field).to.be.equal('test');
        done();
    });
});

describe('Methods', () => {

    it('clones the instance', (done) => {
        const e = new Err(MESSAGE, CODE, PAYLOAD).clone();
        expect(e).to.be.instanceOf(Err);
        expect(e).to.be.instanceOf(Error);
        expect(e).to.have.all.keys(['message', 'code', 'field']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(MESSAGE);
        expect(e.code).to.be.equal('ERR_TEST');
        expect(e.field).to.be.equal('test');
        done();
    });

    it('converts the error to JSON without stack and without payload', (done) => {
        const e = new Err(MESSAGE, CODE);
        const s = JSON.stringify({ message: MESSAGE, code: 'ERR_TEST' });
        expect(e.toJSON()).to.be.equal(s);
        done();
    });

    it('converts the error to JSON without stack', (done) => {
        const e = new Err(MESSAGE, CODE, PAYLOAD);
        const s = JSON.stringify({ message: MESSAGE, code: 'ERR_TEST', field: 'test' });
        expect(e.toJSON()).to.be.equal(s);
        done();
    });

    it('converts the error to JSON with stack', (done) => {
        const e = new Err(MESSAGE, CODE);
        const parsed = JSON.parse(e.toJSON(true));
        expect(parsed).to.have.all.keys(['message', 'code', 'stack']);
        expect(parsed.stack).to.be.a('string');
        expect(parsed.message).to.be.equal(MESSAGE);
        expect(parsed.code).to.be.equal('ERR_TEST');
        done();
    });

    it('converts the error to JSON with stack and payload', (done) => {
        const e = new Err(MESSAGE, CODE, PAYLOAD);
        const parsed = JSON.parse(e.toJSON(true));
        expect(parsed).to.have.all.keys(['message', 'code', 'field', 'stack']);
        expect(parsed.stack).to.be.a('string');
        expect(parsed.message).to.be.equal(MESSAGE);
        expect(parsed.code).to.be.equal('ERR_TEST');
        expect(e.field).to.be.equal('test');
        done();
    });
});

describe('Inheritance', () => {

    class CustomError extends Err {
        test() {
            return 'test';
        }
    }

    it('creates new instance of error with default values', (done) => {
        const e = new CustomError();
        expect(e).instanceOf(CustomError);
        expect(e).instanceOf(Err);
        expect(e).instanceOf(Error);
        expect(e).to.have.all.keys(['message', 'code']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal('Unknown error');
        expect(e.code).to.be.equal('ERR_UNKNOWN');
        expect(e.test()).to.be.equal('test');
        done();
    });

    it('creates new instance of error with string message', (done) => {
        const e = new CustomError(MESSAGE);
        expect(e).instanceOf(CustomError);
        expect(e).to.be.instanceOf(Err);
        expect(e).to.be.instanceOf(Error);
        expect(e).to.have.all.keys(['message', 'code']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(MESSAGE);
        expect(e.code).to.be.equal('ERR_UNKNOWN');
        expect(e.test()).to.be.equal('test');
        done();
    });

    it('creates new instance of error with string message and code', (done) => {
        const e = new CustomError(MESSAGE, CODE);
        expect(e).instanceOf(CustomError);
        expect(e).to.be.instanceOf(Err);
        expect(e).to.be.instanceOf(Error);
        expect(e).to.have.all.keys(['message', 'code']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(MESSAGE);
        expect(e.code).to.be.equal('ERR_TEST');
        expect(e.test()).to.be.equal('test');
        done();
    });

    it('creates new instance of error with string message, code and payload', (done) => {
        const e = new CustomError(MESSAGE, CODE, PAYLOAD);
        expect(e).instanceOf(CustomError);
        expect(e).to.be.instanceOf(Err);
        expect(e).to.be.instanceOf(Error);
        expect(e).to.have.all.keys(['message', 'code', 'field']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(MESSAGE);
        expect(e.code).to.be.equal('ERR_TEST');
        expect(e.field).to.be.equal('test');
        expect(e.test()).to.be.equal('test');
        done();
    });

    it('creates new instance of error with string message, code and payload which have message key', (done) => {
        const e = new CustomError(MESSAGE, CODE, Object.assign(PAYLOAD, { message: 'Invalid message' }));
        expect(e).instanceOf(CustomError);
        expect(e).to.be.instanceOf(Err);
        expect(e).to.be.instanceOf(Error);
        expect(e).to.have.all.keys(['message', 'code', 'field']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(MESSAGE);
        expect(e.code).to.be.equal('ERR_TEST');
        expect(e.field).to.be.equal('test');
        expect(e.test()).to.be.equal('test');
        done();
    });
});

describe('Throwable', () => {
    it('throws the error instance', (done) => {
        try {
            throw new Err(MESSAGE, CODE, PAYLOAD);
        } catch (e) {
            expect(e).to.be.instanceOf(Err);
            expect(e).to.be.instanceOf(Error);
            expect(e).to.have.all.keys(['message', 'code', 'field']);
            expect(e.stack).to.be.a('string');
            expect(e.message).to.be.equal(MESSAGE);
            expect(e.code).to.be.equal('ERR_TEST');
            expect(e.field).to.be.equal('test');
            done();
        }
    });
});