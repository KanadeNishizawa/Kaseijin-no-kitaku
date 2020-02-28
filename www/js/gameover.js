export class Gameover extends createjs.MovieClip {
  constructor(w, h) {
    super();
    //ゲームオーバー画面
    this.bg = new createjs.Shape();
    this.bg.graphics.beginFill("#333333").drawRect(0, 0, w, h);
    this.addChild(this.bg);

    // 火星人
    this.bmp2 = new createjs.Bitmap("./images/top-player.png");
    this.bmp2.regY = 220;
    this.bmp2.regX = 120;
    this.bmp2.y = window.innerHeight / 2;
    this.bmp2.x = window.innerWidth / 2;
    this.bmp2.rotation = 170;
    this.bmp2.scaleX = window.innerHeight / 300;
    this.bmp2.scaleY = window.innerHeight / 300;
    this.addChild(this.bmp2);

    // 背景を暗く
    this.bg = new createjs.Shape();
    this.bg.graphics.beginFill("#000").drawRect(0, 0, w, h);
    this.bg.alpha = 0.7;
    this.addChild(this.bg);

    //文字をかくよ
    this.text = new createjs.Bitmap("./images/gameover.png");
    this.text.scaleX = 350 / 1200;
    this.text.scaleY = 350 / 1200;
    this.text.regX = 600;
    this.text.regY = 100;
    this.text.x = window.innerWidth / 2;
    this.text.y = window.innerHeight / 2.2;
    this.addChild(this.text);
  }
  render(score) {
    this.text2 = new createjs.Text(
      "YOUR SCORE = " + score + "",
      "20px Helvetica, Arial, sans-serif",
      "white"
    );
    this.text2.textAlign = "center";
    this.text2.textBaseline = "top";
    this.text2.x = window.innerWidth / 2;
    this.text2.y = window.innerHeight / 2;
    this.addChild(this.text2);
    document.addEventListener("click", () => location.reload());
  }
}
