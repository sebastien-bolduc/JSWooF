/**
 * This is a test game.
 *
 * @module Game1
 * @author Sébastien Bolduc
 * @version 0.0
 */

import Background from "/JSWooF/Example/example_1/engine/background.js";
import Game from "/JSWooF/Framework/GameFolder/game.js";
import GraphicsDeviceManager from "/JSWooF/Framework/GameFolder/graphicsDeviceManager.js";
import Keyboard from "/JSWooF/Framework/Input/keyboard.js";
import MarioSprite from "/JSWooF/Example/example_1/sprites/mario/sprite.js";
import Matrix from "/JSWooF/Framework/GameFolder/matrix.js";
import Menu from "/JSWooF/Example/global/menu.js";
import Mouse from "/JSWooF/Framework/Input/mouse.js";
import SpriteBatch from "/JSWooF/Framework/GameFolder/Graphics/spriteBatch.js";
import TileCollider from "/JSWooF/Example/example_1/engine/tileCollider.js";
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
        
        this.marioSprite = new MarioSprite();                               // Mario sprite
        this.marioSprite.pos.X = 40;
        this.marioSprite.pos.Y = -174;
        this.marioSprite.vel.X = 0; // 200
        this.marioSprite.vel.Y = 0; // -600
        
        this.gravity = 1500;                                                // Game gravity
        
        this.tiles = new Matrix();
        
        this.background = new Background();                                 // Background layer
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
        this.level = this.Content.load['JSON'](this.Content.RootDirectory + "/example_1/jsonFile/1-1.json");
        this.level.isLoaded.then(data => {
            data.background.forEach(function(background) {
                background.ranges.forEach(([x1, x2, y1, y2]) => {
                    for (let x = x1; x < x2; x++) {
                        for (let y = y1; y < y2; y++) {
                            this.tiles.set(x, y, {
                                name: background.tile
                            });
                        }
                    }
                });
            }, this);
            this.tileCollider = new TileCollider(this.tiles);
            // --------------------------- Collision layer (debugging) ---------
            this.cl_resolvedTiles = [];
            this.cl_tileResolver = this.tileCollider.tiles;
            this.cl_tileSize = this.cl_tileResolver.tileSize;
            this.cl_getByIndexOriginal = this.cl_tileResolver.getByIndex;
            
            const that = this;
            this.cl_tileResolver.getByIndex = function getByIndexFake(x, y) {
                that.cl_resolvedTiles.push({x, y});
                return that.cl_getByIndexOriginal.call(that.cl_tileResolver, x, y);     // Using 'call' for the 'this' reference
            };
            // -----------------------------------------------------------------
            
            this.background.loadTileSheet(this.Content, data.tileSheet);                // Loading our tiles...
        });
        
        // Loading our sprites...
        var marioSpriteSheet = this.Content.load['Texture2D'](this.Content.RootDirectory + "/example_1/mario.png");
        this.marioSprite.setSpriteSheet(marioSpriteSheet);
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
            this.marioSprite.jump.start();
            this.previousKeyboardState.set("Space", true);
        } else if (keyboardState.isKeyUp(keyboardState.Keys.SPACE) && this.previousKeyboardState.get(keyboardState.Keys.SPACE)) {
            this.marioSprite.jump.cancel();
            this.previousKeyboardState.set("Space", false);
        }
        
        if (keyboardState.isKeyDown(keyboardState.Keys.D)) {                // Walking
            this.marioSprite.run.direction = 1;
            this.marioSprite.isFacing = 1;
        } else if (keyboardState.isKeyDown(keyboardState.Keys.A)) {
            this.marioSprite.run.direction = -1;
            this.marioSprite.isFacing = -1;
        } else {
            this.marioSprite.run.direction = 0;
        }
        
        if (keyboardState.isKeyDown(keyboardState.Keys.SHIFTLEFT)) {        // Running
            this.marioSprite.run.dragFactor = 1/5000;
        } else {
            this.marioSprite.run.dragFactor = 1/1000;
        }
        
        if (keyboardState.isKeyDown(keyboardState.Keys.ARROWLEFT)) {        // Scrolling the camera (viewport)
            this.GraphicsDevice.Viewport.X -= 100 * this.TargetElapsedTime;
        } else if (keyboardState.isKeyDown(keyboardState.Keys.ARROWRIGHT)) {
            this.GraphicsDevice.Viewport.X += 100 * this.TargetElapsedTime;
        } else if (keyboardState.isKeyDown(keyboardState.Keys.ARROWUP)) {
            this.GraphicsDevice.Viewport.Y -= 100 * this.TargetElapsedTime;
        } else if (keyboardState.isKeyDown(keyboardState.Keys.ARROWDOWN)) {
            this.GraphicsDevice.Viewport.Y += 100 * this.TargetElapsedTime;
        } else {
            this.GraphicsDevice.Viewport.X = this.marioSprite.pos.X - 186;  // Scrolling the camera with Mario
            this.GraphicsDevice.Viewport.Y = this.marioSprite.pos.Y - 154;
        }
        
        var mouseState = this.mouseInput.GetState;                          // This part handle the mouse inputs...
        if (mouseState.LeftButton) {
            this.marioSprite.pos.X = mouseState.X + this.GraphicsDevice.Viewport.X - this.GraphicsDevice.Viewport.TileSafeArea.X;
            this.marioSprite.pos.Y = mouseState.Y + this.GraphicsDevice.Viewport.Y - this.GraphicsDevice.Viewport.TileSafeArea.Y;
            this.marioSprite.vel.X = 0;
            this.marioSprite.vel.Y = 0;
        }
        
        if (this.marioSprite.pos.Y < 640) {                                 // Moving mario
            this.marioSprite.update(this.TargetElapsedTime);
            this.marioSprite.vel.Y += this.gravity * this.TargetElapsedTime;
        } else {
            this.marioSprite.pos.X = 40;                                    // Reset animation
            this.marioSprite.pos.Y = -174;
            this.marioSprite.vel.X = 0;
            this.marioSprite.vel.Y = 0;
        }
        
        if (this.tileCollider != undefined) {                               // test for collision
            let collidingSides;
            collidingSides = this.tileCollider.testByStep(this.marioSprite, ["ground", "chance"], 15);
            this.marioSprite.isFloating = !collidingSides.bottom;
            if (collidingSides.top) {
                this.marioSprite.jump.cancel();
            }
        }
        
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
        
        if (this.level.getData() != null) {
            this.level.getData().background.forEach(function(background) {
                this.background.draw(this.spriteBatch, background, background.tile);
            }, this);
        }
        
        this.marioSprite.draw(this.spriteBatch);

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
            var spriteXpos = this.marioSprite.pos.X;                // Mario
            var spriteYpos = this.marioSprite.pos.Y;
            const cameraXposSprite = Math.floor(this.GraphicsDevice.Viewport.X);
            const cameraYposSprite = Math.floor(this.GraphicsDevice.Viewport.Y);
            if (spriteXpos >= cameraXposSprite && spriteXpos <= (cameraXposSprite + this.GraphicsDevice.Viewport.Width)) {
                if (spriteYpos >= cameraYposSprite && spriteYpos <= (cameraYposSprite + this.GraphicsDevice.Viewport.Height)) {
                    spriteXpos += this.GraphicsDevice.Viewport.TileSafeArea.X - cameraXposSprite;
                    spriteYpos += this.GraphicsDevice.Viewport.TileSafeArea.Y - cameraYposSprite;
                    this.GraphicsDevice.Context.beginPath();
                    this.GraphicsDevice.Context.strokeStyle = "red";
                    this.GraphicsDevice.Context.rect(spriteXpos, spriteYpos, this.marioSprite.size.X, this.marioSprite.size.Y);
                    this.GraphicsDevice.Context.stroke();
                }
            }
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