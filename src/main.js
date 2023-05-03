import kaboom from "kaboom";

// initialize context
kaboom({
	background: [ 0, 0, 0, 1 ],
    canvas: document.querySelector("#myCanvas"),
});

// define gravity
setGravity(2400)

// loading the sprites
// Heroes
loadSprite("hero", "sprites/character1.png")
loadSprite("ninja", "sprites/ninja.png")
loadSprite("bunny", "sprites/bunny.png")
loadSprite("killzone", "sprites/killzone.png")

// Hero Weapons 
loadSprite("carotte", "sprites/carotte.png")

// Hero animations
loadSprite("frame1", "sprites/Frame_1.png")
loadSprite("frame2", "sprites/Frame_2.png")
loadSprite("frame3", "sprites/Frame_3.png")
loadSprite("frame4", "sprites/Frame_4.png")
loadSprite("frame5", "sprites/Frame_5.png")

const frames = ["frame1", "frame2", "frame3", "frame4", "frame5"]

// Bosses
loadSprite("snowman", "sprites/snowman.png")
loadSprite("golem", "sprites/golem.png")
loadSprite("robot", "sprites/robot.png")

// Decors
loadSprite("floor", "sprites/floor.png")
loadSprite("bgSky", "sprites/bgSky.png")

let background = add([
    sprite("bgSky"),
    // Make the background centered on the screen
    pos(width() / 2, height() / 2),
    anchor("center"),
    // Allow the background to be scaled
    scale(2),
    // Keep the background position fixed even when the camera moves
    fixed()
  ]);


// compose the player game object from multiple components and add it to the game
const hero = add([
    sprite("bunny"), // Possiblement Backend donc à générer à chaque début de partie
    pos(80, 40),
    area(),
    body(),
	health(100),
])

const snowman = add([
	sprite("snowman"),
	pos(940, height() - 480),
	body({ isStatic: true}),
	area(),
	health(100),
    "ennemy",
])

// Add a platform to hold the player
add([
    rect(width(), 40),
    pos(0, height() - 40),
    outline(4),
    area(),
    body({ isStatic: true}),
    color(127, 200, 255),
])


const SPEED = 240

// press "left key" or "d" to move left
onKeyDown("left", () => {
    hero.move(-SPEED, 0)
})
onKeyDown("q", () => {
    hero.move(-SPEED, 0)
})

// press "right key" or "q" to move right 
onKeyDown("right", () => {
	hero.move(SPEED, 0)
})
onKeyDown("d", () => {
	hero.move(SPEED, 0)
})

// press space to jump when hero is grounded
onKeyPress("space", () => {
    if (hero.isGrounded()) {
        hero.jump();
    }
});
onKeyPress("z", () => {
    if (hero.isGrounded()) {
        hero.jump();
    }
});

function spawnBullet(p, mouseP) {

    const BULLET_SPEED = 800;
    const bullet = add([
      sprite('carotte'), // Possiblement backend
      area(),
      pos(p.sub(-12, -12)),
      anchor("center"),
      outline(1),
      move(mouseP, BULLET_SPEED),
      offscreen({ destroy: true }),
      // strings here means a tag
      "bullet",
    ]);
}
onClick(() => {
    const playerP = hero.pos;
    const mouseP = mousePos();
  
    const angle = Math.atan2(mouseP.y - playerP.y, mouseP.x - playerP.x);
  
    const angleInDeg = (angle * 180) / Math.PI;
    // for (let i = 0; i < 30; i++) {
    //   spawnBullet(playerP, angleInDeg);
    // }
    spawnBullet(playerP, angleInDeg);
});

onCollide("bullet", "ennemy", (b) => {
    destroy(b);
    if (snowman.health === 0){
        destroy(snowman);
        shake();
    } else {
        snowman.health -= 10;
    }
    console.log(snowman.health);
});
