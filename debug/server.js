/**
 * server.js
 *
 * Simple Node server for developing HTML clients
 */

var connect = require('connect'),
    path = require('path')
    httpProxy = require('http-proxy'),
    routingProxy = new httpProxy.RoutingProxy(),
    app = connect()

var geoserverProxy = function (pattern, host, port) {
    return function (req, res, next) {
        if (req.url.match(pattern)) {
            routingProxy.proxyRequest(req, res, {host: host, port: port})
        } else {
            next();
        }
    }
}

var GEOSERVER_HOST = process.env.GEOSERVER_HOST
var GEOSERVER_PORT = process.env.GEOSERVER_PORT || 8080

if (!GEOSERVER_HOST) throw new Error('env.GEOSERVER_HOST address required');
  
app.use(connect.logger('dev'))
app.use(geoserverProxy(/\/geoserver\/.*/, process.env.GEOSERVER_HOST, GEOSERVER_PORT))
app.use(connect.favicon())
app.use(connect.static(path.resolve(__dirname ,'../')))
app.use(connect.directory(path.resolve(__dirname ,'../')))

app.listen(process.env.PORT || 3000, function() {
  console.log('Connect Server listening on port ' + (process.env.PORT || 3000))
  console.log('Serving content from ' + path.resolve(__dirname ,'../'))
  console.log('Proxying /geoserver/ requests to ' + GEOSERVER_HOST + ":" + GEOSERVER_PORT + '/geoserver/')
});
