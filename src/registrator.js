/**
 * Class for registration of errors.
 */
export default class Registrator {

    constructor() {
        this._codes = {};
    }

    /**
     * Registers the error to the SmartError object. The code is accesible as the object's function with message and payload fields.
     * 
     * @param {SmartError} SmartError 
     * @param {string} code 
     * @param {string} message 
     * @param {Object} payload 
     * @param {string} description 
     */
    register(SmartError, code, message, payload, description = null) {
        if (this._codes[code]) {
            console.error(`Error with code '${code}' is already registered.`);
            return;
        }
        this._codes[code] = {
            code: code,
            description: description,
            function: (m = message, p = payload) => new SmartError(m, code, p)
        }
        Object.defineProperty(SmartError, code, {
            get: () => this._call(code, SmartError),
            enumerable: true,
            configurable: true
        });
    }

    /**
     * Removes the error from the SmartError object.
     * 
     * @param {SmartError} SmartError 
     * @param {string} code 
     */
    unregister(SmartError, code) {
        if (!this._codes[code]) {
            console.error(`Error with code '${code}' is not registered.`);
            return;
        }
        delete this._codes[code];
        delete SmartError[code];
    }

    /**
     * Gets all registered codes as an array.
     * 
     * @returns {string[]}
     */
    codes() {
        return Object.keys(this._codes);
    }

    /**
     * @typedef DocsObject
     * @property {object} [code]
     * @param {string} code.description
     */
    /**
     * Gets the documentation of the registered error.
     * 
     * @returns {DocsObject}
     */
    docs() {
        const o = {};
        for (let code in this._codes) {
            o[code] = {
                description: this._codes[code].description
            }
        }
        return o;
    }

    /**
     * Calls the registered function.
     * 
     * @param {string} code 
     * @param {SmartError} SmartError 
     */
    _call(code, SmartError) {
        return this._codes[code].function;
    }
}