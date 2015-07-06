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

    var ixb_1 = {
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

    return ixb_1;

});

ixb.saveOption("ixb_2", function(data){

    var ixb_2 = {
        "segueType" : "horizontal",
        "phaseInDuration" : 2,
        "phaseInAnimations" : [],
        "phaseOutDuration" : 2,
        "phaseOutAnimations" : [
            {"transform-origin" : "right center" ,"transform" : "scaleX(1)"},
            {"transform-origin" : "right center", "transform" : "scaleX(0)"}
        ],
        "phaseOverlap" : 2,
        "loopCount" : 3,
        "fadeIn" : false,
        "fadeOut" : false
    };

    return ixb_2;

});

ixb.saveOption("ixb_3", function(data){

    var ixb_3 = {
        "segueType" : "stack",
        "phaseInDuration" : 2,
        "phaseInAnimations" : [
            {"transform-origin" : "left center", "transform" : "scale(0.5, 0.5) rotateY(-90deg)"},
            {"transform-origin" : "left center", "transform" : "scale(0.5, 0.5) rotateY(-45deg)"},
            {"transform" : "scale(1, 1)"}
        ],
        "phaseOutDuration" : 2,
        "phaseOutAnimations" : [
            {"transform" : "scale(1, 1)"},
            {"transform-origin" : "right center", "transform" : "scale(0.5, 0.5)  rotateY(45deg)"},
            {"transform-origin" : "right center", "transform" : "scale(0.5, 0.5)  rotateY(90deg)"}
        ],
        "phaseOverlap" : 2,
        "loopCount" : 3,
        "fadeIn" : false,
        "fadeOut" : false
    };

    return ixb_3;

});

ixb.loadOption("ixb_3");
