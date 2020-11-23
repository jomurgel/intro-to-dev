# Digging into the Context API
Making consuming data throughout our app a little nicer with React. Understand the React Context API and Add a simple custom theme for consumption.

## Table of Contents
- [Basic Styles](#basic-styles)
- [ThemeProvider](#themeprovider)
- [Hooking Things Up](#hooking-things-up)

// CSS
max-width: 100%

// JS
maxWidth: '100%'

## Basic Styles
In order to take advantage of the Context API to allow us to toggle our theme, we need some styles.

Before we get into that I want to point out that inline styles as we'll be doing is acceptable styling, though I find that taking advantage of something like [Styled Components](https://styled-components.com/) would be better if you plan on handling styles in React rather than having an external stylehseet. I recommend looking into this if you're interested in seeing another approach to styling in JavaScript.

The alternative would be an external stylesheet that would require additional language support, webpack configs, and would increase your bundle size. That is, however, the more traditional route for application styles. You can learn more about the [sass-loader](https://webpack.js.org/loaders/sass-loader/) and setting up your app to support styles there.

Moving on. We're going to create two style objects. One for light, and one for dark. They'll be identical in structure, but will obviously be opposites on the color spectrum. Let's first add some more substantial content to our app. Any you'd like, but I've ended up with this:

`Title.js`
``` js
const Title = ({ isDark }) => <h1>{isDark ? 'Are you afraid of the dark!' : 'We\'re safe, the sun is up!'}</h1>;
```

`Content.js`
``` js
const Content = ({ isDark }) => <p>Sometimes you look up at the sky and see the {isDark ? 'moon' : 'sun'}.</p>;
```

Nothing special, but fun to be a little more descriptive about what we'll be looking at.

So let's create a new folder called `config` and a file called `theme.js` inside of that.

``` bash
cd src/js && mkdir config && cd config && touch theme.js
```

In that `theme.js` file we're going to create a single exported object with two keys in it. Light and dark.

``` js
export default {
  light: {},
  dark: {},
};
```

Inside this we'll want to have shared styles for our App and then for the button, the title, and the content.

I'm going to just make some executive decisions here, but feel free to play around with styles, add new elements, or look into ways of making this a bit easier for future developers.

My final styles look like this. As you can I see I am not writing explicit styles the way you would in CSS. I'm creating new keys for each of our elements to later consume inline. One for the body, one or the button, the title, and for the content components. And I have the same for light and dark themes.

``` js
const shared = {
  body: {
    borderRadius: 3,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    padding: 25,
    margin: '0 auto',
    maxWidth: 780,
  },
  button: {
    border: 0,
    borderRadius: 50,
    fontSize: 14,
    fontWeight: 600,
    padding: '10px 15px',
    textTransform: 'uppercase',
  },
  content: {
    fontSize: 32,
    fontWeight: 500,
    lineHeight: 1.2,
    margin: 0,
  },
  title: {
    fontSize: 48,
    fontWeight: 500,
    lineHeight: 1.2,
    marginBottom: 15,
  },
};

export default {
  light: {
    body: {
      ...shared.body,
      background: '#f2f7fa',
      color: '#062540',
    },
    button: {
      ...shared.button,
      background: '#016aff',
      color: '#f2f7fa',
    },
    content: {
      ...shared.content,
    },
    dark: false,
    title: {
      ...shared.title,
    },
  },
  dark: {
    body: {
      ...shared.body,
      background: '#183d5d',
      color: '#f2f7fa',
    },
    button: {
      ...shared.button,
      background: '#94c3db',
      color: '#062540',
    },
    content: {
      ...shared.content,
    },
    dark: true,
    title: {
      ...shared.title,
    },
  },
};
```

So you might find a new `shared` variable. In writing these styles I realized that there were several elements between the light and dark themes that I was repeating. In an effort to prevent replication of code I created this variable, which is an object, and spread it into the light and dark body objects. You can learn more about [merging objects in JavaScript](https://www.javascripttutorial.net/object/javascript-merge-objects/), but the gist is that the spread is taking every key/value pair out of the object in the form of `...shared.body` and making it available to the new object we're adding it to.

I've also added a `dark` value to help me later when determining which theme I'm using. I could pass additional values or make the process more manual, but I like having one set of data available with everything I need to do the job rather than relying on multiple things from multiple places.

So what do we do now? Now we look at setting up our [ThemeProvider](#themeprovider) and taking advantage of [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext) to hook things up.

We're also going to change the way that we use `useState` and centralize that toggle inside our `ThemeProvider`. That way, rather than having only one component have access to the value and setter for state, every component would which would provide our app with greater flexibility for growth in the future.

## ThemeProvider
Let's create a new Component inside the `components` directory called `ThemeProvider`. This will create our Context, and define our `ThemeContext.Provider` value that we'll wrap our app in.

``` bash
cd ../components && touch ThemeProvider.js
```

Let's import `React`, `createContext`, `useState`, and our new theme.

``` js
import React, { createContext, useState } from 'react';
import theme from '../config/theme';
```

Next we'll create our `ThemeContext`. We'll take advatange of `createContext` to set the value of our theme, and pass an empty object for use later. You can think of the array inside `createContext` to be similar to the `useState` variable creation. `[ themeDefaultValue, themeFunction ]`.

``` js
const ThemeContext = createContext([ 'light', () => {} ]);
```

This will set the default value of `isDark` and create an empty function that we'll use to clean up our `App` component and set that `isDark` value.

Our `ThemeProvider` is going to borrow functionality from our `App` component. We'll handle our state toggle and value here along with setting the value of our theme. We'll make a few changes to how all of this works, but we'll talk through it as we make those changes.

We'll have a simple `ThemeProvider` that looks like this. The most notible change is that `isDark` is no longer a boolean. Well change `isDark` to `themeType` and change it to a string. Either 'light' or 'dark'. This way we can reference our object by key name rather than checking a boolean and returning some value.

``` js
export const ThemeProvider = () => {
  const [themeType, setThemeState] = useState('light');

  const toggleTheme = () => setThemeState( 'light' === themeType ? 'dark' : 'light' );
```

I've also created a toggle function called `toggleTheme` that will help us in setting the value of `themeType`. Rather than manually setting `setThemState('light')` or `setThemeState('dark')` we can just call `toggleTheme` and it will switch for you.

Finally we're going to return our `ThemeContext.Provider` as a wrapper for our App. `{children}` represents an inherited props which is equal to any markup/components that exist inside that wrapper. You can read more about children [here](https://reactjs.org/docs/react-api.html#reactchildren). And we pull that from props in the function declaration.

``` js
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
```

So our final `ThemeProvider` looks like this:

``` js
import React, { createContext, useState } from 'react';
import theme from '../config/theme';

export const ThemeContext = createContext([ false, () => {} ]);

export const ThemeProvider = ({ children }) => {
  const [themeType, setThemeState] = useState('light');

  const toggleTheme = () => setThemeState( 'light' === themeType ? 'dark' : 'light' );

  const themeStyles = theme[themeType];

  return (
    <ThemeContext.Provider value={{ theme: themeStyles, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
```

One thing to know is how I'm passing the theme down through the `ThemeContext.Provider`. Rather than just passing `theme` which would be both our light and dark themes, I'm only passing the theme down we need so I can just later call `theme.body` or whatever rather than needing to know whether or not I'm on the light or dark theme. I will need to know whether or not I'm on a light or dark theme for text changes, which is why I added that `dark` key/value pair in the theme. We'll look at that later when we update our `Title` and `Content` components.

Now that we have that set up, we can go over to our `index.js` and `App.js` and do some cleaup and hook everything together.

## Hooking Things Up
Let's start over in the `index.js` file. We're going to add our new `ThemeProvider` around our `App` component.

``` js
// Import dependencies.
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { ThemeProvider } from './components/ThemeProvider';

// Render the app in the DOM.
ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById( 'root' ),
);
```

Remember that we need to use the curly brackets for extracting our ThemeProvider function from the component file sine we export several elements.

Perfect, at this point our theme and theme setter is available to the entire app, though we now need to set up access to it.

Let's move over to the `App.js` file.

Let's import our `ThemeContext` from our ThemeProvider app and take advatange of `useContext` to pull our our theme and toggle function we created.

```js
import React, { useContext } from 'react';

// Components.
import Button from './Button';
import Content from './Content';
import Title from './Title';

import { ThemeContext } from './ThemeProvider';

const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

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

Now if I were to keep things like this our app no longer works and will show several console errors, specifically around the value of `isDark` not existing. This is fine, we don't need it any longer anyway, but we'll remove that prop entirely and instead pass our theme and toggle function down (the toggle will only apply to the button).

Finally, in the `App` component before we move on, let's add the body style to the wrapping div.

``` js
<div style={theme.body}>
```

So let's update our `Button` function. We're going to do three things.
1. Remove our state handling, our Context handles that now.
2. Update our prop names and types.
3. Update our component content.

In the App.js let's replace our existing buttons props swith new props and values.

```js
<Button
  theme={theme}
  toggleTheme={toggleTheme}
/>
```

In our `Button.js` we'll update our `propTypes` and then the names and use of props in the function.

```js
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  theme,
  toggleTheme,
}) => (
  <button
    onClick={() => toggleTheme()}
    type="button"
  >
    {theme.dark ? 'Toggle to Light' : 'Toggle to Dark'}
  </button>
);

/**
 * Set initial props.
 *
 * @type {object}
 */
Button.propTypes = {
  theme: PropTypes.shape({}).isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default Button
```

Two things to note here. First that instead of checking against `isDark` I'm now checking against `theme.dark` which is the boolean we added to our theme. The second thing is that our theme proptype is defined as shape. We shold be more explict about what that shape is, but we'll do that later, but keep it in mind for now that this is only temporary.

Finally, we want to add our button styles from the theme.

``` js
<button
  onClick={() => toggleTheme()}
  style={theme.button}
  type="button"
>
```

Inline styles in JavaScript expect an object, which is what `theme.type.button` is, so we can call it directly.

You should now see the new styles of that button in the browser. Yay!

Let's move on to update our last two components. Since the process is the same I won't walk through that, but I will pop the finished code below.

`Content.js`
``` js
import React from 'react';
import PropTypes from 'prop-types';

const Content = ({ theme }) => <p style={theme.content}>Sometimes you look up at the sky and see the {theme.dark ? 'moon' : 'sun'}.</p>;

/**
 * Set initial props.
 *
 * @type {object}
 */
Content.propTypes = {
  theme: PropTypes.shape({}).isRequired,
};

export default Content;
```

`Title.js`
``` js
import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ theme }) => <h1 style={theme.title}>{theme.dark ? 'Are you afraid of the dark!' : 'We\'re safe, the sun is up!'}</h1>;

/**
 * Set initial props.
 *
 * @type {object}
 */
Title.propTypes = {
  theme: PropTypes.shape({}).isRequired,
};

export default Title;
```

### PropTypes
Now that our app is fully retrofitted with the new theme and context we can go back and be a little more explicit about our PropTypes for our Theme.