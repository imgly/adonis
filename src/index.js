import Adonis from './adonis'
import DOMElements from './lib/dom-elements'
import BaseStyles from './lib/styles/base-styles'
import withTheme from './lib/with-theme'
import ThemeProvider from './lib/components/theme-provider'

export default (options) => {
  const adonis = new Adonis(options)

  // adonis()
  const factory = (target) => {
    if (target instanceof BaseStyles) {
      // adonis(BaseStyles).div(styles, variations, name)
      const baseStyles = target
      const factory = {}
      DOMElements.forEach((domElement) => {
        factory[domElement] = (styles, variations, name) => {
          if (typeof variations === 'string') {
            name = variations
            variations = undefined
          }

          return adonis.createComponent(domElement, {
            styles, variations, name, baseStyles
          })
        }
      })
      return factory
    } else {
      // adonis(Component)(styles, variations, name)
      // adonis(AdonisComponent)(styles, variations, name)
      return (styles, variations, name) => {
        if (typeof variations === 'string') {
          name = variations
          variations = undefined
        }

        return adonis.createComponent(target, {
          styles, variations, name
        })
      }
    }
  }

  // adonis.div(styles, variations, name)
  DOMElements.forEach((domElement) => {
    factory[domElement] = (styles, variations, name) => {
      if (typeof variations === 'string') {
        name = variations
        variations = undefined
      }

      return adonis.createComponent(domElement, {
        styles, variations, name
      })
    }
  })

  // adonis.css(styles, variations, name)
  factory.css = (styles, variations, name) => {
    if (typeof variations === 'string') {
      name = variations
      variations = undefined
    }

    return new BaseStyles(adonis, { styles, variations, name: name || 'baseStyles' })
  };

  // Proxy some methods
  ['renderToStatic'].forEach((prop) => {
    factory[prop] = adonis[prop].bind(adonis)
  })

  return factory
}

export { withTheme, ThemeProvider }
