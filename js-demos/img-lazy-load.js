/**
 * 图片懒加载
 * 
 * 亦可通过 getBoundingClientRect().top - window.innerHeight 的方式来获取位置
*/

const images = document.querySelector('img');

const callback = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const image = entry.target;
      const data_src = image.getAttribute('data-src');
      image.setAttribute('src', data_src);
      console.log('触发');
      observer.unobserve(image);
    }
  });
};

const observer = new IntersectionObserver(callback);

images.forEach(image => {
  observer.observe(image);
});