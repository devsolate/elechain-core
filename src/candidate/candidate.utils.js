'use strict'

const StellarSdk = require('stellar-sdk')
const Constants = require('../constants')

const registerXDR = (startTime, endTime, issuer, keyPair, admins, candidateUser) => {

    const xdr = new StellarSdk.TransactionBuilder(issuer)
    
    // Sign All Admin
    admins.map((admin) => {
        xdr.addOperation(StellarSdk.Operation.setOptions({
            signer: {
                ed25519PublicKey: admin.accountId,
                weight: 1
            }
        }))
    })

    const threshold = admins.length + 1
    console.log(threshold)
    
    const transaction = xdr.addOperation(StellarSdk.Operation.setOptions({
        masterWeight: 0,
        lowThreshold: threshold,
        medThreshold: threshold,
        highThreshold: threshold,
        signer: {
            ed25519PublicKey: candidateUser.accountId,
            weight: 1
        }
    }))
    .build()
    transaction.sign(keyPair)
    return transaction
}


const approveXDR = (startTime, endTime, name, issuer) => {

    const voterAsset = new StellarSdk.Asset(name, issuer.publicKey())
    const votedAsset = new StellarSdk.Asset(Constants.COIN.VOTED, issuer.publicKey())

    const xdr = new StellarSdk.TransactionBuilder(issuer)
        .addOperation(StellarSdk.Operation.manageOffer({
            selling: voterAsset,
            buying: votedAsset,
            amount: '1000',
            price: 1
        }))
        .build()

    return xdr
}

const fund = (server, accountId) => {
    return new Promise((resolve, reject) => {
        server.friendbot(accountId)
            .call()
            .then(function(resp) {
                resolve()
            })
            .catch(function(err) {
                reject()
            });
    })
}


module.exports = {
    registerXDR,
    fund
}