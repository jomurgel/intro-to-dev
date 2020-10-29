# Javascript Functions
In order to have a good understanding of how one could use React proficiently you must have a good understanding of Javascript. I'd recommend checking out the [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript) or [W3Schools](https://www.w3schools.com/js/js_functions.asp) to get a good overview of JS and JS functions, but we're going to get into some basics below.

## Table of Contents
- [What is a function?](#what-is-a-function)
- [Why use functions?](#why-use-functions)
- [Naming conventions](#naming-conventions)
- [ES5 vs ES6+ functions](#es5j-vs-es6-functions)
- [Understanding language similarities](#understanding-language-similarities)
- [Using params and variables](#using-params-and-variables)

## What is a function?
- Functions are subprograms designed to perform a task.
- Functions are executed when they are called. This is referred to as _invoking_ a functions.
  - Functions are only referred to without the terminating `()` and _invoked_ with the terminating `()`. For example: `myFunction` is an function object reference, while `myFunction()` will be executed.
- Functions can be used inside functions.
- Functions accept parameters which can be passed through to the function.
- Functions expect a return value, at which point the function will cease function.
- Functions are objects.

## Why use functions?
- Like React Components, JavaScript functions provide resusable and extendable bits of code.
- Functions can serve to transform, manipulate, or migrate data throughout your code.
- Writing reusable bits of code is cleaner and easier to understand vs inline data manipulation.

## Naming conventions
- Functions, unlike React components, should be named using the `camelCase` naming convention
- Function names should be descriptive to explain what they are used for at a glance
  - I'd recommed [this article](https://dmitripavlutin.com/coding-like-shakespeare-practical-function-naming-conventions/) for some tips about naming conventions and the importance of readability.
  - `addItem()` or `handleClick()` for example.
- Avoid placeholder or generic function names like `click()` or `foo()` which do not explain what they do, and may also conflict with core functions.
- Provide parameters in comma-separated list, eg. `functionName(param1, param2, param3)` etc.
- Document your functions with [docBlocks](https://jsdoc.app/) or in project READMEs.

## ES5 vs ES6+ Functions
ES6 introduced arrow function as an additional way to write functions in JavaScript, but it does not outright replace an ES5 function syntax.

An ES5 function looks like this:

```js
function handleFunction() {
  return 'Some Value';
}
```

An ES6+ arrow function looks like this, which accomplishes the same thing:

```js
const handleFunction = () => 'Some Value';
```

We've seen this before back in [What is React](../what-is-react/README.md), but let's dig into it a little deeper.

The obvious difference, other than the syntax, is that the ES5 function can be defined by calling `function` followed by the function name while ES6 functions are saved to a variable to be called later.

This was done in a code reduction effort in future Ecmascript versions.

As a note, if we're passing a single param, depending on the code standards, the function parens can be omitted, for example:

```js
const handleFunction = (name) => `hello ${name}`;
```

is the same as

```js
const handleFunction = name => `hello ${name}`;
```

If more than one param is in use the parens are required.

The other main difference between ES5 and ES6+ functions is the handling of `this`. Arrow functions has no binding to `this`. So in our ES5 example above `this` could be called to reference the object that called the function, being the window or document or button, etc. This in an arrow function will _always_ represent the object that defined the arrow function.

The trade off here is that if you need to reference an item that the window object has access to, or the document (query a div, for example) you would need to query it directly inside an arrow function where you may have access to it already using a standard ES5 function. 9/10, however, an arrow function tends to be the best option.

## Understanding language similaritis
You may be coming from having a basis in another language so below are some examples of functions in different languages that accomplish the same thing to provide a sort of Rosetta Stone for JavaScript functions.

### Javascript / Typescript
``` js
const handleFunction = () => 'Some Value';
```

### Python
``` python
def handle_function():
  return 'Some Value'
```

### Ruby
``` ruby
def handle_function
  return 'Some Value'
end
```

### Java
```java
static void handle_function() {
  System.out.println("Some Value");
}
```

You can see that the general structure is nearly the same. Definition of some method with a unique name and the return of some value at the end.

## Using params and variables
As noted above functions can have params that can be passed to them when invoked. For example if I wanted a generic function that would output a name like this:

```js
const handleNameOutput = (name) => `My name is ${name}!`;
```

We would call the function like:

```js
handleNameOutput('My Name String');
```

Which would output:

```js
// My name is My Name String!
```

Easy.

Perhaps we want to have some function to output a value that multiplies our initial value, but we want use some pre-defined value inside the function, we could take advantage of a local variable. Local to the function like this:

```js
const handleIncrement = (int) => {
  const base = 50;
  return int * 2 + 50;
}
```

Which we could use like this:

```js
handleIncrement(10);
```

Which would output:

```js
// 150
```

Local variables are created when the function in invoked and are removed one the function value is returned ensuring that the value does not affect anything outside of the scope of the function.

## Summation
We talked through this only because functions in the form of click/event handlers, service functions for manipulating data, and utility functions for providing reusable sets of features are important in building a clean and efficient code base. We will be talking about the importance of [DRY](https://www.drycode.io/) code in a future module [Upgrading to Functional Components](../updating-components/README.md).