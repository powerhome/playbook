module.exports = {
    use: ({ loaders }) => {
        loaders.get('sass').use.forEach(u => {
            if (u.loader === 'sass-loader') u.loader = 'fast-sass-loader'
        })
    }
}
