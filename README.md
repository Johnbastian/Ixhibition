# Ixhibition
*Image Exhibition*

A Javascript and CSS3 Animation based image gallery, providing control over the transitioning/seguing of slides.
<br />
###Overview
Ixhibition is an image gallery generated in Javascript and powered by CSS3 Animations, with the additional advantage of being able to set custom and desired animations using CSS3 Animation supported attributes. Ixhibition is also intended to serve as a core library on which additional packages may be developed, for additional and/or specific functionality, including providing a more animation sets and for connecting to other APIs and libraries.

Ixhibition is 100% open source.
<br />
<br />
#Using Ixhibition
##Getting Started
Firstly, before instantiating the library in javascript, a `<div>` tag with an ID must be created for the library to use. By default, the library looks for a `<div>` tag with the ID *"ixhibition"*, however another ID value can be used as long as it is passed when the library is instantiated.
<br/>Instantiation will populate the assigned div tag, and will append `<style>` tags to the head in which the associated CSS will be injected in, including the animations.

####Default ID
HTML: `<div id="ixhibition"></div> `

Javascript: `var ixb = Ixhibition();`


####Custom ID
HTML: `<div id="myGallery"></div>`

Javascript: `var ixb = Ixhibition("myGallery");`


##Loading Images
In order to load a set of images in, an array of image urls in string format must be passed as the parameter into the `setImageList(imgList)` function.

```javascript
var imgList = [
    "images/image1.jpg",
    "images/image2.jpg",
    "images/image3.jpg",
    "images/image4.jpg"
];

ixb.setImageList(imgList);
```

##Setting Segue Type
There are 5 built in segue (transition) animations which dictate the transitioning from image to image. These include: **"stack"**, **"vertical"**, **"vertical-reverse"**, **"horizontal"** and **"horizontal-reverse"**. The default is "vertical".

[img]

```javascript
ixb.setSegueType("stack");
```

[img]

```javascript
ixb.setSegueType("vertical");
```

[img]

```javascript
ixb.setSegueType("vertical-reverse");
```

[img]

```javascript
ixb.setSegueType("horizontal");
```

[img]

```javascript
ixb.setSegueType("horizontal-reverse");
```

##Setting Display Duration
In order to set the display duration, a positive number must be set as the parameter:

[img pointing at display duration]

```javascript
ixb.setDisplayDuration(4);
```

##Setting Phases
Phase values (phaseIn and phaseOut) indicate the duration values for transitioning in and out for a slide respectively. Only positive numbers are accepted for these values.

[img pointing at phase durations]
```javascript
var phaseIn_duration = 2,
    phaseOut_duration = 2;
```

Phase animations indicate what animation should be performed during the phaseIn and phaseOut durations. These are defined by passing in an array of objects. The objects must contain key-value pairs where the key is the must be a CSS3 attribute and the value should be the associated CSS3 value. Each object in the array is treated as a key frame, and the number of objects indicate the number of key frames, divided at regular intervals: therefore the array must either be 0 or 2 and greater, (an array of length 1 will throw an error).

