angular.module("app.service",[])
.factory('kaydet', function($http){
	var student;
	return {
		
		saveStudents:function(isim,no,sinif){
		return $http({
		    url: "/saveStudents", 
		    method: "GET",
		    params: {"isim":isim,"ogrno":no,"sinif":sinif}
         });
		},
		getAllStudents:function(){
		 return $http({
		    url: "/getAllStudents", 
		    method: "GET"
		   });

		},
		deleteStudent:function(ogrno){
		 return $http({
		    url: "/deleteStudent", 
		    method: "GET",
		    params:{"ogrno":ogrno}
		   });

		},
		updateStudent:function(isim,no,sinif){
		  return $http({
		    url: "/updateStudent", 
		    method: "GET",
		    params: {"isim":isim,"ogrno":no,"sinif":sinif}
         });
		},
        setStudent:function(student){
        	this.student=student;
        },
        getStudent:function(){
        	return this.student;
        }

	};
})

 