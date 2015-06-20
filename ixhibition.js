var Ixhibition = (function (){

    var urlList = [ //Temp url values - should be empty
        "images/EarthMoon.jpg"
        , "images/Fuji.jpg"
        , "images/SeaMist.jpg"
        , "images/Bahamas.jpg"
    ];


    var transitionTransforms = null;

    var fadeIn = true,
        fadeOut = true;


    var display_time = 4,
        phaseIn_duration = 1,
        phaseOut_duration = 1,
        phaseOverlap_duration = 0,
        loopCount = "3";

    var fullPhase_duration = phaseIn_duration + display_time + phaseOut_duration,
        transition_duration = phaseOut_duration + phaseIn_duration - phaseOverlap_duration;

    var totalTime = urlList.length * (fullPhase_duration - phaseOverlap_duration);

    var fullPhase_percentage = fullPhase_duration / totalTime * 100;

    var display_percentage = (display_time / fullPhase_duration) * fullPhase_percentage,
        phaseIn_percentage = (phaseIn_duration / fullPhase_duration) * fullPhase_percentage,
        phaseOut_percentage = (phaseOut_duration / fullPhase_duration) * fullPhase_percentage,
        transition_percentage = transition_duration * 100 / totalTime;




    (function initialSetup(){

        document.getElementsByTagName("head")[0].innerHTML += "<style id='ixb_main'></style><style id='ixb_animation'></style><style id='ixb_delays'></style>";

        document.getElementById("ixb_main").innerHTML =
            "   \
                #ixhibition{/* overflow: hidden !important; */ padding: 0px !important;}    \
                #ixb_listcontainer{ height: 100%; width: 100%;    } \
                .ixb_images{       \
                    height: 100%; width: 100%;  \
                    background-size: contain; background-repeat: no-repeat; background-position: center center; \
                }   \
            ";

        populateContainer();

        transitionTransforms = public_setSlideFormat("vertical");

    })();



    function populateContainer() {
        var imageListHTML = "";
        for (var ulCounter = 0; ulCounter < urlList.length; ulCounter++) {
            imageListHTML += "<div id='ixb_wrapper" + ulCounter + "' class='ixb_wrapper'>";
            imageListHTML += "<div id='ixb_image" + ulCounter + "' class='ixb_images' style='background-image: url(" + urlList[ulCounter] + ");'></div>";
            imageListHTML += "</div>";
        }
        document.getElementById("ixhibition").innerHTML = "<div id='ixb_listcontainer'>" + imageListHTML + "<div>";
    }


    function calculateCoreValues() {

        fullPhase_duration = display_time + phaseIn_duration + phaseOut_duration;
        transition_duration = phaseOut_duration + phaseIn_duration - phaseOverlap_duration;

        totalTime = urlList.length * (fullPhase_duration - phaseOverlap_duration);

        fullPhase_percentage = fullPhase_duration / totalTime * 100;

        display_percentage = (display_time / fullPhase_duration) * fullPhase_percentage;
        phaseIn_percentage = (phaseIn_duration / fullPhase_duration) * fullPhase_percentage;
        phaseOut_percentage = (phaseOut_duration / fullPhase_duration) * fullPhase_percentage;
        transition_percentage = transition_duration * 100 / totalTime;

    }






    return {
        setImageList : public_setImageURLs,
        setSlideFormat : public_setSlideFormat,
        setDurations : public_setDurations
    };


    function public_setImageURLs(imgList) {

        if (!Array.isArray(imgList)) {
            throw new Error("The parameter for setImageURLs must be an array of urls (in string format)");
            return;
        }

        if (imgList.length) {
            urlList = imgList;
            populateContainer();
        }

    }

    function public_setSlideFormat(sType) { //vertical, vertical-reverse, horizontal, horizontal-reverse, stack

        switch (sType) {
            case "stack":
                slide_format = [
                    "",
                    "",
                    ""
                ];
                break;
            case "vertical":
                slide_format = [
                    "transform: translate(0px, 100%)",
                    "transform: translate(0px, 0%)",
                    "transform: translate(0px, -100%)"
                ];
                break;
            case "vertical-reverse":
                slide_format = [
                    "transform: translate(0px, -100%)",
                    "transform: translate(0px, 0%)",
                    "transform: translate(0px, 100%)"
                ];
                break;
            case "horizontal":
                slide_format = [
                    "transform: translate(100%, 0px)",
                    "transform: translate(0%, 0px)",
                    "transform: translate(-100%, 0px)"
                ];
                break;
            case "horizontal-reverse":
                slide_format = [
                    "transform: translate(-100%, 0px)",
                    "transform: translate(0%, 0px)",
                    "transform: translate(100%, 0px)"
                ];
                break;
            default:
                throw new Error("The parameter for setSlideFormat accepts only the following values:  stack, vertical, vertical-reverse, horizontal, horizontal-reverse");
                return;
                break;
        }

    }

    function public_setDurations(pIn, dDuration, pOut) {

        var errorMsg = "The 3 parameters for setDurations accepts only positive integer values, in the order: phase-in duration value, display duration value, phase-out duration value";

        if ((typeof pIn !== "number") || (typeof dDuration !== "number") || (typeof pOut !== "number")) {

            throw new Error(errorMsg);
            return;

        }else if (!(pIn >= 0) || !(dDuration >= 0) || !(pOut >= 0)) {

            throw new Error(errorMsg);
            return;

        }

        phaseIn_duration = pIn;
        display_time = dDuration;
        phaseOut_duration = pOut;

        calculateCoreValues();

    }


})();



/*
var slide_format = "stack"; //vertical, vertical-reverse, horizontal, horizontal-reverse, stack

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
    phaseOverlap_duration = 0,
    loopCount = "3";

var fullPhase_duration = display_time + phaseIn_duration + phaseOut_duration,
    transition_duration = phaseOut_duration + phaseIn_duration - phaseOverlap_duration;

var totalTime = urlList.length * (fullPhase_duration - phaseOverlap_duration);
console.log("totalTime time is: " + totalTime);

var fullPhase_percentage = fullPhase_duration / totalTime * 100;
console.log("fullPhase_percentage: " + fullPhase_percentage);

var display_percentage = (display_time / fullPhase_duration) * fullPhase_percentage,
    phaseIn_percentage = (phaseIn_duration / fullPhase_duration) * fullPhase_percentage,
    phaseOut_percentage = (phaseOut_duration / fullPhase_duration) * fullPhase_percentage;
console.log("display_percentage: " + display_percentage);
console.log("phaseIn_percentage: " + phaseIn_percentage);
console.log("phaseOut_percentage: " + phaseOut_percentage);
*/


var delayList = [0],
    ulCounter = urlList.length - 1;
while (ulCounter--) delayList.push(delayList[delayList.length - 1] + fullPhase_duration - phaseOverlap_duration);
console.log("delayList: ");
console.log(delayList);



var fadeIn = true,
    fadeOut = true;

var phaseIn_animations = [
    {"transform": "rotateX(90deg)", "transform-origin" : "bottom center"},
    //{"transform": "rotateY(20deg)"},
    {"transform": "rotateX(0deg)"}
];

var phaseOut_animations = [
    {"transform": "rotateX(0deg)", "transform-origin" : "top center"},
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
    switch (slide_format) {
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
