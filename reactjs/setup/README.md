# Setting up a Local from Scratch
React offers a [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html) package to rapidly spin up a React.js app. This is a great package, and there are dozens out there with various bells and whistles, but we're going to learn this from scratch. Even if we don't understand all of the technologies in use, we'll have a better idea of what's going on behind the scenes.

## Table of Contents
- [Before We Start](#before-we-start)
- [Getting Started](#getting-started)
- [Webpack & Babel](#webpack-babel)
  - [Babel](#babel)
  - [WebPack](#webpack)
  - [HTML Loader](#html-loader)
  - [Finishing Touches](#finishing-touches)

## Before We Start
React has a quick-setup option that allows you to rapidly build prototypes on the go with a single HTML element and some script tags. You can read more about that [here](https://reactjs.org/docs/add-react-to-a-website.html#add-react-in-one-minute), but in my opinion having a little more control provides us with more flexibility and a little cleaner code, though this is certainly a valid use of React.

There are additional places to test and play around with React, and I encourage you to take advantage of those resources.

> If you’re interested in playing around with React, you can use an online code playground. Try a Hello World template on [CodePen](https://reactjs.org/redirect-to-codepen/hello-world), [CodeSandbox](https://codesandbox.io/s/new), [Glitch](https://glitch.com/edit/#!/remix/starter-react-template), or [Stackblitz](https://stackblitz.com/fork/react).

That said, we're going to get this running in a way that would be most common in a "real world" setting with the following things.

### Checklist
- A computer. I'll be working on a Mac, but there should be no real difference on a PC, though code editor and terminal options may differ.
- Access to the internet.
- A code editor like [VSCode](https://code.visualstudio.com/), [Atom](https://atom.io/), [Brackets](https://brackets.io), or [Sublime Text](https://www.sublimetext.com/) or what what's out there are what works for you.
- A basic understanding of command line and terminal using bash, [zsh](https://ohmyz.sh/), etc.
- A basic understanding of [HTML](https://www.w3schools.com/html/) and [JavaScript](https://www.w3schools.com/js/DEFAULT.asp).
- A mighty thirst for knowledge!

## Getting Started
Let's setup somewhere on our computer. I'll work from the Desktop folder since that's easy. We'll create a new directory for our project and call it `setup-test` like this. In this lesson we can skip this step, I'll be initializing npm (next step) and building this app directly inside the `setup` directory.

``` bash
mkdir setup-test && cd $_
```

Then we'll initialize the project.

``` bash
npm init
```

You'll be asked several questions which you can answer however you'd like, or just hit enter until it asks you if it's ok and type `yes` and hit enter once more.

The result will be a new `package.json` file with several elements, but the main one we'll worry about is the `scripts` object.

## Webpack & Babel
In order to utilize React and write with modern JavaScript (referred to as [ES6](http://es6-features.org/)) we need to provide some additional processing of our JavaScript. This also allows us to use modern JavaScript syntax but also support older browsers. We're going to do with with [Babel](https://babeljs.io/), let it handle the compiling, and use [WebPack](https://webpack.js.org/) to handle the actual processing.

### Babel
Let's install a few dependencies like this:

``` bash
npm install @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
```

*NOTE: the `--save-dev` flag will help determine if the following packages are needed only for the site to build while `--save` would imply that the package is require for the site to function.*

We'll handle the WebPack side of things later.

Once that's finished installing, let's create a babel config file and add some presets to tell it what it should be compiling for.

``` bash
touch .babelrc
```

In your editor you can add the following which will compile for all browsers and for React specifically.

``` json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
```

### WebPack
Next we'll create a new file for our WebPack configuration.

``` bash
touch webpack.config.js
```

Inside that file we'll add the following. You can learn more about WebPack and what this is doing [here](https://webpack.js.org/guides/getting-started/). Essentially what this is doing is we're going to watch for `js/jsx` files and utilize the `babel-loader` to compile our code. That's it.

``` js
module.exports = {
  entry: {
    main: './src/js/index.js'
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
```

We're done here for now. We'll need to make some additional config updates for WebPack for React, but let's get our dev server setup.

Let's install webpack and our development server.

``` bash
npm install webpack webpack-cli webpack-dev-server --save-dev
```

Once that's complete, let's open our `package.json` file and updated our `scripts` object as noted above. By default you might see something like this:

``` json
...
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
},
...
```

We'll want to replace the `"test"` script with two new scripts.

``` bash
...
"scripts": {
  "start": "webpack-dev-server --open --hot --mode development",
  "build": "webpack --mode production"
}
...
```

This will provide us two options. One to handle live-refresh while building our app, and one to build for a final production location.

At this point we could run `npm run start` to kick off our dev server, but you might find that your console would return errors. And that's fine, we have a little more work to do.

### HTML Loader
Let's start by installing a couple more packages. We need to tell WebPack to also convert HTML (our JSX specifically) into something that the browser can read.

``` bash
npm install html-webpack-plugin html-loader --save-dev
```

We'll move on over to our `webpack.config.js` file and include a new rule and our plugin to handle this update.

In order for Webpack to be able to recognize HTML in our React application we need to utilize a plugin. So We'll important at the top of our `webpack.config.js` above the `module.exports`.

``` js
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
```

Next, we'll create a new directory at the root of our `setup-test` folder called `src`. This is where we'll store our JavaScript and our `index.html` file that React will need to render.

``` bash
mkdir -p src && cd src && touch index.html
```

Then we'll add the plugin array and take advantage of the settings

``` js
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
```

and add our test for html files to kick it off.

``` js
{
  test: /\.html$/,
  use: [
    {
      loader: "html-loader"
    }
  ]
}
```

You can learn more about the options [here](https://github.com/jantimon/html-webpack-plugin#options), but essentially we're telling WebPack what file to use as our root and it's filename.

Inside that `index.html` we just created we'll setup a bare-bones html file with a single div with an id of `root`.

``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
  </head>
  <body>
  <div id="root"></div>
  </body>
</html>
```

At this point you could run `npm run start` and you would see a blank window open, though you'd still get errors in your terminal. So let's wrap this up.

### Finishing Touches
We basically have everything we need to run our app, except for React. So let's install those dependencies first.

``` bash
npm install react react-dom --save
```

While those are installing let's create a new directory inside `src` called `js`. Organizationally our `src` folder should house all of our code, but we should keep those organized by type, in this case javascript. So from inside the `src` folder:

``` bash
mkdir -p js && cd js
```

Then we'll create a file called `index.js`. This will take care of all of our connection betweeen React and our `index.html` file we created earlier.

``` bash
touch index.js
```

In that file we'll add the following lines which will render a single div with text:

``` js
// Import dependencies.
import React from 'react';
import ReactDOM from 'react-dom';

// Render the app in the DOM.
ReactDOM.render(
  <div>Hello World</div>,
  document.getElementById( 'root' ),
);
```

Now let's hook everything up. Back in our `webpack.config.js` file we're going to require another package `path` that is built into WebPack and include and entry and output location.

``` js
const path = require( 'path' );
```

and

``` js
...
entry: {
  main: './src/js/index.js'
},
output: {
  filename: 'index.js',
  path: path.resolve(__dirname, 'dist')
},
...
```

With all that in place let's boot up the app in development mode.

``` bash
npm run start
```

And that's it! We should see our app in the browser. Make a change to "Hello World", change it to "Hello Me" for example, and you should see that change in the browser instantly.

Now let's test production mode.

``` bash
npm run build
```

You should see a `dist` directory appear, and an `index.js` and an `index.html` file show up in that directory. If you were to take that `index.html` and open it in a web browser you should see your app working as well!

#### One Last Note
One thing I'd like to do is add a `reesolve` object to our WebPack config. This will allow us to omit file extensions for these files when importing them into our JavaScript files. It's a little thing, but it'll make a world of difference.

``` js
resolve: {
  extensions: ['.js', '.jsx']
}
```
