/*
function rotate(){
            var x = canvas.width/2; //画布宽度的一半
            var y = canvas.height/2;//画布高度的一半
            context.clearRect(0,0, canvas.width, canvas.height);//先清掉画布上的内容
            context.translate(x,y);//将绘图原点移到画布中点
            context.rotate((Math.PI/180)*5);//旋转角度
            context.translate(-x,-y);//将画布原点移动
            context.drawImage(image,0,0);//绘制图片     
        }
*/

window.onload = function(){
	const disk = './image/clock/';
	function getDatetime(){
		let da = new Date();
		let hours = da.getHours();
		let minute = da.getMinutes();
		let second = da.getSeconds();
		return [hours,minute,second];
	}
	function timeleng(a){
		return a.toString().padStart(2,'0');
	}
	
	const canvas = document.getElementById('clock');
	let ctx = canvas.getContext('2d');
	let time = getDatetime();
	
	
	const dataImgs = ['time-number.png','hours.png','minute.png','circle-bottom.png',
	'second.png','circle-center.png','circle-top.png'];
	let numberImg = new Image();
	let hourImg = new Image();
	let minuteImg = new Image();
	let secondImg = new Image();
	let circleBottomImg = new Image();
	let circleCenterImg = new Image();
	let circleTopImg = new Image();
	
	
	// 图片全部加载完毕
	numberImg.src=disk+dataImgs[0];
	numberImg.onload = function(){
		hourImg.src=disk+dataImgs[1];
		hourImg.onload = function(){
			minuteImg.src=disk+dataImgs[2];
			minuteImg.onload = function(){
				circleBottomImg.src=disk+dataImgs[3];
				circleBottomImg.onload = function(){
					secondImg.src=disk+dataImgs[4];
					secondImg.onload = function(){
						circleCenterImg.src=disk+dataImgs[5];
						circleCenterImg.onload = function(){
							circleTopImg.src=disk+dataImgs[6];
							circleTopImg.onload = function(){
								initClock();
								setInterval(()=>{
									time[0]=time[0]>12?time[0]-12:time[0];
									initClock();
									time = getDatetime();
								},16);
							}
						}
					}
				}
			}
		}
	};
	
	
	// 刻画刻度
	function kedu(deg,start,end,size=1){
		ctx.rotate(deg);
		ctx.beginPath();
		ctx.moveTo(start,0);
		ctx.lineTo(end,0);
		ctx.lineWidth=size;
		ctx.stroke();
		ctx.closePath();
	}
	
	// 图片中心旋转
	function centerRotateImage(x,y,deg,img,w,h){
		ctx.save();
		ctx.translate(x,y)
		ctx.rotate(Math.PI/180+deg);
		ctx.translate(-x,-y)
		ctx.beginPath();
		ctx.drawImage(img,0,0,w,h);
		ctx.closePath();
		ctx.restore();
	}
	
	// 初始化跟图片相关
	function timeImage(){
		ctx.save();
		let move = 18;
		ctx.translate(-move/2,-move/2)
		ctx.beginPath();
		ctx.drawImage(numberImg,0,0,numberImg.width+move,numberImg.height+move);
		ctx.closePath();
		ctx.restore();
		
		// 小时
		let hourRotate = Math.PI/30*3 + Math.PI/6*time[0] + Math.PI/1800*time[1] + 2*Math.PI/(3600*60)*time[2];
		centerRotateImage(move/2+200-4,move/2+200-4,hourRotate,hourImg,hourImg.width+move,hourImg.height+move);
		
		// 分钟
		let minuteRotate = (-Math.PI/30*13 + Math.PI/180) + Math.PI/30*time[1] + 2*Math.PI/3600*time[2];
		centerRotateImage(move/2+200-4,move/2+200-4,minuteRotate,minuteImg,minuteImg.width+move,minuteImg.height+move);
		
		// 底部
		centerRotateImage(move/2+200-4,move/2+200-4,0,circleBottomImg,circleBottomImg.width+move,circleBottomImg.height+move);
		
		// 秒
		let secondRotate=(-Math.PI/30*4 + Math.PI/3600*8) + Math.PI/30*time[2]  ;
		centerRotateImage(move/2+200,move/2+200,secondRotate,secondImg,secondImg.width+move,secondImg.height+move);
		
		// 中顶部
		centerRotateImage(move/2+200-4,move/2+200-4,0,circleCenterImg,circleCenterImg.width+move,circleCenterImg.height+move);
		centerRotateImage(move/2+200-4,move/2+200-4,0,circleTopImg,circleTopImg.width+move,circleTopImg.height+move);
	}
	
	// 初始化时钟
	function initClock(){
		ctx.clearRect(0,0,400,400);
		ctx.save();
		ctx.translate(200,200);
		ctx.save();
		
		ctx.beginPath();
		ctx.arc(0,0,192,0,Math.PI*2);
		ctx.lineWidth=5;
		ctx.stroke();
		ctx.closePath();
		
		ctx.restore();
		ctx.save();
		
		ctx.textAlign="center";
		// 绘制秒钟刻度
		for(let j=0;j<60;j++){
			kedu(Math.PI/30,178,190);
		}
		ctx.restore();
		ctx.save();
		
		ctx.textAlign="center";
		
		// 绘制分钟刻度
		for(let j=0;j<12;j++){
			kedu(Math.PI/6,170,190,6);
		}
		
		ctx.restore();
		ctx.restore();
		ctx.save();
		//  初始化跟图片相关
		timeImage();
		
	}
	
}
