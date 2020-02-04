import { Char } from "./char.js";

//Char を継承した Ahiru というクラスを作るよという宣言
export class Ahiru extends Char {
  /**
   *
   * コンストラクタ
   *
   */
  constructor() {
    //Charという先祖のクラスのコンストラクタにアヒル画像の引数を渡す
    super("./images/ahiru.png");
    this.type = "ahiru";

    this.vx = Math.random() * 7;

    //アヒルはブンチョウの3倍速の初期ベクトルを指定
    this.vy = Math.random() * 7;

    //アヒルは画面の真ん中あたりに出現する
    this.x = 320;
    this.y = 300;
    console.log("アヒルが生成されたよ");

    this.press = false;
    // this.on("mousedown", (evt)=>{
    //     // 押したときの挙動
    //     this.offset = {};
    //     this.offset.x = this.x - evt.stageX;
    //     this.offset.y = this.y - evt.stageY;
    //     this.press = true;
    //     console.log("押したよー");
    // });

    // this.on("pressmove", (evt)=>{
    //     // 移動中の命令
    //     this.x = evt.stageX + this.offset.x;
    //     this.y = evt.stageY + this.offset.y;
    //     console.log("移動したよ")
    // });

    this.on("pressup", evt => {
      // 離した
      this.press = false;
    });
  }
  move() {
    //move() と命令されたら、自分の座標にベクトルの値を足し込む
    if (this.press == false) {
      super.move();
    }
  }
}
