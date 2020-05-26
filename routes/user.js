var express = require("express");
var router = express.Router();
const http = require("https");
var flash = require('connect-flash');


var number = null;
//var companyNumber;

// Get user models
var User = require("../models/user");
var Company = require("../models/companyuser");

router.get("/", (req, res) => {
    res.render("home", {
        title: "Home",
        error: null,
        companyerror: null
    });
});

router.get("/greeting", (req, res) => {
    res.render("greeting");
});
router.get("/studentRegister", (req, res) => {
    res.render("home", {
        title: "Student Registration"
    });
});

//post route for student 
router.post("/studentRegister", async(req, res) => {
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    number = req.body.number;
    var city = req.body.city

    await Company.findOne({ number: number },
        function(error, num) {
            if (error) {
                return console.log(error)
            }
            if (num) {
                return res.render("home", {
                    title: "Home",
                    error: "Number already exists",
                    companyerror: null
                });
            }
        });
    await User.findOne({ number: number },
        function(err, user) {
            if (err) {
                console.log(err)
            }
            if (user) {
                res.render("home", {
                    title: "Home",
                    error: "Number already exists",
                    companyerror: null
                });

            } else {
                var user = new User({
                    fname: fname,
                    lname: lname,
                    email: email,
                    number: number,
                    city: city
                });

                user.save(function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(number);
                        var jsonData = "91" + number;
                        var url = "/api/v5/otp?authkey=277534AbKPqJ0Ts0P5ce299d5&template_id=5ec4d606d6fc052da568001a&invisible=1&otp_length=5&otp_expiry=2&mobile="
                        var customUrl = url + jsonData
                        var options = {
                            "method": "GET",
                            "hostname": "api.msg91.com",
                            "port": null,
                            "path": customUrl,
                            "headers": {
                                "content-type": "application/json"
                            }
                        };

                        var req = http.request(options, function(r) {
                            var chunks = [];

                            r.on("data", function(chunk) {
                                chunks.push(chunk);
                            });

                            r.on("end", function() {
                                var body = Buffer.concat(chunks);
                                console.log(body.toString());
                            });
                        });

                        req.end();
                        res.redirect("/verify");

                    }
                });

            }
        });
});


//});

router.get("/companyRegister", (req, res) => {
    res.render("home", {
        title: "Company Registration",
        error: null,
        companyerror: null
    });
});
//post route for comapany
router.post("/companyRegister", (req, res) => {
    var industry = null
    var companyName = req.body.companyName;
    var email = req.body.companyEmail;
    number = req.body.companyNumber;
    console.log(industry)
    if (req.body.industry == "Others") {
        console.log(req.body.other)
        industry = req.body.other
    } else {
        industry = req.body.industry;
    }
    User.findOne({ number: number }, function(error, num) {
        if (error) {
            console.log(error)
        }
        if (num) {
            res.render("home", {
                title: "Home",
                error: null,
                companyerror: "Number already exists"
            });
        }
    });
    Company.findOne({ number: number }, function(err, user) {
        if (err) {
            console.log(err)
        }
        if (user) {
            res.render("home", {
                title: "Home",
                companyerror: "Number already exists",
                error: null
            })
        } else {
            var companyUser = new Company({
                companyName: companyName,
                email: email,
                industry: industry,
                number: number
            });

            companyUser.save(function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(number);
                    var jsonData = "91" + number;
                    var url = "/api/v5/otp?authkey=277534AbKPqJ0Ts0P5ce299d5&template_id=5ec4d606d6fc052da568001a&invisible=1&otp_length=5&otp_expiry=2&mobile="
                    var customUrl = url + jsonData
                    var options = {
                        "method": "GET",
                        "hostname": "api.msg91.com",
                        "port": null,
                        "path": customUrl,
                        "headers": {
                            "content-type": "application/json"
                        }
                    };

                    var req = http.request(options, function(r) {
                        var chunks = [];

                        r.on("data", function(chunk) {
                            chunks.push(chunk);
                        });

                        r.on("end", function() {
                            var body = Buffer.concat(chunks);
                            console.log(body.toString());
                        });
                    });

                    req.end();
                    res.redirect("/verify");
                }
            });

        }
    })

});



//get verify
router.get("/verify", (req, res) => {
    res.render("verify", {
        title: "verify",
        result: null
    });
});
//post verify
router.post("/verify", (req, res) => {
    console.log("Verify number")
    console.log(number)
    var otp = req.body.otp;
    url = "/api/v5/otp/verify?mobile=91"
    addmobile = url + number + "&otp=";
    fullUrl = addmobile + otp + "&authkey=277534AbKPqJ0Ts0P5ce299d5";
    var options = {
        "method": "POST",
        "hostname": "api.msg91.com",
        "port": null,
        "path": fullUrl,
        "headers": {}
    };

    var req = http.request(options, function(r) {
        var chunks = [];

        r.on("data", function(chunk) {
            chunks.push(chunk);
        });

        r.on("end", function() {
            var body = Buffer.concat(chunks);
            var result = JSON.parse(body);
            if (result.type == "error") {
                res.render("verify", {
                    title: "verify",
                    result: result,
                });
            } else {
                res.redirect("/greeting");

            }
        });
    });

    req.end();
});
// Resend verification
//console.log("Last number")
//console.log(number);
//router.get("/resendotp", (req, res) => {
//    res.render("verify", {
//        title: "verify",
//        result: null
//    });
//    console.log(number)
//    var jsonData = "91" + number;
//    var url = "/api/v5/otp/retry?authkey=277534AbKPqJ0Ts0P5ce299d5&mobile="
//    var customUrl = url + jsonData
//    var options = {
//        "method": "POST",
//        "hostname": "api.msg91.com",
//        "port": null,
//        "path": customUrl,
//        "headers": {}
//    };

//    var req = http.request(options, function(r) {
//        var chunks = [];

//        r.on("data", function(chunk) {
//            chunks.push(chunk);
//        });

//        r.on("end", function() {
//            var body = Buffer.concat(chunks);
//            var result = JSON.parse(body);
//            if (result.type == "error") {
//                res.render("verify", {
//                    title: "verify",
//                    result: result,
//                });
//            } else {
//                res.redirect("/greeting");

//            }
//        });
//    });

//    req.end();
//});
//router.post("/resendotp", (req, res) => {
//    console.log(number)
//    var jsonData = "91" + number;
//    var url = "/api/v5/otp/retry?authkey=277534AbKPqJ0Ts0P5ce299d5&mobile="
//    var customUrl = url + jsonData
//    var options = {
//        "method": "POST",
//        "hostname": "api.msg91.com",
//        "port": null,
//        "path": customUrl,
//        "headers": {}
//    };

//    var req = http.request(options, function(r) {
//        var chunks = [];

//        r.on("data", function(chunk) {
//            chunks.push(chunk);
//        });

//        r.on("end", function() {
//            var body = Buffer.concat(chunks);
//            var result = JSON.parse(body);
//            if (result.type == "error") {
//                res.render("verify", {
//                    title: "verify",
//                    result: result,
//                });
//            } else {
//                res.redirect("/greeting");

//            }
//        });
//    });

//    req.end();

//})

module.exports = router;