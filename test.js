const patchNode = (root1, root2) => {
  if (root1.val !== root2.val) {
    root1.val = root2.value;
    root1.children = root2.children;
    return;
  }

  const len = Math.max(root1.children.length, root2.children.length);
  for (let i = 0; i < len; i++) {
    patchNode(root1.children[i], root2.children[i]);
  }
};