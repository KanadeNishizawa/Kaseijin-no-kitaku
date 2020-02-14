import { Balloon } from "./balloon.js";
import { Plane } from "./plane.js";
import { Ufo } from "./ufo.js";
import { Player } from "./player.js";

export class Game {
  /************************************************
   *
   * コンストラクタ
   * (クラスからインスタンスが生成されたときに呼び出される関数)
   *
   */
  constructor(stage) {
    this.stage = stage;
    console.log("Game のインスタンスが生成されたよ");

    //学籍番号や概要などを表示するエリア
    this.titleTag = document.getElementById("titleTag");
    this.nameTag = document.getElementById("nameTag");
    this.scoreTag = document.getElementById("scoreTag");

    this.setUp();

    //Ticker を設定。1秒間に「loop」の関数を30回実行するように命令している。
    createjs.Ticker.framerate = 30;
    createjs.Ticker.addEventListener("tick", this.stage);
    createjs.Ticker.addEventListener("tick", () => {
      this.loop();
    });
    //クリックした場所へ横移動する
    this.stage.canvas.addEventListener("click", e => {
      this.player.position = e.offsetX;
      this.player.vx = (e.offsetX - this.player.x) / 10;
    });

    //音を鳴らす準備
    createjs.Sound.alternateExtensions = ["wav"];
    createjs.Sound.registerSound("./sounds/hit1.wav", "hit1");
    createjs.Sound.registerSound("./sounds/hit2.wav", "hit2");
    createjs.Sound.registerSound("./sounds/ufo.wav", "ufo");
    createjs.Sound.registerSound("./sounds/gameover.wav", "gameover");
  }
  /************************************************
   *
   * 画面の情報を初期化します。
   *
   */
  setUp() {
    //タイトルを書き換える
    this.titleTag.textContent = "Programing Advance";
    //名前を書き換える
    this.nameTag.textContent = "KanadeNishizawa";

    //点数表示を初期値に書き換える
    this.scoreTag.textContent = "0";

    //スコアを計算するための変数
    this.score = 0;

    //足場を入れる配列を作る
    this.scaffolds = [];

    // プレイヤーキャラを生成する
    this.player = new Player();
    //初期位置（画面の下方中央）
    this.player.x = Math.floor(this.stage.canvas.width / 2);
    this.player.y = Math.floor(this.stage.canvas.height - 100);
    this.stage.addChild(this.player);

    this.count = 0; //フレーム番号
  }

  loop() {
    this.count += 1; //1フレーム進むごとに1カウント増えていく
    if (this.count % 45 == 0) {
      //45カウントに1回、風船を生成する
      let balloon = new Balloon();
      this.stage.addChild(balloon);
      this.scaffolds.push(balloon);
    }
    if (this.count % 60 == 0) {
      //50カウントに1回、飛行機を生成する
      let plane = new Plane();
      this.stage.addChild(plane);
      this.scaffolds.push(plane);
    }
    if (this.count % 130 == 0) {
      //130カウントに1回、UFOを生成する
      let ufo = new Ufo();
      this.stage.addChild(ufo);
      this.scaffolds.push(ufo);
    }

    this.player.move();

    for (var i = 0; i < this.scaffolds.length; i++) {
      let scaffold = this.scaffolds[i]; //足場の配列から足場を取り出す
      //足場が下にスクロール
      scaffold.x += scaffold.vx;
      scaffold.y += scaffold.vy;
      // 要素が画面外へ出たら消去
      if (scaffold.y > window.innerHeight + 10) {
        console.log("落下し終わったよ");
        this.stage.removeChild(scaffold);
        this.scaffolds.splice(i, 1);
      }
      // ここで座標をグローバルからPlayerの中の座標系に変換
      let p = this.player.globalToLocal(scaffold.x, scaffold.y);
      // キャラクターが落下している時のみ、足場との衝突（着地）判定を行う
      let hit = this.player.hitTest(p.x, p.y) && this.player.vy >= 0;

      // console.log("ヒット判定");
      // 足場への着地時、プレイヤーキャラがジャンプする
      if (hit) {
        // ジャンプ時の動き
        createjs.Tween.get(this.player)
          .to({ y: this.player.y - 350 }, 800, createjs.Ease.cubicOut)
          .call(this.fall());
        if (scaffold.type === "balloon") {
          // ジャンプ時の音
          createjs.Sound.play("hit1");
          // ジャンプ時の点数加算
          this.score += 1;
          scoreTag.textContent = "P=" + this.score.toString();
        } else if (scaffold.type === "plane") {
          // ジャンプ時の音
          createjs.Sound.play("hit2");
          // ジャンプ時の点数加算
          this.score += 5;
          scoreTag.textContent = "P=" + this.score.toString();
        } else if (scaffold.type === "ufo") {
          // ジャンプ時の音
          createjs.Sound.play("hit2");
          // ジャンプ時の点数加算
          this.score += 10;
          scoreTag.textContent = "P=" + this.score.toString();
        }
      }
    }
  }
  fall() {
    // ジャンプ後の落下（衝突が上方向からであることを判定するためにベクトルで動かす）
    this.player.vy = 11;
  }
}
