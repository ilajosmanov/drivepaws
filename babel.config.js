module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  plugins: [
    ['effector/babel-plugin', {
      addLoc: true,
    }],
  ],
};
