export class Char extends createjs.Bitmap{
    /************************************************
     * 
     * コンストラクタ
     * (クラスからインスタンスが生成されたときに呼び出される関数)
     * 
     */
    constructor(img){
        super(img);
        console.log("Char クラス上でキャラクターが生成されたよ");

        //読み込んだ画像の中心位置をずらす
        this.regX = 30;
        this.regY = 30;

        //ベクトルの初期値を指定
        this.vx = Math.random() * 10 - 5;
        this.vy = Math.random() * 10 - 5;
      
        this.vr = Math.random() * 5 + 5;

    }



    /************************************************
     * 
     * 移動しろという命令
     * 継承元のmoveを上書き
     */
    move(){
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.vr;
    }
}