function validateTextbox()
{
	var box = document.getElementById("name");
	var box2 = document.getElementById("address"); 
	if(box.value.length < 5 || box2.value.length < 5)
	{
		alert("Please enter all credentials");
		box.focus();
		box.style.border = "solid 4px red"; 
		box2.focus();
		box2.style.border = "solid 4px red"; 
		return false;
	}
	
}
function validateTextbox()
{
	var box3 = document.getElementById("phone");
	var box4 = document.getElementById("email");
	if(box3.value.length == 10 || box4.value.length < 2)
	{
		alert("Please enter all credentials");
		box3.focus();
		box3.style.border = "solid 4px red"; 
		box4.focus();
		box4.style.border = "solid 4px red"; 
		return false;
	}
}

