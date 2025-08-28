
// <img v-img-lazy-src="require('@/assets/image.jpg')" alt="Lazy Loaded Image">
export default {
  bind(el, binding) {
    el.style.display = 'none'; // 初始隐藏图片
    const img = new Image();
    img.src = binding.value; // 设置图片的源
    img.onload = () => {
      el.src = img.src; // 加载完成后设置img的src
      el.style.display = 'block'; // 显示图片
      el.style.backgroundPosition = 'center'; // 设置背景图居中显示
        //   el.style.backgroundSize = 'cover'; // 设置背景图覆盖整个元素区域
        el.style.backgroundRepeat = 'no-repeat'; // 设置背景图不重复显示
    };

    // 使用IntersectionObserver API实现懒加载
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          observer.unobserve(el); // 停止观察
        }
      });
    });

    observer.observe(el); // 开始观察
  },
};