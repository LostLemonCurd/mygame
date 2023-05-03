import kaboom from "kaboom";

// initialize context
kaboom({
	background: [ 0, 0, 0, 1 ],
    canvas: document.querySelector("#myCanvas"),
})

// define gravity
setGravity(2400)

// load a sprite called "bean"
loadSprite("hero", "sprites/character1.png")
loadSprite("ninja", "sprites/ninja.png")
loadSprite("bunny", "sprites/bunny.png")
loadSprite("killzone", "sprites/killzone.png")


loadSprite("floor", "sprites/floor.png")


loadSprite("snowman", "sprites/snowman.png")
loadSprite("golem", "sprites/golem.png")
loadSprite("robot", "sprites/robot.png")


function spin() {
	let spinning = false
	return {
		id: "spin",
		update() {
			if (spinning) {
				this.angle += 1200 * dt()
				if (this.angle >= 360) {
					this.angle = 0
					spinning = false
				}
			}
		},
		spin() {
			spinning = true
		},
	}
}




// compose the player game object from multiple components and add it to the game
const hero = add([
    sprite("bunny"),
    pos(80, 40),
    area(),
    body(),
	health(100),
    spin(),
])


const snowman = add([
	sprite("snowman"),
	pos(950, 80),
	body(),
	area(),
	health(100)
])

// Add a platform to hold the player
add([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(4),
    area(),
    body({ isStatic: true}),
    color(127, 200, 255),
])




// press space to jump when hero is grounded
onKeyPress("space", () => {
    if (hero.isGrounded()) {
        hero.jump();
        hero.spin();
    }
});


const SPEED = 240
// move left and right with arrow keys
// onKeyDown() registers an event that runs every frame as long as user is holding a certain key
onKeyDown("left", () => {
	// .move() is provided by pos() component, move by pixels per second
	hero.move(-SPEED, 0)
})

onKeyDown("right", () => {
	hero.move(SPEED, 0)
})



function spawnBullet(p, mouseP) {

    const BULLET_SPEED = 800;
    const bullet = add([
      rect(5, 5),
      area(),
      pos(p.sub(-12, -12)),
      anchor("center"),
      color(255, 0, 0),
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
  