const {encode} = require('../utils/base62');

const EPOCH = BigInt(new Date("2026-01-01T00:00:00Z").getTime());

const PORT = BigInt(process.env.PORT || 3000);

const PORT_BITS = 16n;
const SEQUENCE_BITS = 4n;

const MAX_SEQUENCE = (1n << SEQUENCE_BITS) - 1n;

let lastTimestamp = -1n;
let sequence = 0n;

function currentTimestamp() {
    return BigInt(Date.now()) - EPOCH;
}

function waitNextMillis(last) {
    let now = currentTimestamp();

    while (now <= last) {
        now = currentTimestamp();
    }

    return now;
}

function generateRawId() {
    let ts = currentTimestamp();

    if (ts === lastTimestamp) {
        sequence++;

        if(sequence > MAX_SEQUENCE) {
            ts = waitNextMillis(lastTimestamp);
            sequence = 0n;
        }
    } else {
        sequence = 0n;
    }

    lastTimestamp = ts;

    return ((ts << (PORT_BITS + SEQUENCE_BITS)) | (PORT << SEQUENCE_BITS) | sequence);
}

function generateId(){
    const raw = generateRawId();
    const id = encode(raw);
    return id;
}

module.exports = { generateId };