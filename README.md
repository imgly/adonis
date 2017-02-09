# :muscle: Adonis: Aphrodite's lover

Adonis combines the best of [Aphrodite](https://github.com/Khan/aphrodite) and
[styled-components](https://github.com/styled-components/styled-components): Named DOM elements,
stylable via object literals with support for inheritance, overriding and theming while staying
lightweight (28 KB / 7.6 KB gzipped)

# Installation

```
  npm install --save adonis
```

# API

```js
import React, { Component } from 'react'
import adonis from 'adonis'

class App extends Component {
  render () {
    return (<div>
      <Section red>
        This is red.
      </Section>
      <Section hover>
        This turns red on hover.
      </Section>
      <Section small>
        This turns red when the browser is less than 600px wide.
      </Section>
      <Section blue small>
        This is blue and turns red when the browser is less than 600px wide.
      </Section>
    </div>)
  }
}

const Section = adonis.div({
  width: '500px',
  height: '100px',
  textAlign: 'center',
  marginBottom: '20px'
}, {
  red: {
    backgroundColor: 'red'
  },
  blue: {
    backgroundColor: 'blue'
  },
  hover: {
    ':hover': {
      backgroundColor: 'red'
    }
  },
  small: {
    '@media (max-width: 600px)': {
      backgroundColor: 'red'
    }
  }
})
```

## Creating an Adonis Component

Adonis components can be created from DOM elements, React Components or other Adonis Components:

```js
  // A styled `div` tag:
  const Title = adonis.div({
    fontSize: '24px'
  })

  // Overriding `Title`'s styles
  const SubTitle = adonis(Title)({
    fontSize: '15px',
    fontStyle: 'italic'
  })

  // Overriding styles of a React component
  class Button extends React.Component({
    render () {
      // You need to pass the `styles` prop in order to override this component's styles
      return <ButtonContainer styles={this.props.styles} />
    }
  })

  const ButtonContainer = adonis.div({
    padding: '5px 10px'
  })

  // Primary button will have `padding: 5px 10px` as well as `background: blue`
  const PrimaryButton = adonis(Button)({
    background: 'blue'
  })
```

## Variations and flags

Adonis adds support for element variations that can be toggled using properties passed to the element:

```js
const Button = adonis.div(
  // Base styles
  {
    width: '100px',
    height: '50px',
    background: 'grey'
  },
  // Variation styles
  {
    primary: {
      background: 'blue'
    }
  }
)

<Button /> // This would be styled with `background: grey`
<Button primary /> // This would be styled with `background: blue`
```

## Re-usable base styles

You can specify "base" styles that can be re-used in any other component:

```js
const primaryBackgroundColor = adonis.css({
  backgroundColor: 'blue'
})

const Button = adonis(primaryBackgroundColor).button({
  color: 'white'
})
```

## Theming

Similarly to `styled-components`, you can wrap your React application in a `ThemeProvider` and
pass a theme object.

```js
import { Component } from 'react'
import adonis, { ThemeProvider } from 'adonis'
import AppComponent from './app-component'

const theme = {
  buttonBackgroundColor: 'grey'
}

ReactDOM.render(<ThemeProvider theme={theme}>
  <AppComponent />
</ThemeProvider>, appContainerElement)
```

You need to make sure that your topmost component is wrapped in `withTheme()`, so that all child
components are receiving the theme:

```js
import { Component } from 'react'
import adonis, { withTheme } from 'adonis'

class AppComponent extends Component {
  render () {
    return <Button />
  }
}

const Button = adonis.div({
  background: 'grey'
})

export default withTheme(AppComponent)
```

Instead of specifying values inside your style object literals, you can now also pass functions
with a `theme` argument:

```js
const Button = adonis.div({
  background: theme => theme.buttonBackgroundColor
})
```

Or, if you're using your theme a lot, you can pass a function returning a whole object:

```js
const Button = adonis.div(theme => {
  return {
    background: theme.buttonBackgroundColor,
    borderWidth: theme.buttonBorderWidth,
    borderRadius: theme.buttonBorderRadius,
    color: theme.textColor,
  }
})
```


# License (MIT)

Copyright (c) 2016 [PhotoEditorSDK.com] (www.photoeditorsdk.com/?utm_source=Github&utm_medium=Side_Projects&utm_content=Adonis&utm_term=HTML5) / 9elements GmbH / Sascha Gehlich

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
