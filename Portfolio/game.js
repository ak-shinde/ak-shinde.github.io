var character = document.querySelector(".character");
var map = document.querySelector(".map");

//start in the middle of the map
// var x = 64;
// var y = 104;
// var x = 16*6;
// var y = 104;
var x = -8;
var y = 32;
var held_directions = []; //State of which arrow keys we are holding down
var speed = 1; //How fast the character moves in pixels per frame

var walls = [
    {x: -8, y: 32}
]

const placeCharacter = () => {
   
   var pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
   );
   
   const held_direction = held_directions[0];
   if (held_direction) {
      if (held_direction === directions.right) {x += speed;}
      if (held_direction === directions.left) {x -= speed;}
      if (held_direction === directions.down) {y += speed;}
      if (held_direction === directions.up) {y -= speed;}
      character.setAttribute("facing", held_direction);
   }
   character.setAttribute("walking", held_direction ? "true" : "false");
   
   //Limits (gives the illusion of walls)
   var leftLimit = -8;
   var rightLimit = (16 * 8) + 8;
   var topLimit = 8;
   var bottomLimit = (16 * 8) + 10;
   if (x < leftLimit) { x = leftLimit; }
   if (x > rightLimit) { x = rightLimit; }
   if (y < topLimit) { y = topLimit; }
   if (y > bottomLimit) { y = bottomLimit; }

   // Select highlight
   if ((y > 12 && y < 32 && x > 16*7) || (y > 8 && y < 40 && x > 16*7.4)
   || (x > 10 && x < 18 && y < 14)
   || (x > 16*4.5 && x < 16*6 && y > 38 && y < 50) || (x > 24 && x < 42 && y > 28 && y < 38)
   || (x > 16*3.8 && x < 16*6 && y > 42 && y < 82) || (y > 118 && y < 132 && x > 16*6.3 && x < 16*8.2)
   || (x < 16*5.4 && x > 16*3.8 && y > 104 && y < 120) || (x > 28 && x < 16*3.5 && y > 104 && y < 132)) {
    document.querySelector(".dpad-select").classList.add("highlight");
    } else {
        document.querySelector(".dpad-select").classList.remove("highlight");
        isTextShown = false;
    }

   // Outer walls
   if (x < leftLimit + 9) {
    if (y < 24) y = 24;
    if (y > 38) y = 38;
   }

   // Outer walls
   if (y < 24 || y > 38) {
    if (x < leftLimit + 10) x = leftLimit + 10;
   }

   // Upper room

   if (x > 10 && x < 18 && y < 14) showText(topWoman, true)

   //tables
   if (y < 32 && held_direction) {
    if (x > 14 && x < 16*7 && held_direction === directions.right) x = 14
    if (x < 16*7 && x > 14 && held_direction === directions.left) x = 16*7
   }

   if (x > 14 && x < 16*7 && held_direction) {
    if (y < 32 && held_direction === directions.up) y = 32

   }

   if (y > 42 && y < 72 && held_direction) {
    if (x > 4 && x < 16*8.3 && held_direction === directions.right) x = 4
    if (x < 16*8.3 && x > 4 && held_direction === directions.left) x = 16*8.3
   }

   if (x > 4 && x < 16*8.3 && held_direction) {
    if (y > 42 && y < 72 && held_direction === directions.down) y = 42
    if (y < 72 && y > 42 && held_direction === directions.up) y = 72

    if (x < 16*5.8 && x > 16*4 && y < 82 && y > 42 && held_direction === directions.right) x = 16*4
    if (x < 16*5.8 && x > 16*4.7 && y < 82 && y > 42 && held_direction === directions.left) x = 16*5.8

    if (x > 24 && x < 42 && y > 28 && y < 38) showNavText("About Me", links.about)
    
    if (x > 16*4.5 && x < 16*6 && y > 38 && y < 50) showNavText("Skillset", links.skillset)

    if (x > 16*3.8 && x < 16*5 && y > 42 && y < 82) showText(AB, true)
    if (x > 16*5 && x < 16*6 && y > 42 && y < 82) showText(AB, true, true)
   }

   // printer
   if (x > 16*7.4 && held_direction) {
    if (y > 12 && y < 32 && held_direction === directions.down) y = 12
    if (y > 12 && y < 32 && held_direction === directions.up) y = 32

    if (y > 8 && y < 40) showNavText("Resume", links.resume)
   }

   if (y > 12 && y < 32 && held_direction) {
    if (x > 16*7.4 && held_direction === directions.right) x = 16*7.4

    if (x > 16*7) showNavText("Resume", links.resume)
   }

   // mid wall 
   if (y > 78 && y < 104 && held_direction && held_direction == directions.down) {
    if (x < 16*5.8 || x > 16*6)
        y = 78
   }

   if (y > 78 && y < 108 && held_direction) {
    if (x < 16*5.8 && held_direction === directions.left) x = 16*5.8
    if (x > 16*6 && held_direction === directions.right) x = 16*6
   }

   //bottom room
   if (y > 104 && held_direction) {
    if (((x > 16*5 && x < 16*5.8) || x > 16*6) && y < 108 && held_direction === directions.up) y = 108
    if (y < 16*8.2 && x < 16*5.2 && x > 16*5 && held_direction === directions.left) x = 16*5.2


    if (y > 108 && x > 16*6.5 && x < 16*7 && held_direction === directions.right) x = 16*6.5
    if (x > 16*6.5 && x < 16*8.3 && (y > 108 && y < 118) && held_direction === directions.down) y = 108

    // c-table
    if (y > 108 && x > 16*6.5 && x < 16*8.3) {
        if (y < 124 && held_direction === directions.up) y = 124
        if (y > 126 && held_direction === directions.down) y = 126
        if (x < 16*8.3 && held_direction === directions.left) {
            if (y > 122 && y < 128) {
                if (x < 16 * 7.8) x = 16*7.8
            } else {
                x = 16*8.3
            }
                
        }
    }

    if (y > 118 && y < 132 && x > 16*6.3 && x < 16*8.2) showNavText("Projects", links.projects)

    // L table, sofa wall and printer
    if (x < 16*5.2) {
        if (y > 128 && y < 132 && x > 16*3.5 && held_direction === directions.up) y = 132
        if (y < 108 && held_direction === directions.up) y = 108
        if (x < 32 && y > 104 && held_direction === directions.left) x = 32
        if (x > 16*4 && y > 104 && y < 122 && held_direction === directions.right) x = 16*4
        if (x > 16*3.5 && y > 116 && y < 132 && held_direction === directions.right) x = 16*3.5
        if (x < 16*5 && x > 16*3.5 && y > 116 && held_direction === directions.down) y = 116

        if (y > 110 && y < 128 && x > 32 && x < 16*3.2 && held_direction === directions.down) y = 110
        if (x > 32 && x < 16*3.2 && y > 110 && y < 128 && held_direction === directions.right) x = 32
        if (y > 120 && y < 128 && x > 32 && x < 16*3.2 && held_direction === directions.up) y = 128
        if (x > 32 && x < 16*3.2 && y > 110 && y < 128 && held_direction === directions.left) x = 16*3.2
    }

    if (x < 16*5.4 && x > 16*3.8 && y > 104 && y < 120) showNavText("Past Experiences", links.experiences)
    if (x > 28 && x < 16*3.5 && y > 104 && y < 132) showNavText("Education", links.education)

   }


   
   
   var camera_left = pixelSize * 66;
   var camera_top = pixelSize * 42;
   
   map.style.transform = `translate3d( ${-x*pixelSize+camera_left}px, ${-y*pixelSize+camera_top}px, 0 )`;
   character.style.transform = `translate3d( ${x*pixelSize}px, ${y*pixelSize}px, 0 )`;  
}


