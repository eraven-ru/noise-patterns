module.exports = {
  apps: [
    {
      name: 'noise-patterns',
      port: '3004',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}