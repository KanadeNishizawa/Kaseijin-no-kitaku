import { Player } from "./player.js";

export class Start extends createjs.MovieClip {
  constructor(w, h) {
    super();
    //スタート画面
    this.bg = new createjs.Shape();
    this.bg.graphics.beginFill("#333333").drawRect(0, 0, w, h);
    this.addChild(this.bg);

    //文字をかくよ
    this.text = new createjs.Text(
      "TAP TO START!",
      "bold 30px  Helvetica, Arial, sans-serif",
      "deeppink"
    );
    this.text2 = new createjs.Text(
      "\r火星に帰ろう！\r\r浮かんでいる風船や乗り物でジャンプ！\r\rタップで左右に移動できるよ！\r\r画面外へ落ちるとゲームオーバー。",
      "14px Helvetica, Arial, sans-serif",
      "white"
    );
    this.text.textAlign = "center";
    this.text.textBaseline = "ideographic";
    this.text2.textAlign = "center";
    this.text2.textBaseline = "top";
    this.text.x = window.innerWidth / 2;
    this.text.y = window.innerHeight / 2.6;
    this.text2.x = window.innerWidth / 2;
    this.text2.y = window.innerHeight / 2.6;
    this.addChild(this.text);
    this.addChild(this.text2);
  }
}
