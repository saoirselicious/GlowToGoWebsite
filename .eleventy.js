const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  eleventyConfig.setNunjucksEnvironmentOptions({
    throwOnUndefined: true,
    autoescape: false, // warning: don’t do this!
  });
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("json");

  eleventyConfig.addPassthroughCopy("animate.css");
  eleventyConfig.addPassthroughCopy("bootstrap.css");
  eleventyConfig.addPassthroughCopy("magnific-popup.css");
  eleventyConfig.addPassthroughCopy("owl.carousel.min.css");
  eleventyConfig.addPassthroughCopy("style.css");
  return {
    passthroughFileCopy: true
  }
};