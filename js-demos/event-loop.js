setImmediate(()=>{
  console.log('setImmediate1')
  setTimeout(()=>{
    console.log('setTimeout1')    
  },0)
})
console.log('haihaihai');
setTimeout(()=>{
  console.log('setTimeout2') 
  process.nextTick(()=>{console.log('nextTick1')})
  setImmediate(()=>{
    console.log('setImmediate2')
  })   
},0)



/**
 * 1 7 3 5 2 6 4
*/
console.log(1);

setTimeout(() => console.log(2));

Promise.resolve().then(() => console.log(3));

Promise.resolve().then(() => setTimeout(() => console.log(4)));

Promise.resolve().then(() => console.log(5));

setTimeout(() => console.log(6));

console.log(7);