```javascript
var phaseIn_animation = [
        {"transform" : "scale(0.7, 0.7)"},  //Keyframe @ 0% of phaseIn
        {"transform" : "scale(0.7, 0.7)"},  //Keyframe @ 50% of phaseIn
        {"transform" : "scale(1, 1)"}       //Keyframe @ 100% of phaseIn
    ],
    phaseOut_animation = [
        {"transform" : "scale(1, 1)"},      //Keyframe @ 0% of phaseOut
        {"transform" : "scale(0.7, 0.7)"},  //Keyframe @ 50% of phaseOut
        {"transform" : "scale(0.7, 0.7)"}   //Keyframe @ 100% of phaseOut
    ];

//Example 2
var phaseIn_animationB = [
        {"transform" : "scale(0.7, 0.7)"},  //Keyframe @ 0% of phaseIn
        {"transform" : "scale(0.7, 0.7)"},  //Keyframe @ 25% of phaseIn
        {"transform" : "scale(0.7, 0.7)"},  //Keyframe @ 50% of phaseIn
        {"transform" : "scale(0.7, 0.7)"},  //Keyframe @ 75% of phaseIn
        {"transform" : "scale(1, 1)"}       //Keyframe @ 100% of phaseIn
    ],
    phaseOut_animationB = [
        {"transform" : "scale(1, 1)"},      //Keyframe @ 0% of phaseOut
        {"transform" : "scale(0.7, 0.7)"},  //Keyframe @ 20% of phaseOut
        {"transform" : "scale(0.7, 0.7)"},  //Keyframe @ 40% of phaseOut
        {"transform" : "scale(0.7, 0.7)"},  //Keyframe @ 60% of phaseOut
        {"transform" : "scale(0.7, 0.7)"},  //Keyframe @ 80% of phaseOut
        {"transform" : "scale(0.7, 0.7)"}   //Keyframe @ 100% of phaseOut
    ];
```
Both `setPhaseIn(pIn_duration, pIn_animation)` and `setPhaseOut(pOut_duration, pOut_animation)` functions require 2 parameters, where the first value is the duration (as a positive integer), and the second parameter requires the associated phase animations (as an array of objects), like so:

```javascript
ixb.setPhaseIn(phaseIn_duration, phaseIn_animation);
ixb.setPhaseOut(phaseOut_duration, phaseOut_animation);
```

####Static vs Dynamic Display
**Static:** This is the most common option. In order to achieve a static display, the last (keyframe) object in the phaseIn animation and the first object in the phaseOut animation must match.

```javascript
var phaseIn_animation = [
        {"transform" : "scale(0.7, 0.7)"},
        {"transform" : "scale(0.7, 0.7)"},
        {"transform" : "scale(1, 1)"}
    ],
    phaseOut_duration = [
        {"transform" : "scale(1, 1)"},
        {"transform" : "scale(0.7, 0.7)"},
        {"transform" : "scale(0.7, 0.7)"}
    ];
```

**Dynamic:** This option is when you want the apply a simple/basic animation during the display. The last (keyframe) object in the phaseIn animation and the first object in the phaseOut animation may have simple differences.

```javascript
var phaseIn_animation = [
        {"transform" : "scale(0.7, 0.7)"},
        {"transform" : "scale(0.7, 0.7)"},
        {"transform" : "scale(1, 1)"}
    ],
    phaseOut_duration = [
        {"transform" : "scale(1.05, 1.05)"},
        {"transform" : "scale(0.7, 0.7)"},
        {"transform" : "scale(0.7, 0.7)"}
    ];
```

##Setting Phase Overlap
The phase overlap dictates how much of the phaseOut duration of the phasing-out slide and how much of the phaseIn duration of the phasing-in slide overlap.

[img exemplifying overlap]
```javascript
ixb.setPhaseOverlap(1);
```
This provides control over the transitioning and can be used to achieve specific animations.

##Segue Duration
The segue duration accepts two values: "full" and "overlap". The segue duration indicates at what point the transition (going from one slide to the next) occurs and how long it lasts.
<br/>If **"full"** is set (default), then the segue duration is indicated by:  phaseOut + phaseIn - phaseOverlap. The segue duration starts at the beginning of the phaseOut duration of the phasing-out slide and ends at the end of the phaseIn duration of the phasing-in slide. Note: if segue type is "stack", the segue duration is "full" regardlessly.
[img exemplifying full]

<br/>If **"overlap"** is set, then the segue duration is equal to the phaseOverlap value and starts and ends at the same time.

[img exemplifying overlap]
```javascript
ixb.setSegueDuration("full");
```


##Set Loop Count
This indicates how many times the gallery should loop, and maps exactly to the animation-iteration-count attribute in CSS3: any legal value for the attribute will be accepted as the parameter, including "infinite".
```javascript
ixb.setLoopCount(1);
//Or
ixb.setLoopCount("infinite");
```


