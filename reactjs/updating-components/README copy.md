# Components
> Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. This page provides an introduction to the idea of components.

From [What is React](../what-is-react/README.md) we learned about Function/Functional and Class/Stateful Components. We built a simple React app in [Setting up a Local from Scratch](../setup/README.md#setup) which displays a `div` with some text. So let's start building that app out with React components.

## Table of Contents
- [Setup](#setup)
- [Our Goal](#our-goal)
- [Building Our First Component](#building-our-first-component)
- [Importing Our New Component](#importing-our-new-component)
- [Props](#props)
- [State](#state)

## Setup
For this we'll want to make sure that you've `cd` into the components lesson folder.

``` bash
cd reactjs/components
```

Here you'll find our app as we left it off. Run `npm install` and `npm run start` to spin up that app in browser.

## Our Goal
Before I get into building with components I should talk about our end goal here. Of course we're going to learn React, but we should do more than just understand how the parts work and build something functional.

Our goal will be to keep it simple. Together we'll attempt to gain an understanding of how React works in the real world, and hopefully a decent understanding of what might be expected of a new developer working with React. We'll be creating a simple Lorem Ipsum one-page app with a theme toggle.

This should give us a general understanding of the following principles/functionality:
- Props
- State
- JSX
- React Hooks
- Context API

The look and feel of this one-page app will be up to us, though we have access to custom CSS, [Styled Components](https://styled-components.com/), and pre-existing frameworks should we need or want them.

## Building Our First Component
Inside our `src`, and inside our `js` folder let's create a new folder called `components` and create one component and we'll just call the file `App.js` for now.

``` bash
cd src/js && mkdir components && cd components && touch App.js
```

So to clarify here we're moving into our `js` directory AND creating a new directory called `components` AND moving into that new directory AND creating a new file called `App.js`.

*NOTE: The typical convention for JavaScript naming is with `camelCase`, but with components, classes, or higher-order functions `PascalCase` should be used. This helps developers understand the intention at a glance. I would recommend [this article](https://www.robinwieruch.de/javascript-naming-conventions) for additional reading if interested.*

If we were to open our `index.js` file we created last lesson, we would see this:

```js
// Render the app in the DOM.
ReactDOM.render(
  <div>Hello World</div>,
  document.getElementById( 'root' ),
);
```

We want to replace the `<div>Hello World</div>` with a React component by creating it inside our `App.js` file we just created, import it into our `index.js` file, and calling that instead. The result should be the same, but this gives us more flexibility for the future.

So inside our `App.js` file let's import our dependency.

```js
import React from 'react';
```

We need to reference React in order to write for reach. This is important, and will result in build errors if we don't.

Next, let's create a new class component, just like we leanred in [What is React](../what-is-react/README.md#what-is-react) previously. Remember `render()` is the only required method here.

```js
import React from 'react';

export default class App extends React.Component {
  render() {

  }
}
```

Let's pause here. What is `export default`?

> export default is used to export a single class, function or primitive

This means, in this case, that we are exporting a *single* class in this file. This will be important later when we go to import. You can think of files in JavaScript as a series of give and take. We're exporting functionality in order to import it elsewhere.

Moving on.

So we define that `App` is a class, the `class App` part. And then we note what we're extending using `extends`.

> The extends keyword is used to create a child class of another class (parent). The child class inherits all the methods from another class.

Finally, we determine what we're extending. In this case a React component via `React.Component`.

*NOTE: You might see `React.PureComponent` which you can read about [here](https://reactjs.org/docs/react-api.html#reactpurecomponent). A `Component` and `PureComponent` are essentially the same, except `PureComponent` does a more shallow compoarision of objects rather than recursively checking for matched values. This would be a preformance boost if you have control over your props.

In fact, let's change this while we're thinking about it. So our `App.js` file should look like this:

```js
import React from 'react';

export default class App extends React.PureComponent {
  render() {

  }
}
```

The last thing we need to do with this component is add our return function which will return the value from our `index.js` we intend to replace. And I'll add some extra language here so we know we've updated successfully once we import this into the `index.js` file.

```js
import React from 'react';

export default class App extends React.PureComponent {
  render() {
    return <div>Hello World, Woo!</div>;
  }
}
```
Perfect. We now have a functional React component. We've created a single file, with a single Class component which returns a single `div` with some text.

## Importing Our New Component
Let's move back to the `index.js` file at `src/js/index.js`.

Below the `ReactDOM` import, let's create a new import. We want to import our `App.js` file so we can use it.

```js
import App from './components/App'
```

*NOTE: If you've added the `resolver` into your WebPack config you can omit the file extension. If you hae not import app from `App.js`*

This imports the funciton, which is the name of our class `App` from the file name and location.

We'll then replace the `<div>Hello World</div>` with our `App` component. The syntax for that is the same as any self-closing div: `<App />`.

```js
// Render the app in the DOM.
ReactDOM.render(
  <App />,
  document.getElementById( 'root' ),
);
```

If all goes according to plan we should see the contents of our component in the browser.

Huzzah!

From now on `App.js` will be the main source of our app. We won't be touching `index.js` again.

## Props
What we have working now is a super-basic example of React in action. A movable, self-contained, and reusable component which will afford us flexibility going forward.

### The Setup
We're going to quickly create a new component to demonstrate props. Let's call it `Title` and make the resulting component print a `h1` to the DOM. From the `components` directory:

``` bash
touch Title.js
```

Inside our new file we can basically copy what we had in our `App.js` component, rename it, and change the text.

```js
import React from 'react';

export default class Title extends React.PureComponent {
  render() {
    return <h1>This is our Title Component</h1>;
  }
}
```

Let's go back to our `App.js`, import our `Title` component and add it above our existing `div`.

```js
import React from 'react';
import Title from './Title';

export default class App extends React.PureComponent {
  render() {
    return (
      <Title />
      <div>Hello World, Woo!</div>
    )
  }
}
```

Now, let's remember that the `return` method can be be nested inside parenthesis shown above. But if you were to add the following you will most likely get an error in the console that looks like this:

> Adjacent JSX elements must be wrapped in an enclosing tag.

This means that when we return `jsx` we're expecting that `jsx` to be a single element. The above example would be two elements. We can resolve this problem one of two ways. We can take advantage of a `React.Fragment` or we can wrap the entire return value in a `div`. For now, we'll do the latter, but we'll come back to Fragments in another lesson.

```js
import React from 'react';
import Title from './Title';

export default class App extends React.PureComponent {
  render() {
    return (
      <div>
        <Title />
        <div>Hello World, Woo!</div>
      </div>
    );
  }
}
```

Save, and the result should be "This is our Title Component" above much smaller "Hello World, Woo!" text.

### Exercise One
Complete the same steps and create a third component called `Content`, import, and include it in the `App.js` file. We want our "Hello World, Woo!" to exist inside it's own component rather than writing the `div` and enclosing content explicitly.

### What are Props?
Props is a reserved keyword in React. Props are just like function arguments passed into a JavaScript function or attributes you might pass into an HTML element.

Props is an `Object` containing key/value pairs.

For example, without explaining how we created this object just yet we might have a props object that looks like this:

```js
{
  name: 'Jane Smith',
  age: 45,
}
```

We would reference a prop the same way we might reference a key/value in an object directly.

```js
props.name; // Jane Smith
props.age; // 45
```

So if were were to bring this into a React context we would follow the same rules. So let's start using props in the app we're building to help understand this a bit further.

### Using Props
Using props is easy, it is exactly like adding an attribute to a div. Let's start by adding a new prop to our `Title` component. Let's say we want to reuse this component to have the same output on different views, but we want the language to change. Perfect case for reusability. So let's add a prop to our `Title` component in our `App.js` file.

```js
<Title text="We've Passed Props!" />
```

Then let's move to our `Title.js` file. We want to replace the content between our `<h1>` tags with our props. We'll do that by using `this.props.text`, and since we're utilizing `JSX` we'll wrap that in curley brackets like this:

```js
<h1>{this.props.text}</h1>
```

Success! We've successfully utilized props in a React context to pass content from our parent `App.js` file, through the `Title` component and utilized it in the `Title.js` render method.

But let's look at this a little differently. The way we've built our component assumes we have our `text` props. So if we were to remoe the props from our `Title` component in `App.js` we would still return `<h1></h1>` but no content, and that may not be desired.

We have three options here and I'll go through all three so we have an idea of what options we have to solve for our problem.

#### Conditional Props
The simplest solution might be to include a [logical operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR) if we always want an `h1`, but don't always want to set the value of the text.

```js
<h1>{this.props.text || 'Alternative Heading'}</h1>
```

If we don't include the `text` props, we would display our `h1` with "Alternative Heading" text instead.

#### Default Props
We could also take advantage of `defaultProps` to set the default of the prop. This is essentially setting a default value for any prop we have.

I would suggest reading that documentation to learn more about the power of PropTypes and defaultProps, but here's a simple use case.

Since we're using our Class Component we'll add a declaration for our `defaultProps` directly for the `Title` component. We'd end up with something like this.

```js
import React from 'react';

class Title extends React.PureComponent {
  render() {
    return <h1>{this.props.text}</h1>;
  }
}

/**
 * Set initial props.
 * @type {object}
 */
Title.defaultProps = {
  text: 'Alternative Title',
};

export default Title;
```

Removing props, just like we did in the [Conditional Props](#conditional-props) example, would render our fallback option. A little more work, but perhaps a little more understandable and flexible for the future.

Just to note we don't have to move our `defaultProps` or `export default` statement at all, necessarily. We could write the same thing above like this:

```js
import React from 'react';

export default class Title extends React.PureComponent {
  /**
   * Set initial props.
   * @type {object}
   */
  static defaultProps = {
    text: 'Alternative Title',
  };
  render() {
    return <h1>{this.props.text}</h1>;
  }
}
```

This self-cointains our defaultProps (and future work) to be inside the class component. However, this isn't handled by default with our current webpack or babel configs. If we wanted to support this we would do the following.

``` bash
npm install @babel/plugin-syntax-class-properties babel-plugin-transform-class-properties --save-dev
```

And then update our `.babelrc` file.

```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-syntax-class-properties",
    "transform-class-properties"
  ]
}
```

#### Bail Early
Another option would be to prevent the component from rendering entirely if no props exist. This would only work if:
1. We only have one prop or one main required prop.
2. We don't need or want a default value.

We would first check that we have a value for the `text` prop, and then return if we do not.

```js
export default class Title extends React.PureComponent {
  render() {
    if (! this.props.text) {
      return;
    }
    return <h1>{this.props.text}</h1>;
  }
}
```

This would prevent the component from rendering anything if we don't have the props.

The last option we might have, the most complex, but my favorite option, would be to take advantage of [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html) to determine a prop type and whether or not it is required.

#### Requiring Props
I'd suggest reading the PropType documentation above, but we can create a simple use case or requiring a prop like this.

First we'll install the depencendy, required by React v15.5+.

```bash
npm install prop-types --save-dev
```

And then import the dependency into our `Title.js` file.

```js
import PropTypes from 'prop-types';
```

Next, much like we did with `defaultProps` we'll add a new `Title.propTypes` object and define our Prop Type for `text`.

```js
import React from 'react';
import PropTypes from 'prop-types';

class Title extends React.PureComponent {
  render() {
    return <h1>{this.props.text}</h1>;
  }
}

/**
 * Set props types.
 * @type {object}
 */
Title.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Title;
```

If we were to remove that props from our `Title` component in `App.js` we would see the following error in the console.

```
Warning: Failed prop type: The prop `text` is marked as required in `Title`, but its value is `undefined`.
```

Which we can quickly remedy by re-adding our `text` props to our component.

#### Best Option?
What's the best option here? I'd argue that the best option would be to take advantage of the `PropTypes` package and really define what a prop should be, whether or not it's required, and set `defaultProps` for each, if applicable.

NOTE: Required props do not require `defaultProps`.

But I would also argue that if you don't want or need a large bundle you could do without the `PropTypes` package and handle it one of the other ways. I'd recommend this for simple executions, but when building larger applications or features, `PropTypes` is 100% the way to go, maybe in combination with any of the above.

## State
[State](https://reactjs.org/docs/state-and-lifecycle.html#adding-local-state-to-a-class) does not get passed from parent to child like Props it is completely self-contained in the component itself. It is data set by, updated by, and read by the Component.

We'll learn about state a little differently when we convert our Class Components into Functional components later, but if you feel the desire to learn again, you can check out that information [here](https://reactjs.org/docs/hooks-state.html).

Let's start by adding a [constructor](https://reactjs.org/docs/react-component.html#constructor). This is a function called before the component is mounted, so we can set some default variables or bind functions.

>Typically, in React constructors are only used for two purposes:
>- Initializing local state by assigning an object to this.state.
>- Binding event handler methods to an instance.

Our `constructor` requires a subClass called `super` which will define the existence of props, otherwise `this.props` would be undefined, which obviously we don't want.

So let's add our constructor and define some state. But first, let's talk about how we might use state.

State would be something that we would want to provide an update to or track the change of specifically inside our `Title` component.

For now, I think we'll update our `App.js` component, even though I said we wouldn't. I want to do this because we'll eventually build out a toggle for changing from light to dark mode in our app.

So let's go to our `App.js` file and add a constructor with state. We'll be adding a checkbox to toggle some value; do something if toggled, else do something else. So a `boolean` would be a good use case for this. So let's assume our state starts with a value of false.

I'll call my state value `isDark`. We'll add this right above our `render` method.

```js
constructor(props) {
  super(props);

  this.state = {
    isDark: false,
  }
}
```

Next we need a way to change the value of our state. Fortunatly React provides a default function called `setState` to do so in a Class Component. But we still need to fire that function in the first place.

This is a great case for a `button`. Buttons serve this exact purpose, to fire some function or trigger some change.

So let's work backward and add our `button` first. This will not be a component (though it could be) and instead just be a standard HTML button. We'd know this at a glance because we're creating a `<button>` and not a `<Button>` for example.

Below our `<div>` in `App.js` we'll add our button. We basically need only two properties on our button. The type (required for semantic HTML) and `onClick` which is and event handler that we'll leverage to update state.

```js
<button
  onClick={}
  type="button"
>
  Toggle Mode
</button>
```

Our `onClick` handler accepts a function, so we'd do something like this:

```js
onClick={() => setState()}
```

In this case we want to set the value of `isDark` in our state object to be the opposite value that exists by default. So if `false`, set to `true` or if `true` set to `false`.

We can use a logical "not" oprator to reverse the value already defined like this:

```js
onClick={() => this.setState({ isDark: ! this.state.isDark })}
```

State expects an object where we set a new value of the state object key.

```js
{
  isDark: ! this.state.isDark,
}
```

If we were to look at our app we should now see a button, but if we click the button, nothing happens visually, yet.

Let's add a simple line of text with a logical operator to define the text of our button so we can either "Toggle to Light" or "Toggle to Dark".

```js
<button
  onClick={() => this.setState({ isDark: ! this.state.isDark })}
  type="button"
>
  Toggle to {this.state.isDark ? 'Light' : 'Dark'}
</button>
```

Now toggling the button should go from "Toggle to Light" to "Toggle to Dark" on click.

Our final component would look like this so far:

```js
import React from 'react';
import Title from './Title';

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isDark: false,
    }
  }

  render() {
    return (
      <div>
        <button
          onClick={() => this.setState({ isDark: ! this.state.isDark })}
          type="button"
        >
          Toggle to {this.state.isDark ? 'Light' : 'Dark'}
        </button>
        <Title text="We've Passed Props!" />
        <div>Hello World, Woo!</div>
      </div>
    );
  }
}
```

So to summerize our use of state here were are:
- Setting up our Class Component to accept state using the `contstructor`.
- Setting the name and default value of our state object in our `constructor`.
- Adding a new feature with an `onClick` handler to trigger a change of state.
- Utilized the React `setState` function to handle the change of state value.
- Modified language of our button visually to confirm our toggle works.

Obviously at this point there is nothing else happening when we toggle our button, but that will take place later on down the line when we discuss the [Context API](https://reactjs.org/docs/context.html).
