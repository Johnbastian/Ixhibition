/*
MIT License

Copyright (c) 2015 Johnbastian Emilianus (http://github.com/Johnbastian)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
OR OTHER DEALINGS IN THE SOFTWARE.
*/

var Ixhibition = (function (containerID){

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

    var savedOptions = {};  //Stores all the presets added in by public_saveOption, to be used in public_loadOption


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
    var animationDelays = [0],
        transitionDelays = [0],
        keyframePositions = [0],
        keyframeValues = "";



    //Initial Setup (done on object instantiate, akin to constructor logic)
    var successState = (function initialSetup(){

        if (typeof containerID === "undefined") containerID = "ixhibition"; //Default value

        if (!document.getElementById(containerID)) {
            throw new Error("DIV element with ID \"" + containerID + "\" cannot be found");
            return false;
        }

        document.getElementById(containerID).innerHTML = "  <div id='ixb_styling_" + containerID + "'></div> \
                                                            <div id='ixb_content_" + containerID + "'></div>";

        document.getElementById("ixb_styling_" + containerID).innerHTML += " \
                                                                <style id='ixb_main_" + containerID + "'></style> \
                                                                <style id='ixb_animation_" + containerID + "'></style> \
                                                                <style id='ixb_delays_" + containerID + "'></style> \
                                                                ";

        document.getElementById("ixb_main_" + containerID).innerHTML =
            "   \
                #" + containerID + " {  position: relative; overflow: hidden !important; padding: 0px !important;   }    \
                #" + containerID + " #ixb_listcontainer { height: 100%; width: 100%;    } \
                #" + containerID + " .ixb_images {       \
                    height: 100%; width: 100%;  \
                    background-size: contain; background-repeat: no-repeat; background-position: center center; \
                }   \
            ";

        correlateSegueType("stack");

        populateContainer();

        defaultOptions();

        return true;

    })();
    if (!successState) return;  //Return empty instead of functions



    //Populate the HTML with and batch load Images
    function populateContainer() {

        //Generate HTML without background-images and inject into DOM
        var imageListHTML = "";
        for (var ulCounter = 0; ulCounter < urlList.length; ulCounter++) {
            imageListHTML += "<div id='ixb_wrapper" + ulCounter + "' class='ixb_wrapper'>";
            imageListHTML += "<div id='ixb_image" + ulCounter + "' class='ixb_images' style='background-color: rgba(0, 0, 0, 0);'></div>";
            imageListHTML += "</div>";
        }
        document.getElementById("ixb_content_" + containerID).innerHTML = "<div id='ixb_listcontainer'>" + imageListHTML + "</div>";

        generateGallery();

        //Get nodes and prepare for batch loading - every 1 second, with intiial done immediately
        var imageNodes = document.getElementById("ixb_content_" + containerID).getElementsByClassName("ixb_images"),
            inCounter = 0;

        imageList = JSON.parse(JSON.stringify(urlList));

        var batchLoadImage = function () {

            var deciCounter = 10;
            while (deciCounter-- && imageList.length) {

                var imageNode = imageNodes[inCounter];
                inCounter++;

                imageNode.style.backgroundColor = "transparent";
                imageNode.style.backgroundImage = "url(" + imageList.shift() + ")";

            }

            if (imageList.length) setTimeout(function() { batchLoadImage();   }, 1000);

        }

        batchLoadImage();

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

        //This is not animation with phase(In/Out) and duration, this is for wrapper - whole transitioning
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

    //Generate array of animation and transition delay values
    function generateDelayList() {

        animationDelays = [1.5];    //1.5 used so that all delays are > 0 - helps Safari
        var ulCounter = urlList.length - 1;
        while (ulCounter--) animationDelays.push(animationDelays[animationDelays.length - 1] + fullPhase_duration - phaseOverlap_duration);

        transitionDelays = [];
        if (segue_duration === "overlap") transitionDelays = animationDelays;
        else {
            for (var adCounter = 0; adCounter < animationDelays.length; adCounter++) {
                transitionDelays[adCounter] = animationDelays[adCounter] - (transition_duration - phaseIn_duration);
            }
        }

    }

    //Add respective fading CSS to phaseIn and phaseOut keyframe animation
    function processPhaseAnimations() {

        if (fadeIn) {
            phaseIn_animations[0]["opacity"] = "0";
            phaseIn_animations[phaseIn_aCount - 1]["opacity"] = "1";
        }else {
            phaseIn_animations[0]["opacity"] = "1";
            phaseIn_animations[phaseIn_aCount - 1]["opacity"] = "1";
        }

        if (fadeOut) {
            phaseOut_animations[0]["opacity"] = "1";
            phaseOut_animations[phaseOut_aCount - 1]["opacity"] = "0";
        }else {
            phaseOut_animations[0]["opacity"] = "1";
            phaseOut_animations[phaseOut_aCount - 1]["opacity"] = "1";
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
        if(phaseIn_duration > 0) while (phaseIn_divider--) keyframePositions.push(keyframePositions[keyframePositions.length - 1] + phaseIn_intervals);
        else phaseIn_animations = [phaseIn_animations[phaseIn_divider]];
        keyframePositions.push(keyframePositions[keyframePositions.length - 1] + display_percentage);
        if (phaseOut_duration > 0) while (phaseOut_divider--) keyframePositions.push(keyframePositions[keyframePositions.length - 1] + phaseOut_intervals);
        else phaseOut_animations = [phaseOut_animations[0]];
        keyframePositions.push(keyframePositions[keyframePositions.length - 1] + (0.001 / totalTime)); //This precision is safe for Safari, no lower
        keyframePositions.push(100);

        console.log("keyframePositions is: ");
        console.log(keyframePositions);

        var phase_animations = phaseIn_animations.concat(phaseOut_animations).concat([{"opacity" : "0"}, {}]);

        keyframeValues = "";
        for (var paCounter = 0; paCounter < phase_animations.length; paCounter++)
            keyframeValues += keyframePositions[paCounter] + "% " + getCSSFormat(phase_animations[paCounter]) + " \n";

        console.log("keyframeValues");
        console.log(keyframeValues);

    }

    //Generate animation CSS and apply to document
    function processAndApplyAnimation() {

        var transition_css =
            "   \
                @keyframes " + containerID + "_ixbTransition {    \n\
                    " + transition_percentages[0] + "%  {" + segue_data[0] + "} \n\
                    " + transition_percentages[1] + "%  {" + segue_data[1] + "} \n\
                    " + transition_percentages[2] + "%  {" + segue_data[1] + "} \n\
                    " + transition_percentages[3] + "%  {" + segue_data[2] + "} \n\
                    " + transition_percentages[4] + "%  {" + segue_data[2] + "} \n\
                }   \n\
                @-webkit-keyframes " + containerID + "_ixbTransition {    \n\
                    " + transition_percentages[0] + "%  {" + segue_data[0] + "} \n\
                    " + transition_percentages[1] + "%  {" + segue_data[1] + "} \n\
                    " + transition_percentages[2] + "%  {" + segue_data[1] + "} \n\
                    " + transition_percentages[3] + "%  {" + segue_data[2] + "} \n\
                    " + transition_percentages[4] + "%  {" + segue_data[2] + "} \n\
                }   \n\
                #" + containerID + " .ixb_wrapper{   \n\
                    position: absolute; top: 0px; left: 0px; height: 100%; width: 100%; " + segue_data[0] + " \n\
                    animation-name: " + containerID + "_ixbTransition; -webkit-animation-name: " + containerID + "_ixbTransition; \n\
                    animation-duration: " + totalTime + "s; -webkit-animation-duration: " + totalTime + "s; \n\
                    animation-iteration-count: " + loopCount + "; -webkit-animation-iteration-count: " + loopCount + "; \n\
                }   \
            ";

        var animation_css =
            "   \
                @keyframes " + containerID + "_ixbAnimation {\n   " + keyframeValues + "    \n}   \n\
                @-webkit-keyframes " + containerID + "_ixbAnimation {\n   " + keyframeValues + "    \n}   \n\
                #" + containerID + " .ixb_images{ \n\
                    opacity: 0; \n\
                    animation-name: " + containerID + "_ixbAnimation; -webkit-animation-name: " + containerID + "_ixbAnimation; \n\
                    animation-duration: " + totalTime + "s; -webkit-animation-duration: " + totalTime + "s; \n\
                    animation-iteration-count: " + loopCount + "; -webkit-animation-iteration-count: " + loopCount + "; \n\
                }   \
            ";

        console.log("animationDelays: ");
        console.log(animationDelays);

        var animation_delays = "",
            transition_delays = "";
        for (var dlCounter = 0; dlCounter < animationDelays.length; dlCounter++) {
            var adVal = animationDelays[dlCounter],
                tdVal = transitionDelays[dlCounter];
            animation_delays += "#" + containerID + " #ixb_image" + dlCounter + "{ animation-delay: " + adVal + "s; -webkit-animation-delay: " + adVal + "s; }\n";
            transition_delays += "#" + containerID + " #ixb_wrapper" + dlCounter + "{ animation-delay: " + tdVal + "s; -webkit-animation-delay: " + tdVal + "s; }\n";
        }

        document.getElementById("ixb_animation_" + containerID).innerHTML = transition_css + "\n" + animation_css;
        document.getElementById("ixb_delays_" + containerID).innerHTML = transition_delays + "\n" + animation_delays;

    }


    //Add default options to savedOptions store
    function defaultOptions() {

        //Stack (no fade)
        savedOptions["ixb_1"] = function(data){

            return {
                "segueType" : "stack",
                "phaseInDuration" : 0,
                "phaseInAnimations" : [],
                "phaseOutDuration" : 0,
                "phaseOutAnimations" : [],
                "phaseOverlap" : 0,
                "segueDuration" : "full",
                "fadeIn" : false,
                "fadeOut" : false
            };

        };

        //Vertical simple slide
        savedOptions["ixb_2"] = function(data){

            var pIn = ( data.phaseInDuration >= 1 ? data.phaseInDuration : 1 ),
                pOut = ( data.phaseOutDuration >= 1 ? data.phaseOutDuration : 1);

            pIn = pOut = Math.min(pIn, pOut);

            return {
                "segueType" : "vertical",
                "phaseInDuration" : pIn,
                "phaseInAnimations" : [],
                "phaseOutDuration" : pOut,
                "phaseOutAnimations" : [],
                "phaseOverlap" : pIn,
                "segueDuration" : "full",
                "fadeIn" : false,
                "fadeOut" : false
            };

        };

        //Vertical-reverse simple slide
        savedOptions["ixb_3"] = function(data){

            var pIn = ( data.phaseInDuration >= 1 ? data.phaseInDuration : 1 ),
                pOut = ( data.phaseOutDuration >= 1 ? data.phaseOutDuration : 1);

            pIn = pOut = Math.min(pIn, pOut);

            return {
                "segueType" : "vertical-reverse",
                "phaseInDuration" : pIn,
                "phaseInAnimations" : [],
                "phaseOutDuration" : pOut,
                "phaseOutAnimations" : [],
                "phaseOverlap" : pIn,
                "segueDuration" : "full",
                "fadeIn" : false,
                "fadeOut" : false
            };

        };

        //Horizontal simple slide
        savedOptions["ixb_4"] = function(data){

            var pIn = ( data.phaseInDuration >= 1 ? data.phaseInDuration : 1 ),
                pOut = ( data.phaseOutDuration >= 1 ? data.phaseOutDuration : 1);

            pIn = pOut = Math.min(pIn, pOut);

            return {
                "segueType" : "horizontal",
                "phaseInDuration" : pIn,
                "phaseInAnimations" : [],
                "phaseOutDuration" : pOut,
                "phaseOutAnimations" : [],
                "phaseOverlap" : pIn,
                "segueDuration" : "full",
                "fadeIn" : false,
                "fadeOut" : false
            };

        };

        //Horizontal-reverse simple slide
        savedOptions["ixb_5"] = function(data){

            var pIn = ( data.phaseInDuration >= 1 ? data.phaseInDuration : 1 ),
                pOut = ( data.phaseOutDuration >= 1 ? data.phaseOutDuration : 1);

            pIn = pOut = Math.min(pIn, pOut);

            return {
                "segueType" : "horizontal-reverse",
                "phaseInDuration" : pIn,
                "phaseInAnimations" : [],
                "phaseOutDuration" : pOut,
                "phaseOutAnimations" : [],
                "phaseOverlap" : pIn,
                "segueDuration" : "full",
                "fadeIn" : false,
                "fadeOut" : false
            };

        };

        //Stack with fade
        savedOptions["ixb_6"] = function(data){

            var pIn = ( data.phaseInDuration >= 1 ? data.phaseInDuration : 1 ),
                pOut = ( data.phaseOutDuration >= 1 ? data.phaseOutDuration : 1);

            pIn = pOut = Math.min(pIn, pOut);

            return {
                "segueType" : "stack",
                "phaseInDuration" : pIn,
                "phaseInAnimations" : [],
                "phaseOutDuration" : pOut,
                "phaseOutAnimations" : [],
                "phaseOverlap" : (pIn / 2),
                "segueDuration" : "full",
                "fadeIn" : true,
                "fadeOut" : true
            };

        };

        //Fade, with fade-out drop
        savedOptions["ixb_7"] = function(data){

            var pIn = ( data.phaseInDuration >= 2 ? data.phaseInDuration : 2 ),
                pOut = ( data.phaseOutDuration >= 2 ? data.phaseOutDuration : 2);

            pIn = pOut = Math.min(pIn, pOut);

            return {
                "segueType" : "stack",
                "phaseInDuration" : pIn,
                "phaseInAnimations" : [],
                "phaseOutDuration" : pOut,
                "phaseOutAnimations" : [
                    {"transform" : "translateY(0)", "-webkit-transform" : "translateY(0)", "opacity" : "1"},
                    {"transform" : "translateY(10%)", "-webkit-transform" : "translateY(10%)", "opacity" : "0.8"},
                    {"transform" : "translateY(100%)", "-webkit-transform" : "translateY(100%)", "opacity" : "0"}
                ],
                "phaseOverlap" : (pIn / 2),
                "segueDuration" : "full",
                "fadeIn" : true,
                "fadeOut" : false
            };

        };

        //Slide focus, with slight zoom
        savedOptions["ixb_8"] = function(data){

            var pIn = ( data.phaseInDuration >= 2 ? data.phaseInDuration : 2 ),
                pOut = ( data.phaseOutDuration >= 2 ? data.phaseOutDuration : 2);
            pIn = pOut = Math.min(pIn, pOut);

            return {
                "segueType" : "vertical",
                "phaseInDuration" : pIn,
                "phaseInAnimations" : [
                    {"transform" : "scale(0.7, 0.7)", "-webkit-transform" : "scale(0.7, 0.7)"},
                    {"transform" : "scale(0.7, 0.7)", "-webkit-transform" : "scale(0.7, 0.7)"},
                    {"transform" : "scale(1, 1)", "-webkit-transform" : "scale(1, 1)"}
                ],
                "phaseOutDuration" : pOut,
                "phaseOutAnimations" : [
                    {"transform" : "scale(1.05, 1.05)", "-webkit-transform" : "scale(1.05, 1.05)"},
                    {"transform" : "scale(0.7, 0.7)", "-webkit-transform" : "scale(0.7, 0.7)"},
                    {"transform" : "scale(0.7, 0.7)", "-webkit-transform" : "scale(0.7, 0.7)"}
                ],
                "phaseOverlap" : (pIn / 2),
                "segueDuration" : "overlap",
                "fadeIn" : false,
                "fadeOut" : false
            };

        };

        //Squash to focus
        savedOptions["ixb_9"] = function(data){

            var pIn = ( data.phaseInDuration ? data.phaseInDuration : 1 ),
                pOut = ( data.phaseOutDuration ? data.phaseOutDuration : 1);
            pIn = pOut = Math.min(pIn, pOut);

            return {
                "segueType" : "horizontal",
                "phaseInDuration" : pIn,
                "phaseInAnimations" : [],
                "phaseOutDuration" : pOut,
                "phaseOutAnimations" : [
                    {
                        "transform-origin" : "right center", "-webkit-transform-origin" : "right center",
                        "transform" : "scaleX(1)", "-webkit-transform" : "scaleX(1)"
                    },
                    {
                        "transform-origin" : "right center", "-webkit-transform-origin" : "right center",
                        "transform" : "scaleX(0)", "-webkit-transform" : "scaleX(0)"
                    }
                ],
                "phaseOverlap" : pIn,
                "fadeIn" : false,
                "fadeOut" : false
            };

        };

        //Fold-in Fold-out
        savedOptions["ixb_10"] = function(data){

            var pIn = ( data.phaseInDuration >= 2 ? data.phaseInDuration : 2 ),
                pOut = ( data.phaseOutDuration >= 2 ? data.phaseOutDuration : 2);
            pIn = pOut = Math.min(pIn, pOut);

            return {
                "segueType" : "stack",
                "phaseInDuration" : pIn,
                "phaseInAnimations" : [
                    {
                        "transform-origin" : "right center", "-webkit-transform-origin" : "right center",
                        "transform" : "scale(0.5, 0.5) rotateY(90deg)", "-webkit-transform" : "scale(0.5, 0.5) rotateY(90deg)"
                    },
                    {
                        "transform-origin" : "right center", "-webkit-transform-origin" : "right center",
                        "transform" : "scale(0.5, 0.5) rotateY(45deg)", "-webkit-transform" : "scale(0.5, 0.5) rotateY(45deg)"
                    },
                    {"transform" : "scale(1, 1)", "-webkit-transform" : "scale(1, 1)"}
                ],
                "phaseOutDuration" : pOut,
                "phaseOutAnimations" : [
                    {"transform" : "scale(1, 1)", "-webkit-transform" : "scale(1, 1)"},
                    {
                        "transform-origin" : "left center", "-webkit-transform-origin" : "left center",
                        "transform" : "scale(0.5, 0.5)  rotateY(-45deg)", "-webkit-transform" : "scale(0.5, 0.5) rotateY(-45deg)"
                    },
                    {
                        "transform-origin" : "left center", "-webkit-transform-origin" : "left center",
                        "transform" : "scale(0.5, 0.5)  rotateY(-90deg)", "-webkit-transform" : "scale(0.5, 0.5) rotateY(-90deg)"
                    }
                ],
                "phaseOverlap" : pIn,
                "fadeIn" : false,
                "fadeOut" : false
            };

        };



    }





    //Public functions
    return {

        setImageList : public_setImageURLs,
        setSegueType : public_setSegueType,

        setPhaseIn : public_setPhaseIn,
        setPhaseInDuration : public_setPhaseInDuration,
        setPhaseInAnimations : public_setPhaseInAnimations,

        setPhaseOut : public_setPhaseOut,
        setPhaseOutDuration : public_setPhaseOutDuration,
        setPhaseOutAnimations : public_setPhaseOutAnimations,

        setDisplayDuration : public_setDisplayDuration,
        setPhaseOverlap : public_setPhaseOverlap,
        setSegueDuration : public_setSegueDuration,
        setLoopCount : public_setLoopCount,
        setFade : public_setFade,

        saveOption : public_saveOption,
        loadOption : public_loadOption,

        restart : public_restart

    };



    /*  Validators for checking if the parameters are in the correct format/correct type    */
    function validate_imgList(imgList) {

        if (Array.isArray(imgList)) {

            var typeString = imgList.every(function (cVal) { //Check contents are all strings
                return typeof cVal == "string";
            });

            if (imgList.length && typeString) return true;

        }

        return false;

    }

    function validate_segueType(sType) {

        switch (sType) {
            case "stack":
            case "vertical":
            case "vertical-reverse":
            case "horizontal":
            case "horizontal-reverse":
                return true;
                break;
        }

        return false;

    }

    function validate_phaseValDuration(pVal) {    return (typeof pVal === "number" && pVal >= 0);   }

    function validate_phaseAnimations(pAnimations) {  return (Array.isArray(pAnimations) && pAnimations.length != 1); }

    function validate_displayDuration(dDuration) {  return (typeof dDuration === "number" && dDuration >= 0);   }

    function validate_phaseOverlap(pOverlap) {

        var validPO = pOverlap < Math.min((phaseIn_duration + display_duration), (display_duration + phaseOut_duration));
        return (typeof pOverlap === "number" && pOverlap >= 0 && validPO);

    }

    function validate_segueDuration(sDuration) {

        if (typeof sDuration === "string") {
            sDuration = sDuration.toLowerCase();
            if (sDuration === "full" || sDuration === "overlap") return true;
        }

        return false;

    }

    function validate_loopCount(lc) {

        var lcType = typeof lc;

        if (lcType === "string") {

            if (!isNaN(lc)) return validate_loopCount(parseInt(lc));

            lc = lc.toLowerCase();
            if (lc === "infinite") return lc;

        }else if (lcType === "number") {    if (lc > 0)  return Math.floor(lc);   }

        return false;

    }

    function validate_fadeValues(fIn, fOut) {

        if (typeof fIn === "boolean" && typeof fOut === "boolean") return true;
        return false;

    }



    //Public function for setting the list of image urls in the form of a string array of background-image values
    function public_setImageURLs(imgList) {

        if(validate_imgList(imgList)){

            urlList = imgList;
            populateContainer();

        }else throw new Error("The parameter for setImageURLs must be an array of urls (in string format)");

    }

    //Function to map the corresponding segueType to segue_data
    function correlateSegueType(sType) {

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
                    "transform: translate(0px, 100%); -webkit-transform: translate(0px, 100%);",
                    "transform: translate(0px, 0%); -webkit-transform: translate(0px, 0%);",
                    "transform: translate(0px, -100%); -webkit-transform: translate(0px, -100%);"
                ];
                break;
            case "vertical-reverse":
                segue_data = [
                    "transform: translate(0px, -100%); -webkit-transform: translate(0px, -100%);",
                    "transform: translate(0px, 0%); -webkit-transform: translate(0px, 0%);",
                    "transform: translate(0px, 100%); -webkit-transform: translate(0px, 100%);"
                ];
                break;
            case "horizontal":
                segue_data = [
                    "transform: translate(100%, 0px); -webkit-transform: translate(100%, 0px);",
                    "transform: translate(0%, 0px); -webkit-transform: translate(0%, 0px);",
                    "transform: translate(-100%, 0px); -webkit-transform: translate(-100%, 0px);"
                ];
                break;
            case "horizontal-reverse":
                segue_data = [
                    "transform: translate(-100%, 0px); -webkit-transform: translate(-100%, 0px);",
                    "transform: translate(0%, 0px); -webkit-transform: translate(0%, 0px);",
                    "transform: translate(100%, 0px); -webkit-transform: translate(100%, 0px);"
                ];
                break;
        }

    }

    //Public function for setting the sgue/transition method for going from slide to slide
    function public_setSegueType(sType) { //vertical, vertical-reverse, horizontal, horizontal-reverse, stack

        if(validate_segueType(sType)){

            correlateSegueType(sType);
            generateGallery();

        }else throw new Error(" The parameter for setSegueType accepts only the following values:  \
                                stack, vertical, vertical-reverse, horizontal, horizontal-reverse   ");


    }

    //Public function for setting the phaseIn duration and animation set as an array of keyframes
    function public_setPhaseIn(pIn, pAnimations) {

        if(validate_phaseValDuration(pIn) && validate_phaseAnimations(pAnimations)){

            if (pAnimations.length == 0) pAnimations = [{}, {}];

            phaseIn_duration = pIn;
            phaseIn_animations = pAnimations;

            generateGallery();

        } else throw new Error("    The first parameter of setPhaseIn must be a positive integer. \
                                    The second parameter of setPhaseIn must be an array of objects containing CSS key-pair values. \
                                    Additionally, the array must have a length of either 0, or 2 and higher. ");

    }

    //Public function for setting the phaseIn duration
    function public_setPhaseInDuration(pIn) {

        if(validate_phaseValDuration(pIn)) public_setPhaseIn(pIn, phaseIn_animations);
        else throw new Error("The parameter of setPhaseInDuartion must be a positive integer.");

    }

    //Public function for setting the phaseIn animation set as an array of keyframes
    function public_setPhaseInAnimations(pAnimations) {

        if(validate_phaseAnimations(pAnimations)) public_setPhaseIn(phaseIn_duration, pAnimations);
        else throw new Error("    The parameter of setPhaseInAnimations must be an array of objects containing CSS key-pair values. \
                                    Additionally, the array must have a length of either 0, or 2 and higher. ");

    }

    //Public function for setting the phaseOut duration and animation set as an array of keyframes
    function public_setPhaseOut(pOut, pAnimations) {

        if(validate_phaseValDuration(pOut) && validate_phaseAnimations(pAnimations)){

            if (pAnimations.length == 0) pAnimations = [{}, {}];

            phaseOut_duration = pOut;
            phaseOut_animations = pAnimations;

            generateGallery();

        } else throw new Error("    The first parameter of setPhaseOut must be a positive integer. \
                                    The second parameter of setPhaseOut must be an array of objects containing CSS key-pair values. \
                                    Additionally, the array must have a length of either 0, or 2 and higher. ");

    }

    //Public function for setting the phaseOut duration
    function public_setPhaseOutDuration(pOut) {

        if(validate_phaseValDuration(pOut)) public_setPhaseOut(pOut, phaseOut_animations);
        else throw new Error("The parameter of setPhaseOutDuration must be a positive integer.");

    }

    //Public function for setting the phaseOut animation set as an array of keyframes
    function public_setPhaseOutAnimations(pAnimations) {

        if(validate_phaseAnimations(pAnimations)) public_setPhaseOut(phaseOut_duration, pAnimations);
        else throw new Error("    The parameter of setPhaseOutAnimations must be an array of objects containing CSS key-pair values. \
                                  Additionally, the array must have a length of either 0, or 2 and higher. ");

    }

    //Public function for setting the display duration
    function public_setDisplayDuration(dDuration) {

        if (validate_displayDuration(dDuration)) {

            display_duration = dDuration;

            generateGallery();

        } else throw new Error("setDisplayDuration parameter must be a positive integer");

    }

    //Public function for setting the phase overlap duration
    function public_setPhaseOverlap(pOverlap) {

        if (validate_phaseOverlap(pOverlap)) {

            phaseOverlap_duration = pOverlap;
            segue_duration = ( phaseOverlap_duration ? segue_duration : "full" );

            generateGallery();

        } else throw new Error("    setPhaseOverlap parameter must be a positive integer. \
                                    Additionally, it must be smaller than phaseIn + display duration and phaseOut + display duration.   ");

    }

    //Public function for setting the segue duration type
    function public_setSegueDuration(sDuration) {

        if (validate_segueDuration(sDuration)) {

                segue_duration = ( phaseOverlap_duration ? sDuration : "full" );
                generateGallery();

        } else throw new Error("    setSegueDuration parameter must either be \"full\" or \"overlap\". \
                                    Additionally, if setPhaseOverlap is set to 0, then full will be set regardless.  ");

    }

    //Public function for setting how many times the gallery should loop
    function public_setLoopCount(lc) {

        var lcResult = validate_loopCount(lc);
        if (lcResult) {

            loopCount = lcResult;
            generateGallery();

        } else throw new Error("setLoopCount accepts only positive integers greater than 0 or the keyword \"infinite\" ");

    }

    //Public function for setting if fading is desired
    function public_setFade(fIn, fOut) {

        if (validate_fadeValues(fIn, fOut)) {

            fadeIn = fIn;
            fadeOut = fOut;
            generateGallery();

        } else throw new Error("setFade only accepts 2 boolean parameters");

    }

    //Public function for storing options associated with a name, if the values are acceptable
    function public_saveOption(optName, callback) {

        var optionSettings = callback({
            "displayDuration" : display_duration,
            "phaseInDuration" : phaseIn_duration,
            "phaseOutDuration" : phaseOut_duration,
            "phaseOverlap" : phaseOverlap_duration
        });

        for (var attribute in optionSettings) {

            var currentValue = optionSettings[attribute];
            switch (attribute) {
                case "segueType":
                    if (!validate_segueType(currentValue))
                        throw new Error("   segueType attribute accepts only the following values:  \
                                            stack, vertical, vertical-reverse, horizontal, horizontal-reverse   ");
                    break;
                case "phaseInDuration":
                case "phaseOutDuration":
                    if (!validate_phaseValDuration(currentValue))
                        throw new Error("   " + attribute + " attribute accepts only positive integers    ");
                    break;
                case "phaseInAnimations":
                case "phaseOutAnimations":
                    if (!validate_phaseAnimations(currentValue))
                        throw new Error("   " + attribute + " attribute accepts only an array of objects containing CSS key-pair values. \
                                            Additionally, the array must have a length of either 0, or 2 and higher.   ");
                    break;
                case "phaseOverlap":
                    if (!validate_phaseOverlap(currentValue))
                        throw new Error("   phaseOverlap attribute accepts only a positive integer. \
                                            Additionally, it must be smaller than phaseIn + display duration and phaseOut + display duration.   ");
                    break;
                case "segueDuration":
                    if (!validate_segueDuration(currentValue))
                        throw new Error("   segueDuration attribute accepts only either \"full\" or \"overlap\". \
                                            Additionally, if setPhaseOverlap is set to 0, then full will be set regardless.   ");
                    break;
                case "fadeIn":
                case "fadeOut":
                    if (!validate_fadeValues(currentValue, currentValue))
                        throw new Error("   " + attribute + " attribute accepts only a boolean value ");
                    break;
                default:
                    throw new Error("   " + attribute + " attribute is not recognised/accepted ");
                    break;
            }

        }

        savedOptions[optName] = callback;

    }

    //Public function for loading an option given a name, if it has been stored
    function public_loadOption(optName) {

        //In a try-catch such that error doesn't stop JS
        try {
            if (!savedOptions.hasOwnProperty(optName)) throw new Error("    option does not exist  ");
        } catch (err) {
            console.error(err);
            return;
        }

        var optionSettings = savedOptions[optName]({
            "displayDuration" : display_duration,
            "phaseInDuration" : phaseIn_duration,
            "phaseOutDuration" : phaseOut_duration,
            "phaseOverlap" : phaseOverlap_duration
        });

        if (optionSettings.hasOwnProperty("phaseInDuration")) phaseIn_duration = optionSettings["phaseInDuration"];
        if (optionSettings.hasOwnProperty("phaseInAnimations")) phaseIn_animations = ( optionSettings["phaseInAnimations"].length ? optionSettings["phaseInAnimations"] : [{}, {}] );
        if (optionSettings.hasOwnProperty("phaseOutDuration")) phaseOut_duration = optionSettings["phaseOutDuration"];
        if (optionSettings.hasOwnProperty("phaseOutAnimations")) phaseOut_animations = ( optionSettings["phaseOutAnimations"].length ? optionSettings["phaseOutAnimations"] : [{}, {}] );

        if (optionSettings.hasOwnProperty("phaseOverlap")) {
            phaseOverlap_duration = optionSettings["phaseOverlap"];
            segue_duration = ( phaseOverlap_duration ? segue_duration : "full" );
        }
        if (optionSettings.hasOwnProperty("segueDuration")) segue_duration = ( phaseOverlap_duration ? optionSettings["segueDuration"] : "full" );

        if (optionSettings.hasOwnProperty("fadeIn")) fadeIn = optionSettings["fadeIn"];
        if (optionSettings.hasOwnProperty("fadeOut")) fadeOut = optionSettings["fadeOut"];

        if (optionSettings.hasOwnProperty("segueType")) correlateSegueType(optionSettings["segueType"]);

        generateGallery();

    }


    //Public function to restart animation
    function public_restart() {

        var containerHTML = document.getElementById(containerID).innerHTML;
        document.getElementById(containerID).innerHTML = "";

        setTimeout(function(){  document.getElementById("ixb_content_" + containerID).innerHTML = containerHTML;  }, 1);

    }

});
