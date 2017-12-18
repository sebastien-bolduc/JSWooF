/**
 * This is a test game.
 *
 * @module Game1
 * @author Sébastien Bolduc
 * @version 0.0
 */

import EntityCollider from "/JSWooF/Example/example_1/engine/entityCollider.js";
import Game from "/JSWooF/Framework/GameFolder/game.js";
import GraphicsDeviceManager from "/JSWooF/Framework/GameFolder/graphicsDeviceManager.js";
import GoombaSprite from "/JSWooF/Example/example_1/sprites/enemies/goomba/goombaSprite.js";
import Keyboard from "/JSWooF/Framework/Input/keyboard.js";
import KoopaSprite from "/JSWooF/Example/example_1/sprites/enemies/koopa/koopaSprite.js";
import Level from "/JSWooF/Example/example_1/engine/level.js";
import MarioSprite from "/JSWooF/Example/example_1/sprites/mario/marioSprite.js";
import Menu from "/JSWooF/Example/global/menu.js";
import Mouse from "/JSWooF/Framework/Input/mouse.js";
import SpriteBatch from "/JSWooF/Framework/GameFolder/Graphics/spriteBatch.js";
import Viewport from "/JSWooF/Framework/GameFolder/Graphics/viewport.js";

/**
 * Namespace for the game.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF
 */
var JSWooF = JSWooF || {};

/**
 * We intitialize our game.
 * @class
 * @classdesc This is the point of entry of the game.
 * @extends Game
 */
