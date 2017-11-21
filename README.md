# SmartError



## Installation

```bash
$ npm install smart-error
```

## Classes

<dl>
<dt><a href="#SmartError">SmartError</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ErrorObject">ErrorObject</a></dt>
<dd></dd>
</dl>

<a name="SmartError"></a>

## SmartError
**Kind**: global class

* [SmartError](#SmartError)
    * [new SmartError(message, code, payload)](#new_SmartError_new)
    * [.clone()](#SmartError+clone) ⇒ [<code>SmartError</code>](#SmartError)
    * [._getCode(code)](#SmartError+_getCode)
    * [._setPayload(payload)](#SmartError+_setPayload)
    * [._parsePayload(err)](#SmartError+_parsePayload) ⇒ <code>Object</code>

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

<a name="ErrorObject"></a>

## ErrorObject
**Kind**: global typedef
**Properties**

| Name | Type |
| --- | --- |
| message | <code>string</code> |
| code | <code>string</code> |
| payload | <code>Object</code> |
