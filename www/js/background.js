export class Background extends createjs.MovieClip {
  constructor() {
    //継承元のコンストラクタを呼び出す。
    super();
    this.imgSize = 1230 * ((window.innerWidth + 50) / 720);

    //背景の画像をロードして画面に出す。
    this.bmp1 = new createjs.Bitmap("./images/bg.jpg");
    this.bmp1.y = 0;
    this.bmp1.scaleX = (window.innerWidth + 50) / 720;
    this.bmp1.scaleY = (window.innerWidth + 50) / 720;
    this.addChild(this.bmp1);

    this.bmp2 = new createjs.Bitmap("./images/bg.jpg");
    this.bmp2.y = -this.imgSize;
    this.bmp2.scaleX = (window.innerWidth + 50) / 720;
    this.bmp2.scaleY = (window.innerWidth + 50) / 720;
    this.addChild(this.bmp2);

    this.on("tick", evt => {
      this.bmp1.y += 8;
      this.bmp2.y += 8;
      if (this.bmp1.y > this.imgSize) {
        this.bmp1.y = -this.imgSize;
      }
      if (this.bmp2.y > this.imgSize) {
        this.bmp2.y = -this.imgSize;
      }
    });
  }
}
