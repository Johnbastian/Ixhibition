var Ixhibition = (function (){

    //Variables that can be modified using public functions
    var urlList = [""];     //List of image urls that are set in "background-image:url([value])"

    var segue_data = null;  /*  How to transition from slide to slide:
                                "vertical" (scroll up), "vertical-reverse" (scroll down),
                                "horizontal" (RtL), "horizontal-reverse" (LtR), "stack" */

    var display_duration = 4,       //Time image should be displayed for, (normally statically)
        phaseIn_duration = 1,       //Time taken to show image
        phaseOut_duration = 1,      //Time taken to hide image
        phaseOverlap_duration = 0,  /*  Overlap amount of the last bit of the phaseOut of the last slide
                                        and start bit of the phaseIn of the new slide */
        segue_duration = "full",    //Either "full" or "overlap", indicating which duration
        loopCount = "infinite";     //Number of times to repeast the gallery (same as animation-iteration-count value)

    var fadeIn = true,                  //If the image should fade in during phaseIn (done via opacity)
        fadeOut = true,                 //If the image should fade in during phaseOut (done via opacity)
        phaseIn_animations = [{}, {}],  //The keyframe animations to perform durinng the phaseIn
        phaseOut_animations = [{}, {}]; //The keyframe animations to perform durinng the phaseOut


    //Variables that are calculated by Ixhibition (see generateGallery & calculateCoreValues)
    var fullPhase_duration = null,
        transition_duration = null,
        phaseIn_aCount = phaseIn_animations.length,
        phaseOut_aCount = phaseOut_animations.length;

    var totalTime = null;

    var fullPhase_percentage = null;

    var display_percentage = null,
        phaseIn_percentage = null,
        phaseOut_percentage = null,
        transition_percentages = null;


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

    //Populate the HTML with
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


    //Calculate, generate, and apply gallery to HTML document
    function generateGallery() {
        calculateCoreValues();
        generateDelayList();
        processPhaseAnimations();
        processKeyFrames();
        processAndApplyAnimation();
    }

    //Calculate core values required for further calculations
    function calculateCoreValues() {

        fullPhase_duration = display_duration + phaseIn_duration + phaseOut_duration;
        transition_duration = phaseOut_duration + phaseIn_duration - phaseOverlap_duration;
        phaseIn_aCount = phaseIn_animations.length;
        phaseOut_aCount = phaseOut_animations.length;

        totalTime = urlList.length * (fullPhase_duration - phaseOverlap_duration);

        fullPhase_percentage = fullPhase_duration * 100 / totalTime ;

        display_percentage = (display_duration / fullPhase_duration) * fullPhase_percentage;
        phaseIn_percentage = (phaseIn_duration / fullPhase_duration) * fullPhase_percentage;
        phaseOut_percentage = (phaseOut_duration / fullPhase_duration) * fullPhase_percentage;

        transition_percentages = null;
        transition_percentages = [0];
        if (segue_duration === "full") {
            transition_percentages[1] = transition_duration * 100 / totalTime;
            transition_percentages[2] = transition_percentages[1] + display_percentage;
            transition_percentages[3] = transition_percentages[2] + transition_percentages[1];
            transition_percentages[4] = 100;
        }else if (segue_duration === "overlap") {
            transition_percentages[1] = phaseOverlap_duration * 100 / totalTime;
            transition_percentages[2] = fullPhase_percentage - transition_percentages[1];
            transition_percentages[3] = fullPhase_percentage;
            transition_percentages[4] = 100;
        }

        console.log("transition_percentages:");
        console.log(transition_percentages);

    }

    //Generate array of animation delay values
    function generateDelayList() {

        delayList = [0];
        var ulCounter = urlList.length - 1;
        while (ulCounter--) delayList.push(delayList[delayList.length - 1] + fullPhase_duration - phaseOverlap_duration);

    }

    //Add respective fading CSS to phaseIn and phaseOut keyframe animation
    function processPhaseAnimations() {

        if (fadeIn) {
            phaseIn_animations[0]["opacity"] = "0";
            phaseIn_animations[phaseIn_aCount - 1]["opacity"] = "1";
        }else {
            if (phaseIn_animations[0].hasOwnProperty("opacity") || phaseIn_animations[phaseIn_aCount - 1].hasOwnProperty("opacity")) {
                phaseIn_animations[0]["opacity"] = "1";
                phaseIn_animations[phaseIn_aCount - 1]["opacity"] = "1";
            }
        }

        if (fadeOut) {
            phaseOut_animations[0]["opacity"] = "1";
            phaseOut_animations[phaseOut_aCount - 1]["opacity"] = "0";
        }else {
            if (phaseOut_animations[0].hasOwnProperty("opacity") || phaseOut_animations[phaseOut_aCount - 1].hasOwnProperty("opacity")) {
                phaseOut_animations[0]["opacity"] = "1";
                phaseOut_animations[phaseOut_aCount - 1]["opacity"] = "1";
            }
        }

    }

    //Generate and return CSS for a list of key-value pairs
    function getCSSFormat(animationObject) {

        var cssValue = "{";
        for (var key in animationObject) cssValue += key + ":" + animationObject[key] + ";";
        cssValue += "}";

        return cssValue;

    }

    //Generate keyframes CSS
    function processKeyFrames(argument) {

        var phaseIn_divider = phaseIn_aCount - 1,
            phaseOut_divider = phaseOut_aCount - 1;

        var phaseIn_intervals = (phaseIn_divider ? (phaseIn_percentage / phaseIn_divider) : (phaseIn_percentage) ),
            phaseOut_intervals = (phaseOut_divider ? (phaseOut_percentage / phaseOut_divider) : (phaseOut_percentage) );

        keyframePositions = [0];
        while (phaseIn_divider--) keyframePositions.push(keyframePositions[keyframePositions.length - 1] + phaseIn_intervals);
        keyframePositions.push(keyframePositions[keyframePositions.length - 1] + display_percentage);
        while (phaseOut_divider--) keyframePositions.push(keyframePositions[keyframePositions.length - 1] + phaseOut_intervals);
        keyframePositions.push(keyframePositions[keyframePositions.length - 1] + (0.0001 / totalTime));
        keyframePositions.push(100);

        console.log("keyframePositions is: ");
        console.log(keyframePositions);

        var phase_animations = phaseIn_animations.concat(phaseOut_animations).concat([{"opacity" : "0"}, {}]);

        keyframeValues = "";
        for (var paCounter = 0; paCounter < phase_animations.length; paCounter++)
            keyframeValues += keyframePositions[paCounter] + "% " + getCSSFormat(phase_animations[paCounter]) + " ";

        console.log("keyframeValues");
        console.log(keyframeValues);

    }

    //Generate animation CSS and apply to document
    function processAndApplyAnimation() {

        var transition_css =
            "   \
                @keyframes xibSlide{    \
                    " + transition_percentages[0] + "%  {" + segue_data[0] + "} \
                    " + transition_percentages[1] + "%  {" + segue_data[1] + "} \
                    " + transition_percentages[2] + "%  {" + segue_data[1] + "} \
                    " + transition_percentages[3] + "%  {" + segue_data[2] + "} \
                    " + transition_percentages[4] + "%  {" + segue_data[2] + "} \
                }   \
                .ixb_wrapper{   \
                    position: absolute; top: 0px; left: 0px; height: 100%; width: 100%; " + segue_data[0] + " \
                    animation: xibSlide; animation-duration: " + totalTime + "s; animation-iteration-count: " + loopCount + "; animation-timing-function: ease-in-out; \
                }   \
            ";

        var animation_css =
            "   \
                @keyframes ixbTransition{   " + keyframeValues + "    }   \
                .ixb_images{ \
                    opacity: 0; \
                    animation: ixbTransition; animation-duration: " + totalTime + "s; animation-iteration-count: " + loopCount + ";   \
                }   \
            ";

        console.log("delayList: ");
        console.log(delayList);

        var animation_delays = "",
            transition_delays = "";
        for (var dlCounter = 0; dlCounter < delayList.length; dlCounter++) {
            animation_delays += "#ixb_image" + dlCounter + "{ animation-delay: " + delayList[dlCounter] + "s}\n";
            transition_delays += "#ixb_wrapper" + dlCounter + "{ animation-delay: " + (segue_duration === "overlap" ? delayList[dlCounter] : (delayList[dlCounter] - (transition_duration - phaseIn_duration)) ) + "s}\n";
        }

        document.getElementById("ixb_animation").innerHTML = transition_css + "\n" + animation_css;
        document.getElementById("ixb_delays").innerHTML = transition_delays + "\n" + animation_delays;

    }




    //Public functions
    return {
        setImageList : public_setImageURLs,
        setSegueType : public_setSegueType,
        setPhaseIn : public_setPhaseIn,
        setPhaseOut : public_setPhaseOut,
        setDisplayDuration : public_setDisplayDuration,
        setPhaseOverlap : public_setPhaseOverlap,
        setSegueDurationType : public_setSegueDurationType,
        setLoopCount : public_setLoopCount,
        setFade : public_setFade
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
                    "transform: translate(0px, 100%);",
                    "transform: translate(0px, 0%);",
                    "transform: translate(0px, -100%);"
                ];
                break;
            case "vertical-reverse":
                segue_data = [
                    "transform: translate(0px, -100%);",
                    "transform: translate(0px, 0%);",
                    "transform: translate(0px, 100%);"
                ];
                break;
            case "horizontal":
                segue_data = [
                    "transform: translate(100%, 0px);",
                    "transform: translate(0%, 0px)",
                    "transform: translate(-100%, 0px);"
                ];
                break;
            case "horizontal-reverse":
                segue_data = [
                    "transform: translate(-100%, 0px);",
                    "transform: translate(0%, 0px);",
                    "transform: translate(100%, 0px);"
                ];
                break;
            default:
                throw new Error("The parameter for setSlideFormat accepts only the following values:  stack, vertical, vertical-reverse, horizontal, horizontal-reverse");
                return;
                break;
        }

        generateGallery();

    }

    //Public function for setting the phaseIn duration and animation set as an array of keyframes
    function public_setPhaseIn(pIn, pAnimations) {

        if (!(typeof pIn === "number" && pIn >= 0)) {
            throw new Error("The first parameter of setPhaseIn must be a positive integer");
            return;
        }

        if(!(Array.isArray(pAnimations) && pAnimations.length != 1)) {
            throw new Error("   The second parameter of setPhaseIn must be an array of objects containing CSS key-pair values. \
                                Additionally, the array must have a length of either 0 or 2 and higher");
            return;
        }

        if (pAnimations.length == 0) pAnimations = [{}, {}];

        phaseIn_duration = pIn;
        phaseIn_animations = pAnimations;

        generateGallery();

    }

    //Public function for setting the phaseOut duration and animation set as an array of keyframes
    function public_setPhaseOut(pOut, pAnimations) {

        if (!(typeof pOut === "number" && pOut >= 0)) {
            throw new Error("The first parameter of setPhaseOut must be a positive integer");
            return;
        }

        if(!(Array.isArray(pAnimations) && pAnimations.length != 1)) {
            throw new Error("   The second parameter of  must be an array of objects containing CSS key-pair values. \
                                Additionally, the array must have a length of either 0 or 2 and higher");
            return;
        }

        if (pAnimations.length == 0) pAnimations = [{}, {}];

        phaseOut_duration = pOut;
        phaseOut_animations = pAnimations;

        generateGallery();

    }

    //Public function for setting the display duration
    function public_setDisplayDuration(dDuration) {

        if (!(typeof dDuration === "number" && dDuration >= 0)) {
            throw new Error("setDisplayDuration parameter must be a positive integer");
            return;
        }

        display_duration = dDuration;

        generateGallery();

    }

    //Public function for setting the phase overlap duration
    function public_setPhaseOverlap(pOverlap) {

        var validPO = pOverlap < Math.min((phaseIn_duration + display_duration), (display_duration + phaseOut_duration));

        if (!(typeof pOverlap === "number" && pOverlap >= 0 && validPO)) {
            throw new Error("setPhaseOverlap parameter must be a positive integer. Additionally, it must be smaller than phaseIn + display duration and phaseOut + display duration");
            return;
        }

        phaseOverlap_duration = pOverlap;

        generateGallery();

    }

    //Public function for setting the segue duration type
    function public_setSegueDurationType(sDuration) {

        if (typeof sDuration === "string") {

            sDuration = sDuration.toLowerCase();
            if (sDuration === "full" || sDuration === "overlap") {

                segue_duration = sDuration;

                generateGallery();

                return;

            }

        }

        throw new Error("setSegueDurationType parameter must either be \"full\" or \"overlap\" ");

    }

    //Public function for setting how many times the gallery should loop
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

    //Public function for setting if fading is desired
    function public_setFade(fIn, fOut) {

        if (typeof fIn !== "boolean" || typeof fOut !== "boolean") {
            throw new Error("setFade only accepts 2 boolean parameters");
            return;
        }

        fadeIn = fIn;
        fadeOut = fOut;

        generateGallery();

    }

});
