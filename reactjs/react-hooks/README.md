# React Hooks
Welcome to the world of tomorrow!

Let's dig into React Hooks. Before we get started you can take a look at the documentation at [Reactjs.org](https://reactjs.org/docs/hooks-intro.html) which is a great overview of the new functionality introduced in React 16.8.

I also fully recommend the [Video Introduction](https://www.youtube.com/watch?v=dpw9EHDh2bM&feature=emb_logo) available in those docs.

This module will hit the top-used Hooks available to make replacing our Class Components with Functional components possible, and touch on the use of custom hooks in the future.

In this module we'll be looking at `useState`, `useEffect`, and `useContext` specifically.

## Table of Contents
- [What is a Hook?](#what-is-a-hook)
- [useState](#usestate)
- [useEffect](#useeffect)
- [useContext](#usecontext)
- [Additional Reading](#additional-reading)

## What is a hook?
A hook is simply a function that let you "hook" into the React lifecyle and they are exclusive to Functional Components.

## useState
`useState` is a built-in hook for state management inside a functional component. It replaces the constructor, `setState` function, and state object that we utilized in our Class Component.

As a refreshing, if we want to utilize state in a Class component we have to set up our constructor and super, define the state object, and in some event handler use `setState` to update the value.

With `useState` we define the state variable and setter function in one line of code, like this:

```js
const [loading, setLoadingState] = useState(false);
```

So, let's break that down.
- We define the variable array which contains two things. The name of the state variable, and the setter/updater.
- We're taking advantage of the `useState` hook here and inside that hook we're setting the default value of our state variable. In this case the default value of `loading` is `false`.

In a Class Component we might write something like this:

```js
export default MyClass extends React.Class {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  render() {
    return (
      <div>
        <button
          onClick={() => this.setState({ loading: true })}
          type="button"
        >
          Toggle Load State
        </button>
        {this.state.loading ? 'I\'m Loading' : 'I\'m Not Loading'}
      </div>
  }
}
```

That creates our class and state, sets the default value of `loading` and has a button that takes advantage of `setState` to change the value of that state variable.

Let's simplify that with a Functional Component and `useState`:

```js
const myFunctionClass = () => {
  const [loading, setLoadingState] = useState(false);

  return (
      <div>
        <button
          onClick={() => setLoadingState(true)}
          type="button"
        >
          Toggle Load State
        </button>
        {loading ? 'I\'m Loading' : 'I\'m Not Loading'}
      </div>
  )
}

export default myFunctionClass;
```

As we can see the markup is generally the same, but the function itself is markedly simpler. Let's break that down.

The function replaces the class, we've seen that before, but we're setting/reading our state variable directly rather than referencing `this` or our state object with `this.state`. We're also no longer using a generic `setState` with an object param. Instead we're using our custom setter and passing the new value directly. `setLoadingState(true)` is much cleaner than `ths.setState({ loading: true })` even though they accomplish the same thing. Not to mention removing any reference to `this` since, as we learned in the last module, we wouldn't be referencing the Class any longer if we did.

The actual consumption of our state variable hasn't changed.

## useEffect
`useEffect` is probably one of the more complicated new Hooks available in React 16.8+. It's complicated by design as it completely replaces every other Lifecycle function like `componentDidMount` or `componentDidUpdate` fore example.

NOTE: Effect references React's control of side effects. A render method shouldn't cause side effects, meaning it shouldn't perform any function after the DOM has rendered.

So a Class component might have some sort of `componentDidMount` and `componentDidUpdate` method to handle any side effects based on some sort of change in the class.

From the React docs:

```js
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

We see the above document title being updated based on a click. Initial mount sets the title based on state, and the `componentDidUpdate` is fired for each additional click to re-render the docuemnt title.

In a functional component this is a little easier. From the React docs:

```js
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

We see that we've taken advatange of `useState` to avoide the constructor and state object. And then call our `useEffect` function to watch the document title for change. Essentially, in this case, the funciton will fire every time the button is clicked and rerender the component with updated state and document title.

All `useEffect` is doing is telling React that something needs to happen. Some change has occured. Having `useEffect` inside our function gives us access to everything available in that function like state, functions, etc., and by default it will run every time the component renders and is updated. In this simple case taking over the same responsibilities as `componentDidMount` and `componentDidUpdate`.

### Cleanup
`useEffect` also has the ability to handle cleanup like `componentDidUnMount`. When you render a component you may run `componentDidMount` to assign some event listener to an element. When the component unmounts you'd want to remove that event listener to pevent any unforseen conflicts/behaviors in your app.

``` js
componentDidMount() {
  document.addEventListener( 'click', this.someFunction );
}

componentWillUnmount() {
  document.removeEventListener( 'click', this.someFunction );
}
```

Could be simply updated to this taking advantage of a built-in return function in `useEffect` which tells `useEffect` to bail just like a normal function.

``` js
useEffect(() => {
  document.addEventListener( 'click', someFunction );
  return () => {
    document.removeEventListener( 'click', someFunction );
  }
});
```

Every time `useEffect` fires it handles any cleanup from the previous state automatically by default and the return function will automatically fire on unmount.

### Skipping Effects
`useEffect` provides the ability to handle effects for specific props rather than firing for every change on any data point in the app.

Let's take our count update example from above. If we wanted to update the count only if the value didn't match the old value, in other words only when the value of count changes we might update our `componentDidUpdate` function to look like this:

```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```

Where we take advantage of our built in params for `prevState`, litterally our previously saved state value, and compare against the new value in state and determine whether or not we fire our event.

For function components we can add a dependency array to our `useEffect` to watch the count state value for changes to determine whether or not to fire.

```js
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]);
```

So this `useEffect` function will only fire if the value of count is different than the previous update preventing the `document.title` from being updated every time the app changes.

Similarly if we want `useEffect` to only fire one, or on component load you could add an empty depenency array.

```js
useEffect(() => {
  document.title = 'This Title was Set Only Once!';
}, []);
```

## useContext
`useContext` makes taking advantage of the [React Context API](https://reactjs.org/docs/context.html) easy in the functional component context.

Simply the Context API, once created with `React.createContext`, provides a Consumer and a Provider which does exactly what they sound like they do. We would provide some value to the Provider and the Consumer would allow child components the ability to access that provided value. Context is intended to be "global" data for a tree of Components. The most common use would be to provide a `theme` prop which we will be using for our demo app build.

With a class component we might see the following:

```js
const colors = {
  blue: '#001382',
};

export const ColorContext = React.createContext(colors.blue);

class App extends React.Component {
  render() {
    return (
      <ColorContext.Provider value={colors}>
        <Home />
      </ColorContext.Provider>
    );
  }
}

class Home extends React.Component {
  render() {
    return (
      <ColorContext.Consumer>
        {(colors) => <div style={colors.blue}>...</div>}
      </ColorContext.Consumer>
    );
  }
}
```

So we create a context, we provide a value to the context to start, then we can utilize the context provider to set colors and provide that to the `Home` component. We consume the value of the the provider using the consumer and any component added insdie the consuper has access to the value of `colors.`

We're essentially creating a return function to render elements inside the consumer in order to provide the value of colors.

`useContext` provides direct access to the consumer value provided to it without relying on a Consumer return function. While we would need to create the context and provider the same way inside a function component, we can utilize `useContext` to references the `colors` value directly.

```js
const colors = {
  blue: '#001382',
};

export const ColorContext = React.createContext(null);

const App = () => (
  <ColorContext.Provider value={colors}>
    <Home />
  </ColorContext.Provider>
);

const Home = () = {
  const colors = useContext(ColorContext);
  return (
    <div style={colors.blue}>...</div>
  );
}
```

Functionally the same, the markup is far clearer as to what you're consuming, and how you consume it.

## Additional Reading
- Read up on additional built-in Hooks or creating custom hooks [here](https://reactjs.org/docs/hooks-reference.html#additional-hooks).
- [useContext by Robin Wieruch](https://www.robinwieruch.de/react-usecontext-hook)