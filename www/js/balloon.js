import { Scaffold } from "./scaffold.js";

//Scaffold を継承した Balloon というクラスを作るよという宣言
export class Balloon extends Scaffold {
  /**
   *
   * コンストラクタ
   *
   */
  constructor() {
    //Scaffoldという先祖のクラスのコンストラクタにアヒル画像の引数を渡す
    super("./images/balloon.png");
    this.type = "balloon";
    console.log("風船が生成されたよ");
  }

  /************************************************
   *
   * 移動しろという命令
   * 継承元に書いてあるmoveという関数を上書きしている
   *
   */
  // move() {
  //   if (this.press == false) {
  //     super.move(); //継承元のクラスに書いてあるmoveという関数を呼んで動かす
  //   }
  // }
}
