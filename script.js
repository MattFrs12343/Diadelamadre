// Código para las animaciones de la galería
document.addEventListener('DOMContentLoaded', () => {
    // Animación de entrada para las secciones de la galería
    const gallerySections = document.querySelectorAll('.gallery-section');
    
    gallerySections.forEach((section, index) => {
        // Inicialmente ocultas
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        
        // Animación de entrada
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
    });
});

// Clase para los corazones
class Heart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 15 + 10;
        this.speed = Math.random() * 1.5 + 0.5;
        this.rotation = Math.random() * Math.PI * 2;
        this.color = `hsl(0, 100%, ${Math.random() * 30 + 65}%)`;
        this.scale = 1;
    }

    update() {
        this.y -= this.speed;
        this.rotation += 0.02;
        
        // Aumentar y disminuir el tamaño
        this.scale += Math.sin(Date.now() / 1000) * 0.01;
        
        // Reiniciar cuando sale de la pantalla
        if (this.y < -this.size) {
            this.y = window.innerHeight + this.size;
            this.x = Math.random() * window.innerWidth;
            this.scale = 1;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.scale(this.scale, this.scale);
        
        // Dibujo del corazón
        ctx.beginPath();
        ctx.fillStyle = this.color;
        
        // Primera mitad del corazón
        ctx.moveTo(0, -this.size);
        ctx.bezierCurveTo(
            -this.size * 0.5, -this.size * 0.5,
            -this.size * 0.5, this.size * 0.5,
            0, this.size
        );
        
        // Segunda mitad del corazón
        ctx.bezierCurveTo(
            this.size * 0.5, this.size * 0.5,
            this.size * 0.5, -this.size * 0.5,
            0, -this.size
        );
        
        ctx.fill();
        ctx.restore();
    }
}

// Configuración del canvas para los corazones
let hearts = [];
let canvas = document.getElementById('flowerCanvas');
let ctx = canvas.getContext('2d');

function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Crear corazones iniciales
    for (let i = 0; i < 30; i++) {
        hearts.push(new Heart(
            Math.random() * window.innerWidth,
            window.innerHeight + Math.random() * 200
        ));
    }
}

// Animación principal
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    hearts.forEach(heart => {
        heart.update();
        heart.draw(ctx);
    });
    
    requestAnimationFrame(animate);
}

// Iniciar la animación de corazones
setupCanvas();
animate();

// Inicializar la animación de la rosa
const roseCanvas = document.getElementById('roseCanvas');
const roseCtx = roseCanvas.getContext('2d');

