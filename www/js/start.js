export class Start extends createjs.MovieClip {
  constructor(w, h) {
    super();
    //スタート画面
    this.bmp1 = new createjs.Bitmap("./images/bg.jpg");
    this.bmp1.scaleX = (window.innerWidth + 100) / 720;
    this.bmp1.scaleY = (window.innerWidth + 100) / 720;
    this.addChild(this.bmp1);

    // 火星人
    // this.bmp2 = new createjs.Bitmap("./images/top-player.png");
    // this.bmp2.regY = 50;
    // this.bmp2.y = window.innerHeight / 8;
    // this.bmp2.scaleX = window.innerHeight / 300;
    // this.bmp2.scaleY = window.innerHeight / 300;
    // this.bmp2.rotation = -30;
    // this.addChild(this.bmp2);

    // 背景を暗く
    // this.bg = new createjs.Shape();
    // this.bg.graphics.beginFill("#000").drawRect(0, 0, w, h);
    // this.bg.alpha = 0.2;
    // this.addChild(this.bg);

    //tap to start
    this.text = new createjs.Bitmap("./images/taptostart.png");
    this.text.scaleX = 300 / 1000;
    this.text.scaleY = 300 / 1000;
    this.text.regX = 500;
    this.text.regY = 180;
    this.text.x = window.innerWidth / 2;
    this.text.y = window.innerHeight / 1.5;
    this.addChild(this.text);

    // タイトルと説明文
    this.title = new createjs.Bitmap("./images/title.png");
    this.title.scaleX = 350 / 1200;
    this.title.scaleY = 350 / 1200;
    this.title.regX = 600;
    this.title.regY = 500;
    this.title.x = window.innerWidth / 2;
    this.title.y = window.innerHeight / 2.1;
    this.addChild(this.title);
  }
}
