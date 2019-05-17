# gatsby-plugin-remove-fingerprints

Easily remove the output contenthash from your built JavaScript files.

## Install

`yarn add gatsby-plugin-remove-fingerprints`

## How to use

Add the plugin to your

```js
// In your gatsby-config.js
plugins: [`gatsby-plugin-remove-fingerprints`];
```

## Why?

Gatsby's default behaviour is to include a `[contenthash]` for all built JavaScript files. The default output configuration looks like this:

```js
return {
  filename: `[name]-[contenthash].js`,
  chunkFilename: `[name]-[contenthash].js`,
  path: directoryPath(`public`),
  publicPath: withTrailingSlash(publicPath),
};
```

This is useful for the majority of cases, but services like [Netlify](https://netlify.com) recommend building files without a hash. This plugin will eliminate the hash from built JavaScript files. The configuration looks like this:

```js
if (stage === 'build-javascript') {
  const newWebpackConfig = {
    ...getConfig(),
    output: {
      filename: `[name].js`, // no contenthash
      chunkFilename: `[name].js`, // no contenthash
      path: getConfig().output.path,
      publicPath: getConfig().output.publicPath,
    },
  };

  actions.replaceWebpackConfig(newWebpackConfig);
}
```

To learn more about the reasons why this is important you can read Netlify's staff response to a Gatsby issue, [Netlify and cache busting urls](https://github.com/gatsbyjs/gatsby/issues/11961).

You can also learn more about how [Netlify handles their caching](https://www.netlify.com/blog/2017/02/23/better-living-through-caching/).