function drawRose() {
    const centerX = roseCanvas.width / 2;
    const centerY = roseCanvas.height / 2;
    const size = Math.min(roseCanvas.width, roseCanvas.height) * 0.4;
    const time = Date.now() * 0.001;
    
    // Limpiar el canvas
    roseCtx.clearRect(0, 0, roseCanvas.width, roseCanvas.height);
    
    // Dibujar la rosa con animación
    roseCtx.save();
    roseCtx.translate(centerX, centerY);
    
    // Añadir rotación suave
    roseCtx.rotate(Math.sin(time) * 0.05);
    
    // Dibujar el tallo con detalle
    roseCtx.beginPath();
    roseCtx.moveTo(0, size * 0.3);
    roseCtx.lineTo(0, size);
    roseCtx.lineWidth = 2;
    roseCtx.strokeStyle = '#8B0000';
    roseCtx.stroke();
    
    // Dibujar las hojas con detalle
    roseCtx.beginPath();
    roseCtx.fillStyle = '#008000';
    
    // Hoja izquierda
    roseCtx.moveTo(-size * 0.2, size * 0.5);
    roseCtx.quadraticCurveTo(-size * 0.3, size * 0.6, -size * 0.4, size * 0.5);
    roseCtx.quadraticCurveTo(-size * 0.3, size * 0.4, -size * 0.2, size * 0.5);
    roseCtx.fill();
    
    // Hoja derecha
    roseCtx.moveTo(size * 0.2, size * 0.5);
    roseCtx.quadraticCurveTo(size * 0.3, size * 0.6, size * 0.4, size * 0.5);
    roseCtx.quadraticCurveTo(size * 0.3, size * 0.4, size * 0.2, size * 0.5);
    roseCtx.fill();
    
    // Dibujar las pétalos con más detalle
    roseCtx.beginPath();
    roseCtx.fillStyle = '#FF69B4';
    
    // Pétalos superiores con animación
    for (let i = 0; i < 3; i++) {
        const angle = (i * 120 + time * 10) * Math.PI / 180;
        const x = Math.cos(angle) * size * 0.3;
        const y = Math.sin(angle) * size * 0.3;
        
        roseCtx.moveTo(x, y);
        roseCtx.quadraticCurveTo(x * 0.5, y * 0.5, 0, 0);
        roseCtx.quadraticCurveTo(-x * 0.5, -y * 0.5, -x, -y);
        roseCtx.quadraticCurveTo(-x * 0.7, -y * 0.7, -x * 0.8, -y * 0.8);
        roseCtx.quadraticCurveTo(-x * 0.9, -y * 0.9, -x * 0.95, -y * 0.95);
        roseCtx.quadraticCurveTo(-x * 0.9, -y * 0.9, -x * 0.8, -y * 0.8);
        roseCtx.quadraticCurveTo(-x * 0.7, -y * 0.7, -x * 0.5, -y * 0.5);
        roseCtx.quadraticCurveTo(x * 0.5, y * 0.5, x, y);
    }
    
    // Añadir detalles en el centro
    roseCtx.beginPath();
    roseCtx.fillStyle = '#FFB6C1';
    roseCtx.arc(0, 0, size * 0.1, 0, Math.PI * 2);
    roseCtx.fill();
    
    roseCtx.beginPath();
    roseCtx.fillStyle = '#FFC0CB';
    roseCtx.arc(0, 0, size * 0.05, 0, Math.PI * 2);
    roseCtx.fill();
    
    // Añadir pétalos internos
    roseCtx.beginPath();
    roseCtx.fillStyle = '#FF69B4';
    
    // Pétalos internos con animación
    for (let i = 0; i < 5; i++) {
        const angle = (i * 72 + time * 15) * Math.PI / 180;
        const x = Math.cos(angle) * size * 0.15;
        const y = Math.sin(angle) * size * 0.15;
        
        roseCtx.moveTo(x, y);
        roseCtx.quadraticCurveTo(x * 0.7, y * 0.7, 0, 0);
        roseCtx.quadraticCurveTo(-x * 0.7, -y * 0.7, -x, -y);
        roseCtx.quadraticCurveTo(-x * 0.9, -y * 0.9, -x * 0.95, -y * 0.95);
        roseCtx.quadraticCurveTo(-x * 0.9, -y * 0.9, -x * 0.8, -y * 0.8);
        roseCtx.quadraticCurveTo(-x * 0.7, -y * 0.7, -x * 0.5, -y * 0.5);
        roseCtx.quadraticCurveTo(x * 0.5, y * 0.5, x, y);
    }
    
    // Añadir detalles de polen
    roseCtx.beginPath();
    roseCtx.fillStyle = '#FFD700';
    
    // Crear polen animado
    for (let i = 0; i < 10; i++) {
        const angle = (i * 36 + time * 20) * Math.PI / 180;
        const distance = size * 0.03 * (1 + Math.sin(time + i));
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        roseCtx.beginPath();
        roseCtx.arc(x, y, size * 0.01, 0, Math.PI * 2);
        roseCtx.fill();
}
    
// Añadir detalles en el centro
roseCtx.beginPath();
roseCtx.fillStyle = '#FFB6C1';
roseCtx.arc(0, 0, size * 0.1, 0, Math.PI * 2);
roseCtx.fill();
    
roseCtx.beginPath();
roseCtx.fillStyle = '#FFC0CB';
roseCtx.arc(0, 0, size * 0.05, 0, Math.PI * 2);
roseCtx.fill();
    
// Añadir pétalos internos
roseCtx.beginPath();
roseCtx.fillStyle = '#FF69B4';
    
// Pétalos internos con animación
for (let i = 0; i < 5; i++) {
const angle = (i * 72 + time * 15) * Math.PI / 180;
const x = Math.cos(angle) * size * 0.15;
const y = Math.sin(angle) * size * 0.15;
    
roseCtx.moveTo(x, y);
roseCtx.quadraticCurveTo(x * 0.7, y * 0.7, 0, 0);
roseCtx.quadraticCurveTo(-x * 0.7, -y * 0.7, -x, -y);
roseCtx.quadraticCurveTo(-x * 0.9, -y * 0.9, -x * 0.95, -y * 0.95);
roseCtx.quadraticCurveTo(-x * 0.9, -y * 0.9, -x * 0.8, -y * 0.8);
roseCtx.quadraticCurveTo(-x * 0.7, -y * 0.7, -x * 0.5, -y * 0.5);
roseCtx.quadraticCurveTo(x * 0.5, y * 0.5, x, y);
}
    
// Añadir detalles de polen
roseCtx.beginPath();
roseCtx.fillStyle = '#FFD700';
    
// Crear polen animado
for (let i = 0; i < 10; i++) {
const angle = (i * 36 + time * 20) * Math.PI / 180;
const distance = size * 0.03 * (1 + Math.sin(time + i));
const x = Math.cos(angle) * distance;
const y = Math.sin(angle) * distance;
    
roseCtx.beginPath();
roseCtx.arc(x, y, size * 0.01, 0, Math.PI * 2);
roseCtx.fill();
}
    
roseCtx.restore();
}

