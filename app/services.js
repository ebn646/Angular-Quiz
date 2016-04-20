angular.module('quizApp')
    .factory('QuizService', ['$http', function ($http) {
        return {

        };
    }])
    .factory('QuestionService', ['$resource', function ($resource) {
        return $resource('data/:quizId/:questionId.json', {}, {
            query: {method: 'GET', params: {quizId: 'quiz', questionId: 'questions'}, isArray: true}
        });
    }])
    .factory('AnswerService', ['$resource', function ($resource) {
        var answers = new Array();

        return{
            addAnswer: function (question, answer) {
                console.log(question,answer)
                answers[question] = answer;
            },
            isSelected: function (question, answer) {
                if (!(question in answers)) {
                    return false;
                }
                return answer.option == answers[question].option;
            },
            getAnswers:function(){
                return answers;
            },
            clearAnswers: function () {
                answers = new Array();
            },
            getCorrectAnswers: function () {
                var correct = [];
                for (var i in answers) {
                    if (answers[i].correct) {
                        correct.push(answers[i].text);
                    }
                };
                return correct;
            },
        }
    }]);
