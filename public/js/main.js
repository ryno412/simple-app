var SimpleApp = {};

(function () {

    function IndexView () {};

    IndexView.prototype = {

        init : function () {
         this.initEvents();
        },
        initEvents : function () {
            var self = this;
           $('#do-something').click(function (e) {
              self.displayView();
           });
        },
        displayView : function () {
            var $content = $('#content');
            //in page template
            //var source = $('#view-one').html();
            //var template = Handlebars.compile(source);
             //complied template
            var template = Handlebars.templates['home'];
            var html = template({name:'ryan'});
            $content.html(html);

        }


    };


    var slideShow = {
        nodes : $('.modal'),

        createTransform : function (transform) {
            return {
                '-webkit-transform': transform,
                '-moz-transform' : transform,
                '-ms-transform' : transform,
                'transform' : transform
            };
        },

        viewportHeight : function () {
            return $(window).height();
        },

        data : [
            {id:1, name : "one"},
            {id:2, name : "two"},
            {id:3, name : "three"},
            {id:4, name : "four"},
            {id:5, name : "five"},
            {id:6, name : "six"},
            {id:7, name : "seven"},
            {id:8, name : "eight"},
            {id:9, name : "nine"},
            {id:10, name : "ten"}
        ],

        currentDataIndex : 0,
        currentNode : 2,
        itemLength : 5,
        slideList : [0,1,2,3,4],
        slideHeight : 900,  //make this match the viewport height so slide fills window height;
        setSlidePositions : function () {
            this.prevHidden    = $(this.nodes[this.slideList[0]]);
            this.prev          = $(this.nodes[this.slideList[1]]);
            this.center        = $(this.nodes[this.slideList[2]]);
            this.next          = $(this.nodes[this.slideList[3]]);
            this.nextHidden    = $(this.nodes[this.slideList[4]]);

        },
        navigate : function (dir) {
            if (dir == 'next') {
                var lastItem = this.slideList.pop();
                this.slideList.unshift(lastItem);
                this.updateDataIndex('next');
            }
            if (dir == 'prev') {
                var firstItem = this.slideList.shift();
                this.slideList.push(firstItem);
                this.updateDataIndex('prev');
            }

            console.log('$$$$$$$$$$$', this.slideList);
            this.setSlidePositions();
            this.setData();
            this.showSlides();
            this.setSlideTransforms();

        },



        updateDataIndex : function (dir) {
            var current = this.currentDataIndex;
            var length =  this.data.length;
            if (dir == 'next') {
                //if we reach the limit - reset
                if (current === length -1) {
                    this.currentDataIndex = 0;
                }
                else {
                    this.currentDataIndex++
                }
            }
            if (dir == 'prev') {
                //if we reach the first item - load the last one to keep it looping
                if (current === 0) {
                    this.currentDataIndex = length -1;
                }
                else {
                    this.currentDataIndex--
                }
            }

            console.log('$$$$$$$$$$$', this.currentDataIndex);

        },

        setSlideTransforms : function () {
            this.prev.css(this.createTransform('translate3d(0, '+ this.getTranslateValue('prev') +'px, -150px)'));
            this.center.css(this.createTransform(''));
            this.next.css(this.createTransform('translate3d(0, '+ this.getTranslateValue('next') +'px, -150px)'));

            this.prevHidden.css(this.createTransform('translate3d(0, '+ this.getTranslateValue('prevHidden') +'px, -150px)'));
            this.nextHidden.css(this.createTransform('translate3d(0, '+ this.getTranslateValue('nextHidden') +'px, -150px)'));
        },

        getTranslateValue : function (slidePos) {
            var vh = this.viewportHeight();
            var slideH = this.slideHeight;

            switch (slidePos) {
                case 'prev' :
                    return Number( -1 * ( vh / 2 + slideH / 2 ));
                case 'prevHidden' :
                    return Number( -1 * (vh / 2 + slideH));
                case 'next' :
                    return Number((vh / 2 + slideH / 2 ));
                case 'nextHidden' :
                    return Number((vh / 2 + slideH));
                default :
                    console.log('invalid slide position specified for translate value')
                    return 0;
            }
        },

        showSlides : function () {
            this.center.add(this.prev).add(this.next).addClass('show');
            this.prevHidden.add(this.nextHidden).removeClass('show');
        },
        setData : function () {
            this.center.html(this.data[this.currentDataIndex].name)
        },

        handleScroll : function () {
            var $win = $(window);
            var startScrollPos = 0;
            var currentScrollPos;
            var self = this;
            $win.scroll(function (e) {
                currentScrollPos = $win.scrollTop();
                //if the current pos is greater than the start user moving down
                if (currentScrollPos > startScrollPos) {
                    console.log('Moving down', currentScrollPos)
                    self.navigate('prev');
                }
                else {
                    //user is moving up
                    console.log('Moving UP', currentScrollPos)
                    self.navigate('next');
                }
                //set start to current
                startScrollPos  = currentScrollPos;
            })



        },
        init  : function () {
            this.setSlidePositions();
            this.showSlides();
            this.setSlideTransforms();

            var nextBtn = $("#next")
            var prevBtn = $("#prev")
            var self = this;
            nextBtn.click(function () {
                self.navigate('next');
            });
            prevBtn.click(function () {
                self.navigate('prev');
            });


            this.handleScroll();
        }
    }//end slideshow







    SimpleApp.IndexView = IndexView;
    SimpleApp.SlideShow = slideShow;

})();


$(document).ready(function (){
    //var indexView = new SimpleApp.IndexView();
    //indexView.init();
    SimpleApp.SlideShow.init();

});