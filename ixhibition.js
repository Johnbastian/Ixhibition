var Ixhibition = (function (){

    //Variables that can be modified using public functions
    var urlList = [""];

    var segue_data = null;

    var display_time = 4,
        phaseIn_duration = 1,
        phaseOut_duration = 1,
        phaseOverlap_duration = 0,
        loopCount = "infinite";

    var fadeIn = true,
        fadeOut = true,
        phaseIn_animations = [{}, {}],
        phaseOut_animations = [{}, {}];


    //Variables that are calculated by Ixhibition (see generateGallery & calculateCoreValues)
    var fullPhase_duration = null,
        transition_duration = null,
        phaseIn_length = phaseIn_animations.length,
        phaseOut_length = phaseOut_animations.length;

    var totalTime = null;

    var fullPhase_percentage = null;

    var display_percentage = null,
        phaseIn_percentage = null,
        phaseOut_percentage = null,
        transition_percentage = null;


    //Variables used for generating the code (namely CSS)
    var delayList = [0],
        keyframePositions = [0],
        keyframeValues = "";



    //Initial Setup (done on object instantiate, akin to constructor logic)
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

        public_setSegueType("stack");

        populateContainer();

    })();


    function populateContainer() {
        var imageListHTML = "";
        for (var ulCounter = 0; ulCounter < urlList.length; ulCounter++) {
            imageListHTML += "<div id='ixb_wrapper" + ulCounter + "' class='ixb_wrapper'>";
            imageListHTML += "<div id='ixb_image" + ulCounter + "' class='ixb_images' style='background-image: url(" + urlList[ulCounter] + ");'></div>";
            imageListHTML += "</div>";
        }
        document.getElementById("ixhibition").innerHTML = "<div id='ixb_listcontainer'>" + imageListHTML + "<div>";

        generateGallery();

    }



    function generateGallery() {
        calculateCoreValues();
        generateDelayList();
        processPhaseAnimations();
        processKeyFrames();
        applyAnimation();
    }


    function calculateCoreValues() {

        fullPhase_duration = display_time + phaseIn_duration + phaseOut_duration;
        transition_duration = phaseOut_duration + phaseIn_duration - phaseOverlap_duration;
        phaseIn_length = phaseIn_animations.length;
        phaseOut_length = phaseOut_animations.length;

        totalTime = urlList.length * (fullPhase_duration - phaseOverlap_duration);

        fullPhase_percentage = fullPhase_duration / totalTime * 100;

        display_percentage = (display_time / fullPhase_duration) * fullPhase_percentage;
        phaseIn_percentage = (phaseIn_duration / fullPhase_duration) * fullPhase_percentage;
        phaseOut_percentage = (phaseOut_duration / fullPhase_duration) * fullPhase_percentage;
        transition_percentage = transition_duration * 100 / totalTime;

    }

    function generateDelayList() {

        delayList = [0];
        var ulCounter = urlList.length - 1;
        while (ulCounter--) delayList.push(delayList[delayList.length - 1] + fullPhase_duration - phaseOverlap_duration);

    }



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

    function getCSSFormat(animationObject) {

        var cssValue = "{";
        for (var key in animationObject) cssValue += key + ":" + animationObject[key] + ";";
        cssValue += "}";

        return cssValue;

    }



    function processKeyFrames(argument) {

        var phaseIn_divider = phaseIn_length - 1,
            phaseOut_divider = phaseOut_length - 1;

        var phaseIn_intervals = (phaseIn_divider ? (phaseIn_percentage / phaseIn_divider) : (phaseIn_percentage) ),
            phaseOut_intervals = (phaseOut_divider ? (phaseOut_percentage / phaseOut_divider) : (phaseOut_percentage) );

        keyframePositions = [0];
        while (phaseIn_divider--) keyframePositions.push(keyframePositions[keyframePositions.length - 1] + phaseIn_intervals);
        keyframePositions.push(keyframePositions[keyframePositions.length - 1] + display_percentage);
        while (phaseOut_divider--) keyframePositions.push(keyframePositions[keyframePositions.length - 1] + phaseOut_intervals);
        keyframePositions.push(100);

        console.log("keyframePositions is: ");
        console.log(keyframePositions);

        var phase_animations = phaseIn_animations.concat(phaseOut_animations).concat([{}]);

        keyframeValues = "";
        for (var paCounter = 0; paCounter < phase_animations.length; paCounter++)
            keyframeValues += keyframePositions[paCounter] + "% " + getCSSFormat(phase_animations[paCounter]) + " ";

        console.log("keyframeValues");
        console.log(keyframeValues);

    }


    function applyAnimation() {

        var animation_css =
            "   \
                @keyframes ixbTransition{   " + keyframeValues + "    }   \
                .ixb_images{ \
                    " + (fadeIn ? "opacity: 0;" : "") + " \
                    animation: ixbTransition; animation-duration: " + totalTime + "s; animation-iteration-count: " + loopCount + ";   \
                }   \
            ";

        var transition_css =
            "   \
                @keyframes xibSlide{    \
                    0%  {" + segue_data[0] + "}  \
                    " + transition_percentage + "%  {" + segue_data[1] + "} \
                    " + (transition_percentage + display_percentage) + "%   {" + segue_data[1] + "}  \
                    " + (transition_percentage + display_percentage + transition_percentage) + "%   {" + segue_data[2] + "}  \
                    100%    {}  \
                }   \
                .ixb_wrapper{   \
                    position: absolute; top: 0px; left: 0px; height: 100%; width: 100%; \
                    animation: xibSlide; animation-duration: " + totalTime + "s; animation-iteration-count: " + loopCount + "; animation-timing-function: ease-in-out; \
                }   \
            ";

        console.log("delayList: ");
        console.log(delayList);

        var animation_delays = "",
            transition_delays = "";
        for (var dlCounter = 0; dlCounter < delayList.length; dlCounter++) {
            animation_delays += "#ixb_image" + dlCounter + "{ animation-delay: " + delayList[dlCounter] + "s}\n";
            transition_delays += "#ixb_wrapper" + dlCounter + "{ animation-delay: " + (delayList[dlCounter] - (transition_duration - phaseIn_duration)) + "s}\n";
        }

        document.getElementById("ixb_animation").innerHTML = animation_css + "\n" + transition_css;
        document.getElementById("ixb_delays").innerHTML = animation_delays + "\n" + transition_delays;

    }




    //Public functions
    return {
        setImageList : public_setImageURLs,
        setSegueType : public_setSegueType,
        setDurations : public_setDurations,
        setLoopCount : public_setLoopCount
    };

    //Public function for setting the list of image urls in the form of a string array of background-image values
    function public_setImageURLs(imgList) {

        if (Array.isArray(imgList)) {

            var typeString = imgList.every(function (cVal) { //Check contents are all strings
                return typeof cVal == "string";
            });

            if (imgList.length && typeString) {
                urlList = imgList;
                populateContainer();
                generateGallery();
                return;
            }

        }

        throw new Error("The parameter for setImageURLs must be an array of urls (in string format)");

    }

    //Public function for setting the sgue/transition method for going from slide to slide
    function public_setSegueType(sType) { //vertical, vertical-reverse, horizontal, horizontal-reverse, stack

        switch (sType) {
            case "stack":
                segue_data = [
                    "",
                    "",
                    ""
                ];
                break;
            case "vertical":
                segue_data = [
                    "transform: translate(0px, 100%)",
                    "transform: translate(0px, 0%)",
                    "transform: translate(0px, -100%)"
                ];
                break;
            case "vertical-reverse":
                segue_data = [
                    "transform: translate(0px, -100%)",
                    "transform: translate(0px, 0%)",
                    "transform: translate(0px, 100%)"
                ];
                break;
            case "horizontal":
                segue_data = [
                    "transform: translate(100%, 0px)",
                    "transform: translate(0%, 0px)",
                    "transform: translate(-100%, 0px)"
                ];
                break;
            case "horizontal-reverse":
                segue_data = [
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

        generateGallery();

    }

    function public_setDurations(pIn, dDuration, pOut) {

        var errorMsg = "The 3 parameters for setDurations accepts only positive integer values, in the order: \
                        phase-in duration value, display duration value, phase-out duration value";

        if ((typeof pIn !== "number") || (typeof dDuration !== "number") || (typeof pOut !== "number")){
            throw new Error(errorMsg);
            return;
        }else if (!(pIn >= 0) || !(dDuration >= 0) || !(pOut >= 0)){
            throw new Error(errorMsg);
            return;
        }

        phaseIn_duration = pIn;
        display_time = dDuration;
        phaseOut_duration = pOut;

        phaseIn_length = phaseIn_animations.length,
        phaseOut_length = phaseOut_animations.length;

        generateGallery();

    }

    function public_setLoopCount(lc) {

        var errorMsg = "setLoopCount accepts only positive integers or the keyword \"infinite\" ";

        var lcType = typeof lc;

        if (lcType === "string") {

            if (!isNaN(lc)) public_setLoopCount(parseInt(lc));

            lc = lc.toLowerCase();
            if (lc !== "infinite") {
                throw new Error(errorMsg);
                return;
            }

            loopCount = lc;

        }else if (lcType === "number") {

            if (lc < 0) {
                throw new Error(errorMsg);
                return;
            }

            loopCount = Math.floor(lc);

        }



        generateGallery();

    }


});
