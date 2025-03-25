const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {},
  video: true //salva um video da execução do teste na pasta e2e/videos
})
