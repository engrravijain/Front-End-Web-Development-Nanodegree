/*
This is empty on purpose! Your code to build the resume will go here.
 */

var bio = {
    name: "Ravi Jain",
    role: "Front-End Web Developer",
    contacts: {
        mobile: "+918289021216",
        email: "engrravijain@gmail.com",
        github: "engrravijain",
        twitter: "engrravijain",
        location: "Chandigarh"
    },
    welcomeMessage: "Hello World, Great to see you here !!!",
    skills: ["HTML", "CSS", "JavaScript", "Java"],
    biopic: "images/fry.jpg",
    display: function() {
        var formattedName = HTMLheaderName.replace("%data%", bio.name);
        var formattedRole = HTMLheaderRole.replace("%data%", bio.role);

        var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
        var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
        var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
        var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
        var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
		
		var contactsArray = [formattedMobile, formattedEmail, formattedGithub, formattedTwitter, formattedLocation];

        var formattedBiopic = HTMLbioPic.replace("%data%", bio.biopic);
        var formattedWelcomeMsg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);


        $("#header").prepend(formattedRole);
        $("#header").prepend(formattedName);

        for (var i = 0; i < contactsArray.length; i++) {
			$("#topContacts").append(contactsArray[i]);
			$("#footerContacts").append(contactsArray[i]);
    	}

        $("#header").append(formattedBiopic);
        $("#header").append(formattedWelcomeMsg);

        if (bio.skills.length > 0) {

            $("#header").append(HTMLskillsStart);

            for (var j = 0; j < bio.skills.length; j++) {

                var formattedSkill = HTMLskills.replace("%data%", bio.skills[j]);
                $("#skills").append(formattedSkill);
            }
        }
    }

};

var work = {
    jobs: [{
            employer: "Google",
            title: "CEO",
            location: "Bathinda",
            dates: "2017-2018",
            description: "Google is an American multinational technology company specializing in Internet-related services and products. These include online advertising technologies, search, cloud computing, software, and hardware. Google was founded in 1998 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University, in California.",
        },
        {
            employer: "Facebook",
            title: "CEO",
            location: "Ahmedabad",
            dates: "2018-2019",
            description: "Facebook is an American for-profit corporation and an online social media and social networking service based in Menlo Park, California. The Facebook website was launched on February 4, 2004, by Mark Zuckerberg, along with fellow Harvard College students and roommates, Eduardo Saverin, Andrew McCollum, Dustin Moskovitz, and Chris Hughes.",
        }
    ],
    display: function() {
        for (var i = 0; i < work.jobs.length; i++) {

            $("#workExperience").append(HTMLworkStart);

            var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[i].employer);
            var formattedTite = HTMLworkTitle.replace("%data%", work.jobs[i].title);
            var formattedEmployerTitle = formattedEmployer + formattedTite;

            $(".work-entry:last").append(formattedEmployerTitle);

            var formattedDates = HTMLworkDates.replace("%data%", work.jobs[i].dates);
            $(".work-entry:last").append(formattedDates);

            var formattedDiscription = HTMLworkDescription.replace("%data%", work.jobs[i].description);
            $(".work-entry:last").append(formattedDiscription);

        }

    }
};

var projects = {
	projects: [
		{
			title: "Sample Project 1",
			dates: "2017",
			description: "The county courthouse is a historic building that is located in the oldest town in the state. Over the past few years several \"localized\" floods have occurred in the two-block region surrounding the courthouse. These floods develop as a result of rainfall events that are at or near the yearly maximum. The floodwaters have flowed both into the historic courthouse (photos were provided) and the adjoining annex, bordering the parking lot to the east of the courthouse. ",
			images: ["images/197x148.gif", "images/197x148.gif"]
		},
		{
			title: "Sample Project 2",
			dates: "2017",
			description: "The county courthouse is a historic building that is located in the oldest town in the state. Over the past few years several \"localized\" floods have occurred in the two-block region surrounding the courthouse. These floods develop as a result of rainfall events that are at or near the yearly maximum. The floodwaters have flowed both into the historic courthouse (photos were provided) and the adjoining annex, bordering the parking lot to the east of the courthouse. ",
			images: ["images/197x148.gif", "images/197x148.gif"]
		}
	],
	display: function() {
				
		for (var i = 0; i < projects.projects.length; i++) {
			
			$("#projects").append(HTMLprojectStart);
						
			var formattedTitle = HTMLprojectTitle.replace("%data%", projects.projects[i].title);
			$(".project-entry:last").append(formattedTitle);

			var formattedDates = HTMLprojectDates.replace("%data%", projects.projects[i].dates);
			$(".project-entry:last").append(formattedDates);

			var formattedDescription = HTMLprojectDescription.replace("%data%", projects.projects[i].description);
			$(".project-entry:last").append(formattedDescription);
			
			if (projects.projects[i].images.length > 0) {
				for (var j = 0; j < projects.projects[i].images.length; j++) {
					var formattedImage = HTMLprojectImage.replace("%data%", projects.projects[i].images[j]);
					$(".project-entry:last").append(formattedImage);
				}
			}
		}
	}
};

var education = {
    schools: [{
		name: "S.P.S.S",
		location: "Kota",
		degree: "Schooling",
		majors: "PCM",
		dates: 2016,
		url: "https://google.com",
        },
        {
            name: "Chitkara University",
            location: "Rajpura",
            degree: "B.E",
            majors: "CS",
            dates: 2017,
            url: "https://google.com",
        },
    ],
    onlineCourses: [{
        title: "Front-End Web Developer",
        school: "Udacity",
        dates: 2017,
        url: "https://udacity.com",
    }],
    display: function() {
		
		$("#education").append(HTMLschoolStart);
		
		for (var i = 0; i < education.schools.length; i++) {
			
			$(".education-entry").append(HTMLschoolName.replace("%data%", education.schools[i].name) + HTMLschoolDegree.replace("%data%", education.schools[i].degree), HTMLschoolDates.replace("%data%", education.schools[i].dates), HTMLschoolLocation.replace("%data%", education.schools[i].location), HTMLschoolMajor.replace("%data%", education.schools[i].majors));
    
		}
	}
};

bio.display();

work.display();

projects.display();

education.display();

$("#mapDiv").append(googleMap);
