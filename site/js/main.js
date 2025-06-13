// Matrix Rain Animation
function setupMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    document.getElementById('matrix-canvas').appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = 150;
    
    const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
    const columns = Math.floor(canvas.width / 20);
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0f0';
        ctx.font = '15px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * 20, drops[i] * 20);
            
            if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }
    
    setInterval(draw, 33);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = 150;
    });
}

// Terminal typing animation
function typeText() {
    const text = 'Secure connection established. Welcome to ArmourInfosec student portal. Scanning systems...';
    const typingTextElement = document.getElementById('typing-text');
    let i = 0;
    
    function type() {
        if (i < text.length) {
            typingTextElement.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        } else {
            setTimeout(() => {
                typingTextElement.textContent = '';
                i = 0;
                type();
            }, 3000);
        }
    }
    
    type();
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupMatrixRain();
    typeText();
    
    // Simulate loading effect
    setTimeout(() => {
        document.querySelector('.pdf-placeholder').style.display = 'none';
        document.querySelector('.pdf-viewer').style.display = 'flex';
    }, 2000);
});
