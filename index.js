PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const app = new PIXI.Application({
  width: 480,
  height: 320
});

let tileSize = 32;
let propSize = 32;

const map = {
  width: 16,
  height: 10,
  tiles: [
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
    16, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18,
  ],
  props: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1, 2, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 33, 34, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]
}

let character = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  direction: 0,
  jumped: false,
  cycles: {
    runLeft: [5, 6, 7, 6],
    runRight: [1, 2, 3, 2]
  }
};

const walkFrames = {
  right: [
    "https://cdn.glitch.global/3a0cb6d2-a6e3-4204-8d76-011b42ffb867/walkRight1.png?v=1662567211797",
    "https://cdn.glitch.global/3a0cb6d2-a6e3-4204-8d76-011b42ffb867/walkRight2.png?v=1662567211797",
    "https://cdn.glitch.global/3a0cb6d2-a6e3-4204-8d76-011b42ffb867/walkRight3.png?v=1662567211797",
    "https://cdn.glitch.global/3a0cb6d2-a6e3-4204-8d76-011b42ffb867/walkRight4.png?v=1662567211797",
    "https://cdn.glitch.global/3a0cb6d2-a6e3-4204-8d76-011b42ffb867/walkRight5.png?v=1662567211797",
    "https://cdn.glitch.global/3a0cb6d2-a6e3-4204-8d76-011b42ffb867/walkRight6.png?v=1662567211797",
  ],
  left: [
    "https://cdn.glitch.global/3a0cb6d2-a6e3-4204-8d76-011b42ffb867/walkRight1.png?v=1662567211797",
    "https://cdn.glitch.global/3a0cb6d2-a6e3-4204-8d76-011b42ffb867/walkRight2.png?v=1662567211797",
    "https://cdn.glitch.global/3a0cb6d2-a6e3-4204-8d76-011b42ffb867/walkRight3.png?v=1662567211797",
    "https://cdn.glitch.global/3a0cb6d2-a6e3-4204-8d76-011b42ffb867/walkRight4.png?v=1662567211797",
    "https://cdn.glitch.global/3a0cb6d2-a6e3-4204-8d76-011b42ffb867/walkRight5.png?v=1662567211797",
    "https://cdn.glitch.global/3a0cb6d2-a6e3-4204-8d76-011b42ffb867/walkRight6.png?v=1662567211797",
    "https://cdn.glitch.global/3a0cb6d2-a6e3-4204-8d76-011b42ffb867/walkRight7.png?v=1662567211797"
  ]
};

let keys = {};

class Keyboard {
  constructor() {
    this.pressed = {};
  }

  watch(el) {
    el.addEventListener("keydown", e => {
      this.pressed[e.key] = true;
      keys[e.keyCode] = true
      console.log(e.key)
    });
    el.addEventListener("keyup", e => {
      this.pressed[e.key] = false;
      keys[e.keyCode] = false
    });
  }
}

document.body.appendChild(app.view);
app.view.setAttribute("tabindex", 0);

app.loader.add('character', 'https://cdn.glitch.global/3a0cb6d2-a6e3-4204-8d76-011b42ffb867/cat-sprite.png?1662486018945');
app.loader.add('tileset', 'https://cdn.glitch.global/3a0cb6d2-a6e3-4204-8d76-011b42ffb867/tileset.png?1662486018945');
app.loader.add('props', 'https://cdn.glitch.global/3a0cb6d2-a6e3-4204-8d76-011b42ffb867/props.png?v=1662562653356');

app.loader.load((loader, resources) => {
  const sky = PIXI.Sprite.from('https://cdn.glitch.global/3a0cb6d2-a6e3-4204-8d76-011b42ffb867/sky1.png?v=1662561061113');
  sky.width = app.screen.width;
  sky.height = app.screen.height;

  let tileTextures = [];
  for (let i = 0; i < 16 * 16; i++) {
    let x = i % 16;
    let y = Math.floor(i / 16);
    tileTextures[i] = new PIXI.Texture(
      resources.tileset.texture,
      new PIXI.Rectangle(x * tileSize, y * tileSize, tileSize, tileSize)
    );
  }

  let propTextures = [];
  for (let i = 0; i < 32 * 32; i++) {
    let x = i % 32;
    let y = Math.floor(i / 32);
    propTextures[i] = new PIXI.Texture(
      resources.props.texture,
      new PIXI.Rectangle(x * propSize, y * propSize, propSize, propSize)
    );
  }

  
  const cat = new PIXI.Sprite.from(walkFrames.right[0]);
  cat.x = app.renderer.width / 2;
  cat.y = app.renderer.height / 2;

  let stage = new PIXI.Container();
  for (let y = 0; y < map.width; y++) {
    for (let x = 0; x < map.width; x++) {
      let tile = map.tiles[y * map.width + x]
      let sprite = new PIXI.Sprite(tileTextures[tile]);
      sprite.x = x * tileSize;
      sprite.y = y * tileSize;

      let propTile = map.props[y * map.width + x]
      let prop = new PIXI.Sprite(propTextures[propTile]);
      prop.x = x * propSize;
      prop.y = y * propSize;

      stage.addChild(sprite);
      stage.addChild(prop);
    }
  }

  app.stage.addChild(sky);
  app.stage.addChild(stage);
  app.stage.addChild(cat);

  let kb = new Keyboard();
  kb.watch(app.view);

  app.ticker.add(() => {
    character.x += 1;
    character.y += 1;
  });
});