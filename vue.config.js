module.exports = {
  publicPath: './',
  devServer: {
    disableHostCheck: true
  },
  pluginOptions: {
    sitemap: {
      urls: [
        'https://domišljijski-slovarček.tamius.net/',
        'https://domišljijski-slovarček.tamius.net/brskaj',
        'https://domišljijski-slovarček.tamius.net/about',
      ]
    }
  }

};
