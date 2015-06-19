var main_styling = "#ixhibition{/* overflow: hidden !important; */ padding: 0px !important;} #ixb_listcontainer{ height: 100%; width: 100%;    }";

main_styling += ".ixb_images{       \
    height: 100%; width: 100%;  \
    background-size: contain; background-repeat: no-repeat; background-position: center center; \
    }";

document.getElementById("ixb_main").innerHTML = main_styling;

var transition_type = "vertical-reverse"; //vertical, vertical-reverse, horizontal, horizontal-reverse, stack

var urlList = [
    "images/EarthMoon.jpg"
    , "images/Fuji.jpg"
    , "images/SeaMist.jpg"
    , "images/Bahamas.jpg"
];

var imageListHTML = "";
for (var ulCounter = 0; ulCounter < urlList.length; ulCounter++) {
    imageListHTML += "<div id='ixb_wrapper" + ulCounter + "' class='ixb_wrapper'>";
    imageListHTML += "<div id='ixb_image" + ulCounter + "' class='ixb_images' style='background-image: url(" + urlList[ulCounter] + ");'></div>";
    imageListHTML += "</div>";
}

document.getElementById("ixhibition").innerHTML = "<div id='ixb_listcontainer'>" + imageListHTML + "<div>";


var display_time = 4,
    phaseIn_duration = 1,
    phaseOut_duration = 1,
    transition_overlap = 0.5,
    loopCount = "3";

var fullPhase_duration = display_time + phaseIn_duration + phaseOut_duration,
    transition_duration = phaseOut_duration + phaseIn_duration - transition_overlap;

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
    {"transform": "rotateX(90deg)", "transform-origin" : "top center"},
    //{"transform": "rotateY(20deg)"},
    {"transform": "rotateX(0deg)"}
];

var phaseOut_animations = [
    {"transform": "rotateX(0deg)", "transform-origin" : "bottom center"},
    //{"transform": "rotateY(-20deg)"},
    {"transform": "rotateX(-90deg)"}
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



var animation_css =
    "   \
        @keyframes ixbTransition{   " + keyframeValues + "    }   \
        .ixb_images{ \
            " + (fadeIn ? "opacity: 0;" : "") + " \
            animation: ixbTransition;        \
            animation-duration: " + totalTime + "s;    \
            animation-iteration-count: " + loopCount + ";   \
        }   \
    ";

function getSlideTransition() {
    switch (transition_type) {
        case "vertical":
            return [
                "transform: translate(0px, 100%)",
                "transform: translate(0px, 0%)",
                "transform: translate(0px, -100%)"
            ];
            break;
        case "vertical-reverse":
            return [
                "transform: translate(0px, -100%)",
                "transform: translate(0px, 0%)",
                "transform: translate(0px, 100%)"
            ];
            break;
        case "horizontal":
            return [
                "transform: translate(100%, 0px)",
                "transform: translate(0%, 0px)",
                "transform: translate(-100%, 0px)"
            ];
            break;
        case "horizontal-reverse":
            return [
                "transform: translate(-100%, 0px)",
                "transform: translate(0%, 0px)",
                "transform: translate(100%, 0px)"
            ];
            break;
        default:
            return [
                "",
                "",
                ""
            ];
            break;
    }
}


var transition_percentage = transition_duration * 100 / totalTime,
    transitionTransforms = getSlideTransition();
var transition_css =
    "   \
        @keyframes xibSlide{    \
            0%  {" + transitionTransforms[0] + "}  \
            " + transition_percentage + "%  {" + transitionTransforms[1] + "} \
            " + (transition_percentage + display_percentage) + "%   {" + transitionTransforms[1] + "}  \
            " + (transition_percentage + display_percentage + transition_percentage) + "%   {" + transitionTransforms[2] + "}  \
            100%    {}  \
        }   \
        .ixb_wrapper{   \
            position: absolute; top: 0px; left: 0px; height: 100%; width: 100%; \
            animation: xibSlide; animation-duration: 22s; animation-iteration-count: 3; animation-timing-function: ease-in-out; \
        }   \
    ";





var animation_delays = "",
    transition_delays = "";;
for (var dlCounter = 0; dlCounter < delayList.length; dlCounter++) {
    animation_delays += "#ixb_image" + dlCounter + "{ animation-delay: " + delayList[dlCounter] + "s}\n";
    transition_delays += "#ixb_wrapper" + dlCounter + "{ animation-delay: " + (delayList[dlCounter] - (transition_duration - phaseIn_duration)) + "s}\n";
}

document.getElementById("ixb_animation").innerHTML = animation_css + "\n" + transition_css;
document.getElementById("ixb_delays").innerHTML = animation_delays + "\n" + transition_delays;
