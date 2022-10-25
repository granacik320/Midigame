const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let valueacords = 6;
const acords = [];
const particles = [];
let speed = 2;
const Rgama = ["C", "D", "E", "G", "A", "H"]
let audioContext;
let mic;
let pitch;
const keyboard = {
    C: 67,
    D: 68,
    E: 69,
    G: 71,
    A: 65,
    H: 72
};

//events
document.addEventListener("keydown", clickaction);

//varibles for acords
for(let i = 0; i<valueacords; i++){
    var x = Math.floor(Math.random() * canvas.width - 20) + 10;
    var y = Math.floor(Math.random() * 100) - 10;
    if(valueacords > 6){
        console.error("Zbyt wielka ilosc akordow!");
        var gama = " "
    }else{
        let randomelementfromgama = Math.floor(Math.random() * Rgama.length)
        var gama = Rgama[randomelementfromgama];
        Rgama.splice(randomelementfromgama, 1);
    }
    var acordspeed = Math.random();
    acords[i] = new acord(x, y, gama, acordspeed)
    console.log(acords[i].x)
}

//Keyboard click
function clickaction(whenPressKey){
    nuts = whenPressKey.key.toUpperCase()
    for(let i = 0; i<valueacords; i++){
        if(acords[i].gama == nuts){
            acords.forEach(acord =>{
                if(acord.gama == nuts){
                    for(let i = 0; i<5; i++){
                        particles.push(particles[i] = new particle(acord.x, acord.y,{
                            x: Math.random() - 0.5,
                            y: Math.random() - 0.5
                        }))
                    }
                }
            })
            console.log(particles)
            valueacords -= 1
            acords.splice(i,1)
            break;
        }
    }
}

function bdraw(){
    const req = requestAnimationFrame(bdraw)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach(particle =>{
        particle.fall();
    })

    player()

    //draw acord
    for(let i = 0; i<valueacords; i++){
        acords[i].drawacord();
        acords[i].fall()
        if(acords[i].y>590){
            cancelAnimationFrame(req)
            gameover()
        }
    }
    if(acords.length === 0){
        cancelAnimationFrame(req)
        gg()
    }
}
bdraw();

//game lost
function gameover(){
    const req = requestAnimationFrame(gameover)
    ctx.fillStyle = 'rgba(11, 41, 77, 0.06)'
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fill()
    ctx.fillStyle = 'white'
    ctx.font = "30px Montserrat"
    ctx.fillText("Gameover", 170, 200)
}

function gg(){
    const req = requestAnimationFrame(gg)
    ctx.fillStyle = 'rgba(11, 41, 77, 0.06)'
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fill()
    ctx.fillStyle = 'white'
    ctx.font = "30px Montserrat"
    ctx.fillText("GG", 200, 200)
}

//acord
function acord(x, y, gama, acordspeed){
    this.x = x;
    this.y = y;
    this.acordspeed = acordspeed;
    this.gama = gama;
    this.atan = Math.atan2(240 - this.x, 600 - this.y);
    //draw acord with symbol
    this.drawacord = function(){
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y , 15, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = 'black'
        ctx.font = "16px Montserrat"
        ctx.fillText(this.gama, this.x-6, this.y+5)
    }
    //fall
    this.fall = function(){
        this.x +=Math.sin(this.atan) * speed * this.acordspeed
        this.y +=Math.cos(this.atan) * speed * this.acordspeed
    }
}

function particle(x, y, velocity, width){
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.width = 5;
    this.atan = Math.atan2(this.x - this.x, this.y - this.y);
    //draw acord with symbol
    this.drawparticles = function(){
        ctx.fillStyle = "gray";
        ctx.beginPath();
        ctx.arc(this.x, this.y , this.width, 0, 2 * Math.PI);
        ctx.fill();
    }
    //fall
    this.fall = function(){
        this.drawparticles();
        this.x +=this.velocity.x
        this.y +=this.velocity.y
        // this.x +=Math.sin(this.atan)
        // this.y +=Math.cos(this.atan)
    }
}

//draw player
function player(){
    ctx.strokeStyle = "#00FFAB";
    ctx.lineWidth = 16;
    ctx.lineJoin = "bevel";
    ctx.beginPath();
    ctx.translate(240, 575);
    ctx.rotate(0 * Math.PI / 180);
    ctx.translate(-240, -575);
    ctx.moveTo(240, 550);
    ctx.lineTo(270, 600);
    ctx.lineTo(210, 600);
    ctx.closePath();
    ctx.stroke();
}