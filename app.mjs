import RLP from 'rlp'
import Web3 from 'web3'

function decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;
    while (hex.length < padding) {
        hex = "0" + hex;
    }
    return hex;
}

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

let ganacheAccountArr = await web3.eth.getAccounts();
let ganacheFirstAccount = ganacheAccountArr[0];
console.log(ganacheFirstAccount);
let firstAccountTxnCountNonce = await web3.eth.getTransactionCount(ganacheFirstAccount);
console.log(firstAccountTxnCountNonce);
console.log(typeof firstAccountTxnCountNonce);

let encoded = RLP.encode([ganacheFirstAccount, firstAccountTxnCountNonce]);
console.log(encoded);
let hex = Buffer.from(encoded);
console.log(hex);
let nonceHash = web3.utils.sha3(hex);
console.log(nonceHash);
let contractAddr = nonceHash.slice(26);
console.log(contractAddr);
let futureAddr = `0x${contractAddr}`;
console.log(futureAddr);
let checksummedFutureAddress = web3.utils.toChecksumAddress(futureAddr);
console.log(checksummedFutureAddress);
console.log("END");
let ganacheSecondAccount = ganacheAccountArr[1];
console.log(ganacheSecondAccount);

await web3.eth.sendTransaction({from: ganacheSecondAccount, to: checksummedFutureAddress, value: 32000000000000000000,},);

let hexstringNonce = `0x${decimalToHex(382)}`;
console.log(hexstringNonce);
console.log(typeof hexstringNonce);
let account = await web3.eth.personal.newAccount('');
console.log(account);
web3.eth.personal.unlockAccount(account, '');
let nonce = 0x00;
console.log(nonce);
console.log(typeof(nonce));
await web3.eth.sendTransaction({from: ganacheFirstAccount, to: account, value: 1000000000000000000,},);
let encoded = RLP.encode([account, nonce]);
console.log(encoded);

web3.eth.getBalance(ganacheSecondAccount, function(err, result) {
    if (err) {
      console.log(err)
    } else {
      console.log(web3.utils.fromWei(result, "ether") + " ETH")
    }
})

web3.eth.getBalance(checksummedFutureAddress, function(err, result) {
    if (err) {
      console.log(err)
    } else {
      console.log(web3.utils.fromWei(result, "ether") + " ETH")
    }
})

await web3.eth.sendTransaction({from: ganacheSecondAccount, to: checksummedFutureAddress, value: 32000000000000000000,},);

web3.eth.getBalance(checksummedFutureAddress, function(err, result) {
    if (err) {
      console.log(err)
    } else {
      console.log(web3.utils.fromWei(result, "ether") + " ETH")
    }
})