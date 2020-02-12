/**
 *
 * プログラミング基礎 テンプレート
 * 今回は JavaScript の ES6 の書き方で、クラスを使ってプログラミングをします。
 * ゲームなどを作るときには、画面のキャラクターを1つずつプログラムで動かすよりも、勝手に動くようにしたほうが効率的です。
 * 今日はクラスの書き方の基礎を勉強して、まずは前回の時計を再現してみましょう。
 *
 */

import { Balloon } from "./balloon.js";
import { Plane } from "./plane.js";
import { Player } from "./player.js";

export class Game {
  /************************************************
   *
   * コンストラクタ
   * (クラスからインスタンスが生成されたときに呼び出される関数)
   *
   */
  constructor(stage) {
    var stage = new createjs.Stage("myCanvas");
    console.log("Game のインスタンスが生成されたよ");
    //引数のstage をメンバーの変数にするよ

    //学籍番号や概要などを表示するエリア
    this.titleTag = document.getElementById("titleTag");
    this.nameTag = document.getElementById("nameTag");
    this.scoreTag = document.getElementById("scoreTag");

    //音を鳴らす準備
    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.registerSound("./sounds/hit.mp3", "hit");

    //タイトルを書き換える
    this.titleTag.textContent = "Programing Advance";
    //名前を書き換える
    this.nameTag.textContent = "KanadeNishizawa";

    //点数表示を初期値に書き換える
    this.scoreTag.textContent = "0";

    //スコアを計算するための変数
    var score = 0;

    //足場を入れる配列を作る
    var scaffolds = [];

    // プレイヤーキャラを生成する
    var player = new Player();
    stage.addChild(player);

    //Ticker を設定。1秒間に「loop」の関数を30回実行するように命令している。
    createjs.Ticker.framerate = 30;
    createjs.Ticker.addEventListener("tick", handleTick);
    var count = 0; //フレーム番号

    function handleTick() {
      //クリックした場所へ横移動する
      document.addEventListener("click", e => {
        player.position = e.offsetX;
        player.vx = (e.offsetX - player.x) / 50;
      });
      player.move();

      count = count + 1;
      // console.log(count);
      if (count % 100 == 0) {
        console.log("カウント＝100＊n");
        //風船を生成する
        var balloon = new Balloon();
        stage.addChild(balloon);
        scaffolds.push(balloon);
        //飛行機を生成する
        var plane = new Plane();
        stage.addChild(plane);
        scaffolds.push(plane);
        console.log("足場の描画終了");

        // 要素が画面外へ出たか判定する関数を呼び出す
        if (scaffolds.y > stage.canvas.height + 10) {
          console.log("落下し終わったよ");
          stage.removeChild(scaffolds[i]);
          hit = true;
        }
      }

      for (var i = 0; i < scaffolds.length; i++) {
        let scaffold = scaffolds[i]; //足場の配列から足場を取り出す
        // ここで座標をグローバルからPlayerの中の座標系に変換
        let p = player.globalToLocal(scaffold.x, scaffold.y);
        // キャラクターが落下している時のみ、足場との衝突（着地）判定を行う
        let hit = player.hitTest(p.x, p.y) && player.vy >= 0;
        console.log("ヒット判定");
        // 足場への着地時、プレイヤーキャラがジャンプする
        if (hit) {
          // ジャンプ時の動き
          createjs.Tween.get(player)
            .to({ y: player.y - 300 }, 800, createjs.Ease.cubicOut)
            .call(fall);

          function fall() {
            // ジャンプ後の落下（衝突が上方向からであることを判定するためにベクトルで動かす）
            player.vy = 1;
          }
          // ジャンプ時の音
          createjs.Sound.play("hit");
          // ジャンプ時の点数加算
          score += 1;
          scoreTag.textContent = "P=" + score.toString();
          console.log("ジャンプ終了");
        }
      }
    }
    stage.update();
  }

  // // 要素が画面外に出たかを判定する関数
  // out(target) {
  //   let hit = false;
  //   //　落下し画面外に行った場合に消去
  //   if (target.y > this.stage.canvas.height + 10) {
  //     console.log("落下し終わったよ");
  //     this.stage.removeChild(target);
  //     hit = true;
  //   }

  //   //関数の呼び出し元に、当たったかどうかの結果を返す
  //   return hit;
  // }
}
