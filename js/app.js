'use strict';

angular.module('quizApp', ['ui.router','ngResource','ngProgress','ngRoute','ngAnimate'])
    .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "views/home.html"
            })
            .state('quiz', {
                url: "/quiz",
                templateUrl: "views/quiz.html",
                controller:'QuizCtrl'
            })
            .state('quiz.question', {
                url: "/questions",
                templateUrl: "views/question.html",
            })
            .state('quiz.results', {
                url: "/results",
                templateUrl: "views/results.html",
                //controller: 'ResultsCtrl'
            })
    }])
