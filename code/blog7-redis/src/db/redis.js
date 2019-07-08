const redis = require('redis')
const {
  REDIS_CONF
} = require('../config/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
  console.error(err)
})


// set
function set(key, value) {
  if (typeof (value) === 'object') {
    value = JSON.stringify(value)
  }
  redisClient.set(key, value, redis.print)
}

// get 
function get(key) {
  // redisClient.get(key)
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resolve(null)
        return
      }
      try {
        resolve(
          JSON.parse(val)
        )
      } catch (ex) {
        resolve(val)
      }
      resolve(val)
    })
  })
  return promise
}

module.exports = {
  set,
  get
}