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

        // let sprite = "";
        // let speedProj = 1200;
        let bossSpeed = 48;
        // let speedChar = 300;
        let bossHealth = 1000;
        // let playerHealth = 100;
        // let jumpForce = 2000;

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
        console.log('spriteChar', spriteChar);
        const player = add([
            sprite(spriteChar), // Possiblement Backend donc à générer à chaque début de partie
            pos(80, 40),
            area(),
            body(),
            health(healthChar),
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

        function BossShooting(p , ){


            setInterval( () => {

            } ,800);
        }

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
            player.move(-speedChar, 0)
        })
        onKeyDown("q", () => {
            if (player.isGrounded() && player.curAnim() !== "run") {
                player.play("run")
            }
            player.flipX = true;
            player.move(-speedChar, 0)
        })

        // press "right key" or "q" to move right 
        onKeyDown("right", () => {
            if (player.isGrounded() && player.curAnim() !== "run") {
                player.play("run")
            }
            player.flipX = false;
            player.move(speedChar, 0);
            // player.flipX(false);
        })
        onKeyDown("d", () => {
            if (player.isGrounded() && player.curAnim() !== "run") {
                player.play("run")
            }
            player.flipX = false;
            player.move(speedChar, 0);
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
            destroyAll();
            go("level2");
        });
    });

    scene("level2", () => {
        let speedProj = 1200
        let bossSpeed = 48
        let speedChar = 240
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
            sprite(spriteChar), // Possiblement Backend donc à générer à chaque début de partie
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
            player.move(-speedChar, 0)
        })
        onKeyDown("q", () => {
            player.move(-speedChar, 0)
        })

        // press "right key" or "q" to move right 
        onKeyDown("right", () => {
            player.move(speedChar, 0)
        })
        onKeyDown("d", () => {
            player.move(speedChar, 0)
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
                    destroyAll();
                    go("level3");
                });
            } else {
                bossHealth -= 10;
            }
        });
    });






    scene("level3", () => {
        let speedProj = 1200
        let bossSpeed = 48
        let speedChar = 240
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
            sprite(spriteChar), // Possiblement Backend donc à générer à chaque début de partie
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
            player.move(-speedChar, 0)
        })
        onKeyDown("q", () => {
            player.move(-speedChar, 0)
        })

        // press "right key" or "q" to move right 
        onKeyDown("right", () => {
            player.move(speedChar, 0)
        })
        onKeyDown("d", () => {
            player.move(speedChar, 0)
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
});