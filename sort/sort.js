/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
  let len = nums.length;
  if (len <= 1) return nums;
  if (len <= 48) {
    // 插入
    sort5(nums)
  } else {
    // 快排
    sort4(nums, 0, nums.length - 1);
  }
  // sort1(nums);
  // sort2(nums);
  // nums = sort3(nums);
  // sort4(nums, 0, nums.length-1);
  // sort5(nums);
  // sort6(nums);
  // sort7(nums);
  // nums = sort8(nums);
  // sort9(nums);
  // sort2(nums);
  return nums;
};

// 冒泡
function sort1(nums) {
  for (let i = 0, len = nums.length; i < len; i++) {
    for (let j = 0; j < len - i; j++) {
      if (nums[j] > nums[j + 1]) {
        swap(nums, j, j + 1)
      }
    }
  }
}
// 选择
function sort2(nums) {
  for (let i = 0, len = nums.length; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (nums[i] > nums[j]) {
        swap(nums, i, j)
      }
    }
  }
}
// 归并
function sort3(nums) {
  if (nums.length <= 1) return nums;
  let mid = Math.ceil(nums.length / 2);
  let left = nums.slice(0, mid);
  let right = nums.slice(mid);
  return merge(sort3(left), sort3(right));
}
// 快速
function sort4(nums, left, right) {
  if (left >= right) return;
  let mid = fastPartition(nums, left, right);
  sort4(nums, left, mid - 1);
  sort4(nums, mid + 1, right)
}

function fastPartition(nums, left, right) {
  let random = Math.floor(Math.random() * (right - left)) + left;
  swap(nums, left, random)
  return partition(nums, left, right);
}

// 插入
function sort5(nums) {
  if (nums.length <= 1) return nums;

  for (let i = 1, len = nums.length; i < len; i++) {
    for (let j = i; j > 0; j--) {
      if (nums[j] < nums[j - 1]) {
        swap(nums, j, j - 1)
      }
    }
  }
}
// 计数
function sort6() {}
// 希尔排序
function sort7(nums) {
  let len = nums.length;
  let gap = len < 3 ? 1 : Math.floor(len / 3);
  while (gap > 0) {
    for (let i = gap; i < len; i++) {
      for (let j = i; j >= gap; j -= gap) {
        if (nums[j] < nums[j - gap]) {
          swap(nums, j, j - gap)
        }
      }
    }
    gap = gap == 2 ? 1 : Math.floor(gap / 3);
  }
}
// 堆排序
function sort8(nums) {
  buildHeap(nums)
  let result = []
  while (nums.length) {
    result.unshift(pop(nums))
  }
  return result;
}

function buildHeap(nums) {
  let len = nums.length;
  let lastNode = Math.floor((len - 1) / 2)
  for (let i = lastNode; i >= 0; i--) {
    down(nums, i);
  }
}

function down(nums, index) {
  let left = 2 * index + 1;
  let right = 2 * index + 2;

  let len = nums.length;

  let maxChild
  if (left >= len) return;
  if (right >= len) {
    maxChild = left;
  } else if (nums[left] >= nums[right]) {
    maxChild = left;
  } else {
    maxChild = right;
  }

  if (nums[index] < nums[maxChild]) {
    swap(nums, index, maxChild);
    down(nums, maxChild);
  }

}

function pop(nums) {

  let len = nums.length;
  swap(nums, 0, len - 1);
  let num = nums.pop();
  down(nums, 0)
  return num;
}

// 桶排序
function sort9() {}

// tools
function partition(nums, left, right) {
  if (left >= right) return;
  let sign = nums[left];
  let signIdx = left - 1;
  swap(nums, left, right);
  for (let i = left; i <= right; i++) {
    if (nums[i] <= sign) {
      signIdx++;
      swap(nums, signIdx, i)
    }
  }
  return signIdx;
}

function merge(left, right) {
  let result = [];
  let lIdx = 0,
    rIdx = 0,
    lLen = left.length,
    rLen = right.length;
  while (lIdx < lLen && rIdx < rLen) {
    if (left[lIdx] <= right[rIdx]) {
      result.push(left[lIdx++])
    } else {
      result.push(right[rIdx++])
    }
  }
  while (lIdx < lLen) {
    result.push(left[lIdx++])
  }
  while (rIdx < rLen) {
    result.push(right[rIdx++])
  }
  return result;
}

function swap(nums, i, j) {
  let temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}