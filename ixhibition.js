var urlList = [
    "images/EarthMoon.jpg"
    , "images/Fuji.jpg"
    , "images/SeaMist.jpg"
    , "images/Bahamas.jpg"
];

var transition_type = "vertical"; //vertical-reverse, horizontal, horizontal-reverse, stack

var display_time = 4,
    phaseIn_duration = 1,
    phaseOut_duration = 1,
    transition_overlap = 0.5,
    loopCount = "3";

var fullPhase_duration = display_time + phaseIn_duration + phaseOut_duration;

var totalTime = urlList.length * (fullPhase_duration - transition_overlap);
console.log("totalTime time is: " + totalTime);

var fullPhase_percentage = fullPhase_duration / totalTime * 100;
console.log("fullPhase_percentage: " + fullPhase_percentage);

var display_percentage = (display_time / fullPhase_duration) * fullPhase_percentage,
    phaseIn_percentage = (phaseIn_duration / fullPhase_duration) * fullPhase_percentage,
    phaseOut_percentage = (phaseOut_duration / fullPhase_duration) * fullPhase_percentage;
console.log("display_percentage: " + display_percentage);
console.log("phaseIn_percentage: " + phaseIn_percentage);
console.log("phaseOut_percentage: " + phaseOut_percentage);



var delayList = [0],
    ulCounter = urlList.length - 1;
while (ulCounter--) delayList.push(delayList[delayList.length - 1] + fullPhase_duration - transition_overlap);
console.log("delayList: ");
console.log(delayList);



var fadeIn = true,
    fadeOut = true;

var phaseIn_animations = [
    {"transform": "rotateY(90deg)"},
    //{"transform": "rotateY(20deg)"},
    {"transform": "rotateY(0deg)"}
];

var phaseOut_animations = [
    {"transform": "rotateY(0deg)"},
    //{"transform": "rotateY(-20deg)"},
    {"transform": "rotateY(-90deg)"}
];

var phaseIn_length = phaseIn_animations.length,
    phaseOut_length = phaseOut_animations.length;

function processPhaseAnimations() {

    if (phaseIn_length == 1 || phaseOut_length == 1) {
        //Throw Error
        phaseIn_animations = phaseOut_animations = []; //Temporary
        phaseIn_length = phaseOut_length = 0;
    }

    if (fadeIn) {
        if (phaseIn_length) {
            phaseIn_animations[0]["opacity"] = "0";
            phaseIn_animations[phaseIn_length - 1]["opacity"] = "1";
        }else {
            phaseIn_animations[0] = {"opacity": "0"};
            phaseIn_animations[1] = {"opacity": "1"};
        }
    }
    if (fadeOut) {
        if (phaseOut_length) {
            phaseOut_animations[0]["opacity"] = "1";
            phaseOut_animations[phaseOut_length - 1]["opacity"] = "0";
        }else {
            phaseOut_animations[0] = {"opacity": "1"};
            phaseOut_animations[1] = {"opacity": "0"};
        }
    }

}

processPhaseAnimations();

function getCSSFormat(animationObject) {

    var cssValue = "{";
    for (var key in animationObject) cssValue += key + ":" + animationObject[key] + ";";
    cssValue += "}";

    return cssValue;

}


var keyframePositions = [0],
    keyframeValues = "";

function processKeyFrames(argument) {

    var phaseIn_divider = phaseIn_length - 1,
        phaseOut_divider = phaseOut_length - 1;

    var phaseIn_intervals = (phaseIn_divider ? (phaseIn_percentage / phaseIn_divider) : (phaseIn_percentage) ),
        phaseOut_intervals = (phaseOut_divider ? (phaseOut_percentage / phaseOut_divider) : (phaseOut_percentage) );

    while (phaseIn_divider--) keyframePositions.push(keyframePositions[keyframePositions.length - 1] + phaseIn_intervals);
    keyframePositions.push(keyframePositions[keyframePositions.length - 1] + display_percentage);
    while (phaseOut_divider--) keyframePositions.push(keyframePositions[keyframePositions.length - 1] + phaseOut_intervals);
    keyframePositions.push(100);

    console.log("keyframePositions is: ");
    console.log(keyframePositions);

    var phase_animations = phaseIn_animations.concat(phaseOut_animations).concat([{}]);

    for (var paCounter = 0; paCounter < phase_animations.length; paCounter++)
        keyframeValues += keyframePositions[paCounter] + "% " + getCSSFormat(phase_animations[paCounter]) + " ";

    console.log("keyframeValues");
    console.log(keyframeValues);

}

processKeyFrames();



/*
var transition_animation =
    "   \
        @keyframes ixbTransition{    \
            0%      {opacity: 0;}   \
            4.54545454%      {opacity: 1;}   \
            22.72727272%     {opacity: 1;}   \
            27.27272727%     {opacity: 0;}   \
            100%    {opacity: 0;}   \
        }   \
        .ixb_images{ \
            perspective-origin: center center; \
            opacity: 0; \
            animation: ixbTransition;        \
            animation-duration: " + 22 + "s;    \
            animation-timing-function: ease-in-out; \
            animation-iteration-count: 3;   \
        }   \
    ";
*/

var transition_animation =
    "   \
        @keyframes ixbTransition{   " + keyframeValues + "    }   \
        .ixb_images{ \
            perspective-origin: center center; \
            opacity: 0; \
            animation: ixbTransition;        \
            animation-duration: " + totalTime + "s;    \
            animation-iteration-count: " + loopCount + ";   \
        }   \
    ";






var animation_delays = "";
for (var dlCounter = 0; dlCounter < delayList.length; dlCounter++) {
    animation_delays += "#ixb_image" + dlCounter + "{ animation-delay: " + delayList[dlCounter] + "s}\n";
}


document.getElementById("ixb_animation").innerHTML = transition_animation;
document.getElementById("ixb_delays").innerHTML = animation_delays;
