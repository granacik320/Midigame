const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
var valueacords = 6;
var acords = [];
var particles = [];
var speed = 1.2;
var Rgama = ["C", "D", "E", "G", "A", "H"]
var keyboard = {
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
    switch(whenPressKey.keyCode){
        case keyboard.C:
            for(let i = 0; i<valueacords; i++){
                if(acords[i].gama == "C"){
                    acords.forEach(acord =>{
                        if(acord.gama == "C"){
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
        break;

        case keyboard.D:
            for(let i = 0; i<valueacords; i++){
                if(acords[i].gama == "D"){
                    acords.forEach(acord =>{
                        if(acord.gama == "D"){
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
        break;

        case keyboard.E:
            for(let i = 0; i<valueacords; i++){
                if(acords[i].gama == "E"){
                    acords.forEach(acord =>{
                        if(acord.gama == "E"){
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
        break;

        case keyboard.G:
            for(let i = 0; i<valueacords; i++){
                if(acords[i].gama == "G"){
                    acords.forEach(acord =>{
                        if(acord.gama == "G"){
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
        break;

        case keyboard.A:
            for(let i = 0; i<valueacords; i++){
                if(acords[i].gama == "A"){
                    acords.forEach(acord =>{
                        if(acord.gama == "A"){
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
        break;

        case keyboard.H:
            for(let i = 0; i<valueacords; i++){
                if(acords[i].gama == "H"){
                    acords.forEach(acord =>{
                        if(acord.gama == "H"){
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
        break;
    }
}

draw()

function draw(){
    const req = requestAnimationFrame(draw)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
    // ctx.rect(0, 0, canvas.width, canvas.height)
    // ctx.fill()

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

    // //draw particles
    // for(let i = 0; i<5; i++){
    //     particles[i].drawparticles();
    //     particles[i].fall()
    // }
}

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

function particle(x, y, velocity){
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.atan = Math.atan2(this.x - this.x, this.y - this.y);
    //draw acord with symbol
    this.drawparticles = function(){
        ctx.fillStyle = "gray";
        ctx.beginPath();
        ctx.arc(this.x, this.y , Math.floor(Math.random() * 5), 0, 2 * Math.PI);
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