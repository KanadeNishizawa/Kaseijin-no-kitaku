import { Game } from "./game.js";

class Application {
  /************************************************
   *
   * コンストラクタ
   * (クラスからインスタンスが生成されたときに呼び出される関数)
   *
   */
  constructor() {}

  /************************************************
   *
   * 初期化する関数
   *
   */
  init() {
    //キャンバスとステージを設定
    this.canvasObject = document.getElementById("myCanvas");
    this.canvasObject.width = window.innerWidth;
    this.canvasObject.height = window.innerHeight;
    this.stage = new createjs.Stage(this.canvasObject);

    // タッチ操作をサポートしているブラウザーかチェック
    if (createjs.Touch.isSupported() == true) {
      // タッチ操作を有効にします。
      createjs.Touch.enable(this.document);
    }

    //game を作るよ
    this.game = new Game(this.stage);
  }
}

//アプリをインスタンスにしてから初期化
const appli = new Application();
appli.init();
