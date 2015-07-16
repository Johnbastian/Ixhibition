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
/*
        //Stack (no fade)
        savedOptions[&quot;ixb_1&quot;] = function(data){

            return {
                &quot;segueType&quot; : &quot;stack&quot;,
                &quot;phaseInDuration&quot; : 0,
                &quot;phaseInAnimations&quot; : [],
                &quot;phaseOutDuration&quot; : 0,
                &quot;phaseOutAnimations&quot; : [],
                &quot;phaseOverlap&quot; : 0,
                &quot;segueDuration&quot; : &quot;full&quot;,
                &quot;fadeIn&quot; : false,
                &quot;fadeOut&quot; : false
            };

        };

        //Vertical simple slide
        savedOptions[&quot;ixb_2&quot;] = function(data){

            var pIn = ( data.phaseInDuration &gt;= 1 ? data.phaseInDuration : 1 ),
                pOut = ( data.phaseOutDuration &gt;= 1 ? data.phaseOutDuration : 1);

            pIn = pOut = Math.min(pIn, pOut);

            return {
                &quot;segueType&quot; : &quot;vertical&quot;,
                &quot;phaseInDuration&quot; : pIn,
                &quot;phaseInAnimations&quot; : [],
                &quot;phaseOutDuration&quot; : pOut,
                &quot;phaseOutAnimations&quot; : [],
                &quot;phaseOverlap&quot; : pIn,
                &quot;segueDuration&quot; : &quot;full&quot;,
                &quot;fadeIn&quot; : false,
                &quot;fadeOut&quot; : false
            };

        };

        //Vertical-reverse simple slide
        savedOptions[&quot;ixb_3&quot;] = function(data){

            var pIn = ( data.phaseInDuration &gt;= 1 ? data.phaseInDuration : 1 ),
                pOut = ( data.phaseOutDuration &gt;= 1 ? data.phaseOutDuration : 1);

            pIn = pOut = Math.min(pIn, pOut);

            return {
                &quot;segueType&quot; : &quot;vertical-reverse&quot;,
                &quot;phaseInDuration&quot; : pIn,
                &quot;phaseInAnimations&quot; : [],
                &quot;phaseOutDuration&quot; : pOut,
                &quot;phaseOutAnimations&quot; : [],
                &quot;phaseOverlap&quot; : pIn,
                &quot;segueDuration&quot; : &quot;full&quot;,
                &quot;fadeIn&quot; : false,
                &quot;fadeOut&quot; : false
            };

        };

        //Horizontal simple slide
        savedOptions[&quot;ixb_4&quot;] = function(data){

            var pIn = ( data.phaseInDuration &gt;= 1 ? data.phaseInDuration : 1 ),
                pOut = ( data.phaseOutDuration &gt;= 1 ? data.phaseOutDuration : 1);

            pIn = pOut = Math.min(pIn, pOut);

            return {
                &quot;segueType&quot; : &quot;horizontal&quot;,
                &quot;phaseInDuration&quot; : pIn,
                &quot;phaseInAnimations&quot; : [],
                &quot;phaseOutDuration&quot; : pOut,
                &quot;phaseOutAnimations&quot; : [],
                &quot;phaseOverlap&quot; : pIn,
                &quot;segueDuration&quot; : &quot;full&quot;,
                &quot;fadeIn&quot; : false,
                &quot;fadeOut&quot; : false
            };

        };

        //Horizontal-reverse simple slide
        savedOptions[&quot;ixb_5&quot;] = function(data){

            var pIn = ( data.phaseInDuration &gt;= 1 ? data.phaseInDuration : 1 ),
                pOut = ( data.phaseOutDuration &gt;= 1 ? data.phaseOutDuration : 1);

            pIn = pOut = Math.min(pIn, pOut);

            return {
                &quot;segueType&quot; : &quot;horizontal-reverse&quot;,
                &quot;phaseInDuration&quot; : pIn,
                &quot;phaseInAnimations&quot; : [],
                &quot;phaseOutDuration&quot; : pOut,
                &quot;phaseOutAnimations&quot; : [],
                &quot;phaseOverlap&quot; : pIn,
                &quot;segueDuration&quot; : &quot;full&quot;,
                &quot;fadeIn&quot; : false,
                &quot;fadeOut&quot; : false
            };

        };

        //Stack with fade
        savedOptions[&quot;ixb_6&quot;] = function(data){

            var pIn = ( data.phaseInDuration &gt;= 1 ? data.phaseInDuration : 1 ),
                pOut = ( data.phaseOutDuration &gt;= 1 ? data.phaseOutDuration : 1);

            pIn = pOut = Math.min(pIn, pOut);

            return {
                &quot;segueType&quot; : &quot;stack&quot;,
                &quot;phaseInDuration&quot; : pIn,
                &quot;phaseInAnimations&quot; : [],
                &quot;phaseOutDuration&quot; : pOut,
                &quot;phaseOutAnimations&quot; : [],
                &quot;phaseOverlap&quot; : (pIn / 2),
                &quot;segueDuration&quot; : &quot;full&quot;,
                &quot;fadeIn&quot; : true,
                &quot;fadeOut&quot; : true
            };

        };

        //Fade, with fade-out drop
        savedOptions[&quot;ixb_7&quot;] = function(data){

            var pIn = ( data.phaseInDuration &gt;= 2 ? data.phaseInDuration : 2 ),
                pOut = ( data.phaseOutDuration &gt;= 2 ? data.phaseOutDuration : 2);

            pIn = pOut = Math.min(pIn, pOut);

            return {
                &quot;segueType&quot; : &quot;stack&quot;,
                &quot;phaseInDuration&quot; : pIn,
                &quot;phaseInAnimations&quot; : [],
                &quot;phaseOutDuration&quot; : pOut,
                &quot;phaseOutAnimations&quot; : [
                    {&quot;transform&quot; : &quot;translateY(0)&quot;, &quot;-webkit-transform&quot; : &quot;translateY(0)&quot;, &quot;opacity&quot; : &quot;1&quot;},
                    {&quot;transform&quot; : &quot;translateY(10%)&quot;, &quot;-webkit-transform&quot; : &quot;translateY(10%)&quot;, &quot;opacity&quot; : &quot;0.8&quot;},
                    {&quot;transform&quot; : &quot;translateY(100%)&quot;, &quot;-webkit-transform&quot; : &quot;translateY(100%)&quot;, &quot;opacity&quot; : &quot;0&quot;}
                ],
                &quot;phaseOverlap&quot; : (pIn / 2),
                &quot;segueDuration&quot; : &quot;full&quot;,
                &quot;fadeIn&quot; : true,
                &quot;fadeOut&quot; : false
            };

        };

        //Slide focus, with slight zoom
        savedOptions[&quot;ixb_8&quot;] = function(data){

            var pIn = ( data.phaseInDuration &gt;= 2 ? data.phaseInDuration : 2 ),
                pOut = ( data.phaseOutDuration &gt;= 2 ? data.phaseOutDuration : 2);
            pIn = pOut = Math.min(pIn, pOut);

            return {
                &quot;segueType&quot; : &quot;vertical&quot;,
                &quot;phaseInDuration&quot; : pIn,
                &quot;phaseInAnimations&quot; : [
                    {&quot;transform&quot; : &quot;scale(0.7, 0.7)&quot;, &quot;-webkit-transform&quot; : &quot;scale(0.7, 0.7)&quot;},
                    {&quot;transform&quot; : &quot;scale(0.7, 0.7)&quot;, &quot;-webkit-transform&quot; : &quot;scale(0.7, 0.7)&quot;},
                    {&quot;transform&quot; : &quot;scale(1, 1)&quot;, &quot;-webkit-transform&quot; : &quot;scale(1, 1)&quot;}
                ],
                &quot;phaseOutDuration&quot; : pOut,
                &quot;phaseOutAnimations&quot; : [
                    {&quot;transform&quot; : &quot;scale(1.05, 1.05)&quot;, &quot;-webkit-transform&quot; : &quot;scale(1.05, 1.05)&quot;},
                    {&quot;transform&quot; : &quot;scale(0.7, 0.7)&quot;, &quot;-webkit-transform&quot; : &quot;scale(0.7, 0.7)&quot;},
                    {&quot;transform&quot; : &quot;scale(0.7, 0.7)&quot;, &quot;-webkit-transform&quot; : &quot;scale(0.7, 0.7)&quot;}
                ],
                &quot;phaseOverlap&quot; : (pIn / 2),
                &quot;segueDuration&quot; : &quot;overlap&quot;,
                &quot;fadeIn&quot; : false,
                &quot;fadeOut&quot; : false
            };

        };

        //Squash to focus
        savedOptions[&quot;ixb_9&quot;] = function(data){

            var pIn = ( data.phaseInDuration ? data.phaseInDuration : 1 ),
                pOut = ( data.phaseOutDuration ? data.phaseOutDuration : 1);
            pIn = pOut = Math.min(pIn, pOut);

            return {
                &quot;segueType&quot; : &quot;horizontal&quot;,
                &quot;phaseInDuration&quot; : pIn,
                &quot;phaseInAnimations&quot; : [],
                &quot;phaseOutDuration&quot; : pOut,
                &quot;phaseOutAnimations&quot; : [
                    {
                        &quot;transform-origin&quot; : &quot;right center&quot;, &quot;-webkit-transform-origin&quot; : &quot;right center&quot;,
                        &quot;transform&quot; : &quot;scaleX(1)&quot;, &quot;-webkit-transform&quot; : &quot;scaleX(1)&quot;
                    },
                    {
                        &quot;transform-origin&quot; : &quot;right center&quot;, &quot;-webkit-transform-origin&quot; : &quot;right center&quot;,
                        &quot;transform&quot; : &quot;scaleX(0)&quot;, &quot;-webkit-transform&quot; : &quot;scaleX(0)&quot;
                    }
                ],
                &quot;phaseOverlap&quot; : pIn,
                &quot;fadeIn&quot; : false,
                &quot;fadeOut&quot; : false
            };

        };

        //Fold-in Fold-out
        savedOptions[&quot;ixb_10&quot;] = function(data){

            var pIn = ( data.phaseInDuration &gt;= 2 ? data.phaseInDuration : 2 ),
                pOut = ( data.phaseOutDuration &gt;= 2 ? data.phaseOutDuration : 2);
            pIn = pOut = Math.min(pIn, pOut);

            return {
                &quot;segueType&quot; : &quot;stack&quot;,
                &quot;phaseInDuration&quot; : pIn,
                &quot;phaseInAnimations&quot; : [
                    {
                        &quot;transform-origin&quot; : &quot;right center&quot;, &quot;-webkit-transform-origin&quot; : &quot;right center&quot;,
                        &quot;transform&quot; : &quot;scale(0.5, 0.5) rotateY(90deg)&quot;, &quot;-webkit-transform&quot; : &quot;scale(0.5, 0.5) rotateY(90deg)&quot;
                    },
                    {
                        &quot;transform-origin&quot; : &quot;right center&quot;, &quot;-webkit-transform-origin&quot; : &quot;right center&quot;,
                        &quot;transform&quot; : &quot;scale(0.5, 0.5) rotateY(45deg)&quot;, &quot;-webkit-transform&quot; : &quot;scale(0.5, 0.5) rotateY(45deg)&quot;
                    },
                    {&quot;transform&quot; : &quot;scale(1, 1)&quot;, &quot;-webkit-transform&quot; : &quot;scale(1, 1)&quot;}
                ],
                &quot;phaseOutDuration&quot; : pOut,
                &quot;phaseOutAnimations&quot; : [
                    {&quot;transform&quot; : &quot;scale(1, 1)&quot;, &quot;-webkit-transform&quot; : &quot;scale(1, 1)&quot;},
                    {
                        &quot;transform-origin&quot; : &quot;left center&quot;, &quot;-webkit-transform-origin&quot; : &quot;left center&quot;,
                        &quot;transform&quot; : &quot;scale(0.5, 0.5)  rotateY(-45deg)&quot;, &quot;-webkit-transform&quot; : &quot;scale(0.5, 0.5) rotateY(-45deg)&quot;
                    },
                    {
                        &quot;transform-origin&quot; : &quot;left center&quot;, &quot;-webkit-transform-origin&quot; : &quot;left center&quot;,
                        &quot;transform&quot; : &quot;scale(0.5, 0.5)  rotateY(-90deg)&quot;, &quot;-webkit-transform&quot; : &quot;scale(0.5, 0.5) rotateY(-90deg)&quot;
                    }
                ],
                &quot;phaseOverlap&quot; : pIn,
                &quot;fadeIn&quot; : false,
                &quot;fadeOut&quot; : false
            };
*/
