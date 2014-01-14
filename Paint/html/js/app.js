// JavaScript Document

//The use function

//define model array
var l = 0,r = 0, c = 0;
var line = new Array();
var rectangle = new Array();
var circle = new Array();
var MAIN_CANVAS_WIDTH=1280; 
var MAIN_CANVAS_HEIGHT=600; 
var currentRectX=0; 
var currentRectY=0; 
var startDragRectX=0; 
var startDragRectY=0; 
var startDragMouseX=0; 
var startDragMouseY=0; 
var RECT_WIDTH=0; 
var RECT_HEIGHT=0;
var color;
var Now;
var mainCt;

//binding function
window.onload = bind;

function bind(){
	document.getElementById("choose").setAttribute("onclick","bind_choose();");
	document.getElementById("line").setAttribute("onclick","bind_line();");
	document.getElementById("rectangle").setAttribute("onclick","bind_rectangle();");
	document.getElementById("circle").setAttribute("onclick","bind_circle();");
	document.getElementById("color").setAttribute("onchange","color_change();");
	document.getElementById("fill").setAttribute("onclick","bind_fill();")
}

function bind_fill(){
	document.getElementById("page").setAttribute("onmousedown","get_model_fill();");
	//document.getElementById("page").setAttribute("onmousedown","");
	document.getElementById("page").setAttribute("onmouseup","");
	document.getElementById("page").style.cursor = "";
}

function bind_choose(){
	document.getElementById("page").setAttribute("onmousedown","get_model();");
	//document.getElementById("page").setAttribute("onmousedown","");
	document.getElementById("page").setAttribute("onmouseup","");
	document.getElementById("page").style.cursor = "";
}


function bind_line(){
	document.getElementById("page").setAttribute("onclick","");
	document.getElementById("page").setAttribute("onmousedown","drawLine1();");
	document.getElementById("page").setAttribute("onmouseup","drawLine2();");
	document.getElementById("page").style.cursor = "crosshair";
}

function bind_rectangle(){
	document.getElementById("page").setAttribute("onclick","");
	document.getElementById("page").setAttribute("onmousedown","drawRectangle1();");
	document.getElementById("page").setAttribute("onmouseup","drawRectangle2();");
	document.getElementById("page").style.cursor = "crosshair";
}

function bind_circle(){
	document.getElementById("page").setAttribute("onmousedown","");
	document.getElementById("page").setAttribute("onmouseup","");
	document.getElementById("page").setAttribute("onclick","drawCircle()");
	document.getElementById("page").style.cursor = "crosshair";
}


//controll function

//get color
function color_change(){
	var id=document.getElementById("color").options.selectedIndex;
	var value=document.getElementById("color").options[id].value;
	document.getElementById("incolor").value = value;
}

//get (x,y)
function get_x(){
	var x = event.clientX;
	return x-61;
}
function get_y(){
	var y = event.clientY;
	return y-40;
}

//draw line
function drawLine1(){
	var point_x1 = get_x();
	var point_y1 = get_y();
	var point_x2 = 0;
	var point_y2 = 0;
	var color = 0;
	var factory = new Factory();
	factory.createProduct1(point_x1,point_y1,point_x2,point_y2,color).cnv();
	//alert(document.getElementById("x1").value);
	
}
function drawLine2(){
	var point_x2 = get_x();
	var point_y2 = get_y();
	var point_x1 = document.getElementById("x").value;
	var point_y1 = document.getElementById("y").value;
	var color = document.getElementById("incolor").value;
	//alert(point_x2+","+point_y2);
	var factory = new Factory();
	var Line = factory.createProduct1(point_x1,point_y1,point_x2,point_y2,color);
	line[l] = Line;
	l++;
	//alert(document.getElementById("x1").value);
	Line.draw();
}

//draw rectangle
function drawRectangle1(){
	var point_x1 = get_x();
	var point_y1 = get_y();
	var width = 0;
	var height = 0;
	var color = 0;
	var factory = new Factory();
	factory.createProduct2(point_x1,point_y1,width,height,color).cnv();
}
function drawRectangle2(){
	var point_x2 = get_x();
	var point_y2 = get_y();
	var point_x1 = document.getElementById("x").value;
	var point_y1 = document.getElementById("y").value;
	var height = point_y2-point_y1;
	var width = point_x2-point_x1;
	var color = document.getElementById("incolor").value;
	var factory = new Factory();
	var Rectangle = factory.createProduct2(point_x1,point_y1,width,height,color);
	rectangle[r] = Rectangle;
	r++;
	Rectangle.draw();
}

//draw circle
function drawCircle(){
	var point_x = get_x();
	var point_y = get_y();
	var r = document.getElementById("r2").value;
	var color = document.getElementById("incolor").value;
	var factory = new Factory();
	var Circle = factory.createProduct3(point_x,point_y,r,color);
	circle[c] = Circle;
	c++;
	Circle.cnv();
	Circle.draw();
}

//move fucntion

//move rectangle function
function pageInit(){ 
	mainCanvas=document.getElementById("page"); 
	mainCanvas.setAttribute("onmousedown","canvasMouseDownHandler(event);");
	canvasMouseDownHandler(event);
	mainCanvas.setAttribute("onmouseup","canvasMouseUpHandler(event);");
	//canvasMouseMoveHandler(event);
	//mainCanvas.onmousedown=canvasMouseDownHandler; 
	//mainCanvas.onmouseup=canvasMouseUpHandler; 
	redrawRect(); 
}

