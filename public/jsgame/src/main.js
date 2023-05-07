import kaboom from "kaboom";

// Récupérer l'id du personnage choisi dans l'URL
let choosenChar = window.location.href;
let idChar = choosenChar.split("=");

// let urlChar = `http://localhost:3000/getCharacter?id=${idChar[1]}`;
// console.log('urlChar', urlChar);
// let spriteChar, healthChar, speedChar, jumpForceChar, canFlyChar, projectileChar, sliceXChar;
// // Récupérer les données du personnage choisi par le GAMER™
// fetch(urlChar, {
//   method: "get",
//   headers: new Headers({
//     "Content-Type": "application/json"
//   })
// })
//   .then(function (response) {
//     // Convert to JSON
//     return response.json();
//   })
//   .then(function (jsonResponse) {
//     console.log(jsonResponse);
//     // Créer les variables pour les stats du personnage
//     spriteChar = jsonResponse.data[0].sprite;
//     healthChar = jsonResponse.data[0].health;
//     speedChar = jsonResponse.data[0].speed;
//     jumpForceChar = jsonResponse.data[0].jumpForce;
//     canFlyChar = jsonResponse.data[0].canFly;
//     projectileChar = jsonResponse.data[0].projectile;
//     sliceXChar = jsonResponse.data[0].sliceX;
//     console.log('spriteChar', spriteChar);
//   });
  


// let urlProj = `http://localhost:3000/getProjectile?id=${idChar[1]}`;
// console.log('urlProj', urlProj);

// let spriteProj, dmgProj, speedProj, gravityProj, isFriendlyProj;
// fetch(urlProj, {
//   method: "get",
//   headers: new Headers({
//     "Content-Type": "application/json"
//   })
// })
//   .then(function (response) {
//     // Convert to JSON
//     return response.json();
//   })
//   .then(function (jsonResponse) {
//     console.log(jsonResponse);
//     // Créer les variables pour les stats du PROJECTILE
//     spriteProj = jsonResponse.data[0].sprite;
//     dmgProj = jsonResponse.data[0].dmg;
//     speedProj = jsonResponse.data[0].speed;
//     gravityProj= jsonResponse.data[0].gravity;
//     isFriendlyProj = jsonResponse.data[0].isFriendly;
//   });

let urlChar = `http://localhost:3000/getCharacter?id=${idChar[1]}`;
let urlProj = `http://localhost:3000/getProjectile?id=${idChar[1]}`;

