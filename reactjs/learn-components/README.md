# Components
> Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. This page provides an introduction to the idea of components.

From [What is React](what-is-react) we learned about Function/Functional and Class/Stateful Components. We built a simple React app in [Setting up a Local from Scratch](setup) which displays a `div` with some text. So let's start building that app out with React components.

## Table of Contents
- [Setup](#setup)
- [Our Goal](#our-goal)
- [Building Our First Component](#building-our-first-component)
- [Importing Our New Component](#importing-our-new-component)
- [Props](#props)

## Setup
For this we'll want to make sure that you've `cd` into the components lesson folder.

``` bash
cd reactjs/components
```

Here you'll find our app as we left it off. Run `npm install` and `npm run start` to spin up that app in browser.

## Our Goal
Before I get into building with components I should talk about our end goal here. Of course we're going to learn React, but we should do more than just understand how the parts work and build something functional.

The goal here will be to build a data visualization dashboard to display COVID-19 *(Valid topic as of 10/12/2020)* numbers utilize a third party graph package, the https://covidtracking.com/data/api API and the use of props and local state.

Together we'll have a promising understanding of how React works in the real world, and hopefully a decent understanding of what might be expected of a new developer working with React.

The look and feel of this dashboard will be up to us, though we have access to custom CSS, [Styled Components](https://styled-components.com/), and pre-existing frameworks should we need or want them.

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

Next, let's create a new class component, just like we leanred in [What is React](what-is-react) previously. Remember `render()` is the only required method here.

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

## What are Props?
