import { Scaffold } from "./scaffold.js";

//Scaffold を継承した Ufo というクラスを作るよという宣言
export class Ufo extends Scaffold {
  /**
   *
   * コンストラクタ
   *
   */
  constructor() {
    super("./images/ufo.png");
    this.type = "ufo";
    this.y = window.innerWidth / 3;
    this.vy = 3;
    this.vx = Math.ceil(Math.random() * 30) - 10;
  }

  flow() {
    if (this.press == false) {
      super.flow();
    }
  }
}