function canvasMouseDownHandler(event){ 
	var canvasMouseX=event.layerX; 
	if(!canvasMouseX){ 
		canvasMouseX=event.x; 
	} 
	var canvasMouseY=event.layerY; 
	if(!canvasMouseY){ 
	     canvasMouseY=event.y; 
	} 
	
	if(canvasMouseX>currentRectX&&canvasMouseX<currentRectX+RECT_WIDTH&&canvasMouseY>currentRectY&&canvasMouseY<currentRectY+RECT_HEIGHT){ 
	     //mainCanvas.onmousemove=canvasMouseMoveHandler; 
		 mainCanvas.setAttribute("onmousemove","canvasMouseMoveHandler(event);");
		 canvasMouseMoveHandler(event);
	     startDragMouseX=canvasMouseX; 
	     startDragMouseY=canvasMouseY; 
	     startDragRectX=currentRectX; 
	     startDragRectY=currentRectY; 
	} 
}
function canvasMouseMoveHandler(event){ 
	var canvasMouseX=event.layerX; 
	if(!canvasMouseX){ 
	     canvasMouseX=event.x; 
	} 
	var canvasMouseY=event.layerY; 
	if(!canvasMouseY){ 
	     canvasMouseY=event.y; 
	} 
	
	currentRectX=startDragRectX+canvasMouseX-startDragMouseX; 
	currentRectY=startDragRectY+canvasMouseY-startDragMouseY; 
	redrawRect(); 
}

function canvasMouseUpHandler(event){ 
	mainCanvas.onmousemove=null;
}

function redrawRect(){
	var x,y,z;
	mainCt=mainCanvas.getContext("2d"); 
    mainCt.clearRect(0,0,MAIN_CANVAS_WIDTH,MAIN_CANVAS_HEIGHT); 
    mainCt.fillStyle=color;
	mainCt.fillRect(currentRectX,currentRectY,RECT_WIDTH,RECT_HEIGHT); 
	change_model();
	for(x in line){
		line[x].draw();
	}
	for(y in rectangle){
		if( y != Now){
			rectangle[y].draw();
		}
	}
	for(z in circle){
		circle[z].draw();
	}
} 
  
function move_rectangle(model,i){
	Now = i;
	currentRectX=model.point_x1; 
	currentRectY=model.point_y1; 
	startDragRectX=0; 
	startDragRectY=0; 
	startDragMouseX=0; 
	startDragMouseY=0; 
	RECT_WIDTH=model.width; 
	RECT_HEIGHT=model.height;
	color=model.color
	pageInit();
}

//get picture function
function get_model(){
	var model;
	var i;
	var x = get_x();
	var y = get_y();
	for(i in rectangle){
		if(x>=rectangle[i].point_x1&&x<=rectangle[i].point_x1+rectangle[i].width&&y>=rectangle[i].point_y1&&y<=rectangle[i].point_y1+rectangle[i].height){
			model = rectangle[i];
			document.getElementById("page").setAttribute("onmousedown","");
			move_rectangle(model,i);
		}
	}
	for(i in circle){
		var a = Math.abs(x - circle[i].point_x);
		var b = Math.abs(y - circle[i].point_y);
		var c = Math.sqrt(a*a+b*b);
		if(c <= circle[i].r){
			model = circle[i];
			document.getElementById("page").setAttribute("onmousedown","");
			move_rectangle(model);
		}
	}
}

function change_model(){
	rectangle[Now].pointx_1 = currentRectX;
	rectangle[Now].pointx_2 = currentRectY;
	rectangle[Now].width = RECT_WIDTH;
	rectangle[Now].height = RECT_HEIGHT;
}

//color fill
function color_fill(model){
	var	mainCanvas=document.getElementById("page"); 
	var color=document.getElementById("incolor").value;
	currentRectX=model.point_x1; 
	currentRectY=model.point_y1; 
	RECT_WIDTH=model.width; 
	RECT_HEIGHT=model.height;
	mainCt=mainCanvas.getContext("2d"); 
    mainCt.clearRect(0,0,MAIN_CANVAS_WIDTH,MAIN_CANVAS_HEIGHT); 
    mainCt.fillStyle=color;
	mainCt.fillRect(currentRectX,currentRectY,RECT_WIDTH,RECT_HEIGHT); 
}


function get_model_fill(){
	var model;
	var i;
	var x = get_x();
	var y = get_y();
	for(i in rectangle){
		if(x>=rectangle[i].point_x1&&x<=rectangle[i].point_x1+rectangle[i].width&&y>=rectangle[i].point_y1&&y<=rectangle[i].point_y1+rectangle[i].height){
			model = rectangle[i];
			document.getElementById("page").setAttribute("onmousedown","");
			color_fill(model);
		}
	}
	for(i in circle){
		var a = Math.abs(x - circle[i].point_x);
		var b = Math.abs(y - circle[i].point_y);
		var c = Math.sqrt(a*a+b*b);
		if(c <= circle[i].r){
			model = circle[i];
			document.getElementById("page").setAttribute("onmousedown","");
		}
	}
}