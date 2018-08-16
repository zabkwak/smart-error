declare module 'smart-error' {

    export default class SmartError extends Error {

        /**
         * Registers the error to the object. The code is accesible as the object's function with message and payload fields.
         * 
         * @param code Code of the error.
         */
        static register(code: string): void;
        /**
         * Registers the error to the object. The code is accesible as the object's function with message and payload fields.
         * @param code Code of the error.
         * @param message Default message of the error.
         */
        static register(code: string, message: string): void;
        /**
         * Registers the error to the object. The code is accesible as the object's function with message and payload fields.
         * @param code Code of the error.
         * @param message Default message of the error.
         * @param payload Default payload of the error.
         */
        static register(code: string, message: string, payload: { [key: string]: any }): void;
        /**
         * Registers the error to the object. The code is accesible as the object's function with message and payload fields.
         * @param code Code of the error.
         * @param message Default message of the error.
         * @param payload Default payload of the error.
         * @param description Description of the error.
         */
        static register(code: string, message: string, payload: { [key: string]: any }, description: string): void;

        /**
         * Removes the error from th object.
         * @param code Code of the error.
         */
        static unregister(code: string): void;

        /**
         * List of all registered error codes.
         */
        static codes: string[];

        /**
         * Documentation of all registered error codes.
         */
        static docs: {
            [code: string]: {
                /** Description of the error. */
                description: string
            }
        };        

        /** 
         * Message of the error.
         */
        message: string;
        /**
         * Code of the error.
         */
        code: string;
        /**
         * Stack trace of the error.
         */
        stack: string;

        /**
         * Creates new instance from the standard node.js Error.
         * @param error Error instance.
         */
        constructor(error: Error);
        /**
         * Creates new instance from the SmartError instance.
         * @param error SmartError instance.
         */
        constructor(error: SmartError);
        /**
         * Creates new instance from the error object.
         * @param error Defined error object.
         */
        constructor(error: { message: string, code?: string, payload?: { [key: string]: any } });
        /**
         * Creates new instance with defined message. Code is set to default `ERR_UNKNOWN`.
         * @param message Message of the error.
         */
        constructor(message: string);
        /**
         * Creates new instance with defined message and code. 
         * The code is prefixed with the `ERR_` and upper-cased.
         * @param message Message of the error.
         * @param code Code of the error.
         */
        constructor(message: string, code: string);
        /**
         * Creates new instance with defined message, code and payload. 
         * The code is prefixed with the `ERR_` and upper-cased. 
         * The payload's fields are defined as instance properties.
         * @param message Message of the error.
         * @param code Code of the error.
         * @param payload Additional error data.
         */
        constructor(message: string, code: string, payload: { [key: string]: any });

        /**
         * Creates a copy of the instance.
         */
        clone(): SmartError;

        /**
         * Converts the instance to the JSON object.
         */
        toJSON(): { message: string, code: string };

        /**
         * Converts the instance to the JSON object.
         * @param stack If true the stack trace is added to the object.
         */
        toJSON(stack: boolean): { message: string, code: string, stack?: string };
    }
}