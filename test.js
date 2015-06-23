var ixb = Ixhibition();

var imgList = [
    "images/EarthMoon.jpg"
    , "images/Fuji.jpg"
    , "images/SeaMist.jpg"
    , "images/Bahamas.jpg"
];

ixb.setImageList(imgList);
//ixb.setSegueType("vertical");

var testA = ["asdf", "asdf", "asdf", 0];

var testRes = testA.every(function (val) {
    return typeof val === "string";
});

console.log("testRes is: " + testRes);
