import kaboom from "kaboom";

// Récupérer l'id du personnage choisi dans l'URL
let choosenChar = window.location.href;
let idChar = choosenChar.split("=");

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
    setGravity(1000)

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
    loadSprite("robot", "sprites/robot.png")
    loadSprite("golem", "sprites/golem.png")
    loadSprite("snowman", "sprites/snowman.png")
    
    // Boss Projectile
    loadSprite("punch", "sprites/punch.png")
    loadSprite("rock", "sprites/rock.png")
    loadSprite("snowball", "sprites/snowball.png")

    // Decors
    const floors = ["sol_chateau", "sol_sucre", "sol_space", "sol_sucre2"];
    const fonds = ["fond_chateau", "fond_sucre", "fond_space", 'fond_sucre2'];
    const platforms = ["platform_chateau", "platform_sucre", "platform_space"];

    floors.forEach((floor) => {
        loadSprite(floor, `sprites/${floor}.png`);
    });
    fonds.forEach((fond) => {
        loadSprite(fond, `sprites/${fond}.png`);
    });
    platforms.forEach((platform) => {
        loadSprite(platform, `sprites/${platform}.png`);
    });

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
        let bossDmg = 5;
        let bossAttackSpeed = 500;


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

        let platformTimeout;
        function addPlatform(){
            add([
                sprite("platform_space"),
                area(),
                pos(rand(100, 900), height() - 150),
                body({ isStatic: true }),
                offscreen({ destroy: true }),
                anchor("center"),
                "platform",
                {
                    speed: 100,
                    dir: -1,
                },
            ])
        };
        onUpdate("platform", (p) => {
            p.move(0, p.dir * p.speed)
        })
        platformTimeout = setInterval(addPlatform, 5000);

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

        function spawnBulletHeroes(p, mouseP, projectile) {
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

        function positionXBulletFromSky(){
            return Math.floor(Math.random() * 1001);
        }

        function spawnBulletBossRoof(p, mouseP, projectile) {
            const bulletBoss = add([
                sprite("punch"), 
                area(),
                rotate(90),
                pos(positionXBulletFromSky(),0),
                anchor("center"),
                outline(1),
                move(mouseP, bossAttackSpeed),
                offscreen({ destroy: true }),
                "bulletBoss",
            ]);
        }

        function spawnBulletBoss(p, mouseP, projectile) {
            const bulletBoss = add([
                sprite("punch"), 
                area(),
                rotate(180),
                pos(p.sub(-12, -12)),
                anchor("center"),
                outline(1),
                move(mouseP, bossAttackSpeed),
                offscreen({ destroy: true }),
                "bulletBoss",
            ]);
        }

        

        onClick(() => {
            const playerP = player.pos;
            const mouseP = mousePos();
        
            const angle = Math.atan2(mouseP.y - playerP.y, mouseP.x - playerP.x);
        
            const angleInDeg = (angle * 180) / Math.PI;
            spawnBulletHeroes(playerP, angleInDeg, spriteProj);
        });

        
        // Boss shooting system 

        // a ajouter au code
        
        
        let bulletBossInterval;
        let bulletRoofInterval;
        if(bossHealth > 0 ){
            bulletBossInterval = setInterval( () => {
                const bossP = boss.pos;
                const playerP = player.pos;

                const angle = Math.atan2(playerP.y - bossP.y, playerP.x - bossP.x);
                
                const angleInDeg = (angle * 180) / Math.PI;
                spawnBulletBoss(bossP, angleInDeg, spriteProj);
            }, 1000);

            bulletRoofInterval = setInterval( () => {
                for( let multipleSpawn = 0; multipleSpawn < 3; multipleSpawn++){
                    spawnBulletBossPosition = { x: positionXBulletFromSky(), y: 50};
                    spawnBulletBossRoof(spawnBulletBossPosition, 90, spriteProj);
                }
            }, 1500);
        } else {
            bulletBoss = add([
                cleanup()
            ])
        }
        

        // Add a healthbar and update it on projectile hit
        boss.onCollide("bullet", (b) => {
            destroy(b);
            shake(1);
            boss.hurt(dmgProj);
        });

        const healthbarBoss = add([
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
            healthbarBoss.set(boss.hp())
        })


        player.onCollide("bulletBoss", (b) => {
            destroy(b);
            shake(1);
            player.hurt(bossDmg);
        });

        const healthbarChar = add([
            rect(width() / 4, 20),
            pos(width() / 3, height() - 40),
            color(64, 236, 45),
            fixed(),
            {
                max: healthChar,
                set(hp) {
                    this.width = (width() / 4) * hp / this.max                    
                    this.flash = true
                },
            },
        ])

        player.on("hurt", () => {
            healthbarChar.set(player.hp())
        })
        
        // SET BEHAVIOR ON WIN OR LOSS 

        boss.on("death", () => {
            console.log('Health after click', bossHealth);
            destroy(boss);
            shake(4);
            wait(2, () => {
                // Pour éviter d'avoir des sprites qui se superposent sur la scène suivante ils sont détruits manuellement 
                player.move("left", 5000);
                clearInterval(platformTimeout);
                clearInterval(bulletBossInterval);
                clearInterval(bulletRoofInterval);
                go("Win");
            });
        })
        player.on("death", () => {
            console.log('Health after click', bossHealth);
            destroy(player);
            shake(4);
            wait(2, () => {
                // Pour éviter d'avoir des sprites qui se superposent sur la scène suivante ils sont détruits manuellement 
                player.move("left", 5000)
                clearInterval(platformTimeout);
                clearInterval(bulletBossInterval);
                clearInterval(bulletRoofInterval);
                go("Lose");
            });
        })

    });

    scene("level2", () => {
        bossSpeed = 48;
        bossHealth = 400;
        bossDmg = 10;
        bossAttackSpeed = 400;


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

        // SETTING THE PLATFORMS
        let platformTimeout;
        function addPlatform(){
            add([
                sprite("platform_chateau"),
                area(),
                pos(rand(100, 900), height() - 150),
                body({ isStatic: true }),
                offscreen({ destroy: true }),
                anchor("center"),
                "platform",
                {
                    speed: 100,
                    dir: -1,
                },
            ])
        };
        onUpdate("platform", (p) => {
            p.move(0, p.dir * p.speed)
        })
        platformTimeout = setInterval(addPlatform, 5000);



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

        // SETTING THE ATTACKS AND THE HEALTHBARS

        function spawnBulletHeroes(p, mouseP, projectile) {
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

        function positionXBulletFromSky(){
            return Math.floor(Math.random() * 1001);
        }

        function spawnBulletBossRoof(p, mouseP, projectile) {
            const bulletBoss = add([
                sprite("rock"), 
                area(),
                rotate(90),
                pos(positionXBulletFromSky(),0),
                anchor("center"),
                outline(1),
                move(mouseP, bossAttackSpeed),
                offscreen({ destroy: true }),
                "bulletBoss",
            ]);
        }

        function spawnBulletBoss(p, mouseP, projectile) {
            const bulletBoss = add([
                sprite("rock"), 
                area(),
                rotate(180),
                pos(p.sub(-12, -12)),
                anchor("center"),
                outline(1),
                move(mouseP, bossAttackSpeed),
                offscreen({ destroy: true }),
                "bulletBoss",
            ]);
        }

        

        onClick(() => {
            const playerP = player.pos;
            const mouseP = mousePos();
        
            const angle = Math.atan2(mouseP.y - playerP.y, mouseP.x - playerP.x);
        
            const angleInDeg = (angle * 180) / Math.PI;
            spawnBulletHeroes(playerP, angleInDeg, spriteProj);
        });

        
        // Boss shooting system 

        // a ajouter au code
        
        
        let bulletBossInterval;
        let bulletRoofInterval;
        if(bossHealth > 0 ){
            bulletBossInterval = setInterval( () => {
                const bossP = boss.pos;
                const playerP = player.pos;

                const angle = Math.atan2(playerP.y - bossP.y, playerP.x - bossP.x);
                
                const angleInDeg = (angle * 180) / Math.PI;
                spawnBulletBoss(bossP, angleInDeg, spriteProj);
            }, 1000);
            bulletRoofInterval = setInterval( () => {
                for(let multipleSpawn = 0; multipleSpawn < 3; multipleSpawn++){
                    spawnBulletBossPosition = { x: positionXBulletFromSky(), y: 50};
                    spawnBulletBossRoof(spawnBulletBossPosition, 90, spriteProj);
                }
            }, 1500);
        } else {
            bulletBoss = add([
                cleanup()
            ])
        }
        

        // Add a healthbar and update it on projectile hit
        boss.onCollide("bullet", (b) => {
            destroy(b);
            shake(1);
            boss.hurt(dmgProj);
        });

        const healthbarBoss = add([
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
            healthbarBoss.set(boss.hp())
        })


        player.onCollide("bulletBoss", (b) => {
            destroy(b);
            shake(1);
            player.hurt(bossDmg);
        });

        const healthbarChar = add([
            rect(width() / 4, 20),
            pos(width() / 3, height() - 40),
            color(64, 236, 45),
            fixed(),
            {
                max: healthChar,
                set(hp) {
                    this.width = (width() / 4) * hp / this.max                    
                    this.flash = true
                },
            },
        ])

        player.on("hurt", () => {
            healthbarChar.set(player.hp())
        })


        boss.on("death", () => {
            console.log('Health after click', bossHealth);
            destroy(boss);
            shake(4);
            wait(2, () => {
                player.move("left", 5000)
                clearInterval(platformTimeout);
                clearInterval(bulletBossInterval);
                clearInterval(bulletRoofInterval);
                go("Win2");
            });
        })

        player.on("death", () => {
            console.log('Health after click', bossHealth);
            destroy(player);
            shake(4);
            wait(2, () => {
                // Pour éviter d'avoir des sprites qui se superposent sur la scène suivante ils sont détruits manuellement 
                player.move("left", 5000)
                clearInterval(platformTimeout);
                clearInterval(bulletBossInterval);
                clearInterval(bulletRoofInterval);
                go("Lose2");
            });
        })
    });






    scene("level3", () => {

        bossSpeed = 48;
        bossHealth = 600;
        bossDmg = 20;
        bossAttackSpeed = 300;


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

        add([
            sprite("sol_sucre2"),
            pos(0, height() - 118),
            outline(4),
            area(),
            body({ isStatic: true}),
            color(127, 200, 255),
            z(1000)
        ]);

        let platformTimeout;
        function addPlatform(){
            add([
                sprite("platform_sucre"),
                area(),
                pos(rand(100, 900), height() - 150),
                body({ isStatic: true }),
                offscreen({ destroy: true }),
                anchor("center"),
                "platform",
                {
                    speed: 100,
                    dir: -1,
                },
            ])
        };
        onUpdate("platform", (p) => {
            p.move(0, p.dir * p.speed)
        })
        platformTimeout = setInterval(addPlatform, 5000);


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

        // SETTING THE ATTACKS AND THE HEALTHBARS

        function spawnBulletHeroes(p, mouseP, projectile) {
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

        function positionXBulletFromSky(){
            return Math.floor(Math.random() * 1001);
        }

        function spawnBulletBossRoof(p, mouseP, projectile) {
            const bulletBoss = add([
                sprite("snowball"), 
                area(),
                rotate(90),
                pos(positionXBulletFromSky(),0),
                anchor("center"),
                outline(1),
                move(mouseP, bossAttackSpeed),
                offscreen({ destroy: true }),
                "bulletBoss",
            ]);
        }

        function spawnBulletBoss(p, mouseP, projectile) {
            const bulletBoss = add([
                sprite("snowball"), 
                area(),
                rotate(180),
                pos(p.sub(-12, -12)),
                anchor("center"),
                outline(1),
                move(mouseP, bossAttackSpeed),
                offscreen({ destroy: true }),
                "bulletBoss",
            ]);
        }

        

        onClick(() => {
            const playerP = player.pos;
            const mouseP = mousePos();
        
            const angle = Math.atan2(mouseP.y - playerP.y, mouseP.x - playerP.x);
        
            const angleInDeg = (angle * 180) / Math.PI;
            spawnBulletHeroes(playerP, angleInDeg, spriteProj);
        });

        
        // Boss shooting system 
                
        let bulletBossInterval;
        let bulletRoofInterval;
        if(bossHealth > 0 ){
            bulletBossInterval = setInterval( () => {
                const bossP = boss.pos;
                const playerP = player.pos;

                const angle = Math.atan2(playerP.y - bossP.y, playerP.x - bossP.x);
                
                const angleInDeg = (angle * 180) / Math.PI;
                spawnBulletBoss(bossP, angleInDeg, spriteProj);
            }, 1000);
            bulletRoofInterval = setInterval( () => {
                for(let multipleSpawn = 0; multipleSpawn < 3; multipleSpawn++){
                    spawnBulletBossPosition = { x: positionXBulletFromSky(), y: 50};
                    spawnBulletBossRoof(spawnBulletBossPosition, 90, spriteProj);
                }
            }, 1500);
        } else {
            bulletBoss = add([
                cleanup()
            ])
        }
        

        // Add a healthbar and update it on projectile hit
        boss.onCollide("bullet", (b) => {
            destroy(b);
            shake(1);
            boss.hurt(dmgProj);
        });

        const healthbarBoss = add([
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
            healthbarBoss.set(boss.hp())
        })


        player.onCollide("bulletBoss", (b) => {
            destroy(b);
            shake(1);
            player.hurt(bossDmg);
        });

        const healthbarChar = add([
            rect(width() / 4, 20),
            pos(width() / 3, height() - 40),
            color(64, 236, 45),
            fixed(),
            {
                max: healthChar,
                set(hp) {
                    this.width = (width() / 4) * hp / this.max                    
                    this.flash = true
                },
            },
        ])

        player.on("hurt", () => {
            healthbarChar.set(player.hp())
        })

        boss.on("death", () => {
            console.log('Health after click', bossHealth);
            destroy(boss);
            shake(4);
            wait(2, () => {
                player.move("left", 5000)
                clearInterval(platformTimeout);
                clearInterval(bulletBossInterval);
                clearInterval(bulletRoofInterval);
                go("Win3");
            });
        })

        player.on("death", () => {
            console.log('Health after click', bossHealth);
            destroy(player);
            shake(4);
            wait(2, () => {
                // Pour éviter d'avoir des sprites qui se superposent sur la scène suivante ils sont détruits manuellement 
                player.move("left", 5000)
                clearInterval(platformTimeout);
                clearInterval(bulletBossInterval);
                clearInterval(bulletRoofInterval);
                go("Lose3");
            });
        })
    });

    // Start the game scene
    go("level3");
});