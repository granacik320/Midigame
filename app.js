const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let valueacords = 6;
let score = 0;
let acords = [];
let particles = [];
let Rgama = ["C", "D", "E", "G", "A", "H"];
let cRgama = ["C", "D", "E", "G", "A", "H"];
let json =[];
let speed = 1.2;
let stage = 0;

//json file
const httprequest = new XMLHttpRequest();
httprequest.open("GET","./data.json", false);
httprequest.send(null);
const jsondata = JSON.parse(httprequest.responseText);

//events
document.addEventListener("keydown", clickaction);

//varibles for acords
for(let i = 0; i<valueacords; i++){
    let x = Math.floor(Math.random() * canvas.width - 20) + 10;
    let y = Math.floor(Math.random() * 100) - 10;
    if(valueacords > 6){
        console.error("Zbyt wielka ilosc akordow!");
        var gama = " "
    }else{
        let randomelementfromgama = Math.floor(Math.random() * Rgama.length)
        var gama = Rgama[randomelementfromgama];
        Rgama.splice(randomelementfromgama, 1);
    }
    let acordspeed = Math.random();
    acords[i] = new acord(x, y, gama, acordspeed)
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
                        },
                        width = Math.random() * 6
                        ))
                    }
                }
            })
            valueacords -= 1;
            score +=1;
            document.getElementById("score").innerText = score;
            acords.splice(i,1);
            break;
        }else if(!cRgama.includes(nuts)){
            gameover();
            return;
        }
    }
}

function bdraw(){
    const req = requestAnimationFrame(bdraw)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    document.querySelector('.progress').style.display = "none";
    document.querySelector('.nstage h1').style.display = "none";
    document.querySelector(".border").style.background = 'none';
    document.querySelector('.progress-value').classList.remove('progress-value-active');
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
        stage+=1;
        if(stage>9){
            cancelAnimationFrame(req)
            document.querySelector(".border").style.background = '#2E305F';
            document.querySelector(".gg").style.display = "block";
            return
        }
        valueacords = 6;
        acords = [];
        particles = [];
        Rgama = ["C", "D", "E", "G", "A", "H"];
        speed = jsondata[stage].speed;

        document.querySelector('.game canvas').style.filter = jsondata[stage].color
    
        for(let i = 0; i<valueacords; i++){
            let x = Math.floor(Math.random() * canvas.width - 20) + 10;
            let y = Math.floor(Math.random() * 100) - 10;
            if(valueacords > 6){
                console.error("Zbyt wielka ilosc akordow!");
                var gama = " "
            }else{
                let randomelementfromgama = Math.floor(Math.random() * Rgama.length)
                var gama = Rgama[randomelementfromgama];
                Rgama.splice(randomelementfromgama, 1);
            }
            let acordspeed = Math.random();
            acords[i] = new acord(x, y, gama, acordspeed)
        }
    
        setTimeout(bdraw, 5000);
        document.querySelector(".border").style.background = '#2E305F';
        document.querySelector('.progress').style.display = "flex";
        document.querySelector('.nstage h1').style.display = "block";
        document.querySelector('.nstage h1').innerText = 'STAGE ' + (stage+1)
        document.querySelector('.progress-value').classList.add('progress-value-active');
    }
}

function gameover(){
    if(stage>0){
        document.querySelector(".border").style.background = '#2E305F';
        document.querySelector(".gg").style.display = "block";
    }else{
        document.querySelector(".border").style.background = '#2E305F';
        document.querySelector(".gameover").style.display = "block";
    }
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
        ctx.fillStyle = "#D9D9D9";
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
    this.width = width;
    this.atan = Math.atan2(this.x - this.x, this.y - this.y);
    //draw acord with symbol
    this.drawparticles = function(){
        ctx.fillStyle = "#D9D9D9";
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
    ctx.strokeStyle = "#962BF3";
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
function addscore(){
    const cell = document.createElement("li");
    if(document.getElementById("nickname").value.length > 24){
        alert("Too many letters!")
        return
    }
    cell.innerText = document.getElementById("score").innerText + " " +document.getElementById("nickname").value;
    document.querySelector("ul").appendChild(cell);
    document.querySelector(".gg").style.display = "none";
    document.querySelector(".start").style.display = "block";
}
function start(){
    document.getElementById("score").innerText = "0";
    document.querySelector(".border").style.background = 'rgba(0, 0, 0, 0)';
    document.querySelector(".gg").style.display = "none";
    document.querySelector(".gameover").style.display = "none";
    document.querySelector(".start").style.display = "none";
    valueacords = 6;
    score = 0;
    stage = 0;
    acords = [];
    particles = [];
    Rgama = ["C", "D", "E", "G", "A", "H"];
    speed = 1.2;

    for(let i = 0; i<valueacords; i++){
        let x = Math.floor(Math.random() * canvas.width - 20) + 10;
        let y = Math.floor(Math.random() * 100) - 10;
        if(valueacords > 6){
            console.error("Zbyt wielka ilosc akordow!");
            var gama = " "
        }else{
            let randomelementfromgama = Math.floor(Math.random() * Rgama.length)
            var gama = Rgama[randomelementfromgama];
            Rgama.splice(randomelementfromgama, 1);
        }
        let acordspeed = Math.random();
        acords[i] = new acord(x, y, gama, acordspeed)
    }

    bdraw();
}