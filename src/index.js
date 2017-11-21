const util = require('util');

const DEFAULT_MESSAGE = 'Unknown error';
const DEFAULT_CODE = 'unknown';

class Err {
    
    constructor(message = DEFAULT_MESSAGE, code = DEFAULT_CODE, payload = {}) {
        if (message instanceof this.constructor) {
            const err = message;
            this.message = err.message;
            this.code = err.code;
        } else {
            if (message instanceof Error) {
                const err = message;
                this.message = err.message || DEFAULT_MESSAGE;
            } else if (typeof message === 'object') {
                const err = message;
                this.message = err.message || DEFAULT_MESSAGE;
                this.code = err.code;
            } else {
                this.message = message;
            }
        }
        this.code = this._getCode(code);
        this._captureStackTrace();
    }

    _getCode(code) {
        if (this.code) {
            return this.code;
        }
        return 'ERR_' + code.toLowerCase().replace(/err_/, '').toUpperCase();
    }

    _captureStackTrace() {
        Error.captureStackTrace(this, this.constructor);
    }
}

util.inherits(Err, Error);

module.exports = Err;