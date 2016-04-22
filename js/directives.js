var app = angular.module('quizApp')
app.directive('quizQuestion', function () {
    return {
        restrict: 'AE',
        link: function (scope, element) {
            element.bind('click',function(e) {
                var $target = $(e.toElement).closest('li');
                var $cb = $target.find('.mycheckbox').prop('checked', true);
                $(document).find('.mycheckbox').not($cb).prop('checked', false);
                scope.setAnswer();
            });
        }
    };
});