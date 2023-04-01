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

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("json");
  return {
    passthroughFileCopy: true
  }
};