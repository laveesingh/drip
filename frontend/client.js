var express = require('express')
var app = express()
var path = require('path')
var port = process.env.PORT || 3000

app.use(express.static('public'))

app.get('*', function(request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(port, function(){
  console.log(`Client server is listening on port ${port}`)
})
