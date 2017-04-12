
var messages = [];

module.exports.requestHandler = function(request, response) {

  var defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10 // Seconds.
  };
  
  defaultCorsHeaders['Content-Type'] = 'application/json';
  
  var headers = defaultCorsHeaders;
  var method = request.method;
  var url = request.url;
  

  if(url === '/classes/messages') {
    if(method === 'GET') {
      console.log('Handling request');
      response.writeHead(200, headers);
      response.end(JSON.stringify({results: messages}));
    }
    if(method === 'POST') {
      var body = '';
      request.on('data', function(chunk) {
        body += chunk;
      });
      request.on('end', function() {
        messages.push(JSON.parse(body));
        response.writeHead(201, headers);
        response.end();
      });
      if (method === 'OPTIONS') {
        response.writeHead(200, headers);
        response.end(JSON.stringify({ allow: 'GET, POST, PUT, DELETE, OPTIONS'}));
      } 
    }
  } else {
    response.writeHead(404, headers);
    response.end();
  }
};


  