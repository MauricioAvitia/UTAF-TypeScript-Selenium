module.exports = {
  require: ['ts-node/register'],
  spec: '**/test/*.spec.ts',
  timeout: 5000,
  reporter: 'spec',
  ui: 'bdd',
  colors: true,
};
