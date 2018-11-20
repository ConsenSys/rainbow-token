import Web3 from 'web3';
import { eventChannel } from 'redux-saga';
import { computeToken, color } from './utils';
import { abi } from './abis/RainbowToken.json';

// Ropsten
// const contractAddress = '0x58828ca05884e2dc98ddfa0cc73820d1482d740e';
// const contractAddress = '0x719cb4c365bc0a149d54629ea86fe4e68293609f';
const contractAddress = '0xecb24f6f4ee3a0b0fe8c24a916d0f7ecc2c14e23';

// ganache
// const contractAddress = '0x85a84691547b7ccf19d7c31977a7f8c0af1fb25a';

export const web3 = new Web3(Web3.givenProvider);

// export const web3Ws = process.env.NODE_ENV === 'development'
//     ? new Web3('ws://localhost:7545')
//     : new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws'));
export const web3Ws = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws'));

const RainbowToken = new web3.eth.Contract(abi, contractAddress);
export const RainbowTokenWs = new web3Ws.eth.Contract(abi, contractAddress).events;
const targetColor = color([44, 86, 221]);
const defaultBlendingPrice = 10000000000000000;

export default {
    targetColor,
    defaultBlendingPrice,
    getToken: playerAddress => RainbowToken.methods.getToken(playerAddress).call().then(computeToken),
    isPlayer: address => RainbowToken.methods.isPlayer(address).call(),
    getPlayers: () => RainbowToken.methods.getPlayers().call(),
    play: address => {
        return eventChannel(emitter => {
            RainbowToken.methods.play().send({
                from: address,
                value: defaultBlendingPrice,
                gasLimit: 500000,
            })
                .on('transactionHash', txHash => {
                    console.log('Transaction hash: ', txHash);
                    emitter({ txHash, receipt: undefined, error: undefined })
                })
                .on('receipt', receipt => {
                    console.log('Receipt: ', receipt);
                    emitter({ txHash: undefined, receipt, error: undefined })
                })
                .on('error', error => {
                    console.log(error);
                    emitter({ txHash: undefined, receipt: undefined, error })
                });
                return () => false;
        })
    },
    setBlendingPrice: (address, price) => {
        return eventChannel(emitter => {
            RainbowToken.methods.setBlendingPrice(price).send({
                from: address,
            })
                .on('transactionHash', txHash => {
                    console.log('Transaction hash: ', txHash);
                    emitter({ txHash, receipt: undefined, error: undefined })
                })
                .on('receipt', receipt => {
                    console.log('Receipt: ', receipt);
                    emitter({ txHash: undefined, receipt, error: undefined })
                })
                .on('error', error => {
                    console.log(error);
                    emitter({ txHash: undefined, receipt: undefined, error })
                });
                return () => false;
        })
    },
    blend: (address, blendingAddress, blendingToken) => {
        let eventEmitter;
        if (blendingAddress) {
            eventEmitter = RainbowToken.methods.blend(blendingAddress, blendingToken.blendingPrice, blendingToken.color.r, blendingToken.color.g, blendingToken.color.b).send({
                from: address,
                value: blendingToken.blendingPrice,
            });
        } else {
            // this a default blend
            eventEmitter = RainbowToken.methods.defaultBlend().send({
                from: address,
                value: defaultBlendingPrice,
            });
        }
        return eventChannel(emitter => {
            eventEmitter
                .on('transactionHash', txHash => {
                    console.log('Transaction hash: ', txHash);
                    emitter({ txHash, receipt: undefined, error: undefined })
                })
                .on('receipt', receipt => {
                    console.log('Receipt: ', receipt);
                    emitter({ txHash: undefined, receipt, error: undefined })
                })
                .on('error', error => {
                    console.log(error);
                    emitter({ txHash: undefined, receipt: undefined, error })
                });
            return () => false;
        })
    },
    claimVictory: (address) => {
        return eventChannel(emitter => {
            RainbowToken.methods.claimVictory().send({
                from: address,
            })
                .on('transactionHash', txHash => {
                    console.log('Transaction hash: ', txHash);
                    emitter({ txHash, receipt: undefined, error: undefined })
                })
                .on('receipt', receipt => {
                    console.log('Receipt: ', receipt);
                    emitter({ txHash: undefined, receipt, error: undefined })
                })
                .on('error', error => {
                    console.log(error);
                    emitter({ txHash: undefined, receipt: undefined, error })
                });
        })
    },
};
