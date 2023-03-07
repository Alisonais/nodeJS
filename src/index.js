
const http = require('http');
const router = require('./routes');
const {URL} = require('url');
const bodyParser = require('./helpers/bodyParser');

const server = http.createServer((request, response)=>{
    const parsedUrl = new URL(`http://localhost:3000${request.url}`);

    let {pathname} = parsedUrl;
    let id = null;

    const splitEndPoint = pathname.split('/').filter(Boolean);

    if (splitEndPoint.length > 1) {
        pathname = `/${splitEndPoint[0]}/:id`;
        id = splitEndPoint[1];
    }

    const route = router.find((routeObj) => (
        routeObj.endpoint === pathname && routeObj.method === request.method
    ));

    if (route) {

        request.query = Object.fromEntries(parsedUrl.searchParams);
        request.params = { id };

        response.send = (statusCode, body) => {
            response.writeHead(statusCode,{ 'content-type':'application/json' });
            response.end(JSON.stringify(body));
        }

        if(['POST', 'PUT', 'PATCH'].includes(request.method)) {
            bodyParser(request, ()=> route.handler(request, response));
        } else {
            route.handler(request, response);
        }

    } else {
        response.writeHead(404,{ 'content-type':'text/html' });
        response.end(`cannot ${request.method} ${parsedUrl.pathname}`); 
    }



    // if(request.url === '/users' && request.method === 'GET'){
    //     UserController.listUsers(request, response)
    // } else {
    //     response.writeHead(404,{ 'content-type':'text/html' });
    //     response.end(`cannot ${request.method} ${request.url}`); 
    // }

    // response.writeHead(200,{ 'content-type':'text/html' });
    // response.end('<h1> Server is on line <h1/>');
});

server.listen(3000, () => console.log('servidor operante no localhost http://localhost:3000'));
