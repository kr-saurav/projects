var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
	{
		name:"manali hills",
		image:"https://images.unsplash.com/photo-1542067519-6cd1e217df2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name:"darjeelig top",
		image:"https://images.unsplash.com/photo-1578145288677-6e6842916b90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name:"shimla valley's",
		image:"https://images.unsplash.com/photo-1506995292672-416a03419575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	}
]
function seedDB(){
	Campground.remove({}, function(err){
			if(err){
				console.log(err);
				 }
			  console.log("removed campgrounds");
			//add a few campgrounds
		data.forEach(function(seed){
		Campground.create(seed ,function(err , campground){
			if(err){
				   console.log(err);
				}else{
				console.log("added  a campground");
					//add some comments
		        	Comment.create(
					 {
						text:"this place is great",
						 author: "armannnnnnnnnny"
					  },function(err , comment){
						  if(err){
							  console.log(err);
						  }else{
							  campground.comments.push(comment);
							  campground.save();
							  console.log("created a new comment");
					  }
					  })
				 }
			});
		  });
	});
}

module.exports = seedDB;
