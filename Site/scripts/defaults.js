var imgList = [
    "images/img1.jpg",
    "images/img2.jpg",
    "images/img3.jpg",
    "images/img5.jpg",
    "images/img9.jpg"
];

var demoList = [];
for (var i = 1; i < 11; i++) {
    demoList[i] = Ixhibition("demo" + i);
    demoList[i].setImageList(imgList);
    demoList[i].loadOption("ixb_" + i);
}
