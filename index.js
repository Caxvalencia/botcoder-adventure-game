let app = new PIXI.Application({ width: 640, height: 360 });
document.body.appendChild(app.view);



loadAsset('botcoder-walking-right', function(elapsed, botCoder) {
  botCoder.x = app.screen.width / 2 + elapsed * 1;
});

loadAsset('botcoder-walking-left', function(elapsed, botCoder) {
  botCoder.x = app.screen.width / 2 + elapsed * -1;
});
loadAsset('botcoder-walking-up', function(elapsed, botCoder) {
  botCoder.x = app.screen.width / 2 + elapsed * -1;
  botCoder.y = app.screen.height / 2 + elapsed * -1;
});
loadAsset('botcoder-walking-down', function(elapsed, botCoder) {
  botCoder.y = app.screen.height / 2 + elapsed *  1;
  botCoder.x = app.screen.width / 2 + elapsed *  1;
});


loadAsset('botcoder-stay', () => {});


const floor = PIXI.Sprite.from('assets/botcoder-floor.png');
floor.anchor.set(0.5);
floor.x = app.screen.width / 2;
floor.y = app.screen.height / 2;

app.stage.addChild(floor);


function loadAsset(imageName, action) {
  PIXI.Assets.load(`/assets/${imageName}/${imageName}.json`).then(() => {
    const frames = [];

    for (let idx = 0; idx < 4; idx++) {
      frames.push(PIXI.Texture.from(`${imageName}${idx}.png`));
    }

    const botCoder = new PIXI.AnimatedSprite(frames);

    botCoder.x = app.screen.width / 2;
    botCoder.y = app.screen.height / 2;
    botCoder.anchor.set(0.5);
    botCoder.animationSpeed = 0.1;
    botCoder.play();

    app.stage.addChild(botCoder);

    let elapsed = 0.0;

    app.ticker.add((delta) => {
      elapsed += delta;
      action(elapsed, botCoder);
    });
  });
}