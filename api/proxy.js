const { createProxyMiddleware } = require('http-proxy-middleware')
const requests = require('request');

module.exports = (req, res) => {
    let prefix = "/api"
    if (!req.url.startsWith(prefix)) {
        return;
    }
    let target = "http://202.193.53.235:8080" + req.url.substring(prefix.length);

    var options = {
        'method': 'GET',
        'url': target,
        'headers': {
            'Notion-Version': res.headers['notion-version'],
            'Authorization': res.headers['authorization']
        }
    };
    request(options, function(error, response) {
        if (error) throw new Error(error);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(response.body);
        res.end();
    });

}