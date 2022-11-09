function flat(arr, depth) {
  if (!Array.isArray(arr)) throw new Error('error');

  const result = [];
  arr.forEach((item) => {
    if (Array.isArray(item) && depth) result.push(...flat(item, depth - 1));
    else result.push(item);
  });

  return result;
};


console.log(flat([1, 2, 3, [4, 5, [6, 7, 8, 9, [10]]]], 1));
console.log(flat([1, 2, 3, [4, 5, [6, 7, 8, 9, [10]]]], 2));
console.log(flat([1, 2, 3, [4, 5, [6, 7, 8, 9, [10]]]], 3));
console.log(flat([1, 2, 3, [4, 5, [6, 7, 8, 9, [10]]]], 4));
console.log(flat([1, 2, 3, [4, 5, [6, 7, 8, 9, [10]]]], Infinity));