export default JSWooF.App1 = class extends Game {
    /**
     * We intitialize our game.
     * @constructs Game1
     */
    constructor() {
        super();                        // Call the parent class constructor
        
        this.menu = new Menu();         // Main menu for every application or game
    
        this.graphics = new GraphicsDeviceManager(this);
        this.graphics.presentationParameters.DeviceWindowHandle = "screen";
        this.graphics.GraphicsDevice.reset(this.graphics.presentationParameters);
    }
    
    /**
     * Called after the Game and GraphicsDevice are created, but before 
     * LoadContent.
     * @function initialize
     */
    initialize() {
        super.initialize();
        
        this.keyboardInput = new Keyboard();                                // Inputs
        this.previousKeyboardState = new Map();
        this.previousKeyboardState.set("Space", false);
        this.mouseInput = new Mouse("screen", 0, 0);
        
        this.GraphicsDevice.Viewport = new Viewport(-16, -16, 388, 324);    // Set the camera (viewport)
        this.GraphicsDevice.Viewport.TileSafeArea.X = 100;
        this.GraphicsDevice.Viewport.TileSafeArea.Y = 100;
        
        this.level = undefined;                                             // Level
        
        this.mario = undefined;                                             // Mario
        
        this.goombas = [];                                                  // Enemies
        this.koopas = [];
        
        this.sprites = [];                                                  // All game sprites
        
        this.entityCollider = undefined;                                    // For checking entities collision
        
        this.gravity = 1500;                                                // Game gravity
    }
    
    /**
     * Called when graphics resources need to be loaded.
     * @function loadContent
     */
    loadContent() {
        super.loadContent();
        
        // Create a new SpriteBatch, which can be used to draw textures.
        this.spriteBatch = new SpriteBatch(this.GraphicsDevice);
        
        // Loading our levels...
        this.level = new Level(this.Content, "/example_1/jsonFile/1-1.json");
        
        // Loading our sprites...
        this.mario = new MarioSprite(this.Content);                                     // Mario
        this.mario.pos.X = 100;
        this.mario.pos.Y = -174;
        this.mario.vel.X = 0;
        this.mario.vel.Y = 0;
        
        this.goombas.push(new GoombaSprite(this.Content));                              // Goomba
        this.goombas.push(new GoombaSprite(this.Content));
        this.goombas[1].pos.X = 160;
        this.goombas[1].pos.Y = 320;
        this.goombas.push(new GoombaSprite(this.Content));
        this.goombas[2].pos.X = 180;
        this.goombas[2].pos.Y = 320;
        this.goombas.push(new GoombaSprite(this.Content));
        this.goombas[3].pos.X = 200;
        this.goombas[3].pos.Y = 320;
        this.goombas.push(new GoombaSprite(this.Content));
        this.goombas[4].pos.X = 140;
        this.goombas[4].pos.Y = 320;
        this.goombas.push(new GoombaSprite(this.Content));
        this.goombas[5].pos.X = 192;
        this.goombas[5].pos.Y = 0;
        
        this.koopas.push(new KoopaSprite(this.Content));                                // Koopa
        this.koopas.push(new KoopaSprite(this.Content));
        this.koopas[1].pos.X = 600;
        this.koopas[1].pos.Y = 0;
        this.koopas.push(new KoopaSprite(this.Content));
        this.koopas[2].pos.X = 600;
        this.koopas[2].pos.Y = 320;
        
        this.sriptes = this.sprites.push(this.mario);                                   // All game sprites               
        this.sprites = this.sprites.concat(this.goombas);
        this.sprites = this.sprites.concat(this.koopas);
        this.entityCollider = new EntityCollider(this.sprites);                         // For checking entities collision
        
        // Debugging layer...
        // --------------------------- Collision layer (debugging) -------------
        Promise.all([this.level.isLoaded]).then(values => {
            this.cl_resolvedTiles = [];
            this.cl_tileResolver = this.level.tileCollider.tiles;
            this.cl_tileSize = this.cl_tileResolver.tileSize;
            this.cl_getByIndexOriginal = this.cl_tileResolver.getByIndex;
            
            const that = this;
            this.cl_tileResolver.getByIndex = function getByIndexFake(x, y) {
                that.cl_resolvedTiles.push({x, y});
                return that.cl_getByIndexOriginal.call(that.cl_tileResolver, x, y);     // Using 'call' for the 'this' reference
            };
        });
        // ---------------------------------------------------------------------
    }
    
    /**
     * Called when the game has determined that game logic needs to be processed.
     * @function update
     * @param {GameTime} gameTime - Time passed since the last call to update.
     */
    update(gameTime) {
        var updateTime = document.getElementById('updateTime');
        if (typeof updateTime != "undefined") {
            updateTime.innerHTML = "update time (in ms): " + gameTime.ElapsedGameTime.totalMilliseconds;
        }
        
        var keyboardState = this.keyboardInput.GetState;                    // This part handle the keyboard inputs...
        if (keyboardState.isKeyDown(keyboardState.Keys.SPACE) && !this.previousKeyboardState.get(keyboardState.Keys.SPACE)) {
            this.mario.jump.start();
            this.previousKeyboardState.set("Space", true);
        } else if (keyboardState.isKeyUp(keyboardState.Keys.SPACE) && this.previousKeyboardState.get(keyboardState.Keys.SPACE)) {
            this.mario.jump.cancel();
            this.previousKeyboardState.set("Space", false);
        }
        
        if (keyboardState.isKeyDown(keyboardState.Keys.D)) {                // Walking
            this.mario.run.direction = 1;
            this.mario.isFacing = 1;
        } else if (keyboardState.isKeyDown(keyboardState.Keys.A)) {
            this.mario.run.direction = -1;
            this.mario.isFacing = -1;
        } else {
            this.mario.run.direction = 0;
        }
        
        if (keyboardState.isKeyDown(keyboardState.Keys.SHIFTLEFT)) {        // Running
            this.mario.run.dragFactor = 1/5000;
        } else {
            this.mario.run.dragFactor = 1/1000;
        }
        
        if (keyboardState.isKeyDown(keyboardState.Keys.ARROWLEFT)) {        // Scrolling the camera (viewport)
            this.GraphicsDevice.Viewport.X -= 100 * this.TargetElapsedTime;
        } else if (keyboardState.isKeyDown(keyboardState.Keys.ARROWRIGHT)) {
            this.GraphicsDevice.Viewport.X += 100 * this.TargetElapsedTime;
        } else if (keyboardState.isKeyDown(keyboardState.Keys.ARROWUP)) {
            this.GraphicsDevice.Viewport.Y -= 100 * this.TargetElapsedTime;
        } else if (keyboardState.isKeyDown(keyboardState.Keys.ARROWDOWN)) {
            this.GraphicsDevice.Viewport.Y += 100 * this.TargetElapsedTime;
        } else {                                                            // Scrolling the camera with Mario
            this.GraphicsDevice.Viewport.X = this.mario.pos.X - ((this.GraphicsDevice.Viewport.Width / 2) - (this.mario.size.X / 2));
            this.GraphicsDevice.Viewport.Y = this.mario.pos.Y - ((this.GraphicsDevice.Viewport.Height / 2) - (this.mario.size.Y / 2));
        }
        
        var mouseState = this.mouseInput.GetState;                          // This part handle the mouse inputs...
        if (mouseState.LeftButton) {
            this.mario.pos.X = mouseState.X + this.GraphicsDevice.Viewport.X - this.GraphicsDevice.Viewport.TileSafeArea.X;
            this.mario.pos.Y = mouseState.Y + this.GraphicsDevice.Viewport.Y - this.GraphicsDevice.Viewport.TileSafeArea.Y;
            this.mario.vel.X = 0;
            this.mario.vel.Y = 0;
        }
        
        if (this.level.isReady) {                                           // When the level is ready...
        
            this.sprites.forEach(function(sprite) {                         
                sprite.update(this.TargetElapsedTime);                      // Moving sprites
                sprite.vel.Y += this.gravity * this.TargetElapsedTime;
                
                if (sprite.stomper != undefined) {
                    
                    if (sprite.pos.Y > 640) {                               // Reset Mario
                        sprite.pos.X = 100;                                     
                        sprite.pos.Y = -174;
                        sprite.vel.X = 0;
                        sprite.vel.Y = 0;
                        sprite.status.revive();
                    }
                    if (sprite.status.isAlive) {
                        let collidingSides;                                 // Test Mario for collision
                        collidingSides = this.level.tileCollider.testByStep(sprite, ["ground", "chance", "pipe"], 
                            (this.level.tileCollider.tiles.tileSize - 1));
                        sprite.isFloating = !collidingSides.bottom;
                        if (collidingSides.top) {
                            sprite.jump.cancel();
                        }
                    }
                    
                } else {
                    
                    if (!sprite.status.isKnockout) {
                        let collidingSides;                                 // Testing enemies for collision
                        collidingSides = this.level.tileCollider.testByStep(sprite, ["ground", "chance", "pipe"], 
                            (this.level.tileCollider.tiles.tileSize - 1));
                        if (collidingSides.right)
                        {
                            sprite.walk.direction = -sprite.walk.direction;
                        } else if (collidingSides.left) {
                            sprite.walk.direction = -sprite.walk.direction;
                        }
                    }
                    
                }
            
                this.entityCollider.check(sprite);                          // For checking entities collision                     
            }, this);
            
        } else {
            this.mario.pos.X = 100;                                         // Reset mario
            this.mario.pos.Y = -174;
            this.mario.vel.X = 0;
            this.mario.vel.Y = 0;
        }
        
        // --------------------------Clean arrays ------------------------------
        this.sprites = this.sprites.filter(sprite => sprite.status.Remove === false);
        // ---------------------------------------------------------------------
        
        super.update(gameTime);
    }
    
    /**
     * Called when the game determines it is time to draw a frame.
     * @function draw
     * @param {GameTime} gameTime - Time passed since the last call to draw.
     */
    draw(gameTime) {
        var drawTime = document.getElementById('drawTime');
        if (typeof drawTime != "undefined") {
            drawTime.innerHTML = "draw time (in ms): " + gameTime.ElapsedGameTime.totalMilliseconds;
        }
        
        this.graphics.GraphicsDevice.clear();
        this.spriteBatch.begin();
        
        if (this.level.isReady) {
            this.level.background.draw(this.spriteBatch, this.level.getData(), this.level.getData().background);    // Drawing background
    
            this.sprites.forEach(function(sprite) {                                                                 // Drawing sprites
                sprite.draw(this.spriteBatch);
            }, this);
        }

        this.spriteBatch.end();
        
        // --------------------------- Collision layer (debugging) -------------
        if (this.cl_resolvedTiles != undefined) {
            this.cl_resolvedTiles.forEach(function({x, y}) {        // tile
                // ************************* Camera ****************************
                var tileXpos = x * this.cl_tileSize;
                var tileYpos = y * this.cl_tileSize;
                const cameraXposTile = Math.floor(this.GraphicsDevice.Viewport.X);
                const cameraYposTile = Math.floor(this.GraphicsDevice.Viewport.Y);
                if (tileXpos >= cameraXposTile && tileXpos <= (cameraXposTile + this.GraphicsDevice.Viewport.Width)) {
                    if (tileYpos >= cameraYposTile && tileYpos <= (cameraYposTile + this.GraphicsDevice.Viewport.Height)) {
                        tileXpos += this.GraphicsDevice.Viewport.TileSafeArea.X - cameraXposTile;
                        tileYpos += this.GraphicsDevice.Viewport.TileSafeArea.Y - cameraYposTile;
                        this.GraphicsDevice.Context.beginPath();
                        this.GraphicsDevice.Context.strokeStyle = "blue";
                        this.GraphicsDevice.Context.rect(tileXpos, tileYpos, this.cl_tileSize, this.cl_tileSize);
                        this.GraphicsDevice.Context.stroke();
                    }
                }
                // *************************************************************
            }, this);
            
            // *************************** Camera ******************************
            this.sprites.forEach(function(sprite, index, array) {
                var spriteXpos = sprite.pos.X;                      // Sprites
                var spriteYpos = sprite.pos.Y;
                const cameraXposSprite = Math.floor(this.GraphicsDevice.Viewport.X);
                const cameraYposSprite = Math.floor(this.GraphicsDevice.Viewport.Y);
                if (spriteXpos >= cameraXposSprite && spriteXpos <= (cameraXposSprite + this.GraphicsDevice.Viewport.Width)) {
                    if (spriteYpos >= cameraYposSprite && spriteYpos <= (cameraYposSprite + this.GraphicsDevice.Viewport.Height)) {
                        spriteXpos += this.GraphicsDevice.Viewport.TileSafeArea.X - cameraXposSprite;
                        spriteYpos += this.GraphicsDevice.Viewport.TileSafeArea.Y - cameraYposSprite;
                        this.GraphicsDevice.Context.beginPath();
                        this.GraphicsDevice.Context.strokeStyle = "red";
                        this.GraphicsDevice.Context.rect(spriteXpos, spriteYpos, sprite.size.X, sprite.size.Y);
                        this.GraphicsDevice.Context.stroke();
                    }
                }   
            }, this);
            // *****************************************************************
            
            this.GraphicsDevice.Context.beginPath();                // Camera view
            this.GraphicsDevice.Context.strokeStyle = "purple";
            this.GraphicsDevice.Context.rect(this.GraphicsDevice.Viewport.TileSafeArea.X + this.cl_tileSize,
                this.GraphicsDevice.Viewport.TileSafeArea.Y + this.cl_tileSize,
                this.GraphicsDevice.Viewport.Width - this.cl_tileSize, 
                this.GraphicsDevice.Viewport.Height - this.cl_tileSize);
            this.GraphicsDevice.Context.stroke();
            
            this.cl_resolvedTiles.length = 0;
        }
        // ---------------------------------------------------------------------
        
        super.draw(gameTime);
    }
    
    /**
     * Call this method to initialize the game and start processing events.
     * @function run
     */
    run() {
        var div = document.getElementById("mainContent");           // Set the brief description text
        var tmpParagraph = document.createElement("p");
        var tmpTextNode = document.createTextNode("Welcome to JSWooF! (JavaScript Web object-oriented Framework).  " +
            "This is example 1 (mario game) !!!" );
        tmpParagraph.appendChild(tmpTextNode);
        div.appendChild(tmpParagraph);
        
        div = document.getElementById("mainContent");               // Show time elapsed for update (ms)
        tmpParagraph = document.createElement("p");
        tmpParagraph.id = "updateTime";
        div.appendChild(tmpParagraph);
        
        div = document.getElementById("mainContent");               // Show time elapsed for draw (ms)
        tmpParagraph = document.createElement("p");
        tmpParagraph.id = "drawTime";
        div.appendChild(tmpParagraph);
        
        super.run();                                                // Call the parent class function
    }
};