const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

const fs = require('fs');
// clear site on initial build
fs.rmdirSync('_site', { recursive: true });
console.log('Cleared _site folder');

module.exports = function(eleventyConfig) {
  eleventyConfig.setNunjucksEnvironmentOptions({
    throwOnUndefined: true,
    autoescape: false, // warning: don’t do this!
  });

  /*eleventyConfig.addFilter("dropContentFolder", function (path) {
    if (path.endsWith("/index")) {
        path = path.substring(0, -6);
    }
    const pathToDrop = "/notes"
    if (path.indexOf(pathToDrop) !== 0) {
        return path
    }
    return path.slice(pathToDrop.length)
})*/
  
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("_data");
  eleventyConfig.addPassthroughCopy("images");
  return {
    passthroughFileCopy: true
  }
};