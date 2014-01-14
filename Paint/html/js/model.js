// JavaScript Document

//define Interface class IProduct
function IProduct1(){}
IProduct1.prototype.cnv = function(){
}
IProduct1.prototype.draw = function(){
}

function IProduct2(){}
IProduct2.prototype.cnv = function(){
}
IProduct2.prototype.draw = function(){
}

function IProduct3(){}
IProduct3.prototype.cnv = function(){
}
IProduct3.prototype.draw = function(){
}

//define line,circle,rectangle class
function Product1(point_x1,point_y1,point_x2,point_y2,color){
	this.point_x1 = point_x1;
	this.point_y1 = point_y1;
	this.point_x2 = point_x2;
	this.point_y2 = point_y2;
	this.color = color;
	IProduct1.call(this);
}
Product1.prototype = new IProduct1();
Product1.prototype.constructor = IProduct1;

function Product2(point_x1,point_y1,width,height,color){
	this.point_x1 = point_x1;
	this.point_y1 = point_y1;
	this.width = width;
	this.height = height;
	this.color = color;
	IProduct2.call(this);
}
Product2.prototype = new IProduct2();
Product2.prototype.constructor = IProduct2;

function Product3(point_x,point_y,r,color){
	this.point_x = point_x;
	this.point_y = point_y;
	this.r = r;
	this.color = color;
	IProduct3.call(this);
}
Product3.prototype = new IProduct3();
Product3.prototype.constructor = IProduct3;

//rewrite cnv()
Product1.prototype.cnv = function(){
	document.getElementById("x").value = this.point_x1;
	document.getElementById("y").value = this.point_y1;
}
Product2.prototype.cnv = function(){
	document.getElementById("x").value = this.point_x1;
	document.getElementById("y").value = this.point_y1;
}
Product3.prototype.cnv = function(){	
	document.getElementById("x").value = this.point_x;
	document.getElementById("y").value = this.point_y;
}

//rewrite draw()
Product1.prototype.draw = function(){
	//alert("Start draw line");
	var c=document.getElementById("page");
	var cxt=c.getContext("2d");
	var x1 = this.point_x1;
	var y1 = this.point_y1;
	var x2 = this.point_x2;
	var y2 = this.point_y2;
	//alert(x1+","+y1+","+x2+","+y2);
	cxt.fillStyle=this.color;
	cxt.lineTo(x1,y1);
	cxt.lineTo(x2,y2);
	cxt.stroke();
}
Product2.prototype.draw = function(){
	//alert("Start draw rectangle");
	var x,y,width,height;
	var c=document.getElementById("page");
	var cxt=c.getContext("2d");
	var x1 = this.point_x1;
	var y1 = this.point_y1;
	var width = this.width;
	var height = this.height;
	cxt.fillStyle=this.color;
	cxt.fillRect(x1,y1,width,height);
}
Product3.prototype.draw = function(){
	//alert("Start draw circle");
	var c=document.getElementById("page");
	var cxt=c.getContext("2d");
	var x = this.point_x;
	var y = this.point_y;
	var r = this.r;
	cxt.fillStyle=this.color;
	cxt.beginPath();
	cxt.arc(x,y,r,0,Math.PI*2,true);
	cxt.closePath();
	cxt.fill();
}

//define Interface class IFactory
function IFactory(){}
IFactory.prototype.createProduct1 = function(){}
IFactory.prototype.createProduct2 = function(){}
IFactory.prototype.createProduct3 = function(){}

//define class Factory
function Factory(){
	IFactory.call(this);
}
Factory.prototype = new IFactory();
Factory.prototype.constructor = IFactory;

//rewrite createProduct1,createProduct2,createProduct3
Factory.prototype.createProduct1 = function(point_x1,point_y1,point_x2,point_y2,color){
	return new Product1(point_x1,point_y1,point_x2,point_y2,color);
}
Factory.prototype.createProduct2 = function(point_x1,point_y1,width,height,color){
	return new Product2(point_x1,point_y1,width,height,color);
}
Factory.prototype.createProduct3 = function(point_x,point_y,r,color){
	return new Product3(point_x,point_y,r,color);
}


