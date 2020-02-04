export class Bar extends createjs.Bitmap {
  /************************************************
   * コンストラクタ
   */
  constructor() {
    let img = "./images/bar.png";
    super(img);
    console.log("Bar クラス上でバーが生成されたよ");

    //読み込んだ画像の中心位置をずらす
    this.regX = 30;
    this.regY = 10;

    this.vx = 0;
    this.vy = 0;

    this.position = 0;
    // this.on("mousedown", (evt)=>{
    //     // 押したときの挙動
    //     this.offset = {};
    //     this.offset.x = this.x - evt.stageX;
    //     this.offset.y = this.y - evt.stageY;
    //     console.log("押したよー");
    // });

    // this.on("pressmove", (evt)=>{
    //     // 移動中の命令
    //     this.x = evt.stageX + this.offset.x;
    //     this.y = evt.stageY + this.offset.y;
    //     console.log("移動したよ")
    // });
  }

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