// Función para iniciar la animación de la rosa
function startRoseAnimation() {
if (roseCanvas) {
drawRose();
animationFrame = requestAnimationFrame(startRoseAnimation);
}
}

// Función para manejar la visibilidad de elementos
function handleElementVisibility() {
const elements = document.querySelectorAll('.gallery-section, .final-section');
elements.forEach(element => {
const rect = element.getBoundingClientRect();
const isInView = rect.top < window.innerHeight && rect.bottom >= 0;
if (isInView) {
element.classList.add('visible');
}
});
}

// Función para mostrar el mensaje final automáticamente
function showFinalMessage() {
const finalSection = document.querySelector('.final-section');
if (finalSection) {
const rect = finalSection.getBoundingClientRect();
const isInView = rect.top < window.innerHeight && rect.bottom >= 0;
if (isInView) {
finalSection.classList.add('visible');
// Mostrar mensaje dinámico
const dynamicPhrase = document.querySelector('.dynamic-phrase');
if (dynamicPhrase) {
dynamicPhrase.style.opacity = '1';
}
}
}
}

// Iniciar la animación cuando el canvas esté listo
if (roseCanvas) {
startRoseAnimation();
}

// Añadir eventos de scroll
window.addEventListener('scroll', () => {
handleElementVisibility();
showFinalMessage();
    
if (roseCanvas) {
const rect = roseCanvas.getBoundingClientRect();
const isInView = rect.top < window.innerHeight && rect.bottom >= 0;
if (isInView) {
startRoseAnimation();
}
}
});

// Añadir evento de carga para mostrar elementos iniciales
window.addEventListener('load', () => {
handleElementVisibility();
showFinalMessage();
});

// Animar la rosa
function animateRose() {
drawRose();
requestAnimationFrame(animateRose);
}

// Iniciar la animación de la rosa
animateRose();

// Manejar redimensionamiento
window.addEventListener('resize', () => {
roseCanvas.width = window.innerWidth > 768 ? 400 : 300;
roseCanvas.height = window.innerWidth > 768 ? 400 : 300;
drawRose();
});
