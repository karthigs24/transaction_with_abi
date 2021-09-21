
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createAccount, getBalance, getTokenBalance, transfer, transferToken } from './controller.js';

const app = express();
const env = dotenv.config().parsed;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('API works...')
});
app.post('/account', createAccount);
app.post('/balance', getBalance);
app.post('/token-balance', getTokenBalance);
app.post('/transfer', transfer);
app.post('/transfer_token', transferToken)


app.listen(env.PORT, () => {
    console.log(`Started on port ${env.PORT}`);
});

// import fs from 'fs';
// const contract = JSON.parse(fs.readFileSync('../build/contracts/MyToken.json', 'utf8'));
// console.log(JSON.stringify(contract.abi));