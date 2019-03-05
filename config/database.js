// Asynchronous
const crypto = require('crypto').randomBytes(256).toString('hex');

// Exporting the object
module.exports =
{
    uri: 'mongodb://localhost:27017/' + this.db,
    secret: crypto,
    db: 'portfoliodb'
}