##Setting Fading
It is possible to indicate whether fading in and/or out is desired, which occurs during the full duration of the phaseIn and phaseOut values respectively: 2 parameters are required, the first parameter being for phaseIn and the second being for phaseOut.
```javascript
ixb.setFade(true, true);
```

##Saving and Loading Options
###Saving
It is possible to save a preset and load it later. To do so, the `saveOption(keyname, callback)` function is used. The function requires 2 parameters: a preset *keyname* as a string, and a *callback* function which accepts a single parameter and must return an object.
The object provided (from the parameter) is a data object containing the following value:
```javascript
{
    "segueType" : "vertical",       //(see Setting Segue Type)
}
```

The return object may contain any of the following keys will corresponding values:
```javascript
{
    "segueType" : "vertical",       //(see Setting Segue Type)
    "phaseInDuration" : 2,          //(see Setting Phases - phaseIn_duration)
    "phaseInAnimations" : [],       //(see Setting Phases - phaseIn_animation)
    "phaseOutDuration" : 2,         //(see Setting Phases - phaseOut_duration)
    "phaseOutAnimations" : [],      //(see Setting Phases - phaseOut_animation)
    "phaseOverlap" : 1,             //(see Setting Phase Overlap)
    "segueDuration" : "overlap",    //(see Setting Segue Duration)
    "loopCount" : 3,                //(see Setting Loop Count)
    "fadeIn" : false,               //(see Setting Fading - fadeIn)
    "fadeOut" : false               //(see Setting Fading - fadeOut)
}
```

A callback function allows presets to perform calculations if desired before returning the object with desired attributes.
```javascript
ixb.saveOption("test-option", function(data){

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
```


###Loading
If a preset has been saved, then the `loadOption(keyname)` function can be used to load it, given the associate keyname:
```javascript
ixb.loadOption("test-option");
```


<br />
<br />
#Creating Packages
It is encouraged to develop and use packages that utilise Ixhibition, especially packages that add more  animation sets and ones that provide additional functionality. However, in an attempt to streamline and standardise this such that multiple packages could be used in a project, a set of guidelines are provided.

##General Guidelines
These guidelines apply to all packages:

1. The package should request for an instance of ixhibition to be passed in as the parameter when the package is instantiated. E.g.

```javascript
var ixb = Ixhibition();

MyPackage(ixb);
//Or
var mypackage = MyPackage(ixb);
```

2. It is not advised to modify the Ixhibition object itself, including adding more functions, changing functions, and deleting functions. Ixhibition has been developed in an encapsulated and self-contained format, and therefore any modification to the object may have unintended consequences. The only form of acceptable modification is through the provided functions from the object.


##Animation Package Guidelines
Packages that only provide additional animation sets should follow these requirements:

1. In order to avoid conflict, the keynames for the animations provided by the package should start with the package name or abbreviation, followed by an underscore, and finnally followed by the preset name, i.e. *{package name}* __ *{preset name}*
<br/> An example would be if the package is called *MyAnimationX*, then the keynames would be myanimationx_[preset name] or max_[preset name], e.g. myanimationx_1 or max_1

```javascript
//Example of saving a preset:
ixb.saveOption("max_1", function(data){

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
        "segueDuration" : "overlap",
    };

    return settingsX;

});
```

2. When using preset options, due to possible additional calculations required within the preset based of the `data` object provided ([see Saving](###Saving)), it may be neccessary for the `loadOption(keyname)` function to be executed relatively last; i.e. after setting `setDisplayDuration(displayDuration)`, `setPhaseIn(pIn_duration, pIn_animation)`, `setPhaseOut(pOut_duration, pOut_animation)`, and/or `setPhaseOverlap(poDuration)`. Therefore, if dependant on any of the values provided by the `data` object, then it will be necessary to explain this within the package documentation or preferably provide functions from the package object which take into account and deal with these attributes.

##Functional Package Guidelines
Packages that provide additional functionality with or without animation sets should follow these requirements:

1. It is recommended that the package (object) provides (public) functions in order to use the package.

2.

3. Animations should follow [Animation Package Guidelines](##Animation Package Guidelines) and provide (public) functions regardlessly.
