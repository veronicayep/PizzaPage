/*prevent any jQuery code from running before the document is finished loading*/
$(function(){
	/*Hide login pop up if cancel button is clicked*/
	$(".close").click(function(){
		$(".form-popup").hide();
		return false; //Prevent the page from refreshing
	});

	/*Hide login pop up if user successfully login*/
	// prevent form from refreshing after submit
	$(".login-form-container").submit(function(e) {
		e.preventDefault(); 
		/* Minimum username length has to longer than 2 and password has to be 7 character length)*/
		if($("#username").val().length > 2 && $("#password").val().length == 7){
			$("#welcome").html("Welcome, "+ $("#username").val());
			$(".form-popup").hide("slow");
		}
	});

	/*Open side bar*/
	$("#openSideBar").click(function(){
		$(".sidebar").width("300px");

	});
	/*Close side bar*/
	$("#closeSideBar").click(function(){
		$(".sidebar").width("0px");
	});

	/*Apply discount code*/
	$(".apply").click(function(){
		$("#totalPrice").html($("#discountCode").val());
		if($("#discountCode").val() == "extracheese"){
			// Show a green discount code applied
			// Take total price before discount * 0.9 to after discount price
			$("#totalPrice").html("<span class='green'>The discount has applied!!</span> <br> <h3>Total price: &euro;" + ($("#totalPrice").attr("value"))*0.9+"</h3>");
		}else{
			// Show a warning of invalid code 
			// Display a total price as before discount
			$("#totalPrice").html("<span class='red'>The discount code is invalid!</span> <br> <h3>Total price: &euro;" + $("#totalPrice").attr("value")+"</h3>");
		}
	});
});

function alertSize(size){
	var size = size;
	if(size=="SS"){    
		/*Show warning alert when 'supersize' option is select*/        
		window.alert("Great choice! You have selected SuperSize!");
	}
	
}
function handleForm(event) { 
	// When clicking a "Submit" button, prevent it from submitting a form (refreshing the page)
	// Clicking on a link, prevent the link from following the URL
	event.preventDefault(); 
}

function getSubtotalPrice(formID){

	var pizza = formID + " pizza";
	var form = document.getElementById(formID); 
	var size = form.elements[0].value;   // Get value from the first input element of the form
	var qty = form.elements[1].value; // Get value from the second input element of the form
	form.addEventListener('submit', handleForm);  

	if(qty > 0 && qty <=10){
		if(size=="SS"){
			price = 17;
		}else if(size == "XL"){
			price = 7;
		}else if(size =="L"){
			price = 5;
		} else{
			throw "quantity has to be at least one and less than 10";
		}
		addCart(pizza, qty, size);  
	}    
}

function addCart( pizza, qty, size){
	var pizza = pizza;
	var qty = qty;
	var size = size;
	var subTotal = price * qty;
	var sum = 0;
	// Check browser support
	if (typeof(Storage) !== "undefined") {
		// Get length of storage
		len = sessionStorage.length;
		// Store data
		sessionStorage.setItem("pizza", pizza);
		sessionStorage.setItem("qty", qty);
		sessionStorage.setItem("size", size);
		// Retrieve data
		sessionData = sessionStorage.getItem("qty")+"x " + sessionStorage.getItem("size")+" " + sessionStorage.getItem("pizza") + " &euro;"+subTotal;
		var cartList = document.getElementById("cart-list");
		cartList.insertAdjacentHTML("afterend","<p>"+sessionData+"</p>");   /*Append new items after each*/
		// total price (get value from div and parse into integer)
		var total = parseInt(document.getElementById("totalPrice").getAttribute("value")); 
		total = total + subTotal;
		document.getElementById("totalPrice").setAttribute("value",total);
		document.getElementById("totalPrice").innerHTML = "<h3>Total price: &euro;" + total +"</h3>";

	} else {
		document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
	}
}