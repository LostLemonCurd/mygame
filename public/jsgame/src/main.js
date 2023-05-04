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

// Hero Projectiles 
loadSprite("carotte", "sprites/carotte.png")

// Bosses
loadSprite("snowman", "sprites/snowman.png")
loadSprite("golem", "sprites/golem.png")
loadSprite("robot", "sprites/robot.png")

// Decors
loadSprite("floor", "sprites/floor.png")
loadSprite("bgSky", "sprites/bgSky.png")

// Scene Battle begins here
scene("level1", () => {

    let BULLET_SPEED = 1200
    let BOSS_SPEED = 48
    let PLAYER_SPEED = 240
    let BOSS_HEALTH = 1000
    let PLAYER_HEALTH = 100

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
        health(PLAYER_HEALTH),
    ])

    const snowman = add([
        sprite("snowman"),
        pos(940, height() - 480),
        body({ isStatic: true}),
        area(),
        health(BOSS_HEALTH),
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

    // press "left key" or "d" to move left
    onKeyDown("left", () => {
        hero.move(-PLAYER_SPEED, 0)
    })
    onKeyDown("q", () => {
        hero.move(-PLAYER_SPEED, 0)
    })

    // press "right key" or "q" to move right 
    onKeyDown("right", () => {
        hero.move(PLAYER_SPEED, 0)
    })
    onKeyDown("d", () => {
        hero.move(PLAYER_SPEED, 0)
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
        if (BOSS_HEALTH === 0){
            destroy(snowman);
            shake(3);
            wait(5, () => {
                go("Win");
            });
        } else {
            BOSS_HEALTH -= 100;
        }
    });
});

scene("Lose", () => {
    
});

scene("Win", () => {
    add([
		sprite("snowman"),
		anchor("center"),
		pos(width() / 2, height() / 2),
	])
	add([
		text("Vous avez battu le boss !"),
        color(0, 0, 0),
		anchor("center"),
		pos(width() / 2, height() / 2),
	])
    wait(10, () => {
        go("level2");
    });
});

scene("level2", () => {
    let BULLET_SPEED = 1200
    let BOSS_SPEED = 48
    let PLAYER_SPEED = 240
    let BOSS_HEALTH = 1000
    let PLAYER_HEALTH = 100

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
        health(PLAYER_HEALTH),
    ])

    const snowman = add([
        sprite("snowman"),
        pos(940, height() - 480),
        body({ isStatic: true}),
        area(),
        health(BOSS_HEALTH),
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

    // press "left key" or "d" to move left
    onKeyDown("left", () => {
        hero.move(-PLAYER_SPEED, 0)
    })
    onKeyDown("q", () => {
        hero.move(-PLAYER_SPEED, 0)
    })

    // press "right key" or "q" to move right 
    onKeyDown("right", () => {
        hero.move(PLAYER_SPEED, 0)
    })
    onKeyDown("d", () => {
        hero.move(PLAYER_SPEED, 0)
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
        if (BOSS_HEALTH === 0){
            destroy(snowman);
            shake();
            wait(10, () => {
                go("level3");
            });
        } else {
            BOSS_HEALTH -= 1000;
        }
    });
});
// Start the game scene
go("level1");