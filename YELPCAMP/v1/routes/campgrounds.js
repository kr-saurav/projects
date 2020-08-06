var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
//index route - to display list of all campgrounds ************
router.get("/" ,function(req , res){
	//get all campgrounds from db
	Campground.find({}, function(err , allCampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index" ,{campgrounds:allCampgrounds ,currentUser:               req.user});
		}
	});
});
//create - add new campground to database *****************
router.post("/",middleware.isLoggedIn, function(req , res){
	var name = req.body.name;
	var price = req.body.price ;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name , price: price , image: image , description: desc , author: author};
	//create a new campground and save to DB
	Campground.create(newCampground , function(err , newcreat){
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds");
			console.log(newcreat);
		}
	});
});
//new index - to show form for new campground  *********************
router.get("/new",middleware.isLoggedIn, function(req , res){
	res.render("campgrounds/new");
})
//show index ---- to show discription/(more info) of a campground
router.get("/:id" , function(req ,res){
	//find the campground with provided provided id
	Campground.findById(req.params.id).populate("comments").exec(function(err ,foundcamp){
		if(err){
			console.log(err);
		}else{
			console.log(foundcamp);
			res.render("campgrounds/show" ,{campground:foundcamp});
		}
	})
});
//EDIT routes********
router.get("/:id/edit" ,middleware.checkCampgroundOwnership , function(req , res){
	Campground.findById(req.params.id , function(err , foundCampground){
		res.render("campgrounds/edit",{campground: foundCampground});
	});	
 });


//UPDATE routes********
router.put("/:id",middleware.checkCampgroundOwnership ,  function(req , res){
	Campground.findByIdAndUpdate(req.params.id , req.body.campground , function(err , updatedcamp){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
})
//DESTROY router********
router.delete("/:id",middleware.checkCampgroundOwnership ,  function(req , res){
	Campground.findByIdAndRemove(req.params.id , function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	});
});





module.exports = router;