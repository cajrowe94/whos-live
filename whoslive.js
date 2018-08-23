var myApp = angular.module('myApp', []);


//Twitch API Key
var clientID = 'client_id=haqqrdosjty8esfyn6cdzn0mfmxzy7';

//User search
var userSearch = 'https://api.twitch.tv/kraken/users/';


myApp.controller('MainController', ['$scope', '$http', function($scope, $http){
	var s = $scope;
	var userName;
	s.users = [];

	s.searchUsers = function(){
		s.users = [];
		var currentUsername;
		var currentBio;
		var currentLogo;
		userName = s.searchUser;

		if (userName){ //check if searchTerm is empty
			$http({
				method: 'GET',
				url: userSearch+userName+'?'+clientID
			}).then(function(response){
				data = response;
				console.log(data.data);
				currentUsername = data.data.display_name;
				currentBio = data.data.bio;
				currentLogo = data.data.logo;
				s.addNewUser(currentUsername, currentBio, currentLogo);
				console.log(currentUsername + ": " + currentBio);
				console.log(currentLogo);
			}, function(error){
				console.log(error);
			});
		} else {
			currentUsername = "No Result";
			currentBio = "";
			currentLogo = "";
			s.addNewUser(currentUsername, currentBio, currentLogo);
			console.log(currentUsername + ": " + currentBio);
		}	
	}

	s.addNewUser = function(username, bio, logo){
		s.users.push({
			"username": username,
			"bio": bio,
			"logo": logo
		});
}
}]);