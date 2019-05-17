exports.onCreateWebpackConfig = (
  { stage, getConfig, actions },
  pluginOptions,
) => {
  /**
   * Removing cache-busting filenames to avoid Missing Resources /.
   * This is tailored specifically to Netlify as their deployment process suggests
   * avoiding all cache-busting filenames.
   *
   * Gatsby issue covering the topic with replies from Netlify staff
   * https://github.com/gatsbyjs/gatsby/issues/11961
   *
   * Netlify explanation about their caching process
   * https://www.netlify.com/blog/2017/02/23/better-living-through-caching/
   */
  if (stage === 'build-javascript') {
    const newWebpackConfig = {
      ...getConfig(),
      output: {
        filename: `[name].js`,
        chunkFilename: `[name].js`,
        path: getConfig().output.path,
        publicPath: getConfig().output.publicPath,
      },
    };

    actions.replaceWebpackConfig(newWebpackConfig);
  }
};
