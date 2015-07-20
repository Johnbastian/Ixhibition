var imgList = [
    "images/imgA.jpg",
    "images/imgB.jpg",
    "images/imgC.jpg",
    "images/imgD.jpg",
    "images/imgE.jpg"
];

var demoList = [];
for (var i = 1; i < 11; i++) {
    demoList[i] = Ixhibition("demo" + i);
    demoList[i].setImageList(imgList);
    demoList[i].loadOption("ixb_" + i);
}