//Set up the game loop
const step = () => {
   if(!document.hasFocus()) {held_directions = []; };
   placeCharacter();
   window.requestAnimationFrame(() => {
      step();
   })
}

step(); //kick off the first step!



/* Direction key state */
const directions = {
   up: "up",
   down: "down",
   left: "left",
   right: "right",
   select: "select"
}
const keys = {
   38: directions.up,
   37: directions.left,
   39: directions.right,
   40: directions.down,
   88: directions.select
}
document.addEventListener("keydown", (e) => {
   var dir = keys[e.which];
   if (dir && held_directions.indexOf(dir) === -1) {
      held_directions.unshift(dir)
      hideText()
   }
//    if (dir === directions.select) hideText()
})

document.addEventListener("keyup", (e) => {
   var dir = keys[e.which];
   var index = held_directions.indexOf(dir);
   if (index > -1) {
      held_directions.splice(index, 1)
   }
});



/* BONUS! Dpad functionality for mouse and touch */
var isPressed = false;
const removePressedAll = () => {
   document.querySelectorAll(".dpad-button").forEach(d => {
      d.classList.remove("pressed")
   })
}
document.addEventListener("mousedown", () => {
   console.log('mouse is down')
   isPressed = true;
})
document.addEventListener("mouseup", (e) => {
   console.log('mouse is up')
   isPressed = false;
   held_directions = [];
   removePressedAll();
})


document.addEventListener("touchend", (e) => {
    isPressed = false;
    held_directions = [];
    removePressedAll();
    e.preventDefault();
    e.stopPropagation();
 })

