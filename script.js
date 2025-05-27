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

// Manejar redimensionamiento
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    hearts = [];
    setupCanvas();
});
