/**
 * @param {number[]} nums
 * @return {number[]}
 * 
 * 大问题拆解为小问题，求解小问题，后合并小问题
 */
 var sortArray = function (nums) {
  if (!nums || nums.length < 2) return nums;
  let tmp = new Array(nums.length);
  // 大问题开始从sort函数开始分解为小问题
  return sort(nums, 0, nums.length - 1, tmp);
};

const sort = (nums, left, right, tmp) => {
  if (left === right) return;
  let mid = Math.floor((left + right) / 2);
  // 从左边到中间开始分解成小问题
  sort(nums, left, mid, tmp);
  // 从中间到右边开始分解成小问题
  sort(nums, mid + 1, right, tmp);
  // 合并小问题
  return merge(nums, left, mid, right, tmp);
}
const merge = (nums, left, mid, right, tmp) => {
  // 从分解小问题的左边开始排序
  let pos = left;
  let i = left;
  let j = mid + 1;
  while (i <= mid && j <= right) {
    if (nums[i] <= nums[j]) tmp[pos++] = nums[i++];
    else tmp[pos++] = nums[j++];
  }
  while (i <= mid) tmp[pos++] = nums[i++];
  while (j <= right) tmp[pos++] = nums[j++];
  // 把本次排序后的tmp数组复值到nums数组中，以便下次的排序。
  for (pos = left; pos <= right; pos++) nums[left++] = tmp[pos];
  return nums;
}

console.log(sortArray([5, 2, 3, 1])); // [1,2,3,5]
console.log(sortArray([5, 1, 1, 2, 0, 0])); // [0,0,1,1,2,5]