audioPlayer = document.querySelector("audio");
console.dir(audioPlayer);

// Выбераем кнопку старт по селектору
startButton = document.querySelector("#start button");

// Выбераем блок старт
startBlock = document.querySelector("#start");
 
// Выбераем игровой блок
gameBlock = document.querySelector("#game");

gamerSkin = "skin_1"
// Создаем переменную для жизней
countLifes = 1;

// Создаем подсчет очков
score = document.querySelector("#score span");

 // Функция кнопки при нажатии изчезает блок старт
startButton.onclick = function() {
   startGame();
}

// Создаем переменную off
sound = "off";

// Выбераем кнопку музыка
soundButton = document.querySelector("#sound img");

 // Прописуем функцию кнопки при нажатии будет меняться картинка мелодии
soundButton.onclick = function() {
   if (sound == "on") {
     soundButton.src = "images/mute_sound.png";
      sound = "off"; 
       audioPlayer.pause();
    } else {
       soundButton.src = "images/sound_on.png";
             sound = "on";
             audioPlayer.play();
   }
}

// Выбераем блок с игроком 
gamer = document.querySelector("#player");

// Создаем функцию перемещения игрока
document.onkeydown = function(event) {
      console.dir(event)
   if(event.keyCode == 87) {
      if(gamer.offsetTop > 70) {
      gamer.style.top = gamer.offsetTop - 40 + "px";
   }
}
   if(event.keyCode == 83) {
      if(gamer.offsetTop < document.querySelector("#app").clientHeight - 200) {
      gamer.style.top = gamer.offsetTop + 40 + "px";
   }
  }
  // Создание пули при нажатии на пробел
  if(event.keyCode == 32){  // выстрел при нажатии на пробел
      createBullet();  // запускаю функцию создания пули 
  }
}

function startGame() {
   startBlock.style.display = "none";
   gameBlock.style.display = "block";
   gamer.className = gamerSkin;
   createEnemy(); //создать врага при запуске
   createLifes(); // создать жизни при запуске;
   
   
}

// Работа с врагами

function createEnemy(){  // создаю первого врага
   var enemy = document.createElement("div"); // создаю переменную первого врага
   enemy.className = "enemy " + typeEnemy(); // назначаю ему класс
   enemy.style.top = random(100, document.querySelector("#app").clientHeight - 140)+ "px";
   gameBlock.appendChild(enemy);  // добавляю его на экран игры
   // enemy.style.top = position + "px";
   
   moveEnemy(enemy);
   }
   
   function typeEnemy(){  //делаю рандом для выбора врага
   
   if (random(1, 2) == 1){
      return "type-1";
   } else{
      return "type-2";
   }
   
}

// position = 100;
// function createEnemy2() {
//    let enemy = document.createElement("div");
//       enemy.className = "enemy type-2";
//       enemy.style.top = position + 500 + "px";
      
//    gameBlock.appendChild(enemy);

//    moveEnemy(enemy);
// }


function moveEnemy(enemy) {
   let timerID = setInterval(function() {
      enemy.style.left = enemy.offsetLeft - 10 + "px";
      console.dir(enemy.offsetLeft);
      if(enemy.offsetLeft < -100) {
         enemy.remove();
         createEnemy();
         // Остановить таймер
         clearInterval(timerID);
         die();
      } 
   }, 100);
}
// 
// создаю пулю 
function createBullet(){  
   let bullet = document.createElement("div"); // добавляю переменную пули
      bullet.className = "bullet";  // присваиваю класс
      bullet.style.top = gamer.offsetTop + 140 + "px"; // пуля вылетает от игрока
      gameBlock.appendChild(bullet);   // вывожу пулю на экран
      bullet.style.display = "block";  // делаю пулю видимой
      moveBullet(bullet);  // передаю функцию движения
}

function moveBullet(bullet){  // прописываю функцию движения пули

   let timerBullet = setInterval(function(){  // делаю переменную таймера интервала движения пули
      bullet.style.left = bullet.offsetLeft + 10 + "px";  // сдвигаю пулю на 10 пкс
   
   if (bullet.offsetLeft > document.querySelector("body").clientWidth + 50){   // добавляю условия при вылете пули за экран
      bullet.remove(); //удаляю пулю
      clearInterval(timerBullet);  //очищаю интервал
      }

      isBoom(bullet);
   }, 10);
}

// Создаю функцию взрыва
function isBoom(bullet) {
   let enemy = document.querySelector(".enemy");

   if(bullet.offsetTop > enemy.offsetTop 
      && bullet.offsetTop < enemy.offsetTop + enemy.clientHeight
      && bullet.offsetLeft > enemy.offsetLeft) {
         createBoom(bullet.offsetTop, bullet.offsetLeft);
         score.innerText = Number(score.innerText) + 1;
         bullet.remove();
         enemy.remove();
         createEnemy();
      }
}

function die(){ // функция уменьшения жизней при вылете врага за экран

   countLifes = countLifes - 1;
   if (countLifes <= 0){

      endGame(); // если жизней не осталось, то выводить Конец Игры
   }

   createLifes(); //создавать жизни
}

function createLifes(){  //функция создания жизней
   var lifesBlock = document.querySelector("#lifes"); //вводим переменную блока жизней
   lifesBlock.innerHTML = "";  //обнуляем количество жизней
   var count = 0;  // создаем переменную счетчика жизней
   while (count < countLifes) { // создем цикл создания жизней
      var span = document.createElement("span"); // переменная  жизней
      lifesBlock.appendChild(span); //прописываем спаны в блок жизней
      count = count + 1;  // увеличиваем счетчик жизней
   }
}

// Создаем фенкцию взрыва при попадании по врагу
function createBoom(top, left) {
   let boom = document.createElement("div");
      boom.className = "boom";
      boom.style.top = top -100 + "px";
      boom.style.left = left - 100 + "px";

   gameBlock.appendChild(boom);
   setTimeout(function() {
      boom.remove();
   }, 1000);   
}

function endGame() {
   let scoreBlock = document.querySelector("#end h3 span");
   scoreBlock.innerText = score.innerText;
   
   gameBlock.innerHTML = "";
   let endBlock = document.querySelector("#end");
   endBlock.style.display = "block";  

   let restartButton = document.querySelector("#end button");
   restartButton.onclick = restart;
}

function restart() {
   location.reload();
}
function random(min,max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
   return Math.round(rand);
}

var selectSkin1 = document.querySelector("#skin_1")  // ввожу переменую первого скина игрока
selectSkin1.onclick = function(){   // ставлю ввыбор первого скина при клике на его иконку
	selectSkin1.className = "selected";
	selectSkin2.className = "";
	gamerSkin = "skin_1";
	
}

let selectSkin2 = document.querySelector("#skin_2") // ввожу переменую второго скина игрока
selectSkin2.onclick = function(){ // ставлю  выбор второго скина при клике на его иконку
	selectSkin2.className = "selected";
	selectSkin1.className = "";
	gamerSkin = "skin_2";
}



