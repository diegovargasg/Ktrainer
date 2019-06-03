class Ktrainer {

  constructor(kTrainer) {
    this.kTrainer  = kTrainer;
    this.btn       = this.kTrainer.find('#btn');
    this.timer     = this.kTrainer.find('#timer');
    this.time      = 60;
    this.isRunning = false;
    this.level     = sessionStorage.getItem('level');

    if (this.level === null) {
      sessionStorage.setItem('level', 1);
      this.level = 1;
    }

    this.setupBtn();
  }

  setupBtn() {
    this.btn.on('click', () => {
      if(!this.isRunning) {
        this.startTimer();  
      } else {
        this.stopTimer();
      }
    });
  }

  updateTimer() {

    this.time--;

    if(this.time >= 0) {
      $(this.timer).find('span').text(this.time);
      if(this.level % 2 === 0) {
        if((60 - this.time) % 2 === 0) {
          window.navigator.vibrate(200);
          $(this.timer).toggleClass('contract');  
        }
      } else {
        if((60 - this.time) % 5 === 0) {
          window.navigator.vibrate(200);
          $(this.timer).toggleClass('contract'); 
        }
      }

    } else {
      this.stopTimer();
      //only here update the current level
      this.level++;
      sessionStorage.setItem('level', this.level);
    }
  }

  startTimer() {
    this.isRunning = true;
    this.btn.html('Stop');
    this.interval = setInterval(() => {this.updateTimer()}, 1000);
  }

  stopTimer() {
    this.isRunning = false;
    this.time      = 60;
    $(this.timer).find('span').text(this.time);
    $(this.timer).removeClass('contract');
    this.btn.html('Start');
    clearInterval(this.interval);
  }
}