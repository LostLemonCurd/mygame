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
loadSprite("ninja", "sprites/anim/ninja_anim.png", {
    sliceX: 8,
    anims: {
        "idle": {
            from: 0,
            to: 1,
            speed: 2,
            loop: true,
        },
        "run": {
            from: 5,
            to: 7,
            speed: 8,
            loop: true,
        },
        "jump": {
            from: 13,
            to: 25,
            speed: 30,
            loop: true,
        },
    }
})
loadSprite("bunny", "sprites/anim/lapin_anim.png", {
    sliceX: 9,
    anims: {
        "idle": {
            from: 0,
            to: 1,
            speed: 2,
            loop: true,
        },
        "run": {
            from: 6,
            to: 8,
            speed: 8,
            loop: true,
        },
        "jump": {
            from: 1,
            to: 2,
            speed: 1,
            loop: true,
        },
        "dead": {
            from: 3,
            to: 3,
            speed: 0,
            loop: true,
        },
    }
});
loadSprite("stormy", "sprites/anim/stormy_anim.png", {
    sliceX: 7,
    anims: {
        "idle": {
            from: 0,
            to: 1,
            speed: 2,
            loop: true,
        },
        "run": {
            from: 4,
            to: 6,
            speed: 10,
            loop: true,
        },
        "jump": {
            from: 2,
            to: 2,
            speed: 0,
            loop: true,
        },
        "dead": {
            from: 3,
            to: 3,
            speed: 0,
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

    // let sprite = "";
    let bulletSpeed = 1200;
    let bossSpeed = 48;
    let playerSpeed = 240;
    let bossHealth = 1000;
    let playerHealth = 100;
    let jumpForce = 1000;

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
        sprite("ninja"), // Possiblement Backend donc à générer à chaque début de partie
        pos(80, 40),
        area(),
        body(),
        health(playerHealth),
    ])

    // .play is provided by sprite() component, it starts playing the specified animation (the animation information of "idle" is defined above in loadSprite)
    player.play("idle");


    const boss = add([
        sprite("robot"),
        pos(940, height() - 610),
        body({ isStatic: true}),
        area(),
        health(bossHealth),
        "ennemy",
    ])

    // Add a platform to hold the player
    add([
        sprite("sol_space"),
        pos(0, height() - 150),
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
        player.move(-playerSpeed, 0)
    })
    onKeyDown("q", () => {
        if (player.isGrounded() && player.curAnim() !== "run") {
            player.play("run")
        }
        player.flipX = true;
        player.move(-playerSpeed, 0)
    })

    // press "right key" or "q" to move right 
    onKeyDown("right", () => {
        if (player.isGrounded() && player.curAnim() !== "run") {
            player.play("run")
        }
        player.flipX = false;
        player.move(playerSpeed, 0);
        // player.flipX(false);
    })
    onKeyDown("d", () => {
        if (player.isGrounded() && player.curAnim() !== "run") {
            player.play("run")
        }
        player.flipX = false;
        player.move(playerSpeed, 0);
        // player.flipX(false);
    })

    // press space to jump when player is grounded
    onKeyPress("space", () => {
        if (player.isGrounded() && player.curAnim() !=="jump") {
            player.jump("jump");
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
            move(mouseP, bulletSpeed),
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
        if (bossHealth === 0){
            destroy(boss);
            shake(3);
            wait(5, () => {
                destroy(player);
                go("Win");
            });
        } else {
            bossHealth -= 100;
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
    let bulletSpeed = 1200
    let bossSpeed = 48
    let playerSpeed = 240
    let bossHealth = 1000
    let playerHealth = 100

    let background = add([
        sprite("fond_chateau"),
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
        sprite("ninja"), // Possiblement Backend donc à générer à chaque début de partie
        pos(80, 40),
        area(),
        body(),
        health(playerHealth),
    ])

    const boss = add([
        sprite("golem"),
        pos(940, height() - 480),
        body({ isStatic: true}),
        area(),
        health(bossHealth),
        "ennemy",
    ])

    // Add a platform to hold the player
    add([
        sprite("sol_chateau"),
        pos(0, height() - 150),
        outline(4),
        area(),
        body({ isStatic: true}),
        color(127, 200, 255),
    ])

    // press "left key" or "d" to move left
    onKeyDown("left", () => {
        player.move(-playerSpeed, 0)
    })
    onKeyDown("q", () => {
        player.move(-playerSpeed, 0)
    })

    // press "right key" or "q" to move right 
    onKeyDown("right", () => {
        player.move(playerSpeed, 0)
    })
    onKeyDown("d", () => {
        player.move(playerSpeed, 0)
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
            move(mouseP, bulletSpeed),
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
        if (bossHealth === 0){
            destroy(boss);
            shake();
            wait(5, () => {
                go("level3");
            });
        } else {
            bossHealth -= 10;
        }
    });
});






scene("level3", () => {
    let bulletSpeed = 1200
    let bossSpeed = 48
    let playerSpeed = 240
    let bossHealth = 1000
    let playerHealth = 100

    let background = add([
        sprite("fond_sucre"),
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
        sprite("ninja"), // Possiblement Backend donc à générer à chaque début de partie
        pos(80, 40),
        area(),
        body(),
        health(playerHealth),
    ])

    const boss = add([
        sprite("snowman"),
        pos(940, height() - 580),
        body({ isStatic: true}),
        area(),
        health(bossHealth),
        "ennemy",
    ])

    // Add a platform to hold the player
    add([
        sprite("sol_sucre"),
        pos(0, height() - 235),
        outline(4),
        area(),
        body({ isStatic: true}),
        color(127, 200, 255),
        z(1000)
    ]);


    add([
        rect(width(), 130),
        pos(0, height() - 130),
        area(),
        body({ isStatic: true}),
        z(100),
    ]);

    // press "left key" or "d" to move left
    onKeyDown("left", () => {
        player.move(-playerSpeed, 0)
    })
    onKeyDown("q", () => {
        player.move(-playerSpeed, 0)
    })

    // press "right key" or "q" to move right 
    onKeyDown("right", () => {
        player.move(playerSpeed, 0)
    })
    onKeyDown("d", () => {
        player.move(playerSpeed, 0)
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
            move(mouseP, bulletSpeed),
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
        if (bossHealth === 0){
            destroy(golem);
            shake();
            wait(5, () => {
                go("level3");
            });
        } else {
            bossHealth -= 10;
        }
    });
});
// Start the game scene
go("level1");