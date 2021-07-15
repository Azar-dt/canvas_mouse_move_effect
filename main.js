const canvas = document.getElementById('canvas1'); 
const ctx = canvas.getContext('2d'); 

canvas.width = window.innerWidth; 
canvas.height = window.innerHeight; 

window.addEventListener('resize',function() {  
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
})

let particleArray = []; 
let hue = 0; 

// get click position
const mouse = { 
    x:undefined, 
    y:undefined
}

window.addEventListener('click',function(event) { 
    mouse.x = event.x; 
    mouse.y = event.y; 
    for (let i=0;i<15;i++) { 
        particleArray.push(new Particle()); 
    }
})

window.addEventListener('mousemove', function(event) { 
    mouse.x = event.x; 
    mouse.y = event.y; 
    for (let i=0;i<2;i++) { 
        particleArray.push(new Particle()); 
    }
})

//
function drawC() { 
    ctx.fillStyle = "blue"; 
    ctx.strokeStyle = "blue"; 
    ctx.lineWidth = 5; 
    ctx.beginPath(); 
    ctx.arc(mouse.x,mouse.y,50,0,Math.PI *2); 
    ctx.stroke(); 
    ctx.closePath(); 
    ctx.fill(); 
}

class Particle { 
    constructor() { 
        this.x = mouse.x; 
        this.y = mouse.y; 
        this.size = Math.random() * 15+1; 
        this.speedX = Math.random() * 3 - 1.5; 
        this.speedY = Math.random() * 3 -1.5 ; 
        this.color = 'hsl('+hue+',100%,50%)'; 
    }

    update() { 
        this.x += this.speedX; 
        this.y += this.speedY; 
        if (this.size >= 0.2) this.size-= 0.1; 
    }

    draw() { 
        ctx.fillStyle = this.color;  
        ctx.beginPath(); 
        ctx.arc(this.x,this.y,this.size,0,Math.PI *2); 
        ctx.closePath(); 
        ctx.fill(); 
    }
}


function handleParticles() { 
    for(let i=0;i<particleArray.length;i++) { 
        particleArray[i].update(); 
        particleArray[i].draw(); 

        for(let j=i; j<particleArray.length; j++) { 
            let dx = particleArray[i].x - particleArray[j].x;
            let dy = particleArray[i].y - particleArray[j].y; 
            let distance = Math.sqrt(dx*dx + dy*dy); 

            if (distance<100) { 
                ctx.beginPath(); 
                ctx.strokeStyle = particleArray[i].color; 
                ctx.lineWidth = particleArray[i].size/10; 
                ctx.moveTo(particleArray[i].x, particleArray[i].y); 
                ctx.lineTo(particleArray[j].x,particleArray[j].y); 
                ctx.stroke(); 
                ctx.fill(); 
            }
        }

        if (particleArray[i].size <= 0.3) { 
            particleArray.splice(i,1);  
            i--; 
            // console.log(particleArray.length); 
        }
    }
    
}


function animate() { 
    ctx.clearRect(0,0,canvas.width,canvas.height); 
    // ctx.fillStyle = 'rgba(0,0,0,0.02)'; 
    // ctx.fillRect(0,0,canvas.width,canvas.height); 
    handleParticles(); 
    hue+=0.7; 
    requestAnimationFrame(animate); 
}
animate(); 