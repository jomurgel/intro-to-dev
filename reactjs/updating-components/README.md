# Updating our Class Components to Functional Components
Now that we've learned the basics we're going to convert our existing app from using Class components to Functional components and take advantage of React Hooks to improve the function and keep the code more [DRY](*https://www.drycode.io/).

## Table of Contents
- [Getting Started](#getting-started)
- [Table.js](#tablejs);
- [App.js](#appjs);
- [Adding a Few More](#adding-a-few-more)

## Getting started
Hopefully by this point you've learned everything you might need to to convert a class component (of which we have two so far) to a functional component. The `Title` component should be easy, but our `App.js` component may be a bit more challenging.

Let's dig in.

## Title.js
Let's start with the `Title.js` component. Right now we have a simple Class component with a prop type for 'text', required, and a render metho returning some value.

``` js
import React from 'react';
import PropTypes from 'prop-types';

export default class Title extends React.Component {
	/**
	 * Set initial props.
	 * @type {object}

	 */
	static propTypes = {
		text: PropTypes.string.isRequired,
	};

	render() {
		return <h1>{this.props.text}</h1>;
	}
}
```

So let's pull out our propTypes and change up our export statment to make converting this to a functional component easier.

```js
import React from 'react';
import PropTypes from 'prop-types';

class Title extends React.Component {
	render() {
		return <h1>{this.props.text}</h1>;
	}
}

/**
 * Set initial props.
 * @type {object}

	*/
Title.propTypes = {
	text: PropTypes.string.isRequired,
};

export default Title;
```

The only thing we have to do now is replace our class object. Everything else will remain. Remember, unlike a class component, we don't need a render method or any other lifecycle methods and can call props directly as an argument inside our function declaration.

All said and done we have something like this.

``` js
import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ text }) => <h1>{text}</h1>;

/**
 * Set initial props.
 * @type {object}

	*/
Title.propTypes = {
	text: PropTypes.string.isRequired,
};

export default Title;
```

Let's take a look at the funtion specifically to make sure we understand what wev'e done here.

``` js
const Title = ({ text }) => <h1>{text}</h1>;
```

Instead of extending a class, we just declare a function using the ES6 syntax `() => {}` arrow function and give it a name. In this case our variable is captial `T` Title, to match our original class name. And remember we can just return our markup instead of having a return statment since we don't need to add any additional functions or variables in our function.

When using a functional component like this the argument that is available to our function by default is `props` so for `({ text })` we're [destructuring props](https://medium.com/@lcriswell/destructuring-props-in-react-b1c295005ce0) to only pull out what we need.

We can look at props as the object it is. In this case our `Title` component's props object looks like this:

``` js
props = {
  text: 'Some Value',
}
```

So destructuring like `{ text }` is just reerencing that key value directly from within the object.

Below are two examples of ways that you could do the same thing for clarity, but destructuring right inside the function parenthesis is far easier to parse than 

### Option 1
This options just references props directly, and then text inside that props via `props.text`

``` js
const Title = (props) => <h1>{props.text}</h1>;
```

### Option 2
``` js
const Title = (props) => {
  const {
    text
  } = props;
  return <h1>{text}</h1>;
}
```

That was pretty simple, but let's move to `App.js` and utilize some React Hooks to convert the class.

## App.js


## Adding a Few More
