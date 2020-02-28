import { Scaffold } from "./scaffold.js";

//Scaffold を継承した Balloon というクラスを作るよという宣言
export class Balloon extends Scaffold {
  /**
   *
   * コンストラクタ
   *
   */
  constructor() {
    super("./images/balloon.png");
    this.type = "balloon";
    this.vx = 0;
  }
  flow() {
    if (this.press == false) {
      super.flow();
    }
  }
}
