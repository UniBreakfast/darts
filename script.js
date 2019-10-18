canvas = document.getElementById("canvas")
ctx = canvas.getContext("2d")
audio = document.getElementById("audio")

cX = 400
cY = 250
function circle(radius, color = 'black') {
    ctx.beginPath()
    ctx.arc(cX, cY, radius, 0, 7)
    ctx.fillStyle = ctx.strokeStyle = color
    ctx.stroke()
    ctx.fill()
}

// function sumOfDifferences(arr) {
//     return arr.sort((a, b) => b-a).reduce((sum, num, i) =>
//       i == arr.length-1 ? sum : sum+num-arr[i+1], 0)
//   }

// function countSheeps(arr) {
//     return arr.filter(Boolean).length;
//   }

// function sumOfDifferences(arr) {
//     var max = Math.max(...arr) 
//     var min = Math.min(...arr)
//     return max-min
//   }

function shot(x, y, radius, color = 'yellow') {
    ctx.beginPath()
    ctx.arc(x+0.5, y+.5, radius, 0, 7)
    ctx.fillStyle = ctx.strokeStyle = color
    ctx.stroke()
    ctx.fill()
}

size = 2 * Math.PI / 20

function sector(radius, number, color = 'white') {
    ctx.beginPath()
    ctx.arc(cX, cY, radius, (number - 5.5) * size, (number - 4.5) * size)
    ctx.lineTo(cX, cY)
    ctx.fillStyle = ctx.strokeStyle = color
    ctx.stroke()
    ctx.fill()
}

board();

function board() {
    ctx.fillStyle = "white"
    ctx.fillRect(0,0,800,500)
    circle(210);
    circle(180, 'red');
    sectors(180, 'green');
    circle(170);
    sectors(170);
    circle(110, 'red');
    sectors(110, 'green');
    circle(100);
    sectors(100);
    circle(18, 'green');
    circle(8, 'red');
    coords = [{x:454,y:72}, {x:508,y:415},
              {x:395,y:452},{x:552,y:145},
              {x:334,y:73}, {x:591,y:257},
              {x:280,y:416},{x:210,y:316},
              {x:238,y:143},{x:574,y:316},
              {x:195,y:257},{x:273,y:100},
              {x:573,y:197},{x:203,y:198},
              {x:546,y:373},{x:230,y:372},
              {x:448,y:443},{x:503,y:101},
              {x:327,y:443},{x:389,y:63}]
    coords.forEach(({x, y}, i) => text(i+1, x, y))
}

function sectors (radius, color) {
    for (var i=1; i<20; i+=2)
        sector(radius, i, color);
}

function text(num, x, y) {
    ctx.fillStyle = "white";
    ctx.font = "bold 15pt Arial";
    ctx.fillText(num, x, y);
}

// number = 1
// coords = []
// x = cX; y = cY


// document.body.onkeydown = event => {
//     board()
//     coords.forEach(({x, y}, i) => text(i+1, x, y))
//     // coords.forEach((pair, i) => text(i+1, pair.x, pair.y))
//     switch (event.key) {
//         case "ArrowUp": text(number, x, --y); break
//         case "ArrowDown": text(number, x, ++y); break
//         case "ArrowLeft": text(number, --x, y); break
//         case "ArrowRight": text(number, ++x, y); break
//         case "Enter": coords.push({x, y}); number++
//     }
// }

// function monkeyCount(n) {
//     var arr = []
//     Array(n).fill(0).forEach((_,i) => arr.push(i+1))
//     return arr
//     }

canvas.onmousemove = event => {
    board()
    shots.forEach(({x, y}) => shot(x,y,1, "blue"))
    crosshair(event.layerX, event.layerY)
}

shots = []

canvas.onclick = event => {
    setTimeout(() => {
        board()
        shots.forEach(({x, y}) => shot(x,y,1, "blue"))
        crosshair(event.layerX, event.layerY)
    }, 300)
    board()
    shots.forEach(({x, y}) => shot(x,y,1, "blue"))
    shot(event.layerX, event.layerY, 3, "yellow")
    shots.push({x: event.layerX, y: event.layerY})
    crosshair(event.layerX, event.layerY)
    audio.play()
}


function crosshair (x, y) {

    length = 20
    width = 3
    distance = 5

    ctx.fillStyle = "white"
    ctx.fillRect(x+distance, y-Math.floor(width/2), length, width)
    ctx.fillRect(x-distance-length+1, y-Math.floor(width/2), length, width)
    ctx.fillRect(x-Math.floor(width/2), y+distance, width, length)
    ctx.fillRect(x-Math.floor(width/2), y-distance-length+1, width, length)
    ctx.fillStyle = "black"
    ctx.fillRect(x+distance+1, y-Math.floor(width/2)+1, length-2, width-2)
    ctx.fillRect(x-distance-length+2, y-Math.floor(width/2)+1, length-2, width-2)
    ctx.fillRect(x-Math.floor(width/2)+1, y+distance+1, width-2, length-2)
    ctx.fillRect(x-Math.floor(width/2)+1, y-distance-length+2, width-2, length-2)

}

// const word = n => ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'][n];

// const nBottles = n => word(n) + ` green bottle${n === 1 ? '' : 's'}`;

// const titleCase = word => word[0].toUpperCase() + word.slice(1);

// const range = n => [...Array(n).keys()].map(x => x + 1).reverse();

// const refrain = n => {
//   const bottles = nBottles(n);
//   return [
//     `${titleCase(bottles)} hanging on the wall,\n`,
//     `${titleCase(bottles)} hanging on the wall,\n`,
//     `${n === 1 ? 'If that' : 'And if'} one green bottle should accidentally fall,\n`,
//     `There'll be ${nBottles(n - 1)} hanging on the wall.\n`,
//   ].join('');
// }

// const tenGreenBottles = n => range(n).map(refrain).join('\n');


