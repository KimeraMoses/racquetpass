const {alias} = require('react-app-rewire-alias')

module.exports = function override(config) {
    alias({
        '@components': 'src/web/components',
        '@assets' : 'src/assets',
        '@page' : 'src/web/page',
        '@scss' : 'src/web/scss',
        '@store': 'src/web/store'
    })(config)

    return config
}