document.addEventListener('DOMContentLoaded', () => {
  const stage = document.querySelector('#avatar-stage');
  const original = document.querySelector('#avatar-root');

  if (!stage || !original) return;

  original.hidden = true;
  original.style.display = 'none';

  const image = document.createElement('img');
  image.className = 'avatar-photo';
  image.src = '/swastik-cute-tech-avatar.png';
  image.alt = 'Cute tech-cartoon portrait of Swastik Mishra making peace signs';
  image.width = 848;
  image.height = 1264;

  stage.appendChild(image);

  const particleLayer = document.createElement('div');
  particleLayer.className = 'avatar-data-particles';
  particleLayer.setAttribute('aria-hidden', 'true');

  ['01', 'AI', '↗', 'λ', 'DATA', '∿', 'JS', '∞'].forEach(
    (label, index) => {
      const particle = document.createElement('span');

      particle.className = `data-particle particle-${index + 1}`;
      particle.textContent = label;

      particleLayer.appendChild(particle);
    }
  );

  stage.appendChild(particleLayer);

  const reduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  stage.classList.add('avatar-enter');

  if (reduced) return;

  let frame;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  const animate = () => {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;

    image.style.transform = `
      rotateY(${currentX}deg)
      rotateX(${currentY}deg)
    `;

    frame = requestAnimationFrame(animate);
  };

  stage.addEventListener('pointermove', (event) => {
    const rect = stage.getBoundingClientRect();

    targetX =
      ((event.clientX - rect.left) / rect.width - 0.5) * 10;

    targetY =
      -((event.clientY - rect.top) / rect.height - 0.5) * 8;
  });

  stage.addEventListener('pointerleave', () => {
    targetX = 0;
    targetY = 0;
  });

  animate();

  window.addEventListener(
    'pagehide',
    () => cancelAnimationFrame(frame),
    { once: true }
  );
});
