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
Our main app component is more complext, but essentially the same thing with a few more elements to consider. Right now our component looks like this:

``` js
import React from 'react';
import Title from './Title';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDark: false,
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    this.setState({ isDark: ! this.state.isDark });
  }

  render() {
    return (
      <div>
        <button
          onClick={() => this.handleButtonClick()}
          type="button"
        >
          {this.state.isDark ? 'Toggle to Light' : 'Toggle to Dark'}
        </button>
        <Title text={this.state.isDark ? 'This is a Dark Prop!' : 'This is a Light Prop!'} />
        <div>Hello World</div>
      </div>
    );
  }
}
```

We have a class with a constructor, state, a function for handling the button click, and a render method.

Let's do the same thing we did in our [Title.js](#titlejs) component and move that export function.

``` js
import React from 'react';
import Title from './Title';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDark: false,
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    this.setState({ isDark: ! this.state.isDark });
  }

  render() {
    return (
      <div>
        <button
          onClick={() => this.handleButtonClick()}
          type="button"
        >
          {this.state.isDark ? 'Toggle to Light' : 'Toggle to Dark'}
        </button>
        <Title text={this.state.isDark ? 'This is a Dark Prop!' : 'This is a Light Prop!'} />
        <div>Hello World</div>
      </div>
    );
  }
}

export default App;
```

We don't have props to worry about yet, but this just puts us in the same spot to where we'll replace our class component `App` with a function called `App`.

So from the top we'll start with replacing `class App extends React.Component {` with `const App = () => {`

Now we immediatly run into the constructor. So we remember that we need the constructor to access props, and then define state and bind our handlers. In a functional component inner functions are bound to our function or can be broken out, and state can be handled with `useState`.

So we'll continue on and replace our constructor with a `useState` declaration for `isDark`. Remember that, along with React, we'll need to import `useState`.

So this:
``` js
import React from 'react';
import Title from './Title';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDark: false,
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }
```

Becomes this:
``` js
import React, { useState } from 'react';
import Title from './Title';

const App = () => {
  const [isDark, setThemeState] = useState(false);
```

So we create our `useState` variable defining `isDark` as our state variable, replacing `this.state.isDark` anywhere that will be used. We replace `this.setState` with `setThemeState` and when we call `useState` we define the deault, which we'll know from the class component is `false`.

Now our `handleButtonClick` function. We can either reuse and update that function or remove it infavor of an inline `onClick` function since our markup will be much cleaner.

While we're making update we'll remove our render method and update instances of `this.state.isDark` with `isDark` in the content.

Let's take a look at those two options:

### Option 1
``` js
import React, { useState } from 'react';
import Title from './Title';

const App = () => {
  const [isDark, setThemeState] = useState(false);

  return (
    <div>
      <button
        onClick={() => setThemeState(! isDark)}
        type="button"
      >
        {isDark ? 'Toggle to Light' : 'Toggle to Dark'}
      </button>
      <Title text={isDark ? 'This is a Dark Prop!' : 'This is a Light Prop!'} />
      <div>Hello World</div>
    </div>
  );
}

export default App;
```

### Option 2
``` js
import React, { useState } from 'react';
import Title from './Title';

const App = () => {
  const [isDark, setThemeState] = useState(false);

  const handleButtonClick = () => {
    setThemeState( ! isDark );
  }

  return (
    <div>
      <button
        onClick={handleButtonClick}
        type="button"
      >
        {isDark ? 'Toggle to Light' : 'Toggle to Dark'}
      </button>
      <Title text={isDark ? 'This is a Dark Prop!' : 'This is a Light Prop!'} />
      <div>Hello World</div>
    </div>
  );
}

export default App;
```

The first option is cleaner since our click handler function is only toggling the value of state there. This would be my recommendation if this toggle was only being used in once place. But if that button did other things or we wanted to add a similar toggle in other places in this component I would suggest going with option 2 since it creates a reusable function to avoid multiple declarations of the `setThemeState` and therefore creates one place to modify behavior rather than tracking down all instances of the setter.

This is much more DRY any way you slice it.

## Adding a Few More
Now that we've converted our app to be inline with best and modern practices, let's get our little one-page site prepped to receive some other elements and other data so we can take advantage of the Context API in the next module, and output something a little nicer on the frontend.

