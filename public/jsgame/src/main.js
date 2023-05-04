import kaboom from "kaboom";

// initialize context
kaboom({
	background: [ 0, 0, 0, 1 ],
    canvas: document.querySelector("#myCanvas"),
});

// define gravity
setGravity(2400)

// loading the sprites
// playeres
loadSprite("ninja", "sprites/ninja_marche.png", {
    sliceX: 14,
    anims: {
        "idle": {
            from: 0,
            to: 1,
            speed: 0.5,
            loop: true,
        },
        "run": {
            from: 2,
            to: 13,
            speed: 3,
            loop: true,
        },
    }
})
loadSprite("bunny", "sprites/lapin_marche_droite.png", {
    sliceX: 12,
    anims: {
        "idle": {
            from: 0,
            to: 1,
            speed: 5,
            loop: true,
        },
        "run": {
            from: 2,
            to: 11,
            speed: 10,
            loop: true,
        }
    }
});
loadSprite("stormy", "sprites/stormy_marche.png", {
    sliceX: 12,
    anims: {
        "idle": {
            from: 0,
            to: 1,
            speed: 5,
            loop: true,
        },
        "run": {
            from: 2,
            to: 11,
            speed: 10,
            loop: true,
        },
    }
})

// player Projectiles 
loadSprite("carotte", "sprites/carotte.png")

// Bosses
loadSprite("snowman", "sprites/snowman.png")
loadSprite("golem", "sprites/golem.png")
loadSprite("robot", "sprites/robot.png")

// Decors
const floors = ["sol_chateau", "sol_sucre", "sol_space"];
const fond = ["fond_chateau", "fond_sucre", "fond_space"];

floors.forEach((floor) => {
    loadSprite(floor, `sprites/${floor}.png`);
});
fond.forEach((fond) => {
    loadSprite(fond, `sprites/${fond}.png`);

})

loadSprite("bgSky", "sprites/bgSky.png");


// Scene Battle begins here
// scene("menu", () => {


// });



scene("level1", () => {

    let BULLET_SPEED = 1200
    let BOSS_SPEED = 48
    let PLAYER_SPEED = 240
    let BOSS_HEALTH = 1000
    let PLAYER_HEALTH = 100

    let background = add([
        sprite("fond_space"),
        // Make the background centered on the screen
        pos(width() / 2, height() / 2),
        anchor("center"),
        // Allow the background to be scaled
        scale(2),
        // Keep the background position fixed even when the camera moves
        fixed()
    ]);


    // compose the player game object from multiple components and add it to the game
    const player = add([
        sprite("stormy"), // Possiblement Backend donc à générer à chaque début de partie
        pos(80, 40),
        area(),
        body(),
        health(PLAYER_HEALTH),
    ])

    // .play is provided by sprite() component, it starts playing the specified animation (the animation information of "idle" is defined above in loadSprite)
    player.play("idle");


    const robot = add([
        sprite("robot"),
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

    // Switch to "idle" or "run" animation when player hits ground
    player.onGround(() => {
        if ((!isKeyDown("left") && !isKeyDown("right")) || (!isKeyDown("q") && !isKeyDown("d"))) {
            player.play("idle")
        } else {
            player.play("run")
        }
    })
    // press "left key" or "d" to move left
    onKeyDown("left", () => {
        if (player.isGrounded() && player.curAnim() !== "run") {
            player.play("run")
        }
        player.flipX = true;
        player.move(-PLAYER_SPEED, 0)
    })
    onKeyDown("q", () => {
        if (player.isGrounded() && player.curAnim() !== "run") {
            player.play("run")
        }
        player.flipX = true;
        player.move(-PLAYER_SPEED, 0)
    })

    // press "right key" or "q" to move right 
    onKeyDown("right", () => {
        if (player.isGrounded() && player.curAnim() !== "run") {
            player.play("run")
        }
        player.flipX = false;
        player.move(PLAYER_SPEED, 0);
        // player.flipX(false);
    })
    onKeyDown("d", () => {
        if (player.isGrounded() && player.curAnim() !== "run") {
            player.play("run")
        }
        player.flipX = false;
        player.move(PLAYER_SPEED, 0);
        // player.flipX(false);
    })

    // press space to jump when player is grounded
    onKeyPress("space", () => {
        if (player.isGrounded()) {
            player.jump();
        }
    });
    onKeyPress("z", () => {
        if (player.isGrounded()) {
            player.jump();
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
        const playerP = player.pos;
        const mouseP = mousePos();
    
        const angle = Math.atan2(mouseP.y - playerP.y, mouseP.x - playerP.x);
    
        const angleInDeg = (angle * 180) / Math.PI;
        spawnBullet(playerP, angleInDeg);
    });

    onCollide("bullet", "ennemy", (b) => {
        destroy(b);
        if (BOSS_HEALTH === 0){
            destroy(robot);
            shake(3);
            wait(5, () => {
                destroy(player);
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
		sprite("robot"),
		anchor("center"),
		pos(width() / 2, height() / 2),
	])
	add([
		text("Vous avez battu le boss !"),
        color(0, 0, 0),
		anchor("center"),
		pos(width() / 2, height() / 2),
	])
    wait(5, () => {
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
        sprite("sol_chateau"),
        // Make the background centered on the screen
        pos(width() / 2, height() / 2),
        anchor("center"),
        // Allow the background to be scaled
        scale(2),
        // Keep the background position fixed even when the camera moves
        fixed()
    ]);


    // compose the player game object from multiple components and add it to the game
    const player = add([
        sprite("bunny"), // Possiblement Backend donc à générer à chaque début de partie
        pos(80, 40),
        area(),
        body(),
        health(PLAYER_HEALTH),
    ])

    const golem = add([
        sprite("golem"),
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
        player.move(-PLAYER_SPEED, 0)
    })
    onKeyDown("q", () => {
        player.move(-PLAYER_SPEED, 0)
    })

    // press "right key" or "q" to move right 
    onKeyDown("right", () => {
        player.move(PLAYER_SPEED, 0)
    })
    onKeyDown("d", () => {
        player.move(PLAYER_SPEED, 0)
    })

    // press space to jump when player is grounded
    onKeyPress("space", () => {
        if (player.isGrounded()) {
            player.jump();
        }
    });
    onKeyPress("z", () => {
        if (player.isGrounded()) {
            player.jump();
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
        const playerP = player.pos;
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