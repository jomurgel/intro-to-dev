# React Hooks
Welcome to the world of tomorrow!

Let's dig into React Hooks. Before we get started you can take a look at the documentation at [Reactjs.org](https://reactjs.org/docs/hooks-intro.html) which is a great overview of the new functionality introduced in React 16.8.

I also fully recommend the [Video Introduction](https://www.youtube.com/watch?v=dpw9EHDh2bM&feature=emb_logo) available in those docs.

This module will hit the top-used Hooks available to make replacing our Class Components with Functional components possible, and touch on the use of custom hooks in the future.

In this module we'll be looking at `useState`, `useEffect`, and `useContext` specifically. We'll talk briefly about custom hooks and the Hooks API at the end, but for now we'll keep it simple.

## Table of Contents
- [What is a Hook?](#what-is-a-hook)
- [useState](#usestate)
- [useEffect](#useeffect)
- [useContext](#usecontext)

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

