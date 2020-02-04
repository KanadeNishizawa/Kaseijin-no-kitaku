/**
 *
 * プログラミング基礎 テンプレート
 * 今回は JavaScript の ES6 の書き方で、クラスを使ってプログラミングをします。
 * ゲームなどを作るときには、画面のキャラクターを1つずつプログラムで動かすよりも、勝手に動くようにしたほうが効率的です。
 * 今日はクラスの書き方の基礎を勉強して、まずは前回の時計を再現してみましょう。
 *
 */

import { Ahiru } from "./ahiru.js";
import { Buncho } from "./buncho.js";
import { Bar } from "./bar.js";

export class Game {
  /************************************************
   *
   * コンストラクタ
   * (クラスからインスタンスが生成されたときに呼び出される関数)
   *
   */
  constructor(stage) {
    console.log("Game のインスタンスが生成されたよ");

    //引数のstage をメンバーの変数にするよ
    //先頭に「this」がいちいち付いているけど、この「this」は居場所を示していて、
    //インスタンスの中にある変数ですよ、ということを示しています
    this.stage = stage;

    //学籍番号や概要などを表示するエリア
    this.titleTag = document.getElementById("titleTag");
    this.nameTag = document.getElementById("nameTag");
    this.scoreTag = document.getElementById("scoreTag");

    //ここから画面の要素を初期化します
    this.setUp();

    //Ticker を設定。1秒間に「loop」の関数を30回実行するように命令している。
    createjs.Ticker.framerate = 30;
    createjs.Ticker.addEventListener("tick", this.stage);
    createjs.Ticker.addEventListener("tick", () => {
      this.loop();
    });

    //音を鳴らす準備
    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.registerSound("./sounds/hit.mp3", "hit");
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
    this.nameTag.textContent = "input your name";

    //点数表示を初期値に書き換える
    this.scoreTag.textContent = "0";

    //スコアを計算するための変数
    this.score = 0;

    //キャラクターを入れる配列を作るよ
    this.chars = [];

    //キャラクターを作るよ
    for (let i = 0; i < 5; i++) {
      //アヒルを2体生成するよ
      let ahiru = new Ahiru();
      this.stage.addChild(ahiru);
      this.chars.push(ahiru);

      let buncho = new Buncho();
      this.stage.addChild(buncho);
      this.chars.push(buncho);
    }

    //画面にバーを表示するよ
    this.bar = new Bar();
    this.bar.x = Math.floor(this.stage.canvas.width / 2);
    this.bar.y = Math.floor(this.stage.canvas.height - 50);
    this.stage.addChild(this.bar);

    document.addEventListener("click", e => {
      this.bar.position = e.offsetX;
      this.bar.vx = (e.offsetX - this.bar.x) / 50;
    });

    this.debug();
  }
  /************************************************
   *
   * アニメーションが動くところ。
   * 1フレームの間にどれだけ絵が変化するかを書く。
   *
   */
  loop() {
    for (let i = 0; i < this.chars.length; i++) {
      let char = this.chars[i]; //配列からキャラクターを取り出す
      // ここで座標をグローバルからbarの中の座標系に変換
      let p = this.bar.globalToLocal(char.x, char.y);
      // キャラクターが落下している時のみ、足場との衝突（着地）判定を行う
      let hit = this.bar.hitTest(p.x, p.y) && this.bar.vy >= 0;

      if (hit) {
        this.bar.vy = -0.8;
        setTimeout(() => {
          this.bar.vy = 1;
        }, 1000);
        createjs.Sound.play("hit");
        if (char.type == "ahiru") {
          this.score++;
          this.scoreTag.textContent = "P=" + this.score.toString();
        }
      }

      //移動の命令をちょこちょこ実行する代わりに、移動しろと命令するだけ
      char.move();
      this.bar.move();

      //壁への当たり判定の関数を呼ぶ
      this.bound(char);
    }
  }

  /************************************************
   *
   * 壁への当たり判定のチェック
   *
   */
  bound(target) {
    let hit = false;
    //X座標側のチェック
    if (target.x < 0 || target.x > this.stage.canvas.width) {
      target.vx *= -1;
      hit = true;
    }

    //Y座標側のチェック
    if (target.y < 0 || target.y > this.stage.canvas.height) {
      target.vy *= -1;
      hit = true;
    }

    //関数の呼び出し元に、当たったかどうかの結果を返す
    return hit;
  }
  //   movingBar(elment) {
  //     console.log(this.bar);
  //     this.bar.x = elment.offsetX;
  //     this.bar.y = elment.offsetY;
  //   }
  debug() {
    console.log(this.bar.vy);
    setTimeout(() => {
      this.debug();
    }, 1000);
  }
}
