const adminRouter = require('./dashboard');

function route(app) {
    app.use('/', adminRouter);
}

module.exports = route;
