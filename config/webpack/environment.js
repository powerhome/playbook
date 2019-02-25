const { environment } = require('@rails/webpacker')
const erb = require('./loaders/erb')
const images = require('./loaders/images')

environment.loaders.prepend('erb', erb)
environment.loaders.prepend('images', images)
  
module.exports = environment
