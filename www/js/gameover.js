export class Gameover extends createjs.MovieClip {
  constructor(w, h) {
    super();
    //ゲームオーバー画面
    this.bg = new createjs.Shape();
    this.bg.graphics.beginFill("#333333").drawRect(0, 0, w, h);
    this.addChild(this.bg);

    //文字をかくよ
    this.text = new createjs.Text(
      "GAME OVER",
      "bold 30px  Helvetica, Arial, sans-serif",
      "red"
    );
    this.text2 = new createjs.Text();
    this.text.textAlign = "center";
    this.text.textBaseline = "bottom";
    this.text.x = window.innerWidth / 2;
    this.text.y = window.innerHeight / 2;
    this.addChild(this.text);
  }
  render(score) {
    this.text2 = new createjs.Text(
      "SCORE=" + score + "",
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
