window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  if (scrollY > 50) {
    document.querySelector('.left-door').style.transform = 'translateX(-100%)';
    document.querySelector('.right-door').style.transform = 'translateX(100%)';
    document.querySelector('.computer-screen').style.opacity = '0';
  }
});
