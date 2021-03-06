(function() {
   "use strict";
   //The class that describes the game settings (level, background) and how we can change it
   class Settings {
      constructor() {
         this.levels = document.getElementsByClassName("level");
         this.backgrounds = document.getElementsByClassName("background");
         this.startButton = document.getElementById('start');
         this.chosenLevel = this.levels[0];
         this.level = 'easy';
         this.chosenBackground = this.backgrounds[0];
         this.background = 'img/backgrounds/background1.jpg';
      }
      changeLevel() {
         settings.chosenLevel.classList.remove('chosen-level');
         this.classList.add('chosen-level');
         settings.chosenLevel = this;
         switch (this.getAttribute('id')) {
            case 'easy-level':
               settings.level = 'easy';
               break;
            case 'medium-level':
               settings.level = 'medium';
               break;
            case 'hard-level':
               settings.level = 'hard';
               break;
         }
      }
      changeBackground() {
         settings.chosenBackground.classList.remove('chosen-background');
         this.classList.add('chosen-background');
         settings.chosenBackground = this;
         switch (this.getAttribute('id')) {
            case 'background1':
               settings.background = 'img/backgrounds/background1.jpg';
               break;
            case 'background2':
               settings.background = 'img/backgrounds/background2.jpg';
               break;
            case 'background3':
               settings.background = 'img/backgrounds/background3.jpg';
               break;
            case 'background4':
               settings.background = 'img/backgrounds/background4.jpg';
               break;
            case 'background5':
               settings.background = 'img/backgrounds/background5.jpg';
               break;
            case 'background6':
               settings.background = 'img/backgrounds/background6.jpg';
               break;
            default:
               settings.background = 'img/backgrounds/background1.jpg';
         }
      }
   }
   let settings = new Settings();
   Array.prototype.forEach.call(settings.levels, function(item) {
      item.onclick = settings.changeLevel;
   });
   Array.prototype.forEach.call(settings.backgrounds, function(item) {
      item.onclick = settings.changeBackground;
   });
   document.getElementById('start').onclick = start;
   //When called this function, the game starts 
   function start() {
	  //The class that contains card data for this game, and also methods for mixing cards and building HTML for the game
      class Game {
         constructor(cards) {
            this.cardsArray = (function() {
               switch (settings.level) {
                  case 'easy':
                     return this.shuffle(cards.slice(0, 6).concat(cards.slice(0, 6)));
                  case 'medium':
                     return this.shuffle(cards.slice(0, 12).concat(cards.slice(0, 12)));
                  case 'hard':
                     return this.shuffle(cards.slice(0, 18).concat(cards.slice(0, 18)));
               }
            }).apply(this);			
            this.background = settings.background;
			this.game = document.querySelector(".game");
         }
         shuffle(arr) {
            let length = arr.length;
            for (let i = 0; i <= 100; i++) {
               let a = Math.floor(Math.random() * length);
               let b = Math.floor(Math.random() * length);
               [arr[a], arr[b]] = [arr[b], arr[a]];
            }
            return arr;
         }
         buildGame() {
            let length = this.cardsArray.length;
            let cardHtml = '<div class="gamearea">';
            for (let i = 0; i < length; i++) {
               cardHtml += '<div class="card" data-id="' + i +
                  '"><div class="inside">\
				<div class="front"><img src=' + this.cardsArray[i] +
                  '\
				 />\
				</div>\
				<div class="back"><img src=' + this.background +
                  '\
				 />\
				</div></div>\
				</div>';
            }
			cardHtml += '</div>';
            cardHtml += '<button class="exit" id="exit">Exit</button>';
            this.game.innerHTML = cardHtml;
            document.getElementById('exit').onclick = function() {
               window.location.reload.call(window.location);
               window.scrollTo(0, 0);
            };
         }
      }
	  /*the class that contains enviroment for the game: Array of clicked elements, Pause state, steps counter,
	  counter of matched cards, full deck of cards, deck of cards for this game, and methods for shuffling deck 
	  of cards, turn cards, behavior when card is clicked and ckecking if cards are the same*/
      class Enviroment {
         constructor() {
            this.restartButton = document.querySelector("button.restart");
            this.clicked = [];
            this.paused = false;
            this.steps = 0;
            this.matched = 0;
            this.cardsArray = ['img/cards/2_of_clubs.png', 'img/cards/3_of_clubs.png',
               'img/cards/4_of_clubs.png', 'img/cards/5_of_clubs.png', 'img/cards/6_of_clubs.png',
               'img/cards/7_of_clubs.png', 'img/cards/8_of_clubs.png', 'img/cards/9_of_clubs.png',
               'img/cards/10_of_clubs.png', 'img/cards/jack_of_clubs2.png',
               'img/cards/queen_of_clubs2.png', 'img/cards/king_of_clubs2.png',
               'img/cards/ace_of_clubs.png', 'img/cards/2_of_hearts.png',
               'img/cards/3_of_hearts.png', 'img/cards/4_of_hearts.png', 'img/cards/5_of_hearts.png',
               'img/cards/6_of_hearts.png', 'img/cards/7_of_hearts.png', 'img/cards/8_of_hearts.png',
               'img/cards/9_of_hearts.png', 'img/cards/10_of_hearts.png',
               'img/cards/jack_of_hearts2.png', 'img/cards/queen_of_hearts2.png',
               'img/cards/king_of_hearts2.png', 'img/cards/ace_of_hearts.png',
               'img/cards/2_of_spades.png', 'img/cards/3_of_spades.png', 'img/cards/4_of_spades.png',
               'img/cards/5_of_spades.png', 'img/cards/6_of_spades.png', 'img/cards/7_of_spades.png',
               'img/cards/8_of_spades.png', 'img/cards/9_of_spades.png',
               'img/cards/10_of_spades.png', 'img/cards/jack_of_spades2.png',
               'img/cards/queen_of_spades2.png', 'img/cards/king_of_spades2.png',
               'img/cards/ace_of_spades2.png', 'img/cards/2_of_diamonds.png',
               'img/cards/3_of_diamonds.png', 'img/cards/4_of_diamonds.png',
               'img/cards/5_of_diamonds.png', 'img/cards/6_of_diamonds.png',
               'img/cards/7_of_diamonds.png', 'img/cards/8_of_diamonds.png',
               'img/cards/9_of_diamonds.png', 'img/cards/10_of_diamonds.png',
               'img/cards/jack_of_diamonds2.png', 'img/cards/queen_of_diamonds2.png',
               'img/cards/king_of_diamonds2.png', 'img/cards/ace_of_diamonds.png',
               'img/cards/joker_black.png', 'img/cards/joker_red.png'
            ];
            this.cardsForThisGame = this.shuffleCards(this.cardsArray);
         }
         shuffleCards(arr) {
            let length = arr.length;
            for (let i = 0; i <= 100; i++) {
               let a = Math.floor(Math.random() * length);
               let b = Math.floor(Math.random() * length);
               [arr[a], arr[b]] = [arr[b], arr[a]];
            }
            return arr;
         }
         turnCard(card) {
            card.classList.add('picked');
         }
		 cardClick() {
            if (enviroment.paused || this.classList.contains('picked') || this.classList.contains(
                  'matched')) {
               return;
            }
            if (enviroment.clicked.length === 0) {
               enviroment.steps++;
            }
            document.getElementById('stepCounter').innerText = enviroment.steps;
            enviroment.turnCard(this);
            enviroment.clicked.push(this);
            let clickSound = new Audio();
            clickSound.src = 'sounds/click.mp3';
            clickSound.autoplay = true;
            if (enviroment.clicked.length === 2) {
               enviroment.paused = true;
               setTimeout(enviroment.checkClicked.bind(enviroment), 1000, enviroment.clicked);
            }
         }
         checkClicked(arr) {
            if (arr[0].innerHTML === arr[1].innerHTML) {
               (function() {
                  let successSound = new Audio();
                  successSound.src = 'sounds/success.wav';
                  successSound.autoplay = true;
               })();
               arr[0].classList.add("matched");
               arr[0].classList.remove("picked");
               arr[1].classList.add("matched");
               arr[1].classList.remove("picked");
               arr.length = 0;
               this.matched++;
               if (this.matched === currentGame.cardsArray.length / 2) {
                  clearTimeout(timerId);
                  document.getElementById('game').classList.add('game-over');
                  document.getElementById('result').classList.add('show');
                  document.getElementById('stepTotal').innerText = this.steps;
               }
               this.paused = false;
            } else {
               arr[0].classList.remove('picked');
               arr[1].classList.remove('picked');
               arr.length = 0;
               this.paused = false;
            }
         }         
      }
	  
	  //The class that contains data about timer and methods for definition of current Time and for display the time
      class Timer {
         constructor(time) {
            this.startTime = time;
         }
         currentTime() {
            return new Date() - this.startTime;
         }
         timerShow() {
            let hours = Math.floor(this.currentTime() / 3600000);
            let minutes = Math.floor((this.currentTime() / 60000) % 60);
            let seconds = Math.floor((this.currentTime() / 1000) % 60);
            document.getElementById('hours').innerText = hours >= 10 ? hours + ":" : "0" + hours + ":";
            document.getElementById('minutes').innerText = minutes >= 10 ? minutes + ":" : "0" +
               minutes + ":";
            document.getElementById('seconds').innerText = seconds >= 10 ? seconds : "0" + seconds;
         }
      }
      window.scrollTo(0, 0);
      document.getElementById('rules').classList.add('hidden');
      document.getElementById('status').classList.remove('hidden');
      let enviroment = new Enviroment();
      let currentGame = new Game(enviroment.cardsForThisGame);
      currentGame.buildGame();
      let cards = document.getElementsByClassName("card");
      let timer = new Timer(new Date());
      let timerId = setInterval(timer.timerShow.bind(timer), 1000);
      Array.prototype.forEach.call(cards, function(item) {
         item.onclick = enviroment.cardClick;
      });
      document.getElementById('restart').onclick = function() {
         window.location.reload.call(window.location);
         window.scrollTo(0, 0);
      };
   }
})();