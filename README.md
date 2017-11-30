# SmartError
Subclass of Node.js [Error](https://nodejs.org/api/errors.html#errors_class_system_error) for unification of errors.  

The instance has `message` and `code` attributes for recognizing the error type and base info about the Error. The constructor accepts the `payload` field which is parsed as instance's attributes.

## Installation
```bash
$ npm install smart-error
```

## Usage
```javascript
// This will override default Node.js Error
import Error from 'smart-error';

// It throws the catchable error
throw new Error('User already exists in database', 'existing_user', { email: 'test@test.com' });
// The fields are 
//  message -> User already exists in database
//  code -> ERR_EXISTING_USER
//  email -> test@test.com
```

## Classes

<dl>
<dt><a href="#SmartError">SmartError</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#register">register(SmartError, code, message, payload, description)</a></dt>
<dd><p>Registers the error to the SmartError object. The code is accesible as the object&#39;s function with message and payload fields.</p>
</dd>
<dt><a href="#unregister">unregister(SmartError, code)</a></dt>
<dd><p>Removes the error from the SmartError object.</p>
</dd>
<dt><a href="#codes">codes()</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Gets all registered codes as an array.</p>
</dd>
<dt><a href="#docs">docs()</a> ⇒ <code><a href="#DocsObject">DocsObject</a></code></dt>
<dd><p>Gets the documentation of the registered error.</p>
</dd>
<dt><a href="#_call">_call(code, SmartError)</a></dt>
<dd><p>Calls the registered function.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ErrorObject">ErrorObject</a></dt>
<dd></dd>
<dt><a href="#DocsObject">DocsObject</a></dt>
<dd></dd>
</dl>

<a name="SmartError"></a>

## SmartError
**Kind**: global class

* [SmartError](#SmartError)
    * [new SmartError(message, code, payload)](#new_SmartError_new)
    * _instance_
        * [.clone()](#SmartError+clone) ⇒ [<code>SmartError</code>](#SmartError)
        * [.toJSON(stack)](#SmartError+toJSON) ⇒ <code>Object</code>
        * [._getCode(code)](#SmartError+_getCode)
        * [._setPayload(payload)](#SmartError+_setPayload)
        * [._parsePayload(err)](#SmartError+_parsePayload) ⇒ <code>Object</code>
    * _static_
        * [.register(code, message, payload, description)](#SmartError.register)
        * [.unregister(code)](#SmartError.unregister)

<a name="new_SmartError_new"></a>

### new SmartError(message, code, payload)
Creates new instance of SmartError.


| Param | Type |
| --- | --- |
| message | <code>string</code> \| [<code>SmartError</code>](#SmartError) \| <code>Error</code> \| [<code>ErrorObject</code>](#ErrorObject) |
| code | <code>string</code> |
| payload | <code>Object</code> |

<a name="SmartError+clone"></a>

### smartError.clone() ⇒ [<code>SmartError</code>](#SmartError)
Clones current instance and creates new one.

**Kind**: instance method of [<code>SmartError</code>](#SmartError)
<a name="SmartError+toJSON"></a>

### smartError.toJSON(stack) ⇒ <code>Object</code>
Converts the instance to JSON object.

**Kind**: instance method of [<code>SmartError</code>](#SmartError)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| stack | <code>boolean</code> | <code>false</code> | If true the stack is added in the JSON object. |

<a name="SmartError+_getCode"></a>

### smartError._getCode(code)
Gets the upper cased error with ERR_ prefix from the code. If the code already has the prefix, the code is not altered.

**Kind**: instance method of [<code>SmartError</code>](#SmartError)

| Param | Type |
| --- | --- |
| code | <code>string</code> |

<a name="SmartError+_setPayload"></a>

### smartError._setPayload(payload)
Sets the payload fields as instance fields. Message, code and stack are ignored.

**Kind**: instance method of [<code>SmartError</code>](#SmartError)

| Param | Type |
| --- | --- |
| payload | <code>Object</code> |

<a name="SmartError+_parsePayload"></a>

### smartError._parsePayload(err) ⇒ <code>Object</code>
Parses the payload from the SmartError instance.

**Kind**: instance method of [<code>SmartError</code>](#SmartError)

| Param | Type |
| --- | --- |
| err | [<code>SmartError</code>](#SmartError) |

<a name="SmartError.register"></a>

### SmartError.register(code, message, payload, description)
Registers the error to the object. The code is accesible as the object's function with message and payload fields.

**Kind**: static method of [<code>SmartError</code>](#SmartError)

| Param | Type |
| --- | --- |
| code | <code>string</code> |
| message | <code>string</code> |
| payload | <code>object</code> |
| description | <code>string</code> |

<a name="SmartError.unregister"></a>

### SmartError.unregister(code)
Removes the error from th object.

**Kind**: static method of [<code>SmartError</code>](#SmartError)

| Param | Type |
| --- | --- |
| code | <code>string</code> |

<a name="register"></a>

## register(SmartError, code, message, payload, description)
Registers the error to the SmartError object. The code is accesible as the object's function with message and payload fields.

**Kind**: global function

| Param | Type | Default |
| --- | --- | --- |
| SmartError | [<code>SmartError</code>](#SmartError) |  |
| code | <code>string</code> |  |
| message | <code>string</code> |  |
| payload | <code>Object</code> |  |
| description | <code>string</code> | <code>null</code> |

<a name="unregister"></a>

## unregister(SmartError, code)
Removes the error from the SmartError object.

**Kind**: global function

| Param | Type |
| --- | --- |
| SmartError | [<code>SmartError</code>](#SmartError) |
| code | <code>string</code> |

<a name="codes"></a>

## codes() ⇒ <code>Array.&lt;string&gt;</code>
Gets all registered codes as an array.

**Kind**: global function
<a name="docs"></a>

## docs() ⇒ [<code>DocsObject</code>](#DocsObject)
Gets the documentation of the registered error.

**Kind**: global function
<a name="_call"></a>

## _call(code, SmartError)
Calls the registered function.

**Kind**: global function

| Param | Type |
| --- | --- |
| code | <code>string</code> |
| SmartError | [<code>SmartError</code>](#SmartError) |

<a name="ErrorObject"></a>

## ErrorObject
**Kind**: global typedef
**Properties**

| Name | Type |
| --- | --- |
| message | <code>string</code> |
| code | <code>string</code> |
| payload | <code>Object</code> |

<a name="DocsObject"></a>

## DocsObject
**Kind**: global typedef

| Param | Type |
| --- | --- |
| code.description | <code>string</code> |

**Properties**

| Name | Type |
| --- | --- |
| code | <code>object</code> |
