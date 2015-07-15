/*When index.html is loaded and ready */
$(document).ready(function() {

	/* Handels on-click of menu buttons - block coding */
	$("#menu a").click(function(){

		/* Getting the linked page */
		var toLoad = $(this).attr("href");
        $("#contentContainer").load(toLoad);

        $("#menu li").removeClass("active_li");
        $("#" + this.id + " li").addClass("active_li");


		/* In order to stop the browser actually navigating to the page, false is returned */
		return false;

	});

	/* Initial Load - load homepage by simulation of clicking on home*/ /* Need to validate for redirection to login page*/
	$("#homeLink").click();

    $("#logo").click(function(){    $("#homeLink").click(); });

});
