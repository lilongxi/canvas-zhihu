import React, { Component } from 'react';

class Canvas extends Component {
	
	constructor (props) {
	  	super(props);
	  	this.state = {
	  		dis:(this.props.store === undefined  || this.props.store.dis === undefined || this.props.store.dis === "" || this.props.store.dis === null) ? 100 : this.props.store.dis,
	  		num:(this.props.store === undefined || this.props.store.num === undefined || this.props.store.num === "" || this.props.store.num === null) ? 50 : this.props.store.num,
	  		color:(this.props.store === undefined || this.props.store.color === undefined || this.props.store.color === "" || this.props.store.color === null) ? 'rgba(233,200,200,.5)' : this.props.store.color,
	  		sped:(this.props.store === undefined || this.props.store.sped === undefined ||this.props.store.sped === "" || this.props.store.sped === null) ? 5 : this.props.store.sped 
	  	}
	}
	
	componentDidMount() {
        this.updateCanvas();
    }
	
    updateCanvas() {
    		//可选变量
    		const dots = [];
    		 const mweare = {x:null,y:null};
		let dis = this.state.dis;
		let num = this.state.num;
		let color = this.state.color;
		let sped = this.state.sped;
        let canvas = this.refs.canvas;
        let ctx = canvas.getContext('2d');
       
        //定义canvas宽高为屏幕大小
		function resize(){
			canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		}
		resize();
		window.onresize = resize;
		
		//执行动画贞
		var RAF = (function(){
			 return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
		          window.setTimeout(callback, 1000 / 60);
		        };
		})();
		
		//随机函数
		function rands(min,max){
			return parseInt(Math.random() * (max - min + 1) + min);
		}
		
		//随机生成点阵
		function roundot(){
			//随机大小
			this.r = rands(2,10);
			//随机位置,防止超出右边界
			let x = rands(0, canvas.width - this.r);
			let y = rands(0, canvas.height - this.r);
			this.x = x < this.r ? this.r : x;
			this.y = y < this.r ? this.r : y;
			//随机速度
			let speed = rands(1,3);
			this.xa = rands(0,4) > 2 ? speed : -speed;
			this.ya = rands(0,4) > 2 ? speed : -speed;
		}
		
		roundot.prototype.draw = function () {
			ctx.fillStyle = color;
			ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true);
            ctx.closePath();
            ctx.fill();
		}
		
		roundot.prototype.move = function () {
			this.x += this.xa / sped;
			this.y += this.ya / sped;
			
			this.xa *= (this.x > canvas.width-this.r || this.x < this.r) ? -1 : 1;
			this.ya *= (this.y > canvas.height-this.r || this.y < this.r) ? -1 : 1;
			
		}
		
		roundot.prototype.links = function () {
			let that = this;
			dots.forEach(function(dot){
				let l = Math.sqrt(Math.pow(dot.x-that.x,2) + Math.pow(dot.y-that.y,2))
				let o = 1/l*7.5;
				let s = color;
								
				if(l < dis ){
					ctx.moveTo(that.x,that.y);
                    ctx.lineTo(dot.x,dot.y);
                    if(mweare.x !== null && mweare.y !== null){
                    		let ml = Math.sqrt(Math.pow(mweare.x-dot.x,2) + Math.pow(mweare.y-dot.y,2));
                    		ml < dis && ctx.lineTo(mweare.x,mweare.y);
                    }
                    ctx.lineWidth = 1; 
                    ctx.strokeStyle = s.split(",")[0] + ',' + s.split(",")[1] + ',' + s.split(",")[2] + ',' + o + ')';
                    ctx.stroke();
                    ctx.closePath();
				}
			})
		}
		
		function init(){
			for (let i = 0; i < num; i++) {
				let doto = new roundot();
				doto.draw();
				doto.move();
				dots.push(doto);
			}
		}
		
		function animate(){
			ctx.clearRect(0,0,canvas.width,canvas.height);
			dots.forEach(function(dot){
				dot.draw();
				dot.move();
				dot.links();
			})
			RAF(animate);
		}
		
		window.onmousemove = function(e) {
		    canvas.style.opacity = 1;
		    e = e || window.event;
			mweare.x = e.clientX;
			mweare.y = e.clientY;
		};
		
		window.onmouseout = function(e){
			canvas.style.opacity = 0;
			mweare.x = null;
			mweare.y = null;
		}
		
		init();
		animate();
        
    }
	
	render () {
		
		const styleCanvas = {
			position: "absolute",
			top: 0,
			left: 0,
			zIndex:0,
			opacity:0,
			transition:"all .75s"
		}
		
		return (
			<div className = "Canvas">
				<canvas ref="canvas" style={styleCanvas}/>
			</div>
		)
	}
}

export default Canvas
