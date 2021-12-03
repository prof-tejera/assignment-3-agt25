// Converts time to seconds
export function timeInSeconds(hours, minutes, seconds) {
    let totalSeconds = seconds; 
    totalSeconds += minutes * 60;
    totalSeconds += hours * 3600; 
    return totalSeconds;
};


// Converts seconds to minutes 
export function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60); 
    let secs = seconds % 60; 
    
    return `${minutes}:${secs}`;
}; 


export function formatMins(seconds) {
    let minutes = Math.floor(seconds / 60);
    minutes = minutes.toString(); 
    if (minutes.length === 1) {
        minutes = `0${minutes}`
    };
    return minutes; 
};

export function formatSecs(seconds) {
    let secs = seconds % 60;
    secs = secs.toString();
    if (secs.length === 1) {
        secs = `0${secs}`
    };
    return secs; 
};