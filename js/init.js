import { Game } from "./game.js";

class Application {
  /************************************************
   *
   * コンストラクタ
   * (クラスからインスタンスが生成されたときに呼び出される関数)
   *
   */
  constructor() {
    this.baseUrl = "https://kaseijin-no-kitaku.firebaseapp.com";
  }

  /************************************************
   *
   * 初期化する関数
   *
   */
  preload() {
    var queue = new createjs.LoadQueue(false);
    queue.on("fileload", this.init());
    queue.loadFile(
      this.baseUrl + "/sounds/bgm.mp3",
      this.baseUrl + "/sounds/firstjump3",
      this.baseUrl + "/sounds/start.mp3",
      this.baseUrl + "/sounds/hit1.wav",
      this.baseUrl + "/sounds/hit2.wav",
      this.baseUrl + "/sounds/gameover.wav"
    );
  }

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

// 読み込みが完了したら発動
window.addEventListener("load", function() {
  appli.preload();
});
