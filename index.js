module.exports = (app = {}) => {
  // verify app is express app
  if (not(has('listen', app))) { 
    throw new Error('Express App is required!')
  }

  // start server
  const server = app.listen()

  // get port
  const port = server.address().port

  // return helper object
  return Object.freeze({
    port,
    url: `http://localhost:${port}`,
    close: server.close.bind(server)
  })
}


function not (a) {
  return !a
}

function has (prop, obj) {
  return obj[prop] !== undefined 
}
