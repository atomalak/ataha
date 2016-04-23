var express=require("express");
var path=require("path");
var bodyparser=require("body-parser");
var app=express();
var mongoose=require("mongoose");
//for mongolab
mongoose.connect("mongodb://username:password@ds019268.mlab.com:19268/ogrenci");

//for localhost
 //mongoose.connect("mongodb://127.0.0.1:27017/test");

//Modellerimizi oluşturmak için Schemalara ihtiyaç duyuyoruz.
var Schema=mongoose.Schema;
var userSchema=new Schema({
         isim:String,
         ogrno:String,
         sinif:String,
         tarih:{type:Date,default:Date.now}
});

var ogrModel=mongoose.model("ogrenci",userSchema);

//static dosyaları express tarafına tanıtmak lazım
app.use("/public",express.static(__dirname+path.sep+"public"));
app.use("/js",express.static(__dirname+path.sep+"js"));


app.get("/saveStudents",function(req,resp){
           var ogrInstance=new ogrModel({
                isim:req.query.isim,
                ogrno:req.query.ogrno,
                sinif:req.query.sinif
            });

		    ogrInstance.save(function(err){
		        if(err){
		         	console.log("Kayit edilemedi");
		         	resp.end();
		        }else{
		        	resp.end();
		        }
		      });



});

app.get("/updateStudent",function(req,resp){
        var criteria={"ogrno":req.query.ogrno};
        var updateValues={"isim":req.query.isim,"ogrno":req.query.ogrno,"sinif":req.query.sinif};
        ogrModel.findOneAndUpdate(criteria,updateValues,function(err,data){
                  if(err){
                    resp.send("Hata Oluştu");
                    resp.end();
                  }else{
                    resp.send("Kayit Başarılı Bir şekilde güncellendi");
                    resp.end();
                  }




        });

      


});

app.get("/getAllStudents",function(req,resp){
          ogrModel.find({},function(err,data){
               if(err){
               	 resp.send(err);
               	 resp.end();
               }else{
               	 resp.send(data);
               	 resp.end();
               }
          });
});





app.get("/deleteStudent",function(req,resp){
  
   ogrModel.findOneAndRemove({ogrno:req.query.ogrno},function(err){
         
         if(err){
         	resp.send("Hata Oluştu");

         }else{
         	 resp.send("Kaydiniz Başarılı ")
         }


   });



});








app.listen(8080,"0.0.0.0");