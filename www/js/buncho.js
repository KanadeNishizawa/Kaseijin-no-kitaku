import {Char} from "./char.js";

//Char を継承した Buncho というクラスを作るよという宣言
export class Buncho extends Char{
    /**
     * 
     * コンストラクタ
     * 
     */
    constructor(){
        //Charという先祖のクラスのコンストラクタに"ブンチョウ"という引数を渡す
        super("./images/buncho.png");
        
        console.log("ブンチョウが生成されたよ");
    }
}