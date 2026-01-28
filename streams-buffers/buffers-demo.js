// buffers are objects -> handle binary data
// use cases, ninary oprations , cryptography , image processing

const buffOne = Buffer.alloc(10); // allocate a buffer 10 bytes --> zeros
console.log("buffone ", buffOne);

const bufferFromSting = Buffer.from("Hello");
console.log("bufferfrom sting ", bufferFromSting);

const bufferFromArrayofIntegers = Buffer.from([1, 2, 3, 4]);

console.log("bufferFromArrayofIntegers", bufferFromArrayofIntegers);

buffOne.write("Node js");
console.log("after writting node js to bufferOne ", buffOne.toString());

console.log("bufferFromSting ", bufferFromSting[0]);
console.log("bufferFromSting to slice ", bufferFromSting.slice(0, 3));

const concatBuffer = Buffer.concat([buffOne, bufferFromSting]);
console.log("concat Buffer", concatBuffer);
console.log("concat Buffer to json", concatBuffer.toJSON());
