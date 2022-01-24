const EventEmitter = require('events');

const emitter = new EventEmitter();

const decreaseTimer =  (timer) => {
    if(timer.seconds > 0){
        timer.seconds --;
        // console.log(`Timer ${timer.name} least: ${timer.years} years: ${timer.months} months: ${timer.days} days: ${timer.hours} hours: ${timer.minutes} minutes: ${timer.seconds} seconds`)
        emitter.emit('timer_tick', `Timer ${timer.name} least: ${timer.years} years: ${timer.months} months: ${timer.days} days: ${timer.hours} hours: ${timer.minutes} minutes: ${timer.seconds} seconds`)
    }
    if (timer.seconds === 0){
       if(timer.minutes > 0) {
           timer.minutes--;
           timer.seconds =  60;
           decreaseTimer(timer)
       } else if(timer.minutes === 0){
           if(timer.hours > 0){
               timer.hours --;
               timer.minutes = 60;
               decreaseTimer(timer)
           }
           if(timer.hours === 0){
               if(timer.days > 0){
                   timer.days --;
                   timer.hours = 24;
                   decreaseTimer(timer)
               }
               if( timer.days === 0){
                   if(timer.months > 0){
                       timer.months --;
                       timer.days = 30;
                       decreaseTimer(timer)
                   }
                   if(timer.months === 0){
                       if(timer.years > 0){
                           timer.years --;
                           timer.months = 12;
                           decreaseTimer(timer)
                       }
                       if( timer.years === 0 && timer.months === 0 && timer.days ===0 && timer.hours === 0 && timer.minutes === 0 && timer.seconds === 0){
                           emitter.emit('timer_finish',`Timer ${timer.name} finished`)
                       }
                   }
               }
           }
       }
    }
}

const createTimer = (arg) => {
    let timer = arg.split('-');
    const timerObj = {
        name: arg,
        seconds: Number(0),
        minutes: Number(0),
        hours: timer[0],
        days: timer[1],
        months: timer[2],
        years: timer[3]};
    return timerObj;
}

const initTimer = (arg) => {
   let timer = createTimer(arg);
    setInterval(() => decreaseTimer(timer), 1000)
}
emitter.on('timer_tick', console.log)
emitter.once('timer_finish', console.log)

initTimer('1-2-3-4')