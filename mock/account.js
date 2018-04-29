
const StellarSdk = require('stellar-sdk');
const key = StellarSdk.Keypair.random()
console.log({
    publicKey: key.publicKey(),
    secret: key.secret()
})