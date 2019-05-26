var A
var B
var m1
var m2
var v1
var v2
var Kn
var button
var cn
var isElastic=true;
var Elastic;
var together;
function roundOne( num){
return Math.round(num*100)/100

}

function restart(){
A.m=parseInt(m1.value());
	A.v=parseInt(v1.value());
	B.m=parseInt(m2.value());
	B.v=parseInt(v2.value());
	A.x=20
	B.x=350
 together=false;

}

function Box(){

this.x=0
this.y=0
this.v=0
this.m=1
this.l=50
this.draw=function(){
stroke(0)
fill(245,255-this.m,130)
rect(this.x,this.y,this.l,this.l)
}
this.update=function(){
this.x+=this.v;
}
this.CollisionHandler=function(obj ){

this.CollisionWall();

if( obj.x<= this.x+50 && this.x+50<= obj.x+obj.l  && !together){
if (isElastic){

var a=this.v;
var b=obj.v;
this.v=(a*(this.m-obj.m)+2*obj.m*obj.v)/(obj.m+this.m)
obj.v=(2*this.m*a+b*(obj.m-this.m))/(obj.m+this.m)
}
else{
	obj.v=this.v*obj.m/(this.m+obj.m)
  this.v=obj.v;
	together=true;
}
}


}


this.CollisionWall=function(){


if (this.x<=0 ||this.x+50>=499  ){
	this.v= -this.v
}

}



}

function setup(){
	cn= createCanvas(800,520)
	cn.parent("left")
	textFont(loadFont("https://fonts.googleapis.com/css?family=Fredoka+One" ))
Elastic=createCheckbox("Elastic Collision",true)
Elastic.changed(function (){   if (this.checked()) {
    isElastic=true;
  } else {
    isElastic=false;
  }});
	Elastic.position(520,300)
m1 = createInput(0, 100, 1);
m1.position(520, 70);
m2= createInput(0, 100, 1);
m2.position(520, 120);
v1 = createInput(0, 100, 1);
v1.position(520, 170);
v2 = createInput(0, 100, 1);
v2.position(520, 220);
A=new Box()
A.x=20
A.y=349
A.v=5
B=new Box();
B.x=350
B.y=399-B.l;
B.v=2
B.m=10
button=createButton("")
button.addClass("fas fa-redo")
button.position(19, 19);
button.mousePressed(restart);

m1.value(A.m)
v1.value(A.v)
m2.value(B.m)
v2.value(B.v)

}
function draw(){
background(240)
stroke(0)
fill(0)
line(0,0,0,500)
line(0,500,500,500)
line(500,500,500,0)
line(500,0,0,0)
fill(245,255,130)
rect(0,400,499,100)
A.draw();
A.update();
A.CollisionHandler(B);
B.draw();
B.update();
B.CollisionWall();
kn=round((A.m*A.v*A.v+B.m*B.v*B.v)/2)
stroke(0)
fill(20)
textSize(18)
text('Kinetic Energy: '+kn+'J',520,32)
textSize(13)
text("Mass of Box One:  "+roundOne(A.m)+"kg",520,50)
text("Mass of Box Two:  "+roundOne(B.m)+"kg",520,100)
text("Veloctiy of Box One:  "+roundOne(A.v)+"m/s",520,150)
text("Velocity of Box Two:  "+roundOne(B.v)+"m/s",520,200)


}
