const jsonServer = require("json-server");
const path = require("path");

// NOTE: This should change to the network that you're wanting to deploy against.
const network = process.env.NETWORK || "local";

const server = jsonServer.create();

// The database we "connect" to should depend on the network we're deploying for.
let db;
if (network === "local") {
    db = "db.json";
} else {
    db = `db-${network}.json`;
}

console.log(db);

const router = jsonServer.router(`data/${db}`);

const middlewares = jsonServer.defaults({
    static: path.join(__dirname, "build"),
});

server.use(middlewares);

// Add a "createdAt" field for each new LoanRequest.
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    if (req.method === "POST") {
        req.body.createdAt = Date.now();
    }
    // Continue to JSON Server router
    next();
});

server.use(router);
server.listen(process.env.PORT || 8000, () => {
    console.log(`JSON Server is running for ${network} blockchain`);
});