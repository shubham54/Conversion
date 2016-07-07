var app=angular.module('conversion',['ngRoute']);

app.config(function($routeProvider){

	$routeProvider
	.otherwise({
		redirectTo: '/'
	});

});

app.controller('mainCtrl',function($scope,$http,$timeout){

	$scope.check1=true;
	$scope.check2=false;
	$scope.check3=false;

	$scope.cgbt=true;

	$scope.set=function(check){
		if(check == 1){
			$scope.check1=true;
			$scope.check2=false;
			$scope.check3=false;
		}
		else if(check == 2){
			$scope.check2=true;
			$scope.check1=false;
			$scope.check3=false;
		}
		else if(check == 3){
			$scope.check3=true;
			$scope.check1=false;
			$scope.check2=false;
		}

	};

	$scope.changebut=function(){
		if($scope.cgbt == true){
			$scope.cgbt=false;
		}
		else{
			$timeout(function(){
				$scope.cgbt = true;
				document.getElementById('srch').value='';
				document.getElementById('srch').placeholder='Convert the next video';}, 3000); 
		}
	};


	$scope.sendurl=function(urll){
		$http({
		  method: 'GET',
		  url: 'http://www.youtubeinmp3.com/fetch/?format=JSON&video='+ urll,
			}).then(function successCallback(response) {
			    $scope.details = response.data;
			    $scope.details.link=$scope.details.link.replace("\\"," ");
			    $scope.changebut();
		  	}, function errorCallback(response) {
			    console.log(response.status);
		  });
		
	};

	$scope.numberconv = function(number,base){

		var parsed = parseInt(number,10);
		var based= parseInt(base,10);
		if(isNaN(parsed) || isNaN(based)){
			$scope.answer='Either Invalid Base or Number ';
		}
		else if(based <=1 || based >=37){
			$scope.answer='Base should be greater than 1 and less than 37';
		}
		else{
			$scope.answer=parsed.toString(based);
		}
	};

});