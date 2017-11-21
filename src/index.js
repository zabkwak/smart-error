const util = require('util');

const DEFAULT_MESSAGE = 'Unknown error';
const DEFAULT_CODE = 'unknown';

class SmartError {

    /**
     * @typedef ErrorObject
     * @property {string} message
     * @property {string} code
     * @property {Object} payload
     */
    /**
     * Creates new instance of SmartError.
     * 
     * @param {string|SmartError|Error|ErrorObject} message 
     * @param {string} code 
     * @param {Object} payload 
     */
    constructor(message = DEFAULT_MESSAGE, code = DEFAULT_CODE, payload = {}) {
        if (message instanceof this.constructor) {
            const err = message;
            this.message = err.message;
            code = err.code;
            payload = this._parsePayload(err);
        } else if (message instanceof Error) {
            const err = message;
            this.message = err.message || DEFAULT_MESSAGE;
        } else if (typeof message === 'object') {
            const err = message;
            this.message = err.message || DEFAULT_MESSAGE;
            code = err.code || DEFAULT_CODE;
            payload = err.payload;
        } else {
            this.message = message;
        }
        this.code = this._getCode(code);
        this._setPayload(payload);
        Error.captureStackTrace(this, this.constructor);
    }

    /**
     * Clones current instance and creates new one.
     * 
     * @returns {SmartError}
     */
    clone() {
        return new this.constructor(this);
    }

    /**
     * Gets the upper cased error with ERR_ prefix from the code. If the code already has the prefix, the code is not altered.
     * 
     * @param {string} code 
     */
    _getCode(code) {
        if (code.toLowerCase().indexOf('err_') === 0) {
            return code.toUpperCase();
        }
        return `ERR_${code.toUpperCase()}`;
    }

    /**
     * Sets the payload fields as instance fields. Message, code and stack are ignored.
     * 
     * @param {Object} payload 
     */
    _setPayload(payload) {
        for (let k in payload) {
            if (['message', 'code', 'stack'].indexOf(k) >= 0) {
                continue;
            }
            this[k] = payload[k];
        }
    }

    /**
     * Parses the payload from the SmartError instance.
     * 
     * @param {SmartError} err 
     * @returns {Object}
     */
    _parsePayload(err) {
        const o = {};
        for (let k in err) {
            if (['message', 'code', 'stack'].indexOf(k) >= 0) {
                continue;
            }
            o[k] = err[k];
        }
        return o;
    }
}

util.inherits(SmartError, Error);

module.exports = SmartError;