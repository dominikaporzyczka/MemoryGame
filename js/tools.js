// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//based on solution from https://stackoverflow.com/questions/41632942/how-to-measure-time-elapsed-on-javascript
function calcTime(startTime, endTime) {
    let timeDiff = endTime - startTime; //in ms
    // strip the ms
    timeDiff /= 1000;

  // get seconds 
    let seconds = Math.round(timeDiff);
    
    return seconds;
}