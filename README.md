# Ixhibition
*Image Exhibition*

A Javascript and CSS3 Animation based image gallery, providing control over the transitioning/seguing of slides.

###Introduction
Ixhibition is an image gallery generated in Javascript and powered by CSS3 Animations, with the additional advantage of being able to set custom and desired animations using CSS3 Animation supported attributes. Ixhibition is also intended to serve as a core library on which additional packages may be developed, for additional and/or specific functionality, including providing a more animation sets and for connecting to other APIs and libraries.

Ixhibition is 100% open source.

#Using Ixhibition
##Getting Started
Firstly, before instantiating the library in javascript, a `<div>` tag with an ID must be created for the library to use. By default, the library looks for a `<div>` tag with the ID *"ixhibition"*, however another ID value can be used as long as it is passed when the library is instantiated.

Instantiation will populate the assigned div tag, and will append `<style>` tags to the head in which the associated CSS will be injected in, including the animations.

####Default ID
HTML: `<div id="ixhibition"></div> `

Javascript: `var ixb = Ixhibition();`


####Custom ID
HTML: `<div id="myGallery"></div>`

Javascript: `var ixb = Ixhibition("myGallery");`


##Loading Images
In order to load a set of images in, an array of image urls in string format must be passed as the parameter into the `setImageList` function.

```javascript
var imgList = [
    "images/image1.jpg",
    "images/image2.jpg",
    "images/image3.jpg",
    "images/image4.jpg"
];

ixb.setImageList(imgList);
```

##Segue (Transition) Type
There are 5 built in segue animations which dictate the transitioning from image to image. These include: "stack", "vertical", "vertical-reverse", "horizontal" and "horizontal-reverse". The default is "vertical".

[img]

```javascript
ixb.setSegueType("stack");
```





setSegueType : public_setSegueType,
setPhaseIn : public_setPhaseIn,
setPhaseOut : public_setPhaseOut,
setDisplayDuration : public_setDisplayDuration,
setPhaseOverlap : public_setPhaseOverlap,
setSegueDuration : public_setSegueDuration,
setLoopCount : public_setLoopCount,
setFade : public_setFade,








##Creating Packages





saveOption : public_saveOption,
loadOption : public_loadOption
