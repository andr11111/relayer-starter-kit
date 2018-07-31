const RELAYER_ADDRESS = '0xD2f45e02AB7b190aC9A87B743eAB4C8F2ed0e491';

module.exports = async event => {    
    const { data: { relayer } } = event.args;
    if (relayer !== RELAYER_ADDRESS) {
        throw new Error("Incorrect relayer address");
    }
};
  