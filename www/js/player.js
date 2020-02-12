export class Player extends createjs.Bitmap {
  /************************************************
   * コンストラクタ
   */
  constructor() {
    let img = "./images/player.png";
    super(img);
    console.log("Playerクラス上でプレイヤーキャラクターが生成されたよ");

    //読み込んだ画像の中心位置をずらす
    this.regX = 30;
    this.regY = 10;

    this.vx = 0;
    this.vy = 0;
    this.position = 0;

    //初期位置（画面の下方中央）の設定
    var canvas = document.getElementById("myCanvas");
    this.x = Math.floor(canvas.width / 2);
    this.y = Math.floor(canvas.height - 50);
  }

  //　操作された時の左右に動くモーションの関数
  move() {
    if (this.vx < 0 && this.x < this.position) {
      //左に移動する場合
      this.vx = 0;
    } else if (this.vx > 0 && this.x > this.position) {
      //右に移動する場合
      this.vx = 0;
    }
    this.x += this.vx;
    this.y += this.vy;
  }
}
