var SimpleApp = {};

(function () {

    function IndexView () {};

    IndexView.prototype = {

        init : function () {
         this.initEvents();
        },
        initEvents : function () {
           $('#do-something').click(function (e) {
              console.log("we got one");
           });
        }

    };

    SimpleApp.IndexView = IndexView;

})();


$(document).ready(function (){
    var indexView = new SimpleApp.IndexView();
    indexView.init();
});