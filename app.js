const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
var valueacords = 3;
var acords = [];

for(let i = 0; i<valueacords; i++){
    var x = Math.floor(Math.random() * canvas.width - 20) + 10;
    var y = Math.floor(Math.random() * 100) - 10;
    acords[i] = new acord(x, y)
}

for(let i = 0; i<valueacords; i++){
    acords[i].drawacord();
}

player()



function acord(x, y){
    this.x = x;
    this.y = y;
    this.drawacord = function(){
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);
        ctx.fill();
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
