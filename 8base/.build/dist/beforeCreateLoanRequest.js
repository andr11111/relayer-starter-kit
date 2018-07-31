const handler = require('./handler');
module.exports.handler = (event, context, callback) => {
    return handler(event, context, callback, "src/beforeCreateLoanRequest", {
        remoteAddress: "https://prestaging-api.8basedev.com/5b60a44b865d1236ca2f0774"
    });
};
//# sourceMappingURL=wrapper.js.map