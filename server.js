var http = require("http");
const fs = require('fs');
let bodyData
let rawdata = fs.readFileSync('example.json');
let jsonList = JSON.parse(rawdata);

function customfunction(a, b) {
    return a.score < b.score ? 1 : -1;
}
const server = http.createServer().listen(3000)
server.on('request', (request, response) => {
    var data2 = eval(jsonList);
    var results = data2['users'];
    results.sort(customfunction);
    //console.log(request.method)
    if (request.method == 'POST') {
        let body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            if (body != '') {
                //console.log("body = "+body)
                var base64 = Buffer.from(body.toString(), 'base64').toString('ascii');
                //console.log("base 64 = " +base64)
                try {
                    var a = JSON.parse(base64);
                    //console.log(a)
                    if (a["user"]!= null && a["score"]!=null){
                        jsonList.users[jsonList.users.length] = a
                        console.log('valid json');
                        data2 = eval(jsonList);
                        results = data2['users'];
                        results.sort(customfunction);
                        let data3 = JSON.stringify(jsonList);
                        fs.writeFileSync('example.json', data3);                       
                    }
                } catch (error) {
                    console.log("Something went wrong: " + error);
                }
            }
        });
    } else response.write(JSON.stringify(jsonList));
    response.end();
});

server.on('error', function(e) {
    console.log('ERROR: ' + e.message);
});