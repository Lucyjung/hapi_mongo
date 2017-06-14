'use strict';

(function ($) {
    var templateApp = $.sammy( "#app", function () {
            var self = this;

            // display all contacts
            this.get('#/:page', function() {
                $('#app').load('html/' + this.params['page'] + '.html');
            });
        });

    $(function () {
        templateApp.run( "#/" );
    });
})(jQuery);
