var ixb = Ixhibition();

var imgList = [
    "images/EarthMoon.jpg"
    , "images/Fuji.jpg"
    , "images/SeaMist.jpg"
    , "images/Bahamas.jpg"
];

ixb.setImageList(imgList);

ixb.setSegueType("vertical");

ixb.setPhaseIn(2, [
    {"transform" : "scale(0.7, 0.7) translate(0px, 100%)"},
    {"transform" : "scale(0.7, 0.7) translate(0px, 0%)"},
    {"transform" : "scale(1, 1)"},
    {"transform" : "scale(1, 1) "},
    {"transform" : "scale(1, 1)"}
]);

ixb.setPhaseOut(2, [
    {"transform" : "scale(1.05, 1.05)"},
    {"transform" : "scale(1.05, 1.05)"},
    {"transform" : "scale(0.7, 0.7) translate(0px, 0%)"},
    {"transform" : "scale(0.7, 0.7) "},
    {"transform" : "scale(0.7, 0.7) translate(0px, -100%)"}
]);

ixb.setDisplayDuration(4);

ixb.setPhaseOverlap(0.5);

ixb.setLoopCount(3);

//ixb.setFade(false, false);
