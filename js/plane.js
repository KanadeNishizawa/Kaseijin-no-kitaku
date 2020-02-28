import { Scaffold } from "./scaffold.js";

//Scaffold を継承した Plane というクラスを作るよという宣言
export class Plane extends Scaffold {
  /**
   *
   * コンストラクタ
   *
   */
  constructor() {
    super("./images/plane.png");
    this.type = "plane";
    this.y = window.innerWidth / 3;
    this.x =
      window.innerWidth / 1.5 + Math.floor(Math.random() * window.innerWidth);
    this.vx = Math.random() * -15;
  }
  flow() {
    if (this.press == false) {
      super.flow();
    }
  }
}
