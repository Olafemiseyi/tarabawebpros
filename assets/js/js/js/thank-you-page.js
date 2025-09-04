document.addEventListener('DOMContentLoaded', () => {
  // Neon text pulse
  const heading = document.querySelector('.animated-heading');
  const text = heading.textContent;
  heading.innerHTML = text.split('').map(char => `<span>${char}</span>`).join('');
  const letters = heading.querySelectorAll('span');
  letters.forEach((letter, i) => {
    letter.style.animationDelay = `${i * 0.1}s`;
  });

  // Particle ripple
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = window.innerWidth < 600 ? 50 : 100;
  const colors = ['#FF5722', '#FFC107', '#FF8A65'];

  class Particle {
    constructor(x, y) {
      this.x = x || Math.random() * canvas.width;
      this.y = y || Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 1.5;
      this.vy = (Math.random() - 0.5) * 1.5;
      this.size = Math.random() * 2 + 1;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.3 + 0.5;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= 0.005;
      if (this.alpha <= 0 || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.alpha = Math.random() * 0.3 + 0.5;
      }
    }
    draw() {
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // Tap/click interaction (exclude button)
  canvas.addEventListener('click', e => {
    if (e.target.closest('.btn-primary')) return; // Skip if clicking button
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    for (let i = 0; i < 10; i++) {
      particles.push(new Particle(x, y));
    }
  });
  canvas.addEventListener('touchstart', e => {
    if (e.target.closest('.btn-primary')) return; // Skip if touching button
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    for (let i = 0; i < 10; i++) {
      particles.push(new Particle(x, y));
    }
  });

  // Glass card parallax
  const cards = document.querySelectorAll('.glass-card');
  document.addEventListener('mousemove', e => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    cards.forEach(card => {
      const offsetX = mouseX * 20;
      const offsetY = mouseY * 20;
      card.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
  });
  document.addEventListener('touchmove', e => {
    if (e.target.closest('.btn-primary')) return; // Skip if touching button
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const touchX = e.touches[0].clientX / window.innerWidth - 0.5;
    const touchY = e.touches[0].clientY / window.innerHeight - 0.5;
    cards.forEach(card => {
      const offsetX = touchX * 20;
      const offsetY = touchY * 20;
      card.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
  });

  // 3D Glass Spheres with Three.js
  const sphereContainer = document.createElement('div');
  sphereContainer.style.position = 'absolute';
  sphereContainer.style.top = '5%';
  sphereContainer.style.left = '50%';
  sphereContainer.style.transform = 'translateX(-50%)';
  sphereContainer.style.width = window.innerWidth < 600 ? '120px' : '150px';
  sphereContainer.style.height = window.innerWidth < 600 ? '120px' : '150px';
  sphereContainer.style.zIndex = '1';
  sphereContainer.style.cursor = 'pointer';
  document.querySelector('.thank-you-container').appendChild(sphereContainer);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth < 600 ? 120 : 150, window.innerWidth < 600 ? 120 : 150);
  sphereContainer.appendChild(renderer.domElement);

  const snippets = ['<div>', '.css {}', 'function()'];
  const geometry = new THREE.SphereGeometry(0.4, 16, 16);
  const material = new THREE.MeshBasicMaterial({ color: 0xFF5722, wireframe: true, transparent: true, opacity: 0.7 });
  const sphereGroup = new THREE.Group();
  snippets.forEach((text, i) => {
    const sphere = new THREE.Mesh(geometry, material);
    const angle = (i / snippets.length) * Math.PI * 2;
    sphere.position.set(Math.cos(angle) * 2, i * 1.5 - snippets.length / 2, Math.sin(angle) * 2);
    sphereGroup.add(sphere);
  });
  scene.add(sphereGroup);
  camera.position.z = 5;

  function animateSpheres() {
    sphereGroup.rotation.y += 0.015;
    sphereGroup.rotation.x += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(animateSpheres);
  }
  animateSpheres();

  // Sphere interaction
  sphereContainer.addEventListener('click', () => {
    const tip = document.createElement('div');
    tip.className = 'course-tip';
    tip.textContent = 'Code epic sites with us! Join our class!';
    tip.style.position = 'absolute';
    tip.style.top = '20%';
    tip.style.left = '50%';
    tip.style.transform = 'translateX(-50%)';
    tip.style.background = 'rgba(255, 87, 34, 0.9)';
    tip.style.backdropFilter = 'blur(5px)';
    tip.style.color = '#fff';
    tip.style.padding = '0.8rem';
    tip.style.borderRadius = '0.4rem';
    tip.style.boxShadow = '0 0 10px rgba(255, 87, 34, 0.7)';
    tip.style.opacity = '0';
    tip.style.transition = 'opacity 0.4s';
    tip.style.zIndex = '3';
    document.querySelector('.thank-you-container').appendChild(tip);
    setTimeout(() => tip.style.opacity = '1', 100);
    setTimeout(() => tip.remove(), 4000);
  });
  sphereContainer.addEventListener('touchstart', e => {
    e.preventDefault();
    const tip = document.createElement('div');
    tip.className = 'course-tip';
    tip.textContent = 'Code epic sites with us! Join our class!';
    tip.style.position = 'absolute';
    tip.style.top = '20%';
    tip.style.left = '50%';
    tip.style.transform = 'translateX(-50%)';
    tip.style.background = 'rgba(255, 87, 34, 0.9)';
    tip.style.backdropFilter = 'blur(5px)';
    tip.style.color = '#fff';
    tip.style.padding = '0.8rem';
    tip.style.borderRadius = '0.4rem';
    tip.style.boxShadow = '0 0 10px rgba(255, 87, 34, 0.7)';
    tip.style.opacity = '0';
    tip.style.transition = 'opacity 0.4s';
    tip.style.zIndex = '3';
    document.querySelector('.thank-you-container').appendChild(tip);
    setTimeout(() => tip.style.opacity = '1', 100);
    setTimeout(() => tip.remove(), 4000);
  });

  // Button particle burst
  const button = document.querySelector('.btn-primary');
  button.addEventListener('click', e => {
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    for (let i = 0; i < 10; i++) {
      particles.push(new Particle(x, y));
    }
  });
  button.addEventListener('touchstart', e => {
    const rect = button.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left + rect.width / 2;
    const y = e.touches[0].clientY - rect.top + rect.height / 2;
    for (let i = 0; i < 10; i++) {
      particles.push(new Particle(x, y));
    }
    // Do not prevent default to allow link navigation
  });

  // Resize canvas
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    renderer.setSize(window.innerWidth < 600 ? 120 : 150, window.innerWidth < 600 ? 120 : 150);
  });

  // Accessibility: Reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    particles.length = 0;
    cards.forEach(c => c.style.animation = 'none');
    sphereContainer.style.display = 'none';
  }
});