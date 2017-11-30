import Err from '../src';

const expect = require('chai').expect;

const MESSAGE = 'Test Error';
const CODE = 'test';
const PAYLOAD = { field: 'test' };
const DESCRIPTION = 'Test error for tests';
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

    it('creates new instance of error with nodejs Error instance with code property', (done) => {
        const err = new Error(MESSAGE);
        err.code = 'ERR_TEST';
        const e = new Err(err);
        expect(e).to.be.instanceOf(Err);
        expect(e).to.be.instanceOf(Error);
        expect(e).to.have.all.keys(['message', 'code']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(MESSAGE);
        expect(e.code).to.be.equal('ERR_TEST');
        done();
    });

    it('creates new instance of error with nodejs Error instance with code property and payload', (done) => {
        const err = new Error(MESSAGE);
        err.code = 'ERR_TEST';
        err.payload = PAYLOAD;
        const e = new Err(err);
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

    it('converts the error to JSON using JSON.stringify without stack and without payload', (done) => {
        const e = new Err(MESSAGE, CODE);
        const s = JSON.stringify({ message: MESSAGE, code: 'ERR_TEST' });
        expect(JSON.stringify(e)).to.be.equal(s);
        done();
    });

    it('converts the error to JSON using JSON.stringify without stack', (done) => {
        const e = new Err(MESSAGE, CODE, PAYLOAD);
        const s = JSON.stringify({ message: MESSAGE, code: 'ERR_TEST', field: 'test' });
        expect(JSON.stringify(e)).to.be.equal(s);
        done();
    });

    it('converts the error to JSON with stack', (done) => {
        const e = new Err(MESSAGE, CODE);
        const parsed = e.toJSON(true);
        expect(parsed).to.have.all.keys(['message', 'code', 'stack']);
        expect(parsed.stack).to.be.a('string');
        expect(parsed.message).to.be.equal(MESSAGE);
        expect(parsed.code).to.be.equal('ERR_TEST');
        done();
    });

    it('converts the error to JSON with stack and payload', (done) => {
        const e = new Err(MESSAGE, CODE, PAYLOAD);
        const parsed = e.toJSON(true);
        expect(parsed).to.have.all.keys(['message', 'code', 'field', 'stack']);
        expect(parsed.stack).to.be.a('string');
        expect(parsed.message).to.be.equal(MESSAGE);
        expect(parsed.code).to.be.equal('ERR_TEST');
        expect(e.field).to.be.equal('test');
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

describe('Registration of errors', () => {

    it('registers the error with defined message and payload and calls it with default attributes', (done) => {
        Err.register(CODE, MESSAGE, PAYLOAD);
        expect(Err).to.have.all.keys(['register', 'super_', 'unregister', CODE]);
        expect(Err.codes.length).to.be.equal(1);
        const e = Err[CODE]();
        expect(e).to.be.instanceOf(Err);
        expect(e).to.be.instanceOf(Error);
        expect(e).to.have.all.keys(['message', 'code', 'field']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(MESSAGE);
        expect(e.code).to.be.equal('ERR_TEST');
        expect(e.field).to.be.equal('test');
        Err.unregister(CODE);
        expect(Err).to.have.all.keys(['register', 'super_', 'unregister']);
        expect(Err.codes.length).to.be.equal(0);
        done();
    });

    it('registers the error with defined message and payload and calls it with custom attributes', (done) => {
        Err.register(CODE, MESSAGE, PAYLOAD);
        expect(Err).to.have.all.keys(['register', 'super_', 'unregister', CODE]);
        expect(Err.codes.length).to.be.equal(1);
        const e = Err[CODE]('Custom message', { statusCode: 500 });
        expect(e).to.be.instanceOf(Err);
        expect(e).to.be.instanceOf(Error);
        expect(e).to.have.all.keys(['message', 'code', 'statusCode']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal('Custom message');
        expect(e.code).to.be.equal('ERR_TEST');
        expect(e.statusCode).to.be.equal(500);
        Err.unregister(CODE);
        expect(Err).to.have.all.keys(['register', 'super_', 'unregister']);
        expect(Err.codes.length).to.be.equal(0);
        done();
    });

    it('registers the error with defined message and payload and calls it with custom message', (done) => {
        Err.register(CODE, MESSAGE, PAYLOAD);
        expect(Err).to.have.all.keys(['register', 'super_', 'unregister', CODE]);
        expect(Err.codes.length).to.be.equal(1);
        const e = Err[CODE]('Custom message');
        expect(e).to.be.instanceOf(Err);
        expect(e).to.be.instanceOf(Error);
        expect(e).to.have.all.keys(['message', 'code', 'field']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal('Custom message');
        expect(e.code).to.be.equal('ERR_TEST');
        expect(e.field).to.be.equal('test');
        Err.unregister(CODE);
        expect(Err).to.have.all.keys(['register', 'super_', 'unregister']);
        expect(Err.codes.length).to.be.equal(0);
        done();
    });

    it('registers the error with defined message in registration and calls it with default attributes', (done) => {
        Err.register(CODE, MESSAGE);
        expect(Err).to.have.all.keys(['register', 'super_', 'unregister', CODE]);
        expect(Err.codes.length).to.be.equal(1);
        const e = Err[CODE]();
        expect(e).to.be.instanceOf(Err);
        expect(e).to.be.instanceOf(Error);
        expect(e).to.have.all.keys(['message', 'code']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(MESSAGE);
        expect(e.code).to.be.equal('ERR_TEST');
        Err.unregister(CODE);
        expect(Err).to.have.all.keys(['register', 'super_', 'unregister']);
        expect(Err.codes.length).to.be.equal(0);
        done();
    });

    it('registers the error with defined message in registration and calls it with custom attributes', (done) => {
        Err.register(CODE, MESSAGE);
        expect(Err).to.have.all.keys(['register', 'super_', 'unregister', CODE]);
        expect(Err.codes.length).to.be.equal(1);
        const e = Err[CODE]('Custom message', { statusCode: 500 });
        expect(e).to.be.instanceOf(Err);
        expect(e).to.be.instanceOf(Error);
        expect(e).to.have.all.keys(['message', 'code', 'statusCode']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal('Custom message');
        expect(e.code).to.be.equal('ERR_TEST');
        expect(e.statusCode).to.be.equal(500);
        Err.unregister(CODE);
        expect(Err).to.have.all.keys(['register', 'super_', 'unregister']);
        expect(Err.codes.length).to.be.equal(0);
        done();
    });

    it('registers the error with defined message in registration and calls it with custom message', (done) => {
        Err.register(CODE, MESSAGE);
        expect(Err).to.have.all.keys(['register', 'super_', 'unregister', CODE]);
        expect(Err.codes.length).to.be.equal(1);
        const e = Err[CODE]('Custom message');
        expect(e).to.be.instanceOf(Err);
        expect(e).to.be.instanceOf(Error);
        expect(e).to.have.all.keys(['message', 'code']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal('Custom message');
        expect(e.code).to.be.equal('ERR_TEST');
        Err.unregister(CODE);
        expect(Err).to.have.all.keys(['register', 'super_', 'unregister']);
        expect(Err.codes.length).to.be.equal(0);
        done();
    });

    it('registers the error without defined message in registration and calls it with default attributes', (done) => {
        Err.register(CODE);
        expect(Err).to.have.all.keys(['register', 'super_', 'unregister', CODE]);
        expect(Err.codes.length).to.be.equal(1);
        const e = Err[CODE]();
        expect(e).to.be.instanceOf(Err);
        expect(e).to.be.instanceOf(Error);
        expect(e).to.have.all.keys(['message', 'code']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(DEFAULT_MESSAGE);
        expect(e.code).to.be.equal('ERR_TEST');
        Err.unregister(CODE);
        expect(Err).to.have.all.keys(['register', 'super_', 'unregister']);
        expect(Err.codes.length).to.be.equal(0);
        done();
    });

    it('registers the error without defined message in registration and calls it with custom attributes', (done) => {
        Err.register(CODE);
        expect(Err).to.have.all.keys(['register', 'super_', 'unregister', CODE]);
        expect(Err.codes.length).to.be.equal(1);
        const e = Err[CODE]('Custom message', { statusCode: 500 });
        expect(e).to.be.instanceOf(Err);
        expect(e).to.be.instanceOf(Error);
        expect(e).to.have.all.keys(['message', 'code', 'statusCode']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal('Custom message');
        expect(e.code).to.be.equal('ERR_TEST');
        expect(e.statusCode).to.be.equal(500);
        Err.unregister(CODE);
        expect(Err).to.have.all.keys(['register', 'super_', 'unregister']);
        expect(Err.codes.length).to.be.equal(0);
        done();
    });

    it('registers the error without defined message in registration and calls it with custom message', (done) => {
        Err.register(CODE);
        expect(Err).to.have.all.keys(['register', 'super_', 'unregister', CODE]);
        expect(Err.codes.length).to.be.equal(1);
        const e = Err[CODE]('Custom message');
        expect(e).to.be.instanceOf(Err);
        expect(e).to.be.instanceOf(Error);
        expect(e).to.have.all.keys(['message', 'code']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal('Custom message');
        expect(e.code).to.be.equal('ERR_TEST');
        Err.unregister(CODE);
        expect(Err).to.have.all.keys(['register', 'super_', 'unregister']);
        expect(Err.codes.length).to.be.equal(0);
        done();
    });

    it('registers unsupported operation error', (done) => {
        const message = 'This operation is not supported';
        const code = 'unsupported_operation';
        Err.register(code, message);
        expect(Err).to.have.all.keys(['register', 'super_', 'unregister', code]);
        expect(Err.codes.length).to.be.equal(1);
        const e = Err.unsupported_operation();
        expect(e).to.be.instanceOf(Err);
        expect(e).to.be.instanceOf(Error);
        expect(e).to.have.all.keys(['message', 'code']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(message);
        expect(e.code).to.be.equal('ERR_UNSUPPORTED_OPERATION');
        Err.unregister(code);
        expect(Err).to.have.all.keys(['register', 'super_', 'unregister']);
        expect(Err.codes.length).to.be.equal(0);
        done();
    });

    // TODO test on inherited class
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

    it('registers error to the inherited class', (done) => {
        CustomError.register(CODE, MESSAGE, PAYLOAD);
        expect(CustomError).to.have.all.keys([CODE]);
        expect(CustomError.codes.length).to.be.equal(1);
        const e = CustomError[CODE]();
        expect(e).to.be.instanceOf(Err);
        expect(e).to.be.instanceOf(Error);
        expect(e).to.have.all.keys(['message', 'code', 'field']);
        expect(e.stack).to.be.a('string');
        expect(e.message).to.be.equal(MESSAGE);
        expect(e.code).to.be.equal('ERR_TEST');
        expect(e.field).to.be.equal('test');
        CustomError.unregister(CODE);
        expect(CustomError.codes.length).to.be.equal(0);
        done();
    });
});

describe('Docs', () => {

    it('registers the error and checks it\'s docs', (done) => {
        Err.register(CODE, MESSAGE, PAYLOAD, DESCRIPTION);
        expect(Err).to.have.all.keys(['register', 'super_', 'unregister', CODE]);
        expect(Err.codes.length).to.be.equal(1);
        expect(Err.docs).to.be.an('object');
        expect(Err.docs).to.have.all.keys([CODE]);
        expect(Err.docs[CODE]).to.have.all.keys(['description']);
        expect(Err.docs[CODE].description).to.be.equal(DESCRIPTION);
        Err.unregister(CODE);
        expect(Err).to.have.all.keys(['register', 'super_', 'unregister']);
        expect(Err.codes.length).to.be.equal(0);   
        expect(Err.docs).to.be.an('object');
        expect(Err.docs[CODE]).to.be.undefined;
        done();
    });
});

// TODO docs test