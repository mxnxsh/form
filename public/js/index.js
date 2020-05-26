$(".company-login").hide();
$('studentlogin').css({ "border-bottom": "2px #33344a solid", "color": "#33344a" });
$('companylogin').css("border-bottom", "none");

$(".companylogin").click(function() {
    $(".student-login").hide();
    $(".company-login").show();
    $(".studentlogin").css("border-bottom", "none");
    $(".companylogin").css("border-bottom", "2px #33344a solid");
});
$(".studentlogin").click(function() {
    $(".student-login").show();
    $(".company-login").hide();
    $(".companylogin").css("border-bottom", "none");
    $(".studentlogin").css("border-bottom", "2px #33344a solid");
});