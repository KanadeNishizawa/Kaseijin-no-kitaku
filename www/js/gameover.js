export class Gameover extends createjs.MovieClip {
  constructor(w, h) {
    super();
    //ゲームオーバー画面
    this.bg = new createjs.Shape();
    this.bg.graphics.beginFill("#333333").drawRect(0, 0, w, h);
    this.addChild(this.bg);

    //文字をかくよ
    this.text = new createjs.Bitmap("./images/gameover.png");
    this.text.scaleX = 350 / 1200;
    this.text.scaleY = 350 / 1200;
    this.text.regX = 600;
    this.text.regY = 100;
    this.text.x = window.innerWidth / 2;
    this.text.y = window.innerHeight / 2.4;
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
    this.text2.y = window.innerHeight / 2.1;
    this.addChild(this.text2);
    document.addEventListener("click", () => location.reload());
  }
}
