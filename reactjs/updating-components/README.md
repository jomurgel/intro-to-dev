# Updating our Class Components to Functional Components
Now that we've learned the basics we're going to convert our existing app from using Class components to Functional components and take advantage of React Hooks to improve the function and keep the code more [DRY](*https://www.drycode.io/).

## Table of Contents
- [Getting Started](#getting-started)
- [Table.js](#tablejs)
- [App.js](#appjs)
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

We're going add a `Content` component for some body content, a `Button` component to handle the button and talk through passing function references through to components, and setup a simple theme object to inherit.

In the `components` directory I'm going creat two new files:

``` bash
cd src/js/components && touch Button.js && touch Content.js
```

From there I'll add a simple component structure, the same or both.

``` js
import React from 'react';

const Content = () => <div>This is a Content Component</div>;

export default Content;
```

and

``` js
import React from 'react';

const Button = () => <div>This is a Button Component</div>;

export default Button
```

We'll be updating both of these with props and functions, so don't worry about the markup for now, but we're going to import these into our App.js file and we don't want the build to fail.

### Content.js
Our `Content` component will replace our `<div>Hello World</div>` element in our main app file. I just want to stress how important reusability is when it comes to React. I like to avoid markup inside of a parent element whenever possible. It makes the app feel more clean, and breaks things into more digestible chunks.

So let's import our `Content` component into our `App.js` file and replace our existing markup.

```js
import React, { useState } from 'react';

// Components.
import Content from './Content';
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
      <Content />
    </div>
  );
}

export default App;
```

Next let's take the button markup in our return function and add that to our `Button.js` file, and import that int our `App.js` file.

Our `Button.js` will end up looking like this:

``` js
import React from 'react';

const Button = () => (
  <button
    onClick={() => setThemeState(! isDark)}
    type="button"
  >
    {isDark ? 'Toggle to Light' : 'Toggle to Dark'}
  </button>
);

export default Button
```

And then we'll update our `App.js` file.

``` js
import React, { useState } from 'react';

// Components.
import Button from './Button';
import Content from './Content';
import Title from './Title';

const App = () => {
  const [isDark, setThemeState] = useState(false);

  return (
    <div>
      <Button />
      <Title text={isDark ? 'This is a Dark Prop!' : 'This is a Light Prop!'} />
      <Content />
    </div>
  );
}

export default App;
```

Now, you may find at this point that our app no longer renders. That is for two reasons.
1. `setThemeState` is defined in `App.js`, but is not used anywhere.
2. `isDark` and `setThemeState` is used in `Button.js`, but is not defined anywhere.

To fix that we're going to take advantage of `props` to pass those values through to the `Button` component.

Now, the thing we want to think about before we do this is where `isDark` might be consumed. Could we move the whole `useState` declaration into the `Button` component? In this case no. Why? Because we'll need the value of `isDark` at the root so that it's available to the children. If we were only ever going to toggle the button text or some value in the `Button` component, then yes, we should move that to the `Button` component to avoid [prop-drilling](https://kentcdodds.com/blog/prop-drilling).

So let's add, in `App.js` props to our button. One for `isDark` and one for `setThemeState`. Remember, `setThemeState` is a function, so we want to create a reference to the function and not initiate the function call, so we'll omit the `()` parens.

``` js
<Button
  isDark={isDark}
  setThemeState={setThemeState}
/>
```

For now I'm going to pass the values down using props with the same name for clarity, but the name of the prop could be anything.

Over in our `Button.js` partial, let's add our `props` and import and add a `propType` declaration and require these values.

``` js
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  isDark,
  setThemeState,
}) => (
  <button
    onClick={() => setThemeState(! isDark)}
    type="button"
  >
    {isDark ? 'Toggle to Light' : 'Toggle to Dark'}
  </button>
);

/**
 * Set initial props.
 *
 * @type {object}
 */
Button.propTypes = {
  isDark: PropTypes.bool.isRequired,
  setThemeState: PropTypes.func.isRequired,
};

export default Button
```

You should find that just by adding those props to the `<Button />` markup, will have fixed your app, but we still want to obviously use those values, but also add a `propTypes` declaration in order to have some sort of check in place build-wise, but also define that value for future devs.

### Content and Title
The `Content` and `Title` component need a little update. For the `Title` component, rather than passing down some string as text, let's handle the text in the component, but pass the value of `isDark` instead.

That update will look like this:

In `App.js`
``` js
<Title isDark={isDark} />
```

And in `Title.js` this:
``` js
import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ isDark }) => <h1>{isDark ? 'Dark Title' : 'Light Title!'}</h1>;

/**
 * Set initial props.
 *
 * @type {object}
 */
Title.propTypes = {
	isDark: PropTypes.bool.isRequired,
};

export default Title;
```

For the purposes of the demo, we're not going to pass any text through to the `Title` component, but we still want to take advantage of the value of `isDark`.

For our `Content.js` let's do the same.

``` js
<Content isDark={isDark} />
```

and
``` js
import React from 'react';
import PropTypes from 'prop-types';

const Content = ({ isDark }) => <p>{isDark ? 'This is Dark Content.' : 'This is light content.'}</p>;

/**
 * Set initial props.
 *
 * @type {object}
 */
Content.propTypes = {
	isDark: PropTypes.bool.isRequired,
};

export default Content;
```

At this point our `App.js` should look like this, and function the same as it did before.

``` js
import React, { useState } from 'react';

// Components.
import Button from './Button';
import Content from './Content';
import Title from './Title';

const App = () => {
  const [isDark, setThemeState] = useState(false);

  return (
    <div>
      <Button
        isDark={isDark}
        setThemeState={setThemeState}
      />
      <Title isDark={isDark} />
      <Content isDark={isDark} />
    </div>
  );
}

export default App;
```

Now we're reading to setup a style, add some more robust content, and take advantage of the Context API in order to make consuming data a little easier.
