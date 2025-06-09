// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Three.js background
    const canvas = document.getElementById('webgl-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Create quantum particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Particle materials
    const blueMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: new THREE.Color(0x00f0ff),
        transparent: true,
        opacity: 0.8
    });
    
    const pinkMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: new THREE.Color(0xff00c8),
        transparent: true,
        opacity: 0.8
    });
    
    // Create particle systems
    const blueParticles = new THREE.Points(particlesGeometry, blueMaterial);
    const pinkParticles = new THREE.Points(particlesGeometry, pinkMaterial);
    scene.add(blueParticles);
    scene.add(pinkParticles);
    
    // Position camera
    camera.position.z = 5;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        blueParticles.rotation.x += 0.0005;
        blueParticles.rotation.y += 0.001;
        pinkParticles.rotation.x -= 0.0005;
        pinkParticles.rotation.y -= 0.001;
        
        renderer.render(scene, camera);
    }
    animate();
    
    // GSAP animations
    gsap.from('.glitch-title', {
        duration: 1.5,
        opacity: 0,
        y: 50,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    gsap.from('.neon-subtitle', {
        duration: 1.5,
        opacity: 0,
        delay: 0.5,
        ease: 'power2.inOut'
    });
    
    gsap.from('.quantum-btn', {
        duration: 1,
        opacity: 0,
        y: 20,
        delay: 1,
        ease: 'back.out(1.7)'
    });
    
    // Quantum terminal interaction
    const terminalInput = document.querySelector('.terminal-input input');
    terminalInput.addEventListener('keyup', function(e) {
        if(e.key === 'Enter') {
            const output = document.querySelector('.terminal-output');
            const newEntry = document.createElement('div');
            newEntry.textContent = `> ${terminalInput.value}`;
            output.appendChild(newEntry);
            
            // Add response based on keywords
            const response = document.createElement('div');
            if(terminalInput.value.toLowerCase().includes('hello')) {
                response.textContent = '√ Greetings, human. How may I assist?';
                response.className = 'success';
            } else if(terminalInput.value.toLowerCase().includes('quantum')) {
                response.textContent = 'Initializing quantum matrix... Qubits stabilized';
                response.className = 'pulse';
            } else {
                response.textContent = 'Command not recognized. Try "help", "projects", or "contact"';
            }
            
            output.appendChild(response);
            terminalInput.value = '';
            
            // Scroll to bottom
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    });
    
    // Particle field effect for hero section
    const particleField = document.querySelector('.particle-field');
    for(let i = 0; i < 150; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.width = `${Math.random() * 3 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.backgroundColor = i % 3 === 0 ? '#00f0ff' : (i % 3 === 1 ? '#ff00c8' : '#00ff9d');
        particleField.appendChild(particle);
    }
    
    // Responsive adjustments
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});