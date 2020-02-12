export class Scaffold extends createjs.Bitmap {
  /************************************************
   *
   * コンストラクタ
   * (クラスからインスタンスが生成されたときに呼び出される関数)
   *
   */
  constructor(img) {
    super(img);
    this.type = "default";
    console.log("Scaffold クラス上で足場が生成されたよ");

    //読み込んだ画像の中心位置をずらす
    this.regX = 30;
    this.regY = 30;

    //初期位置位置を設定。ランダム。
    var canvas = document.getElementById("myCanvas");
    this.x = 0 + Math.floor(Math.random() * canvas.width);
    this.y = -canvas.height + Math.floor(Math.random() * canvas.height);
    this.press = false;

    createjs.Tween.get(this).to(
      {
        y: this.y + canvas.height * 2.5,
        x: this.x + Math.random() * 500 - 300
      },
      8000,
      createjs.Ease.none
    );
  }
}