// Fonction asynchrone qui englobe tout le code du jeu afin d'utiliser les données récupérées dans les fetch
Promise.all([
  fetch(urlChar, {
    method: "get",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  }).then(function (response) {
    // Convert to JSON
    return response.json();
  }),
  fetch(urlProj, {
    method: "get",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  }).then(function (response) {
    // Convert to JSON
    return response.json();
  })
]).then(function (responses) {
  let jsonResponseChar = responses[0];
  let jsonResponseProj = responses[1];
  
  // Créer les variables pour les stats du personnage
  let spriteChar = jsonResponseChar.data[0].sprite;
  let healthChar = jsonResponseChar.data[0].health;
  let speedChar = jsonResponseChar.data[0].speed;
  let jumpForceChar = jsonResponseChar.data[0].jumpForce;
  let canFlyChar = jsonResponseChar.data[0].canFly;
  let projectileChar = jsonResponseChar.data[0].projectile;
  let sliceXChar = jsonResponseChar.data[0].sliceX;
  
  // Créer les variables pour les stats du PROJECTILE
  let spriteProj = jsonResponseProj.data[0].sprite;
  let dmgProj = jsonResponseProj.data[0].dmg;
  let speedProj = jsonResponseProj.data[0].speed;
  let gravityProj= jsonResponseProj.data[0].gravity;
  let isFriendlyProj = jsonResponseProj.data[0].isFriendly;
  
  console.log('spriteChar', spriteChar);
  console.log('spriteProj', spriteProj);



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
    loadSprite("couteau", "sprites/couteau.png")
    loadSprite("bullet", "sprites/fireball.png")

    // Bosses
    loadSprite("snowman", "sprites/snowman.png")
    loadSprite("golem", "sprites/golem.png")
    loadSprite("robot", "sprites/robot.png")

    // Decors
    const floors = ["sol_chateau", "sol_sucre", "sol_space", "sol_sucre2"];
    const fond = ["fond_chateau", "fond_sucre", "fond_space", 'fond_sucre2'];

    floors.forEach((floor) => {
        loadSprite(floor, `sprites/${floor}.png`);
    });
    fond.forEach((fond) => {
        loadSprite(fond, `sprites/${fond}.png`);

    })

    loadSprite("bgSky", "sprites/bgSky.png");

    // Faire les loops pour les menus lose et win
    loadSprite("ninjaLose1", "sprites/ninja_loose_n1.jpg");
    loadSprite("ninjaLose2", "sprites/ninja_loose_n2.jpg");
    loadSprite("ninjaLose3", "sprites/ninja_loose_n3.jpg");
    loadSprite("ninjaWin1", "sprites/ninja_win_n1.jpg");
    loadSprite("ninjaWin2", "sprites/ninja_win_n2.jpg");
    loadSprite("ninjaWin3", "sprites/ninja_win_n3.jpg");

    loadSprite("bunnyLose1", "sprites/bunny_loose_n1.jpg");
    loadSprite("bunnyLose2", "sprites/bunny_loose_n2.jpg");
    loadSprite("bunnyLose3", "sprites/bunny_loose_n3.jpg");
    loadSprite("bunnyWin1", "sprites/bunny_win_n1.jpg");
    loadSprite("bunnyWin2", "sprites/bunny_win_n2.jpg");
    loadSprite("bunnyWin3", "sprites/bunny_win_n3.jpg");

    loadSprite("stormyLose1", "sprites/stormy_loose_n1.jpg");
    loadSprite("stormyLose2", "sprites/stormy_loose_n2.jpg");
    loadSprite("stormyLose3", "sprites/stormy_loose_n3.jpg");
    loadSprite("stormyWin1", "sprites/stormy_win_n1.jpg");
    loadSprite("stormyWin2", "sprites/stormy_win_n2.jpg");
    loadSprite("stormyWin3", "sprites/stormy_win_n3.jpg");


    // SETTING WIN/LOSE SCENES

    scene("Lose", () => {
        console.log(`sprite/${spriteChar}_loose_n1.jpg`);
        let background = add([
            sprite(`${spriteChar}Lose1`),
            // Make the background centered on the screen
            pos(width() / 2, height() / 2),
            anchor("center"),
            // Allow the background to be scaled
            scale(1),
            // Keep the background position fixed even when the camera moves
            fixed()
        ]);
        wait(5, () => {
            go("level1");
        });
    });

    scene("Win", () => {
        let background = add([
            sprite(`${spriteChar}Win1`),
            // Make the background centered on the screen
            pos(width() / 2, height() / 2),
            anchor("center"),
            // Allow the background to be scaled
            scale(1),
            // Keep the background position fixed even when the camera moves
            fixed()
        ]);
        wait(5, () => {
            go("level2");
        });
    });

    scene("Lose2", () => {
        let background = add([
            sprite(`${spriteChar}Lose2`),
            // Make the background centered on the screen
            pos(width() / 2, height() / 2),
            anchor("center"),
            // Allow the background to be scaled
            scale(1),
            // Keep the background position fixed even when the camera moves
            fixed()
        ]);
        wait(5, () => {
            go("level2");
        });
    });

    scene("Win2", () => {
        let background = add([
            sprite(`${spriteChar}Win2`),
            // Make the background centered on the screen
            pos(width() / 2, height() / 2),
            anchor("center"),
            // Allow the background to be scaled
            scale(1),
            // Keep the background position fixed even when the camera moves
            fixed()
        ]);
        wait(5, () => {
            go("level3");
        });
    });

    scene("Lose3", () => {
        console.log(`sprite/${spriteChar}_loose_n3.jpg`);
        let background = add([
            sprite(`${spriteChar}Lose3`),
            // Make the background centered on the screen
            pos(width() / 2, height() / 2),
            anchor("center"),
            // Allow the background to be scaled
            scale(1),
            // Keep the background position fixed even when the camera moves
            fixed()
        ]);
        wait(5, () => {
            go("level3");
        });
    });

    scene("Win3", () => {
        let background = add([
            sprite(`${spriteChar}Win3`),
            // Make the background centered on the screen
            pos(width() / 2, height() / 2),
            anchor("center"),
            // Allow the background to be scaled
            scale(1),
            // Keep the background position fixed even when the camera moves
            fixed()
        ]);
        wait(5, () => {
            go("GameOver");
        });
    });


    scene("level1", () => {

        // define some hardcoded variables for the boss (to be replaced with a fetch request)
        let bossSpeed = 48;
        let bossHealth = 200;
        let dmgBoss = 5;


        let background = add([
            sprite("fond_space"),
            pos(width() / 2, height() / 2),
            anchor("center"),
            scale(2),
            fixed()
        ]);


        // compose the characters game object from multiple components and add it to the game
        let player = add([
            sprite(spriteChar),
            pos(80, 40),
            area(),
            body(),
            health(healthChar),
        ])

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

        // SETTING THE CONTROLS

        onKeyDown("left", () => {
            if (player.isGrounded() && player.curAnim() !== "run") {
                player.play("run")
            }
            player.flipX = true;
            player.move(-speedChar, 0)
        })
        onKeyDown("q", () => {
            if (player.isGrounded() && player.curAnim() !== "run") {
                player.play("run")
            }
            player.flipX = true;
            player.move(-speedChar, 0)
        })

        onKeyDown("right", () => {
            if (player.isGrounded() && player.curAnim() !== "run") {
                player.play("run")
            }
            player.flipX = false;
            player.move(speedChar, 0);
        })
        onKeyDown("d", () => {
            if (player.isGrounded() && player.curAnim() !== "run") {
                player.play("run")
            }
            player.flipX = false;
            player.move(speedChar, 0);
        })

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


        // SETTING THE ATTACKS AND THE HEALTHBARS

        function spawnBullet(p, mouseP, projectile) {
            const bullet = add([
                sprite(projectile), 
                area(),
                pos(p.sub(-12, -12)),
                anchor("center"),
                outline(1),
                move(mouseP, speedProj),
                offscreen({ destroy: true }),
                "bullet",
            ]);
        }
        onClick(() => {
            const playerP = player.pos;
            const mouseP = mousePos();
        
            const angle = Math.atan2(mouseP.y - playerP.y, mouseP.x - playerP.x);
        
            const angleInDeg = (angle * 180) / Math.PI;
            spawnBullet(playerP, angleInDeg, spriteProj);
        });

        // Add a healthbar and update it on projectile hit
        boss.onCollide("bullet", (b) => {
            destroy(b);
            shake(1);
            console.log('Health before hit', bossHealth);
            boss.hurt(dmgProj);
            console.log('Health after hit', bossHealth);
        });

        const healthbar = add([
            rect(width(), 24),
            pos(0, 0),
            color(240, 43, 43),
            fixed(),
            {
                max: bossHealth,
                set(hp) {
                    this.width = width() * hp / this.max
                    this.flash = true
                },
            },
        ])

        boss.on("hurt", () => {
            healthbar.set(boss.hp())
        })

        onCollide("bullet", "player", (b) => {
            destroy(b);
            shake(1);
            player.hurt(dmgBoss); 
            if ( healthChar <= 0 && bossHealth > 0){
                destroy(player);
                shake(4);
                go("Lose");
            }
        });
        
        // SET BEHAVIOR ON WIN OR LOSS 

        boss.on("death", () => {
            console.log('Health after click', bossHealth);
            destroy(boss);
            shake(4);
            wait(2, () => {
                player.move("left", 5000)
                go("Win");
            });
        })



    });

    scene("level2", () => {
        bossSpeed = 48;
        bossHealth = 400;
        dmgBoss = 10;

        const background = add([
            sprite("fond_chateau"),
            pos(width() / 2, height() / 2),
            anchor("center"),
            scale(2),
            fixed()
        ]);


        let player = add([
            sprite(spriteChar), 
            pos(80, 40),
            area(),
            body(),
            health(healthChar),
        ])

        const boss = add([
            sprite("golem"),
            pos(940, height() - 480),
            body({ isStatic: true}),
            area(),
            health(bossHealth),
            "ennemy",
        ])

        add([
            sprite("sol_chateau"),
            pos(0, height() - 150),
            outline(4),
            area(),
            body({ isStatic: true}),
            color(127, 200, 255),
        ])

        player.onGround(() => {
            if ((!isKeyDown("left") && !isKeyDown("right")) || (!isKeyDown("q") && !isKeyDown("d"))) {
                player.play("idle")
            } else {
                player.play("run")
            }
        })
        onKeyDown("left", () => {
            if (player.isGrounded() && player.curAnim() !== "run") {
                player.play("run")
            }
            player.flipX = true;
            player.move(-speedChar, 0)
        })
        onKeyDown("q", () => {
            if (player.isGrounded() && player.curAnim() !== "run") {
                player.play("run")
            }
            player.flipX = true;
            player.move(-speedChar, 0)
        })

        onKeyDown("right", () => {
            if (player.isGrounded() && player.curAnim() !== "run") {
                player.play("run")
            }
            player.flipX = false;
            player.move(speedChar, 0);
        })
        onKeyDown("d", () => {
            if (player.isGrounded() && player.curAnim() !== "run") {
                player.play("run")
            }
            player.flipX = false;
            player.move(speedChar, 0);
        })

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
                sprite(spriteProj), 
                area(),
                pos(p.sub(-12, -12)),
                anchor("center"),
                outline(1),
                move(mouseP, speedProj),
                offscreen({ destroy: true }),
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

        // Add a healthbar and update it on projectile hit
        boss.onCollide("bullet", (b) => {
            destroy(b);
            shake(1);
            console.log('Health before hit', bossHealth);
            boss.hurt(dmgProj);
            console.log('Health after hit', bossHealth);
        });

        const healthbar = add([
            rect(width(), 24),
            pos(0, 0),
            color(240, 43, 43),
            fixed(),
            {
                max: bossHealth,
                set(hp) {
                    this.width = width() * hp / this.max
                    this.flash = true
                },
            },
        ])

        boss.on("hurt", () => {
            healthbar.set(boss.hp())
        })

        boss.on("death", () => {
            console.log('Health after click', bossHealth);
            destroy(boss);
            shake(4);
            wait(2, () => {
                player.move("left", 5000)
                go("Win2");
            });
        })

        onCollide("bullet", "player", (b) => {
            destroy(b);
            shake(1);
            healthChar -= dmgBoss; // CRÉER UNE VARIABLE DEGATS BOSS
            if ( healthChar <= 0 && bossHealth > 0){
                destroy(player);
                shake(4);
                go("Lose2");
            }
        });
    });






    scene("level3", () => {

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        console.log(`Viewport width: ${viewportWidth}`);
        console.log(`Viewport height: ${viewportHeight}`);

        bossSpeed = 48;
        bossHealth = 600;
        dmgBoss = 20;

        const background = add([
            sprite("fond_sucre2"),
            pos(width() / 2, height() / 2),
            anchor("center"),
            scale(1),
            fixed()
        ]);


        const player = add([
            sprite(spriteChar), 
            pos(80, 40),
            area(),
            body(),
            health(healthChar),
        ])

        const boss = add([
            sprite("snowman"),
            pos(940, height() - 580),
            body({ isStatic: true}),
            area(),
            health(bossHealth),
            "ennemy",
        ])

        // REGLER PROBLEME DE SOL!!!
        add([
            sprite("sol_sucre2"),
            pos(0, height() - 118),
            outline(4),
            area(),
            body({ isStatic: true}),
            color(127, 200, 255),
            z(1000)
        ]);


        player.onGround(() => {
            if ((!isKeyDown("left") && !isKeyDown("right")) || (!isKeyDown("q") && !isKeyDown("d"))) {
                player.play("idle")
            } else {
                player.play("run")
            }
        })
        onKeyDown("left", () => {
            if (player.isGrounded() && player.curAnim() !== "run") {
                player.play("run")
            }
            player.flipX = true;
            player.move(-speedChar, 0)
        })
        onKeyDown("q", () => {
            if (player.isGrounded() && player.curAnim() !== "run") {
                player.play("run")
            }
            player.flipX = true;
            player.move(-speedChar, 0)
        })
        onKeyDown("right", () => {
            if (player.isGrounded() && player.curAnim() !== "run") {
                player.play("run")
            }
            player.flipX = false;
            player.move(speedChar, 0);
        })
        onKeyDown("d", () => {
            if (player.isGrounded() && player.curAnim() !== "run") {
                player.play("run")
            }
            player.flipX = false;
            player.move(speedChar, 0);
        })

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
                sprite(spriteProj), 
                area(),
                pos(p.sub(-12, -12)),
                anchor("center"),
                outline(1),
                move(mouseP, speedProj),
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

        boss.onCollide("bullet", (b) => {
            destroy(b);
            shake(1);
            console.log('Health before hit', bossHealth);
            boss.hurt(dmgProj);
            console.log('Health after hit', bossHealth);
        });

        const healthbar = add([
            rect(width(), 24),
            pos(0, 0),
            color(240, 43, 43),
            fixed(),
            {
                max: bossHealth,
                set(hp) {
                    this.width = width() * hp / this.max
                    this.flash = true
                },
            },
        ])

        boss.on("hurt", () => {
            healthbar.set(boss.hp())
        })

        boss.on("death", () => {
            console.log('Health after click', bossHealth);
            destroy(boss);
            shake(4);
            wait(2, () => {
                // Pour éviter d'avoir des sprites qui se superposent sur la scène suivante ils sont détruits manuellement 
                player.move("left", 5000)
                go("Win3");
            });
        })

        onCollide("bullet", "player", (b) => {
            destroy(b);
            shake(1);
            healthChar -= dmgBoss; 
            if ( healthChar <= 0 && bossHealth > 0){
                destroy(player);
                shake(4);
                go("Lose3");
            }
        });
    });

    // Start the game scene
    go("level3");
});