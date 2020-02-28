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
    this.title.scaleX = (window.innerWidth * 0.9) / 1200;
    this.title.scaleY = (window.innerWidth * 0.9) / 1200;
    this.title.regX = 620;
    this.title.regY = 450;
    this.title.x = window.innerWidth / 2;
    this.title.y = window.innerHeight / 2;
    this.addChild(this.title);
  }
}
