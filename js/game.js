import { Balloon } from "./balloon.js";
import { Plane } from "./plane.js";
import { Ufo } from "./ufo.js";
import { Player } from "./player.js";
import { Background } from "./background.js";
import { Start } from "./start.js";
import { Gameover } from "./gameover.js";
export class Game {
  /************************************************
   *
   * コンストラクタ
   * (クラスからインスタンスが生成されたときに呼び出される関数)
   *
   */
  constructor(stage) {
    this.stage = stage;
    this.state = "start";

    this.scoreTag = document.getElementById("scoreTag");
    this.scoreTag.visible = false;

    this.setUp();

    //Ticker を設定。1秒間に「loop」の関数を30回実行するように命令している。
    createjs.Ticker.framerate = 30;
    createjs.Ticker.addEventListener("tick", this.stage);

    //音を鳴らす準備
    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.registerSound("./sounds/start.mp3", "start");
    createjs.Sound.registerSound("./sounds/firstjump.mp3", "firstjump");
    createjs.Sound.registerSound("./sounds/bgm.mp3", "bgm");
    createjs.Sound.registerSound("./sounds/hit1.wav", "hit1");
    createjs.Sound.registerSound("./sounds/hit2.wav", "hit2");
    createjs.Sound.registerSound("./sounds/gameover.wav", "gameover");
  }
  /************************************************
   *
   * 画面の情報を初期化します。
   *
   */
  setUp() {
    //開始画面
    this.start = new Start(this.stage.canvas.width, this.stage.canvas.height);

    //点数表示を初期値に書き換える
    this.scoreTag.textContent = "0";

    //スコアを計算するための変数
    this.score = 0;

    //足場を入れる配列を作る
    this.scaffolds = [];

    //Background
    this.bg = new Background();

    // プレイヤーキャラを生成する
    this.player = new Player();
    //初期位置（画面の下方中央）
    this.player.x = Math.floor(this.stage.canvas.width / 2);
    this.player.y = Math.floor(this.stage.canvas.height - 100);

    this.count = 0; //フレーム番号

    //クリックしたら文字が消えてゲームがスタート
    this.start.on("click", evt => {
      if (this.state == "start") {
        this.start.visible = false;
        this.state = "game"; //ステータスを変更

        this.stage.addChild(this.bg);
        this.stage.addChild(this.player);

        // ここからloop内のゲームの描画を始める
        createjs.Ticker.addEventListener("tick", () => {
          if (this.state == "game") {
            this.loop();
          }
        });
        // プレイヤーが最初のジャンプをする
        createjs.Tween.get(this.player)
          .wait(500)
          .call(this.jump());
        // スタート時の音
        createjs.Sound.play("start");
        createjs.Sound.play("firstjump", { delay: 500 });
        createjs.Sound.play("bgm", { delay: 200, loop: -1 });
      }
    });
    this.stage.addChild(this.start);

    // ゲームオーバー画面
    this.gameover = new Gameover(
      this.stage.canvas.width,
      this.stage.canvas.height
    );
  }

  // 以下プレイ中の描画
  loop() {
    this.count += 1; //1フレーム進むごとに1カウント増えていく
    if (this.count % 45 == 0 || this.count == 1) {
      //ゲーム開始直後と45カウントに1回、風船を生成する
      let balloon = new Balloon();
      this.stage.addChild(balloon);
      this.scaffolds.push(balloon);
    }
    if (this.count % 60 == 0 || this.count == 1) {
      //ゲーム開始直後と60カウントに1回、飛行機を生成する
      let plane = new Plane();
      this.stage.addChild(plane);
      this.scaffolds.push(plane);
    }
    if (this.count % 130 == 0 || this.count == 1) {
      //ゲーム開始直後と130カウントに1回、UFOを生成する
      let ufo = new Ufo();
      this.stage.addChild(ufo);
      this.scaffolds.push(ufo);
    }
    //クリックした場所へ横移動する
    this.stage.canvas.addEventListener("click", e => {
      this.player.position = e.offsetX;
      this.player.vx = (e.offsetX - this.player.x) / 10;
    });

    this.player.move();

    for (var i = 0; i < this.scaffolds.length; i++) {
      let scaffold = this.scaffolds[i]; //足場の配列から足場を取り出す
      //足場が下にスクロール
      scaffold.x += scaffold.vx;
      scaffold.y += scaffold.vy;
      // 足場が画面外（下）へ出たら消去
      if (scaffold.y > window.innerHeight + 10) {
        this.stage.removeChild(scaffold);
        this.scaffolds.splice(i, 1);
      }

      // ここで座標をグローバルからPlayerの中の座標系に変換
      let p = this.player.globalToLocal(scaffold.x, scaffold.y);
      // キャラクターが落下している時のみ、足場との衝突（着地）判定を行う
      let hit = this.player.hitTest(p.x, p.y) && this.player.vy > 0;

      // 足場への着地時、プレイヤーキャラがジャンプする
      if (hit) {
        // ジャンプ時の動き
        createjs.Tween.get(this.player).call(this.jump());
        if (scaffold.type === "balloon") {
          // ジャンプ時の音
          createjs.Sound.play("hit1");
          // 風船でのジャンプ時の点数加算
          this.score += 1;
          scoreTag.textContent = +this.score.toString();
        } else if (scaffold.type === "plane") {
          // ジャンプ時の音
          createjs.Sound.play("hit2");
          // 飛行機でのジャンプ時の点数加算
          this.score += 5;
          scoreTag.textContent = +this.score.toString();
        } else if (scaffold.type === "ufo") {
          // ジャンプ時の音
          createjs.Sound.play("hit2");
          // ufoでのジャンプ時の点数加算
          this.score += 10;
          scoreTag.textContent = +this.score.toString();
        }
      }

      // プレイヤーが画面外へ落ちたらゲームオーバー;
      if (this.player.y > window.innerHeight + 400) {
        createjs.Sound.stop();
        this.stage.removeChild(this.player);
        this.gameover.render(this.score);
        this.stage.addChild(this.gameover);
        createjs.Sound.play("gameover");
        this.state = "gameover";
      }
    }
  }
  jump() {
    this.player.vy = -20;
    setTimeout(() => {
      this.player.vy = 13;
    }, 900);
  }
}
