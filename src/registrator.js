export default class Registrator {

    constructor() {
        this._codes = {};
    }

    register(SmartError, code, message, payload, description = null) {
        if (this._codes[code]) {
            console.error(`Error with code '${code}' is already registered.`);
            return;
        }
        this._codes[code] = {
            code: code,
            description: description,
            function: (m = message, p = payload) => {
                return new SmartError(m, code, p);
            }
        }
        Object.defineProperty(SmartError, code, {
            get: () => this._call(code, SmartError),
            enumerable: true,
            configurable: true
        });
    }

    unregister(SmartError, code) {
        if (!this._codes[code]) {
            console.error(`Error with code '${code}' is not registered.`);
            return;
        }
        delete this._codes[code];
        delete SmartError[code];
    }

    codes() {
        return Object.keys(this._codes);
    }

    docs() {
        const o = {};
        for (let code in this._codes) {
            o[code] = {
                description: this._codes[code].description
            }
        }
        return o;
    }

    _call(code, SmartError) {
        return this._codes[code].function;
    }
}