import { Scaffold } from "./scaffold.js";

//Scaffold を継承した Plane というクラスを作るよという宣言
export class Plane extends Scaffold {
  /**
   *
   * コンストラクタ
   *
   */
  constructor() {
    //Scaffoldという先祖のクラスのコンストラクタに"plane"という引数を渡す
    super("./images/plane.png");
    this.type = "plane";
    console.log("飛行機が生成されたよ");
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
