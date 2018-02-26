import util from 'util';

import Registrator from './registrator';

const DEFAULT_MESSAGE = 'Unknown error';
const DEFAULT_CODE = 'unknown';

const registrator = new Registrator();

class SmartError {


    /**
     * Registers the error to the object. The code is accesible as the object's function with message and payload fields.
     * 
     * @param {string} code 
     * @param {string} message 
     * @param {object} payload 
     * @param {string} description 
     */
    static register(code, message = DEFAULT_MESSAGE, payload = {}, description = null) {
        registrator.register(this, code, message, payload, description);
    };

    /**
     * Removes the error from th object.
     * 
     * @param {string} code 
     */
    static unregister(code) {
        registrator.unregister(this, code);
    };

    static get codes() {
        return registrator.codes();
    }

    static get docs() {
        return registrator.docs();
    }

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
        let nodeError = null;
        if (message instanceof Error) {
            nodeError = message;
        }
        if (message instanceof this.constructor) {
            const err = message;
            message = err.message;
            code = err.code;
            payload = this._parsePayload(err);
        } else if (typeof message === 'object') {
            const err = message;
            message = err.message || DEFAULT_MESSAGE;
            code = err.code || code;
            payload = err.payload || payload;
        }
        this.message = message;
        this.code = this._getCode(code);
        this._setPayload(payload);
        if (nodeError) {
            Object.defineProperty(this, 'stack', {
                configurable: true,
                value: nodeError.stack
            });
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
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
     * Converts the instance to JSON object. 
     * 
     * @param {boolean} stack If true the stack is added in the JSON object.
     * @returns {Object}
     */
    toJSON(stack = false) {
        const a = [];
        if (!stack) {
            a.push('stack');
        }
        const o = {};
        for (let k in this) {
            if (a.indexOf(k) >= 0) {
                continue;
            }
            o[k] = this[k];
        }
        if (stack) {
            o.stack = this.stack;
        }
        return o;
    }

    /**
     * Gets the upper cased error with ERR_ prefix from the code. If the code already has the prefix, the code is not altered.
     * 
     * @param {string} code 
     */
    _getCode(code) {
        if (typeof code !== 'string') {
            code = code.toString();
        }
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