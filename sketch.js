//Create variables here
var Dog,HappyDog,database,foodStock,foodS
var dog
var fedTime,lastFed
var foodObj
var feed,addfood
function preload()
{
  //load images here
  Dog=loadImage("images/dogImg.png")
  HappyDog=loadImage("images/dogImg1.png")

}

function setup() {
  database=firebase.database()
  createCanvas(500, 500);
  foodObj=new Food()
  dog=createSprite(60,130,50,40)
  dog.addImage(Dog)
  dog.scale=0.1
  foodStock=database.ref('Food')
  foodStock.on("value",readStock)
  feed=createButton("feed the dog")
  feed.position(200,95)
 // feed.mousePressed(feedDog)
  addfood=createButton("add the food")
  addfood.position(130,100)
 // addfood.mousePressed(addFoods)
}


function draw() {  
  background(46,139,87)
  
  
 
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
  lastFed=data.val();
  })
  
  foodObj.display()
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("last Feed :"+ lastFed%12 + "PM",350,30);
  }else if(lastFed===0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed :"+ lastFed + "AM",350,30);
}
drawSprites();
}
function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}
function feedDog(){
  dog.addImage(HappyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}




