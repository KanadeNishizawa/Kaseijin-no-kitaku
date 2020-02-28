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

    //読み込んだ画像の中心位置をずらす
    this.regX = 50;
    this.regY = 0;

    //初期位置位置を設定。ランダム。
    this.x = Math.floor(Math.random() * window.innerWidth);
    this.y = -80;
    this.press = false;
    this.vy = 5;
  }
}
