export class Start extends createjs.MovieClip {
  constructor(w, h) {
    super();
    //スタート画面
    this.bmp1 = new createjs.Bitmap("./images/bg.jpg");
    this.bmp1.scaleX = (window.innerWidth + 100) / 720;
    this.bmp1.scaleY = (window.innerWidth + 100) / 720;
    this.addChild(this.bmp1);

    // タイトルと説明文
    this.title = new createjs.Bitmap("./images/title.png");
    this.title.scaleX = 350 / 400;
    this.title.scaleY = 350 / 400;
    this.title.regX = 200;
    this.title.regY = 150;
    this.title.x = window.innerWidth / 2;
    this.title.y = window.innerHeight / 2;
    this.addChild(this.title);
  }
}
