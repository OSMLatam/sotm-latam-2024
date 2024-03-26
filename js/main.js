(function () {
  'use strict';

  var App = angular.module("App", []);

  App.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
  });

  App.controller('sotm', ['$scope', '$http', function ($scope, $http) {
    $http.get('/js/sotmprogram.json').then(function(json_f) {
      $scope.countries = json_f.data.countries;
      $scope.days = json_f.data.days;
      $scope.locations = json_f.data.locations;
      $scope.speakers = json_f.data.speakers;
      $scope.talks = json_f.data.talks;
      $scope.types = json_f.data.types;
    });

    $scope.get_country = function(id) {
      return $scope.countries[id - 1];
    };
    $scope.get_day = function(id) {
      return $scope.days[id - 1];
    };
    $scope.get_location = function(id) {
      return $scope.locations[id - 1];
    };
    $scope.get_speaker = function(id) {
      return $scope.speakers[id - 1];
    };
    $scope.get_speakers = function(activity_id) {
      return $scope.speakers[id - 1];
    };
    $scope.get_talk = function(id) {
      return $scope.talks[id - 1];
    };
    $scope.get_type = function(id) {
      return $scope.types[id - 1];
    };
  }]);
})();


//Start Youtube API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var youtubeReady = false;

//Variable for the dynamically created youtube players
var players= new Array();
var isPlaying = false;
function onYouTubeIframeAPIReady(){
  //The id of the iframe and is the same as the videoId	
  jQuery(".youtube-video").each(function(i, obj)  {
     players[obj.id] = new YT.Player(obj.id, {         
			  videoId: obj.id,
			    playerVars: {
			    controls: 2,
		      rel:0,
		      autohide:1,
		      showinfo: 0 ,
		      modestbranding: 1,
		      wmode: "transparent",
		      html5: 1
       	},    
        events: {
          'onStateChange': onPlayerStateChange
        }
       });
     });
     youtubeReady = true;
  }


function onPlayerStateChange(event) {
  var target_control =  jQuery(event.target.getIframe()).parent().parent().parent().find(".controls");
  
  var target_caption = jQuery(event.target.getIframe()).parent().find(".carousel-caption");
  switch(event.data){
    case -1:
      jQuery(target_control).fadeIn(500);
      jQuery(target_control).children().unbind('click');
      break
     case 0:
      jQuery(target_control).fadeIn(500);
      jQuery(target_control).children().unbind('click');
      break;
     case 1:
      jQuery(target_control).children().click(function () {return false;});
      jQuery(target_caption).fadeOut(500);
      jQuery(target_control).fadeOut(500);
       break;
      case 2:
        jQuery(target_control).fadeIn(500);
        jQuery(target_control).children().unbind('click'); 
        break;
        case 3:
           jQuery(target_control).children().click(function () {return false;});
           jQuery(target_caption).fadeOut(500);
           jQuery(target_control).fadeOut(500);
           break;
          case 5:
            jQuery(target_control).children().click(function () {return false;});
            jQuery(target_caption).fadeOut(500);
            jQuery(target_control).fadeOut(500);
            break;
          default:
            break;
    }
};

jQuery(window).bind('load', function(){
  jQuery(".carousel-caption").fadeIn(500);
  jQuery(".controls").fadeIn(500);
 });

jQuery('.carousel').bind('slid.bs.carousel', function (event) {
   jQuery(".controls").fadeIn(500);
});