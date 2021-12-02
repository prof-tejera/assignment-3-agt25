// Converts time to seconds
export function timeInSeconds(hours, minutes, seconds) {
    let totalSeconds = seconds; 
    totalSeconds += minutes * 60;
    totalSeconds += hours * 3600; 
    return totalSeconds;
};


export function alertCountUp(targetTime, currTime) {
    /***********************************
     * Handles stopwatch alerts
     **********************************/

    // Beginning messages 
    if (currTime <= 1) {
        return "Start Running";
    } else if (targetTime - 2 === currTime && targetTime > 8) {
        return "Almost There";
    } else {
        return "Run";
    }
}; 


export function alertCountDown(targetTime, currTime, action, type, round) {
    
    /**********************************************
     * Handles countdown, xy, and tabata alerts
     *********************************************/
    let curr; 

    // XY alert says "keep running" every round
    if (type === "XY" && round > 1) {
        curr = "Keep Running";
    } else {
        if (action === "Run") {
            curr = "Start Running";
        } else if (action === "Rest") {
            curr = "Start Resting";
        };
    }; 

    // Alert for second 1
    if (targetTime - 1 === currTime) {
        return `${curr}`; 
    }; 
    
    // Beginning messages
    if (targetTime > 3) {
        if (targetTime - 1 === currTime) {
            return `${curr}`;
        } else {
            return `${action}`;
        };
    } else {
        return `${action}`;
    }; 
}; 


export function formatTime(time) {
    let formatted = time.toString().length === 1 ? `0${time}` : time; 
    return formatted; 
}