// Created at :16/09/21
// Created by :Karthi

import Web3 from 'web3';
import * as EthTx from 'ethereumjs-tx';
const Tx = EthTx.Transaction;
// console.log(Tx);
const abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }]

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
export const createAccount = async (req, res) => {
    const web3 = new Web3('https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');
    try {
        const account = await web3.eth.accounts.create();
        res.status(200).send({ status: true, account });
    } catch (error) {
        res.status(500).send({ status: false, message: 'Create Account Failed' });
    }
};

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
export const getBalance = async (req, res) => {
    const web3 = new Web3('https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');
    try {
        const balance = await web3.eth.getBalance(req.body.address, (err, balance) => {
            res.status(200).send({ status: true, balance: web3.utils.fromWei(balance, 'ether') })
        })
    } catch (error) {
        res.status(500).send({ status: false, message: 'Request for balance Failed' })
    }
};

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 */

export const transfer = async (req, res) => {
    const web3 = new Web3('https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');
    try {
        web3.eth.getTransactionCount(req.body.account1, (err, txCount) => {
            // Build the transaction
            const txObject = {
                nonce: web3.utils.toHex(txCount),
                to: req.body.to,
                value: web3.utils.toHex(web3.utils.toWei('0.01', 'ether')),
                gasLimit: web3.utils.toHex(21000),
                gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
            }
            // console.log(txObject)

            // Sign the transaction
            // const tx = new Tx(txObject);
            const tx = new Tx(txObject, { chain: 'ropsten', hardfork: 'petersburg' })
            // console.log(tx)
            const privateKey1 = Buffer.from('164480bec90cf962d5d93e99e24d0b9f87f23e79f97ae631a1659c17bf77dbba', 'hex',);
            tx.sign(privateKey1);
            const serializedTransaction = tx.serialize()
            // console.log(serializedTransaction)
            const raw = '0x' + serializedTransaction.toString('hex')
            //console.log(raw)

            // broadcast the transaction
            web3.eth.sendSignedTransaction(raw, (err, txHash) => {
                // console.log('err:', err)
                console.log('txHash:', txHash)
                res.status(200).send({ status: true, hash: txHash });
            })
        })
    } catch (error) {
        res.status(500).send({ status: false, message: 'Transfer Failed' });
    }
}

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
export const getTokenBalance = async (req, res) => {
    const web3 = new Web3('https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');
    try {
        const contractAddress = '0x40C5aa5a1C8b71810BD297D284EB5B5e28E33046';
        const contract = new web3.eth.Contract(abi, contractAddress);
        consol.log(contract)
        const balance = await contract.methods.balanceOf(req.body.address).call();
        const decimals = await contract.methods.decimals().call();
        res.status(200).send({ status: true, balance: balance / 10 ** decimals });
    } catch (error) {
        res.status(500).send({ status: false, message: 'Request for Token Balance Failed', error })
    }
};


export const transferToken = async (req, res) => {
    const web3 = new Web3('https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');
    try {
        // contract instance
        const contractAddress = '0x40C5aa5a1C8b71810BD297D284EB5B5e28E33046';
        const contract = new web3.eth.Contract(abi, contractAddress);
        const decimals = await contract.methods.decimals().call();
        // transfer event abi
        const transferAbi = await contract.methods.transfer(req.body.to,
            toFixed(req.body.amount * Math.pow(10, parseInt(decimals || 18)))).encodeABI();
        //  const privateKey1 = Buffer.from('164480bec90cf962d5d93e99e24d0b9f87f23e79f97ae631a1659c17bf77dbba', 'hex',);

        // Sign transaction
        let signTransaction = await web3.eth.accounts.signTransaction({
            to: process.env.CONTRACT_ADDRESS,
            data: transferAbi,
            gas: req.body.gas || 2000000
        }, req.body.private_key
        );

        // Transaction
        let tx = await web3.eth.sendSignedTransaction(
            signTransaction.rawTransaction
        );

        res.status(200).send({ status: true, hash: tx.transactionHash });
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, message: 'Transfer Failed' });
    }
}

function toFixed(x) {
    if (Math.abs(x) < 1.0) {
        var e = parseInt(x.toString().split("e-")[1]);
        if (e) {
            x *= Math.pow(10, e - 1);
            x = "0." + new Array(e).join("0") + x.toString().substring(2);
        }
    } else {
        var e = parseInt(x.toString().split("+")[1]);
        if (e > 20) {
            e -= 20;
            x /= Math.pow(10, e);
            x += new Array(e + 1).join("0");
        }
    }
    return String(x);
}
