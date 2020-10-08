# What is React.js?
> React is a JavaScript library for building user interfaces.

React is a JavaScript library for creating interactive applications. It is a declarative programming paradigm, and I recommend checking out [this blog](https://codeburst.io/declarative-vs-imperative-programming-a8a7c93d9ad2) describing the the difference between declarative and imperative programming.

React utilizes self-contained blocks of code called components which provide more flexibility and reusability that can handle self-contained `state` and recieve data from other components in the form of `props` which we'll talk about in a later lesson [TBD]().

## Table of Contents
- [Components](#components)
- [*this*](#this)
- [The Lifecycle](#the-lifecycle)
- [JSX](jsx)

## The Elements of React
### Components
Components are self-contained blocks of code. A building block inside a React app, if you will. It is a function that accepts properties, referred to in React as `props` and describes how a section of an app should look and function.

There are [two types of components](https://reactjs.org/docs/components-and-props.html) we have the option of using: **Function/Functional** and **Class/Stateful** components.

From 2019 on you will most likely find the Functional component to be the most common. It's simply a function that receives a single argument, `props`, in which to work with. It is only a JavaScript function.

``` javascript
const functionName = function(props) {
	return <h1>Hello, {props.name}</h1>;
};
```

Which could be simplified using ES6 arrow functions:

``` javascript
const functionName = (props) => <h1>Hello, {props.name}</h1>;
```

Previously, Class components were the default. This is a function of react that builds on a default [ES6](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) class.

``` javascript
class classComponent extends React.Component {
	render() {
		return <h1>Hello, {this.props.name}</h1>;
	}
}
```

Both examples above are equivalent once passed through a [preprocessor](https://babeljs.io/), and have their own pros and cons.

Before the recent introducton of [React Hooks](https://reactjs.org/docs/hooks-intro.html) the only way to utilize state within a component was by using a Class component. However, hooks now allow us to take advantage of most of the React [Lifecycle](https://www.w3schools.com/react/react_lifecycle.asp) within a Functional component. We'll talk about this in later lessons [TBD]().

You can read about convering a [function to a class](https://reactjs.org/docs/state-and-lifecycle.html#converting-a-function-to-a-class) or [class to a function](https://www.digitalocean.com/community/tutorials/react-converting-to-a-hook) with these links.

## *this*
Since we'll be starting off with Class or Stateful components you might wonder what *`this`* is. It is a keyword which references some JavaScript elemment. In this case *`this`* refers to the comonent we're inside. For example, our component named `classComponent` above is what *`this`* refers to in the context of React.

Learn more about *`this`* [here](https://medium.com/byte-sized-react/what-is-this-in-react-25c62c31480).

## The Lifecycle
React, like many JavaScript libraries has a [component lifecycle](https://reactjs.org/docs/react-component.html#the-component-lifecycle) which essentially provides access to the entire life of a component from the point that it's called, mounted , updated, unmounted, and killed.

I'd certainly recommend checking out React's [lifecycle diagram cheat sheet](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) which is very helpful in understanding the lifecycle for different versions of React.

At a glance we essentially have the following process for interacting with this lifecycle.
- [componentDidMount](https://reactjs.org/docs/react-component.html#componentdidmount)
- [componentDidUpdate](https://reactjs.org/docs/react-component.html#componentdidupdate)
- [componentWillUnmount](https://reactjs.org/docs/react-component.html#componentwillunmount)

And at each point the *[render()](https://reactjs.org/docs/react-component.html#render)* method is being updated to modify the output on the frontend.

> The `render()` method is the only required method in a class component.

When working with Functional components all of these lifecycle methods are handled with one Hook called *[useEffect](https://reactjs.org/docs/hooks-effect.html)*. We'll talk about this in a later lesson [TBD]().

Since we'll be working with Class components we'll need to understand the [constructor](https://reactjs.org/docs/react-component.html#constructor) method.

> If you don’t initialize state and you don’t bind methods, you don’t need to implement a constructor for your React component.

The constructor is used, most commonly, to initialize state or bind event handlers to an instance of *`this`*.

## JSX
JavaScript syntax extension. In order to understand React we must also understand [JSX](https://reactjs.org/docs/introducing-jsx.html).

JSX provides us the ability to write plain HTML in React. I'd recommend taking a look at the [W3Schools React JSX Walkthrough](https://www.w3schools.com/react/react_jsx.asp) to gain an understanding of what JSX is actually doing under the hood. We will talk through some examples as we go so that we can recognize legacy code, but for the most part we won't be utilizing an default JavaScript methods to render our components.
