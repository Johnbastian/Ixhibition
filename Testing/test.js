var ixb = Ixhibition();

var imgList = [
    "images/EarthMoon.jpg"
    , "images/Fuji.jpg"
    , "images/SeaMist.jpg"
    , "images/Bahamas.jpg"
];

ixb.setImageList(imgList);

ixb.setDisplayDuration(4);


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
