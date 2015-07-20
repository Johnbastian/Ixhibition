var ixb = Ixhibition();

var imgList = [
    "images/EarthMoon.jpg"
    , "images/Fuji.jpg"
    , "images/SeaMist.jpg"
    , "images/Bahamas.jpg"
];
console.log("********************************");
ixb.setImageList(imgList);
console.log("********************************");
//ixb.setPhaseOverlap(1);
console.log("********************************");
//ixb.setSegueType("vertical");
//ixb.setSegueDuration("overlap");
/*
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
*/
console.log("********************************");

ixb.saveOption("testA", function(data){

    var pIn = ( data.phaseInDuration >= 2 ? data.phaseInDuration : 2 ),
        pOut = ( data.phaseOutDuration >= 2 ? data.phaseOutDuration : 2);
    pIn = pOut = Math.min(pIn, pOut);

    return {
          "segueType" : "vertical"
        , "phaseInDuration" : pIn
        , "phaseInAnimations" : [
            {"transform" : "scale(0.7, 0.7)", "-webkit-transform" : "scale(0.7, 0.7)"},
            {"transform" : "scale(0.7, 0.7)", "-webkit-transform" : "scale(0.7, 0.7)"},
            {"transform" : "scale(1, 1)", "-webkit-transform" : "scale(1, 1)"}
        ]
        , "phaseOutDuration" : pOut
        , "phaseOutAnimations" : [
            {"transform" : "scale(1.05, 1.05)", "-webkit-transform" : "scale(1.05, 1.05)"},
            {"transform" : "scale(0.7, 0.7)", "-webkit-transform" : "scale(0.7, 0.7)"},
            {"transform" : "scale(0.7, 0.7)", "-webkit-transform" : "scale(0.7, 0.7)"}
        ]
        , "phaseOverlap" : (pIn / 2)
        , "segueDuration" : "overlap"
        , "fadeIn" : false
        , "fadeOut" : false
    };

});

ixb.loadOption("ixb_10");
