var ixb = Ixhibition();

var imgList = [
    "images/img1.jpg",
    "images/img2.jpg",
    "images/img3.jpg",
    "images/img4.jpg",
    "images/img5.jpg",
    "images/img6.jpg",
    "images/img7.jpg",
    "images/img8.jpg",
    "images/img9.jpg",
    "images/img10.jpg"
];
ixb.setImageList(imgList);
ixb.setDisplayDuration(4);
ixb.setPhaseIn(2, []);
ixb.setPhaseOut(2, []);
ixb.loadOption("ixb_4");
