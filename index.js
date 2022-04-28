// Iniciamos el Canvas
const canvas = document.querySelector('canvas');
// Creamos el contexto del Canvas
const c = canvas.getContext('2d');

// Definimos el tamaño del canvas
canvas.width = 1024;
canvas.height = 576;

// Creamos un rectangulo en el Canvas
c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.2;

// Creamos una clase Sprite para crear cualquier dibujo en el canvas 
class Sprite {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.lastKey;
    }
    
    //Dibujar un elemento en el canvas 
    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, 150)
    }

    // Actualizar el estado del elemento
    update(){
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity
        }
    }
}

// Creamos un luchador
const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: { 
        x: 0,
        y: 0
    }
})

player.draw();

// Creamos un enemigo
const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: { 
        x: 0,
        y: 0
    }
})

enemy.draw();

const keys = {
    a:{
        pressed: false
    },
    d:{
        pressed: false
    }
}
let lastKey;

// Funcion para animar frame por frame, se refresca siempre
function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0

    if(keys.a.pressed && lastKey === 'a') {
        player.velocity.x = -1
    } else if (keys.d.pressed && lastKey === 'd') {
        player.velocity.x = 1
    }
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key){
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
        break;
        case 'a':
           keys.a.pressed = true;
           lastKey = 'a'
        break;
        case 'w':
           player.velocity.y = -10;
        break;
    } 

    switch (event.key){
        case 'ArrowRight':
            keys.arrowRight.pressed = true;
            lastKey = 'd';
        break;
        case 'ArrowLeft':
           keys.arrowLeft.pressed = true;
           lastKey = 'a'
        break;
        case 'ArrowUp':
           enemy.velocity.y = -10;
        break;
    } 
})

window.addEventListener('keyup', (event) => {
    switch (event.key){
        case 'd':
            keys.d.pressed = false;
        break;
        case 'a':
            keys.a.pressed = false;
        break;
        case 'w':
            keys.a.pressed = false;
        break;
    } 
    switch (event.key){
        case 'ArrowRight':
            keys.arrowRight.pressed = false;
        break;
        case 'ArrowLeft':
            keys.arrowLeft.pressed = false;
        break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
        break;
    } 
})