class scene2 extends Phaser.Scene {
    constructor() {
      super('juego');
    }
    
    preload() {
        let url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
        this.load.plugin('rexvirtualjoystickplugin', url, true);
    }
    

    create ()
    {
        game.scene.pause("nivel2")
        musicamen.stop();
       
      //  fondo
      background=this.add.image(0, 0, 'sky').setScale(0.2,0.25);
      background.setOrigin(0,0);
      background.setScrollFactor(1);


       //grupo de plataformas
        platforms = this.physics.add.staticGroup();
        piso=this.physics.add.staticGroup();

       
        piso.create(640, 700, 'piso').refreshBody();

        //  plataformas
        platforms.create(600, 450, "plataforma1");
        platforms.create(200, 530, "plataforma1");
        platforms.create(400, 530, 'plataforma1.1');
        platforms.create(750, 400, 'plataforma1');
        platforms.create(950, 430, 'plataforma1.1');
        platforms.create(1200, 425, 'plataforma1');
        platforms.create(1290, 460, 'plataforma1.1');
        platforms.create(1425, 530, "plataforma1");
        platforms.create(1090, 260, 'plataforma1.1');
        platforms.create(980, 260, 'plataforma1');
        platforms.create(1120, 200, 'plataforma1.1');
        platforms.create(1290, 260, 'plataforma1');
        platforms.create(900, 360, 'plataforma1.1');
        platforms.create(1300, 150, 'plataforma1');
        platforms.create(600, 190, 'plataforma1');
        platforms.create(800, 160, 'plataforma1');
        platforms.create(1450,400, 'plataforma1.1');
        platforms.create(1550,300, 'plataforma1');
        platforms.create(1600,150, 'plataforma1');
        platforms.create(1700,300, 'plataforma1.1');
        platforms.create(1750,250, 'plataforma1.1');
        platforms.create(1650,450, 'plataforma1');
        platforms.create(1882,225, 'plataforma1');
        platforms.create(1850,400, 'plataforma1.1');
        platforms.create(2025,450, 'plataforma1');
        platforms.create(2050,225, 'plataforma1');
        platforms.create(2200,530, 'plataforma1');
        platforms.create(2285,275, 'plataforma1.1');
        platforms.create(2170,370, 'plataforma1.1');
        platforms.create(2330,415, 'plataforma1');

        //Musica y fx

        this.musicaysfx();

       //medallas


       medallas= this.physics.add.group({
            key: "medallas",
            repeat: Phaser.Math.Between(1,8), 
            setXY: { x: 400, y: 6, stepX:Phaser.Math.Between(300,2400)}

       })
       medallas.children.iterate(function (child) {
            var x= Phaser.Math.Between(0,800)
            var y= Phaser.Math.Between(0,600)
      
       
            child.setCollideWorldBounds(true)
            child.setBounce(0.1)
            child.allowGravity= true;
        
        
            child.setScale(0.1,0.1)

        });

        //informacion
        
        informacion=this.physics.add.group({
            
            key:"info",
            repeat: v-1,
            setXY:{ x:200, y:6, stepX:Phaser.Math.Between(220,250)}
          
        })
        informacion.children.iterate(function (child) {
        

            child.setCollideWorldBounds(true)
            child.setBounce(0.1)
            child.allowGravity= true;
        
        
            child.setScale(0.1,0.1)

        });
        //vidas
        vidas=this.physics.add.group({
            
            key:"vida",
            repeat:1,
            setXY:{ x:500, y:6, stepX:Phaser.Math.Between(300,2400)}
            
        })
        vidas.children.iterate(function (child) {
        
            child.setCollideWorldBounds(true)
            child.setBounce(0.1)
            child.allowGravity= true;
        
            child.setScale(0.4,0.4)
            
        });
        
        
     
       

        // config personaje
        player = this.physics.add.sprite(100, 450, 'pj').setScale(1.7,1.7);

        //  fisicas del player
        player.setBounce(0.2);
        player.setCollideWorldBounds(false);

        //enemigos
        enemigos = this.physics.add.group({
            key: 'enemigo',
            repeat: 9,
            setXY: { x: 500, y: 0, stepX:Phaser.Math.Between(220,250)}
          });
  
          enemigos.children.iterate(function (child) {
            child.setBounce(0.2);
            child.setCollideWorldBounds(false);
            child.allowGravity = true;
            child.setScale(1.7,1.7);
        });
        
        

            


    
        //  eventos
        if (cursors =! undefined){
            cursors = this.input.keyboard.createCursorKeys();
            spaceBar= this.input.keyboard.addKey("Space");
            this.joystick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
                x: 350,
                y: 675,
                radius: 100,
                base: this.add.circle(0, 0, 35, 0x888888),
                thumb: this.add.circle(0, 0, 15, 0xcccccc),
                // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
                // forceMin: 16,
                // enable: true
            })
            .on('update', this.dumpJoyStickState, this);
        }
        this.text = this.add.text(0, 0);
        this.dumpJoyStickState();
       

        button= this.add.sprite(1000, 680, 'botondisparo');
            button.setInteractive();
            button.setScale(0.2);
            button.setScrollFactor(0);
            button.on('pointerdown', function (event) {
                disparando = true;
             });
    
        button2= this.add.sprite(800, 680, 'botondisparo2');
            button2.setInteractive();
            button2.setScale(0.26);
            button2.setScrollFactor(0);
            button2.on('pointerdown', function (event) {
                disparando2 = true;
            });
        
        // cámara
        this.cameras.main.setBounds(12,0,2520,background.displayHeight);
        this.cameras.main.startFollow(player);

        // walls
        WorldWalls= this.physics.add.staticGroup();
        WorldWalls.create(-18,490,"wall");
        WorldWalls.create(-18,460,"wall");
        WorldWalls.create(-18,430,"wall");
        WorldWalls.create(-18,400,"wall");
        WorldWalls.create(2560,490,"wall");
        WorldWalls.create(2560,460,"wall");
        WorldWalls.create(2560,430,"wall");
        WorldWalls.create(2560,400,"wall");
   
   
  
        //colisiones con muros
        this.physics.add.collider(player,WorldWalls);
        this.physics.add.collider(enemigos,WorldWalls);
      
    
        //agarrar medallas,informacion y vidas
        this.physics.add.overlap(player, medallas, this.juntarmedallas, null, this);
        this.physics.add.overlap(player, informacion, this.juntarinfo, null, this);
        this.physics.add.overlap(player, vidas, this.juntarvida, null, this);
     
        tiempoini= 30; 
        vidavalor= 3;
        //textos
        infotext=this.add.text(600, 5, 'Información: 0'+ "/" + v, { fontFamily: 'MinimalFont5x7',fontSize: '30px', fill: '#EBED24' });
        infotext.scrollFactorX = 0;
        scoreText = this.add.text(300, 5, 'Puntaje: 0', { fontFamily: 'MinimalFont5x7',fontSize: '30px', fill: '#EBED24' });
        scoreText.scrollFactorX = 0;
        vidastext= this.add.text(900, 5, 'Vidas: ' + vidavalor + "/3", { fontFamily: 'MinimalFont5x7',fontSize: '30px', fill: '#EBED24' });
        vidastext.scrollFactorX = 0;
       
        //balas derecha player
        Bala = new Phaser.Class({

            Extends: Phaser.Physics.Arcade.Sprite,
            initialize:
      
            function Bala (scene)
            {
      
              Phaser.Physics.Arcade.Sprite.call(this, scene, 0, 0, 'disparo');
              scene.add.existing(this);
              scene.physics.add.existing(this);
      
            },
      
            disparo: function (x, y)
            {
      
              this.setPosition(x + 50, y);
              this.setVelocityX(player.body.velocity.x + 800);
              this.setVelocityY(player.body.velocity.y - 25)
              this.setActive(true);
              this.setVisible(true);
              this.setCollideWorldBounds(false);
      
            },
      
          });
      
          //conjunto de balas
          balas = this.add.group({
      
            classType: Bala,
            runChildUpdate: true
      
          });

        //creación balas izquierda player
        Bala2 = new Phaser.Class({

            Extends: Phaser.Physics.Arcade.Sprite,
            initialize:
      
            function Bala2 (scene)
            {
      
              Phaser.Physics.Arcade.Sprite.call(this, scene, 0, 0, 'disparo2');
              scene.add.existing(this);
              scene.physics.add.existing(this);
      
            },
      
            disparo: function (x, y)
            {
              this.setPosition(x - 50, y);
              this.setVelocityX(player.body.velocity.x - 800);
              this.setVelocityY(player.body.velocity.y - 25)
              this.setActive(true);
              this.setVisible(true);
              this.setCollideWorldBounds(false);
      
            },
      
          });
      
          //conjunto de balas
          balas2 = this.add.group({
      
            classType: Bala2,
            runChildUpdate: true
      
        });

        //creacion balas enemigo
        Bala3 = new Phaser.Class({

            Extends: Phaser.Physics.Arcade.Sprite,
            initialize:
      
            function Bala3 (scene)
            {
      
              Phaser.Physics.Arcade.Sprite.call(this, scene, 0, 0, 'disparoenemy');
              scene.add.existing(this);
              scene.physics.add.existing(this);
      
            },
      
            disparo: function (x, y)
            {
              this.setPosition(x - 35, y);
              this.setVelocityX(player.body.velocity.x - 500);
              this.setVelocityY(player.body.velocity.y - 25)
              this.setActive(true);
              this.setVisible(true);
              this.setCollideWorldBounds(false);
      
            },
      
        });
      
        //conjunto de balas
        balas3 = this.add.group({
      
            classType: Bala3,
            runChildUpdate: true
      
        });
    
        //colisiones
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(enemigos,platforms);
        this.physics.add.collider(medallas,platforms);
        this.physics.add.collider(vidas,platforms);
    
        this.physics.add.collider(informacion,platforms);
       
    
     
        this.physics.add.collider(player, piso);
        this.physics.add.collider(enemigos,piso);
        this.physics.add.collider(medallas,piso);
        this.physics.add.collider(vidas,piso);
       
        this.physics.add.collider(informacion,piso);

        //bala desaparece al tocar plataformas o piso
        this.physics.add.collider(balas, platforms, this.destruirBala, null, this);
        this.physics.add.collider(balas2, platforms, this.destruirBala2, null, this);
        this.physics.add.collider(balas, piso, this.destruirbalapiso, null, this);
        this.physics.add.collider(balas2, piso, this.destruirbala2piso, null, this);
        this.physics.add.collider(balas3, platforms, this.destruirBala3, null, this);
        this.physics.add.collider(balas3, piso, this.destruirbala3piso, null, this);
       
        //bala mara pj
        this.physics.add.collider(player,balas3,this.hitbala,null,this);
        //enemigo muere
        this.physics.add.collider(enemigos, balas, this.matarenemigo, null, this);
        this.physics.add.collider(enemigos, balas2, this.matarenemigo, null, this);
     

       
        score= 0;
        infovalor=0;
        gameOver=false;
        gameWin=false
        this.respawn1=0;
        

       tiempoText = this.add.text(100, 5, 'Tiempo: '+tiempoini, {  fontFamily: 'MinimalFont5x7',fontSize: '30px', fill: '#EBED24' });
       tiempoEvent = this.time.addEvent({ delay: 1000, callback: this.onSecond, callbackScope: this, loop: true });

 }

 update (time, delta)
 {
    var leftKeyDown = this.joystick.left;
    var rightKeyDown = this.joystick.right;
    var upKeyDown = this.joystick.up;
    var downKeyDown = this.joystick.down;
    var noKeyDown = this.joystick.noKey;

     if (cursors.left.isDown || leftKeyDown)
     {
         player.setVelocityX(-160);

         player.anims.play('left', true);
     }
     else if (cursors.right.isDown || rightKeyDown)
     {
         player.setVelocityX(160);

         player.anims.play('right', true);
     }
     else
     {
         player.setVelocityX(0);

         player.anims.play('turn');
     }

     if ((cursors.up.isDown || upKeyDown) && player.body.touching.down){
         player.setVelocityY(-330);
     }

     if (((cursors.right.isDown || cursors.right.isUp) || rightKeyDown || noKeyDown) && (cursors.left.isUp || leftKeyDown))
        {
         if ((spaceBar.isDown || disparando == true) && time > lastFired)
         {
           sfxdisp.play();
           var bullet = balas.get();
     
           if (bullet)
            {
             bullet.disparo(player.x, player.y - 4);
             lastFired = time + 300;
             disparando = false;
            }
         }
        }
     
     if ((cursors.left.isDown || leftKeyDown) && (cursors.right.isUp || rightKeyDown))
        {
         if ((spaceBar.isDown || disparando2 == true) && time > lastFired2)
         {
           sfxdisp.play();
           var bullet2 = balas2.get();
     
           if (bullet2)
           {
             bullet2.disparo(player.x, player.y - 4);
             lastFired2 = time + 300;
             disparando2 = false;
           }
         
         }
        }

        //IA enemigos
        enemigos.children.iterate(function (child) {
            var dist = Phaser.Math.Distance.BetweenPoints(player, child)
            if (dist <= 200)
            {
            if (time > lastFired2)
                
                var bullet3 = balas3.get();
                if (bullet3)
                { 
                    bullet3.disparo(child.x, child.y - 10);
                    lastFired2 = time + 500;
                }
                
            }
        });

     

    if(infovalor==v) {
        this.gameWin()
    }

    if(vidavalor==0){
        this.gameOver()
    }


   
   
   


    
 }
 


    juntarmedallas (player, medallas) {
        sfxmed.play();
        medallas.disableBody(true, true);

        //  puntaje
        score += 5;
        scoreText.setText('Puntaje: ' + score);
        scoreText.scrollFactorX= 0;  
    
    }

    dumpJoyStickState() {
        var cursorKeys = this.joystick.createCursorKeys();
        var s = 'Key down: ';
        for (var name in cursorKeys) {
            if (cursorKeys[name].isDown) {
                s += name + ' ';
            }
        }
        s += '\n';
        s += ('Force: ' + Math.floor(this.joystick.force * 100) / 100 + '\n');
        s += ('Angle: ' + Math.floor(this.joystick.angle * 100) / 100 + '\n');
        //this.text.setText(s);
    }

    juntarinfo (player, informacion) {
        sfxinfo.play();
        informacion.disableBody(true, true);

        //  puntaje
        infovalor += 1;
        infotext.setText('Informacion: ' + infovalor + "/" + v);
        infotext.scrollFactorX= 0;  
    
    }
    juntarvida(player,vidas){
        sfxvida.play();
        vidas.disableBody(true,true);
         vidavalor+=1      
         vidastext.setText('Vidas: ' + vidavalor + "/3");
         vidastext.scrollFactorX= 0;
         player.setTint(0xffffff);

         this.vidamax();
    }   
   
   
    vidamax(){
        if(vidavalor > 3){
            vidavalor = 3;
            vidastext.setText('Vidas: ' + vidavalor + "/3");
        
        }
        
    }

  

  

    hitbala(player,bala3){
        sfxdaño.play();
        bala3.destroy();
        player.anims.play('balazo',true);
        vidavalor-=1
        vidastext.setText('Vidas: ' + vidavalor + "/3");
        vidastext.scrollFactorX= 0;
        player.setTint(0xff0000);
    }
    

   

    destruirBala(bala, platforms)
    {
        bala.destroy();
    }

    destruirBala2(bala2, platforms)
    {
        bala2.destroy();
    }

    destruirBala3(bala3, platforms)
    {
        bala3.destroy();
    }

    destruirbalapiso(bala, piso)
    {
        bala.destroy();
    }

    destruirbala2piso(bala2, piso)
    {
        bala2.destroy();
    }

    destruirbala3piso(bala3, piso)
    {
        bala3.destroy();
    }


    matarenemigo(bala,enemigos){
        sfxmuerten.play();
        enemigos.disableBody(true,true);
        enemigos.destroy();
        bala.destroy();
    }

    matarenemigo2(bala2,enemigos){
        sfxmuerten.play();
        enemigos.disableBody(true,true);
        enemigos.destroy();
        bala2.destroy();
    }

 

     onSecond() {
         if ( ! gameOver)
         {   
            if (tiempoini <= 0) {
                tiempoText.setText('Tiempo: 0 ');
                this.scene.pause()
                this.gameOver()
             } 
             else{   
             tiempoini = tiempoini -= 1; // One second
             tiempoText.setText('Tiempo: ' + tiempoini);
             tiempoText.scrollFactorX= 0;
             }     
         }

     }

    musicaysfx(){
        musica = this.sound.add("musican1", {volume: 0.5, loop: true});
        musica.play();
        sfxmed = this.sound.add("sonidomedalla", {volume: 0.3});
        sfxinfo = this.sound.add("sonidoinformacion", {volume: 0.3});
        sfxvida = this.sound.add("sonidovidanueva", {volume: 0.3});
        sfxdaño = this.sound.add("sonidodaño", {volume: 0.3});
        sfxdisp = this.sound.add("sonidodisparo", {volume: 0.3});
        sfxmuerten = this.sound.add("sonidomuerteenemigo", {volume: 0.5});
    }

    gameWin(){
        musica.stop();
        gameWin = true;
        this.physics.pause();
        this.scene.start("nivelsup")
    }




    gameOver() {        
        musica.stop();
        gameOver = true;
        this.physics.pause();
      //  game.scene.stop("juego")
        
        this.scene.start('nivelperd')
      
    }
}
