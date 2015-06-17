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
    transition_overlap = 0.5;

var fullPhase_duration = display_time + phaseIn_duration + phaseOut_duration;

var totalTime = urlList.length * (fullPhase_duration - (transition_overlap * 2));
console.log("totalTime time is: " + totalTime);

var fullPhase_percentage = fullPhase_duration / totalTime * 100;
console.log("fullPhase_percentage: " + fullPhase_percentage);

var display_percentage = (display_time / fullPhase_duration) * fullPhase_percentage,
    phaseIn_percentage = (phaseIn_duration / fullPhase_duration) * fullPhase_percentage,
    phaseOut_percentage = (phaseOut_duration / fullPhase_duration) * fullPhase_percentage;
console.log("display_percentage: " + display_percentage);
console.log("phaseIn_percentage: " + phaseIn_percentage);
console.log("phaseOut_percentage: " + phaseOut_percentage);

var keyframePositions = [
        0,
        phaseIn_percentage,
        phaseIn_percentage + display_percentage,
        phaseIn_percentage + display_percentage + phaseOut_percentage,
        100
    ];
console.log("keyframePositions is: ");
console.log(keyframePositions);

var delayList = [0],
    ulCounter = urlList.length - 1;
while (ulCounter--) delayList.push(delayList[delayList.length - 1] + fullPhase_duration - transition_overlap);
console.log("delayList: ");
console.log(delayList);



var phaseIn_animations = [
    "{opacity: 0;}",
    "{opacity: 1;}"
];

var phaseOut_animations = [
    "{opacity: 1;}",
    "{opacity: 0;}"
];













/*
var keyframeValues = "";
for (var kfpCount = 0; kfpCount < keyframePositions.length; kfpCount++) {
    keyframePositions[kfpCount]
}
*/



var transition_animation =
    "   \
        @keyframes ixbTransition{    \
            0%      {opacity: 0;}   \
            5%      {opacity: 1;}   \
            25%     {opacity: 1;}   \
            30%     {opacity: 0;}   \
            100%    {opacity: 0;}   \
        }   \
        .ixb_images{ \
            opacity: 0; \
            animation: ixbTransition;        \
            animation-duration: 20s;    \
            animation-timing-function: ease-in-out; \
            animation-iteration-count: 3;   \
        }   \
    ";

var animation_delays =
    "\
        #ixb_image1{ animation-delay: 0s;    }   \
        #ixb_image2{ animation-delay: 5.5s;    }   \
        #ixb_image3{ animation-delay: 11s;    }   \
        #ixb_image4{ animation-delay: 16.5s;    }   \
    ";








document.getElementById("ixb_animation").innerHTML = transition_animation;
document.getElementById("ixb_delays").innerHTML = animation_delays;
