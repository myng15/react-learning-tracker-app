//Get random color based on desired Hue, Saturation and Lightness ranges
function rand(min, max) {
    return parseInt(Math.random() * (max-min+1), 10) + min;
}

function getRandomColor() {
    var h = rand(180, 300); 
    var s = rand(30, 100);
    var l = rand(20, 70);
    return 'hsl(' + h + ',' + s + '%,' + l + '%)';
}

export default getRandomColor