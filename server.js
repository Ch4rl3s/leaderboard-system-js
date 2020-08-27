var http = require("http");
const fs = require('fs');
let bodyData
let rawdata = fs.readFileSync('example.json');
let jsonList = JSON.parse(rawdata);


function customfunction(a, b) 
{
    return a.score < b.score ? 1 : -1;
}
const server = http.createServer().listen(3000)
server.on('request', (request, response) => {
    var data2 = eval(jsonList);
    var results = data2['users'];
    results.sort(customfunction);
    //console.log(request.method)
    if (request.method == 'POST'){

    
        let body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            if (body != ''){
                var bodyData = Buffer.concat(body);
                var a = JSON.parse(bodyData);
                jsonList.users[jsonList.users.length] = a
                let data3 = JSON.stringify(jsonList);
                fs.writeFileSync('example.json', data3);
            }
        });
        response.write('ok')
    } else response.write(JSON.stringify(jsonList));
    response.end();
});

server.on('error', function(e) {
    console.log('ERROR: ' + e.message);
  });