<template>
  <div>
    <canvas @click="onclick" id="mycanvas"></canvas>
    <div :hidden="!isOver" :class="victory? 'victory': 'fail'">{{victory? '你赢了': '你输了'}}</div>
    <div :hidden="!isOver">是否重新开始? <span @click="refresh" class="click-able">是</span></div>
  </div>
</template>

<script>
import getMarker from '../util/boardMarker'
export default {
  name: 'gobang',
  data () {
    return {
      chess: '',
      context: '',
      chessBox: [],
      me: true,
      victory: false,
      isOver: false
    }
  },
  methods: {
    drawChessBoard () {
      for(var i=0;i<15;i++) {
        this.context.strokeStyle="#333333";
        this.context.moveTo(15+i*30,15);//垂直方向画15根线，相距30px;
        this.context.lineTo(15+i*30,435);
        this.context.stroke();
        this.context.moveTo(15,15+i*30);//水平方向画15根线，相距30px;棋盘为14*14；
        this.context.lineTo(435,15+i*30);
        this.context.stroke();
      }
    },
    oneStep(i,j,k){
      this.context.beginPath();
      this.context.arc(15+i*30,15+j*30,13,0,2*Math.PI);//绘制棋子
      var g = this.context.createRadialGradient(15+i*30,15+j*30,13,15+i*30,15+j*30,0);//设置渐变
      if(k){    //k=true是黑棋，否则是白棋
        g.addColorStop(0,'#D1D1D1');//白棋
        g.addColorStop(1,'#F9F9F9');
      }else {
        g.addColorStop(0,'#0A0A0A');//黑棋
        g.addColorStop(1,'#636766');
      }
      this.context.fillStyle=g;
      this.context.fill();
      this.context.closePath();
    },
    onclick (e) {
      if (!this.me) {
        return
      }
      if (this.isOver) {
        return
      }
      var x = e.offsetX;//相对于棋盘左上角的x坐标
      var y = e.offsetY;//相对于棋盘左上角的y坐标
      var i = Math.floor(x/30);
      var j = Math.floor(y/30);
      if( this.chessBox[i][j] == 0 ) {
        this.oneStep(i,j,this.me);
        if(this.me){
          this.chessBox[i][j]=1;
        }else{
          this.chessBox[i][j]=2;
        }
      }
      this.isVictory(i, j)
      if (this.isOver) {
        return
      }
      this.robot()
    },
    robot () {
      let result = getMarker(this.chessBox, 2)
      this.oneStep(result[0], result[1], false)
      this.chessBox[result[0]][result[1]] = 2
      this.isVictory(result[0], result[1])
    },
    isVictory (i, j) {
      let currentChess = this.chessBox[i][j]
      let totalChess = 1;
      let x, y
      for (x = i-1; x >= 0; x--) {
        if (this.chessBox[x][j] == currentChess) {
          totalChess++
        } else {
          break;
        }
      }
      for (x = i+1; x <= 14; x++) {
        if (this.chessBox[x][j] == currentChess) {
          totalChess++
        } else {
          break;
        }
      }
      if (totalChess >= 5) {
        this.isOver = true
        if (this.me) {
          this.victory = true
        }
      }
      totalChess = 1;
      for (y = j-1; y >= 0; y--) {
        if (this.chessBox[i][y] == currentChess) {
          totalChess++
        } else {
          break;
        }
      }
      for (y = j+1; y <= 14; y++) {
        if (this.chessBox[i][y] == currentChess) {
          totalChess++
        } else {
          break;
        }
      }
      if (totalChess >= 5) {
        this.isOver = true
        if (this.me) {
          this.victory = true
        }
      }
      totalChess = 1
      for (x = i-1, y = j-1; x >= 0&&j >= 0; x--,y--) {
        if (this.chessBox[x][y] == currentChess) {
          totalChess++
        } else {
          break;
        }
      }
      for (x = i+1, y = j+1; x <= 14&&j <= 14; x++,y++) {
        if (this.chessBox[x][y] == currentChess) {
          totalChess++
        } else {
          break;
        }
      }
      if (totalChess >= 5) {
        this.isOver = true
        if (this.me) {
          this.victory = true
        }
      }
      totalChess = 1
      for (x = i-1, y = j+1; x >= 0&&j <= 14; x--,y++) {
        if (this.chessBox[x][y] == currentChess) {
          totalChess++
        } else {
          break;
        }
      }
      for (x = i+1, y = j-1; x <= 14&&j >= 0; x++,y--) {
        if (this.chessBox[x][y] == currentChess) {
          totalChess++
        } else {
          break;
        }
      }
      if (totalChess >= 5) {
        this.isOver = true
        if (this.me) {
          this.victory = true
        }
      }
      this.me = !this.me;
    },
    refresh () {
      this.chessBox = []
      this.init()
      this.drawChessBoard()
    },
    init () {
      this.isOver = false
      this.victory = false
      this.chess.height = 450
      this.chess.width = 450
      for(var i=0;i<15;i++){
        this.chessBox[i]=[];
        for(var j=0;j<15;j++){
          this.chessBox[i][j]=0;//初始值为0
        }
      }
      this.me = true
    }
  },
  mounted () {
    this.chess = document.getElementById("mycanvas");
    this.context = this.chess.getContext('2d');
    this.chess.fillStyle = "#E4B24F"
    this.init()
    this.drawChessBoard()
  },
  computed: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas{
  display: block;
  margin: 50px auto;
  box-shadow: -2px -2px 2px #F3F2F2, 5px 5px 5px #6F6767;
  background-color: #E4B24F;
}
.hidden {
  hidden: hidden;
}
.click-able {
  cursor: pointer;
  color: #3471FF;
}
.victory {
  color: green;
  font-size:35px;
}
.fail {
  color: red;
  font-size:35px;
}
</style>
