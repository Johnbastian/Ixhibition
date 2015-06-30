var ixb = Ixhibition("testDiv");

var imgList = [
    "images/EarthMoon.jpg"
    , "images/Fuji.jpg"
    , "images/SeaMist.jpg"
    , "images/Bahamas.jpg"
];

ixb.setImageList(imgList);

ixb.setDisplayDuration(4);

/*
ixb.setSegueType("vertical");

ixb.setPhaseIn(2, [
    {"transform" : "scale(0.7, 0.7)"},
    {"transform" : "scale(0.7, 0.7)"},
    {"transform" : "scale(1, 1)"}
]);

ixb.setPhaseOut(2, [
    {"transform" : "scale(1.05, 1.05)"},
    {"transform" : "scale(0.7, 0.7)"},
    {"transform" : "scale(0.7, 0.7)"}
]);

ixb.setPhaseOverlap(1);

ixb.setLoopCount(3);

ixb.setSegueDuration("overlap");

ixb.setFade(false, false);
*/


ixb.saveOption("testA", function(data){

    var settingsX = {
        "segueType" : "vertical",
        "phaseInDuration" : 2,
        "phaseInAnimations" : [
            {"transform" : "scale(0.7, 0.7)"},
            {"transform" : "scale(0.7, 0.7)"},
            {"transform" : "scale(1, 1)"}
        ],
        "phaseOutDuration" : 2,
        "phaseOutAnimations" : [
            {"transform" : "scale(1.05, 1.05)"},
            {"transform" : "scale(0.7, 0.7)"},
            {"transform" : "scale(0.7, 0.7)"}
        ],
        "phaseOverlap" : 1,
        "loopCount" : 3,
        "segueDuration" : "overlap",
        "fadeIn" : false,
        "fadeOut" : false
    };

    return settingsX;

});