const handleDpadPress = (direction, click) => {   
   if (click) {
    console.log('click')
      isPressed = true;
   }
   held_directions = (isPressed) ? [direction] : []
   
   if (isPressed) {
      console.log('ispressed')
      isPressed = false;
      removePressedAll();
      document.querySelector(".dpad-"+direction).classList.add("pressed");
      hideText()

   }
}
//Bind a ton of events for the dpad
document.querySelector(".dpad-left").addEventListener("touchstart", (e) => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("touchstart", (e) => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("touchstart", (e) => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("touchstart", (e) => handleDpadPress(directions.down, true));
document.querySelector(".dpad-select").addEventListener("touchstart", (e) => handleDpadPress(directions.select, true));

// document.querySelector(".dpad-left").addEventListener("touchend", (e) => handleDpadPress(directions.left));
// document.querySelector(".dpad-up").addEventListener("touchend", (e) => handleDpadPress(directions.up));
// document.querySelector(".dpad-right").addEventListener("touchend", (e) => handleDpadPress(directions.right));
// document.querySelector(".dpad-down").addEventListener("touchend", (e) => handleDpadPress(directions.down));
// document.querySelector(".dpad-select").addEventListener("touchend", (e) => handleDpadPress(directions.select));

document.addEventListener("contextmenu", (e) => e.preventDefault());
// document.querySelector(".frame").addEventListener("contextmenu", (e) => e.preventDefault());
// document.querySelector(".dpad-left").addEventListener("contextmenu", (e) => e.preventDefault());
// document.querySelector(".dpad-up").addEventListener("contextmenu", (e) => e.preventDefault());
// document.querySelector(".dpad-right").addEventListener("contextmenu", (e) => e.preventDefault());
// document.querySelector(".dpad-down").addEventListener("contextmenu", (e) => e.preventDefault());
// document.querySelector(".dpad-select").addEventListener("contextmenu", (e) => e.preventDefault());

document.querySelector(".dpad-left").addEventListener("mousedown", (e) => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("mousedown", (e) => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("mousedown", (e) => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("mousedown", (e) => handleDpadPress(directions.down, true));
document.querySelector(".dpad-select").addEventListener("mousedown", (e) => handleDpadPress(directions.select, true));

document.querySelector(".dpad-left").addEventListener("mouseover", (e) => handleDpadPress(directions.left));
document.querySelector(".dpad-up").addEventListener("mouseover", (e) => handleDpadPress(directions.up));
document.querySelector(".dpad-right").addEventListener("mouseover", (e) => handleDpadPress(directions.right));
document.querySelector(".dpad-down").addEventListener("mouseover", (e) => handleDpadPress(directions.down));
document.querySelector(".dpad-select").addEventListener("mouseover", (e) => handleDpadPress(directions.select));





/** Dialogue Box */ 
var container = document.querySelector(".textbox");

var speeds = {
   pause: 500, //Higher number = longer delay
   slow: 120,
   normal: 90,
   fast: 20,
   superFast: 10
};

var welcomeMessage = [
   { speed: speeds.fast, string: "Hello there!" },
   { speed: speeds.pause, string: "", pause: true },
   { speed: speeds.fast, string: "Welcome to my portfolio.\n\n" },
   { speed: speeds.pause, string: "", pause: true },
   { speed: speeds.fast, string: "Move around using arrow keys or the movement pad at the bottom right corner." },
   { speed: speeds.pause, string: "", pause: true },
   { speed: speeds.fast, string: "Press " },
   { speed: speeds.slow, string: "\"X\"", classes: ["orange"] },
   { speed: speeds.fast, string: " to interact with the computers and fellow office members." },
   { speed: speeds.pause, string: "", pause: true },
   { speed: speeds.pause, string: "", pause: true },
   { speed: speeds.fast, string: "\n\nPlease take a moment and explore the entire portfolio map.", classes: ["green"] },
   { speed: speeds.fast, string: "  - Akshay Shinde", classes: ["red"] },
];

var topWoman = [
    { speed: speeds.superFast, string: "You seem new to the office! Let me help you out." },
    { speed: speeds.pause, string: "", pause: true },
    { speed: speeds.superFast, string: "There are 2 computers in the middle section where you can find the links you need." },
    { speed: speeds.pause, string: "", pause: true },
    { speed: speeds.slow, string: "Resume ", classes: ["green"] },
    { speed: speeds.superFast, string: "is at the printer." },
    { speed: speeds.pause, string: "", pause: true },
    { speed: speeds.superFast, string: "The " },
    { speed: speeds.slow, string: "\"X\"", classes: ["white"] },
    { speed: speeds.superFast, string: " button will be highlighted when you reach near these sections." },
    { speed: speeds.pause, string: "", pause: true },
    { speed: speeds.pause, string: "", pause: true },
    { speed: speeds.superFast, string: "\n\nAlso, don't disturb AB at the bottom. PROD IS DOWN!", classes: ["red"] },
 ];

 var AB = [
    { speed: speeds.superFast, string: "It works on my machine! Why is it not working on Prod?", classes: ["red"] },
    { speed: speeds.pause, string: "", pause: true },
    { speed: speeds.superFast, string: "Oh wait I forgot to uncomment this line...." },
    { speed: speeds.pause, string: "", pause: true },
    { speed: speeds.superFast, string: "Please go to the bottom room I don't have time for a coffee.", classes: ["white"] },
    { speed: speeds.pause, string: "", pause: true },
    { speed: speeds.superFast, string: "There are 3 sections there where you can find the links you need." },
    { speed: speeds.pause, string: "", pause: true },
 ];

 function getNavTitle(title) {
    return [
        { speed: speeds.superFast, string: title, classes: ["white"] },
        { speed: speeds.pause, string: "", pause: true },
     ];
 }


function revealOneCharacter(list) {
   var next = list.splice(0, 1)[0];
   next.span.classList.add("revealed");
   next.classes.forEach((c) => {
      next.span.classList.add(c);
   });
   var delay = next.isSpace && !next.pause ? 0 : next.delayAfter;

   if (list.length > 0) {
      setTimeout(function () {
         revealOneCharacter(list);
      }, delay);
   }
}

function hideText() {
    container.innerHTML = ""
    document.querySelector(".text").classList.add('hidden')
}


function showText(textLines, isNPC = false, rightSide = false) {
    document.querySelector(".text").classList.remove('navBox')
    document.querySelector(".corner").classList.remove('navCorner')
    document.querySelector(".corner").querySelector('path').classList.remove('green')
    if (isNPC) {
        if (rightSide) {
            document.querySelector(".corner").classList.add('npcCornerFromRight')
            document.querySelector(".corner").classList.remove('npcCorner')
        } else {
            document.querySelector(".corner").classList.add('npcCorner')
            document.querySelector(".corner").classList.remove('npcCornerFromRight')
        }
        document.querySelector(".text").classList.add('npcBox')
        document.querySelector(".corner").querySelector('path').classList.add('orange')
    } else {
        document.querySelector(".text").classList.remove('npcBox')
        document.querySelector(".corner").classList.remove('npcCorner')
        document.querySelector(".corner").querySelector('path').classList.remove('orange')
        document.querySelector(".corner").classList.remove('npcCornerFromRight')
    }
    createTextSpans(textLines, true)
}

var isTextShown = false;

function createTextSpans(textLines, isNPC) {
    if (!isTextShown) {
        isLinkPressed = false;
        isTextShown = true;
        var characters = [];
        textLines.forEach((line, index) => {
            if (index < textLines.length - 1) {
                line.string += " "; //Add a space between lines
            }

            line.string.split("").forEach((character) => {
                var span = document.createElement("span");
                span.textContent = character;
                container.appendChild(span);
                characters.push({
                    span: span,
                    isSpace: character === " " && !line.pause,
                    delayAfter: line.speed,
                    classes: line.classes || []
                });
            });
        });
        document.querySelector(".text").classList.remove('hidden')
        //Kick it off
        setTimeout(() => {
        revealOneCharacter(characters);
        }, 300)
    }
}

var isLinkPressed = false;
const links = {
    resume: 'https://www.dropbox.com/s/4uxp05m1xbk51sg/Resume-AkshayShinde.pdf?dl=0',
    about: 'https://github.com/ak-shinde',
    experiences: 'https://github.com/ak-shinde',
    skillset: 'https://github.com/ak-shinde',
    education: 'https://github.com/ak-shinde',
    projects: 'https://github.com/ak-shinde',
}

function showNavText(textLines, link) {
    document.querySelector(".text").classList.remove('npcBox')
    document.querySelector(".corner").classList.remove('npcCorner')
    document.querySelector(".corner").querySelector('path').classList.remove('orange')
    document.querySelector(".corner").classList.remove('npcCornerFromRight')

    document.querySelector(".text").classList.add('navBox')
    document.querySelector(".corner").classList.add('navCorner')
    document.querySelector(".corner").querySelector('path').classList.add('green')
    createTextSpans(getNavTitle(textLines), false)

    if (!isLinkPressed && held_directions && held_directions[0] === directions.select) {
        window.open(link, '_blank');
        isLinkPressed = true;
        held_directions = []
    }

}

showText(welcomeMessage, false)
