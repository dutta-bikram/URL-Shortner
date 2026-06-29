const CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const BASE = 62n;

function encode(num) {
  num = BigInt(num);

  if (num === 0n) return CHARS[0];

  let result = "";

  while (num > 0n) {
    const rem = Number(num % BASE);
    result = CHARS[rem] + result;
    num /= BASE;
  }

  return result;
}

function decode(str) {
    let num = 0n;
  
    for (const ch of str) {
      const value = CHARS.indexOf(ch);
  
      if (value === -1)
        throw new Error("Invalid Base62 character");
  
      num = num * BASE + BigInt(value);
    }
  
    return num;
  }
  
module.exports = {
    encode,
    decode,
};
