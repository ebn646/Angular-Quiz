angular.module('quizApp')
    .controller('MainCtrl', [function () {
    }])
    .controller('QuizCtrl', function ($rootScope, $scope, $location, $stateParams, $routeParams, QuizService, $timeout, AnswerService, ngProgressFactory, QuestionService) {
        var self = this;

        $scope.clearAnswers = AnswerService.clearAnswers();
        $scope.isAnswered = false;
        $scope.isResults = false;
        $scope.numQuestions = 5;
        $scope.questionId = 0;
        $scope.contained_progressbar = ngProgressFactory.createInstance();
        $scope.contained_progressbar.setParent(document.getElementById('progressbar'));
        $scope.contained_progressbar.setAbsolute();
        $scope.contained_progressbar.setHeight(25);

        $scope.setAnswer = function () {
            $scope.isAnswered = true;
            $scope.contained_progressbar.set($scope.questionId * 20);
        };

        $scope.setId = function (id) {
            $scope.questionId = id;
        };

        $scope.getNextQuestion = function ($e) {
            $scope.isAnswered = false;
            $scope.questionId = $scope.questionId + 1;
            $scope.question = QuestionService.get({questionId: $scope.questionId});
        };

        $scope.isSelected = function (question, option) {
            return AnswerService.isSelected(question, option);
        };

        $scope.addAnswer = function (question, option) {
            AnswerService.addAnswer(question, option);
        };

        self.getPath = function(){
            var path = $location.path();
            switch (path) {
                case '/quiz':
                    $scope.isResults = false;
                    $scope.questionId = 0;
                    $scope.getNextQuestion();
                    break;
                case '/quiz/results':
                    $scope.isResults = true;
                    $scope.answers = AnswerService.getAnswers();
                    $scope.correctAnswers = AnswerService.getCorrectAnswers();
                    break;
                default:
            }
        };

        $rootScope.$on("$locationChangeStart", function (event, next, current) {
            var path = $location.path();
            switch (path) {
                case '/quiz':
                    $scope.isResults = false;
                    $scope.questionId = 0;
                    $scope.getNextQuestion();
                    break;
                case '/quiz/results':
                    $scope.isResults = true;
                    $scope.answers = AnswerService.getAnswers();
                    $scope.correctAnswers = AnswerService.getCorrectAnswers();
                    break;
                default:

            }
        });

        self.getPath()
    });