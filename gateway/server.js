const express = require('express')

const {ROUTES} = require("./routes");

const {setupLogging} = require("./logging");
const {setupRateLimit} = require("./ratelimit");
const {setupProxies} = require("./proxy");

const app = express()
const port = 4000;

setupLogging(app);
setupRateLimit(app, ROUTES);
setupProxies(app, ROUTES);

app.listen(port, () => {
})