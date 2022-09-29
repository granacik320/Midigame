const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
var valueacords = 3;
var acords = [];
var speed = 2
const req = update;

for(let i = 0; i<valueacords; i++){
    var x = Math.floor(Math.random() * canvas.width - 20) + 10;
    var y = Math.floor(Math.random() * 100) - 10;
    acords[i] = new acord(x, y)
}

for(let i = 0; i<valueacords; i++){
    acords[i].drawacord();
}


update()
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    player()
    for(let i = 0; i<valueacords; i++){
        acords[i].drawacord();
        acords[i].fall()
        if(acords[i].y>590){
            req = "s";
        }
    }
}
function update(){
    draw()
    requestAnimationFrame(req)
}
function s(){
    console.log('s')
    requestAnimationFrame(req)
}

function acord(x, y){
    this.x = x;
    this.y = y;
    this.atan = Math.atan2(240 - this.x, 600 - this.y);
    this.drawacord = function(){
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y , 15, 0, 2 * Math.PI);
        ctx.fill();
    }
    this.fall = function(){
        this.x +=Math.sin(this.atan) * speed
        this.y +=Math.cos(this.atan) * speed
    }
}

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
