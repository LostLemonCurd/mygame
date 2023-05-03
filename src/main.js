import kaboom from "kaboom";

// initialize context
kaboom({
	background: [ 0, 0, 0, 1 ],
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

// compose the player game object from multiple components and add it to the game
const hero = add([
    sprite("bunny"),
    pos(80, 40),
    area(),
    body(),
	health(100),
])


const snowman = add([
	sprite("snowman"),
	pos(120, 80),
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