var ixb = Ixhibition();

var imgList = [
    "images/EarthMoon.jpg"
    , "images/Fuji.jpg"
    , "images/SeaMist.jpg"
    , "images/Bahamas.jpg"
];
ixb.setImageList(imgList);
ixb.setDisplayDuration(4);

ixb.saveOption("ixb_1", function(data){

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

});

ixb.saveOption("ixb_2", function(data){

    var pIn = ( data.phaseIn_duration ? data.phaseIn_duration : 1 ),
        pOut = ( data.phaseOut_duration ? data.phaseOut_duration : 1);

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

});

ixb.saveOption("ixb_3", function(data){

    var pIn = ( data.phaseIn_duration ? data.phaseIn_duration : 1 ),
        pOut = ( data.phaseOut_duration ? data.phaseOut_duration : 1);

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

});

ixb.saveOption("ixb_4", function(data){

    var pIn = ( data.phaseIn_duration ? data.phaseIn_duration : 1 ),
        pOut = ( data.phaseOut_duration ? data.phaseOut_duration : 1);

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

});

ixb.saveOption("ixb_5", function(data){

    var pIn = ( data.phaseIn_duration ? data.phaseIn_duration : 1 ),
        pOut = ( data.phaseOut_duration ? data.phaseOut_duration : 1);

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

});

ixb.saveOption("ixb_6", function(data){

    var pIn = ( data.phaseIn_duration ? data.phaseIn_duration : 1 ),
        pOut = ( data.phaseOut_duration ? data.phaseOut_duration : 1);

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

});







/*
ixb.saveOption("ixb_10", function(data){

    var pIn = ( data.phaseIn_duration ? data.phaseIn_duration : 2 ),
        pOut = ( data.phaseOut_duration ? data.phaseOut_duration : 2);

    pIn = pOut = Math.min(pIn, pOut);

    var ixb_10 = {
        "segueType" : "vertical",
        "phaseInDuration" : pIn,
        "phaseInAnimations" : [
            {"transform" : "scale(0.7, 0.7)"},
            {"transform" : "scale(0.7, 0.7)"},
            {"transform" : "scale(1, 1)"}
        ],
        "phaseOutDuration" : pOut,
        "phaseOutAnimations" : [
            {"transform" : "scale(1.05, 1.05)"},
            {"transform" : "scale(0.7, 0.7)"},
            {"transform" : "scale(0.7, 0.7)"}
        ],
        "phaseOverlap" : (pIn / 2),
        "segueDuration" : "overlap",
        "fadeIn" : false,
        "fadeOut" : false
    };

    return ixb_10;

});

ixb.saveOption("ixb_20", function(data){

    var pIn = ( data.phaseIn_duration ? data.phaseIn_duration : 2 ),
        pOut = ( data.phaseOut_duration ? data.phaseOut_duration : 2);

    pIn = pOut = Math.min(pIn, pOut);

    var ixb_20 = {
        "segueType" : "horizontal",
        "phaseInDuration" : pIn,
        "phaseInAnimations" : [],
        "phaseOutDuration" : pOut,
        "phaseOutAnimations" : [
            {"transform-origin" : "right center" ,"transform" : "scaleX(1)"},
            {"transform-origin" : "right center", "transform" : "scaleX(0)"}
        ],
        "phaseOverlap" : pIn,
        "fadeIn" : false,
        "fadeOut" : false
    };

    return ixb_20;

});

ixb.saveOption("ixb_40", function(data){

    var pIn = ( data.phaseIn_duration ? data.phaseIn_duration : 2 ),
        pOut = ( data.phaseOut_duration ? data.phaseOut_duration : 2);

    pIn = pOut = Math.min(pIn, pOut);

    var ixb_40 = {
        "segueType" : "stack",
        "phaseInDuration" : pIn,
        "phaseInAnimations" : [
            {"transform-origin" : "right center", "transform" : "scale(0.5, 0.5) rotateY(90deg)"},
            {"transform-origin" : "right center", "transform" : "scale(0.5, 0.5) rotateY(45deg)"},
            {"transform" : "scale(1, 1)"}
        ],
        "phaseOutDuration" : pOut,
        "phaseOutAnimations" : [
            {"transform" : "scale(1, 1)"},
            {"transform-origin" : "left center", "transform" : "scale(0.5, 0.5)  rotateY(-45deg)"},
            {"transform-origin" : "left center", "transform" : "scale(0.5, 0.5)  rotateY(-90deg)"}
        ],
        "phaseOverlap" : pIn,
        "fadeIn" : false,
        "fadeOut" : false
    };

    return ixb_40;

});
*/
ixb.loadOption("ixb_1");
