//  <div v-img-lazy-bg="require('@/assets/background.jpg')" class="lazy-bg"></div>
export default {
  bind(el, binding) {
    el.style.backgroundImage = `url('')`; // 初始背景图设置为空
    el.style.opacity = 0; // 初始透明度设置为0，隐藏元素
    el.style.transition = 'opacity 0.5s ease'; // 添加过渡效果

    // 使用IntersectionObserver API实现懒加载
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.style.backgroundImage = `url(${binding.value})`; // 设置背景图
          el.style.backgroundPosition = 'center'; // 设置背景图居中显示
        //   el.style.backgroundSize = 'cover'; // 设置背景图覆盖整个元素区域
          el.style.backgroundRepeat = 'no-repeat'; // 设置背景图不重复显示
          el.style.opacity = 1; // 显示元素
          observer.unobserve(el); // 停止观察
        }
      });
    });

    observer.observe(el); // 开始观察
  },
};