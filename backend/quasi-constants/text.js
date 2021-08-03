//for when a student lists a teacher twice (so for both of their choices)
//This returns what the second version of that student's name should be called
function getNameOfSecondInstanceOfStudent(name) {
    return "Second recommendation for " + name;
}

function getNoteText(){
    return `<b>A note from your counseling team</b>:<br>`
}

function getDefaultStudentEmailText(){
    return `Hello,<br><br>
    
    Please see the form below. Fill out your teacher recommender preferences according to the instructions in the form.<br>
    Here is a video that shows how to fill out your form: [TUTORIAL_LINK].<br><br>
    
    Your form: [FORM_LINK].`
}

function getStudentEmailText() {
    let tutorialLink = getStudentTutorialLink();
    let formLink = getStudentFormPublishedLink();
    if (isResponse(formLink)){
        throw "Student form link not found."
    }
    let msg = `Hello,<br><br>
    
Please see the form below. Fill out your teacher recommender preferences according to the instructions in the form.<br>
Here is a video that shows how to fill out your form: ${tutorialLink}.<br><br>

Your form: ${formLink}.<br><br>`

    let counselorNote = getStudentMessage();
    if (counselorNote != "") {
        msg += `${getNoteText()}${counselorNote}`
    }
    return msg;
}

function getStudentFormDescription() {
    let tutorialLink = getStudentTutorialLink();

    return `Each Junior has completed a Google form indicating pairs of teachers that they think would present the most accurate and comprehensive academic picture of themselves. Below is a list of students that have chosen you to write their college recommendation.
  
    Please indicate the following:
        1) How many total recommendations you feel you are able to write.
        2) On a scale of 1-10, how *confident* you are in your ability to support each student’s college application.
      
    Notes:
    * Putting a Confidence Rating of "10" is the strongest way to ensure that the students for whom you would most like to advocate will be on your list. 
    * Putting a confidence rating of "0" guarantees that you will NOT write a recommendation for that student.
      
Once all of the teacher forms are received by the college counseling department, an algorithm will generate the best teacher recommender pairs for students based on both the student's requested pairings and the teacher confidence ratings.

Here's a video that shows you how to fill out the form: ${tutorialLink}`;
}

function getStudentReminderText() {
    return `Hello,
    
You have not filled out your teacher recommender form yet.

Here is a video explaining how to fill it out: ${getStudentTutorialLink()}.

Your form: ${getStudentFormPublishedLink()}`
}

function getTeacherEmailText(teacherName, formLink) {
    let msg = `Hello ${getTeacherEmailName(teacherName)},<br><br>

Please see the form below containing students who have listed you as a potential rec writer. Fill out your preferences based on the instructions inside.
<br>
Here is a video explaining how to fill it out: ${getTeacherTutorialLink()}.
<br>
Your form: ` + formLink + "<br><br>";

    let counselorNote = getTeacherMessage();
    if (counselorNote != "") {
        msg += `${getNoteText()}${counselorNote}`
    }
    return msg;
}

function getTeacherEmailNoFormText(teacherName){
    let msg = `Hello ${getTeacherEmailName(teacherName)},

No students listed you as a potential rec writer. 
If you feel this was a mistake, please contact your college counseling team.`
    return msg;
}

function getTeacherFormDescription() {
    let tutorialLink = getTeacherTutorialLink();

    return `Each junior completed a Google form indicating pairs of teachers who, together, they think would present the most comprehensive academic picture. Below are the students who have listed you in at least one pair on their form.
  
    Please indicate the following:
        1) How many recommendations you feel able to write.
        2) On a scale of 1-10, how *confident* you are in your ability to support each student’s application.
      
    Notes:
    * Putting a Confidence Rating of "10" is the best way to ensure the students you would most like to advocate for are on your list. 
    * Indicating a confidence rating of "0" guarantees that you will NOT write for that student.
      
Once all teacher forms are received, the algorithm will generate the best matches for students based on their pairings and combined teacher confidence ratings.

Here's a video that shows you how to fill out the form: ${tutorialLink}`;
}


function getTeacherReminderText(teacherName, formLink) {
    return `Hello ${teacherName},
    
You have not filled out your teacher recommender form yet.
Here is a video explaining how to fill it out: ${getTeacherTutorialLink()}.
Your form: ${formLink}`
}

function getStudentTutorialLink() {
    let externalSS = SpreadsheetApp.openById("1enHI-SrQXgM8HaYfMOtNQ7RpdeCCf0dbtyIcgKMksn8");
    let sheet = externalSS.getSheetByName("Links");

    let studentTutorialLinkCell = sheet.getRange(1, 2).getValues();

    return studentTutorialLinkCell[0][0];
}

function getTeacherTutorialLink() {
    let externalSS = SpreadsheetApp.openById("1enHI-SrQXgM8HaYfMOtNQ7RpdeCCf0dbtyIcgKMksn8");
    let sheet = externalSS.getSheetByName("Links");

    let studentTutorialLinkCell = sheet.getRange(2, 2).getValues();

    return studentTutorialLinkCell[0][0];
}

//name of 'other' option on student form
function getOtherName() {
    return "Other"
}

function getTeacherFormName(name) {
    return name + " form";
}

function getFinalResultsGSheetName() {
    return "Final Results";
}

function getStudentFinalResultsSheetName() {
    return "Final Student Pairings";
}

function getTeacherFinalResultsSheetName() {
    return "Final Teacher Lists";
}

function getFinalStudentEmailMessage(studentName, teacher1, teacher2) {
    let msg = `Hello ${studentName},<br><br>
    Your teacher recommenders are ${teacher1} and ${teacher2}.<br><br>`;
    let counselorNote = getFinalStudentMessage();
    if (counselorNote != "") {
        msg += `${getNoteText()}${counselorNote}`
    }
    return msg;
}

function getFinalTeacherEmailMessage(teacherName, studentList) {
    if (studentList.length > 0){
        var msg = `Hello ${teacherName},<br><br>
        Your assigned students are below:
        <ul>`
        for (var student of studentList) {
            msg += `<li>${student}</li>`;
        }
        msg += `</ul><br><br>`
        let counselorNote = getFinalTeacherMessage();
        if (counselorNote != "") {
            msg += `${getNoteText()}${counselorNote}`
        }
    }else{
        msg = `Hello ${teacherName},<br><br>
        You were not assigned any students.`
    }
    return msg;
}

function getTeacherSurveyEmailMessage() {
    let link = getTeacherSurveyPublishedLink();
    if (isResponse(link)){
        return link;
    }
    return `Hello,

Please complete the following survey about your experience with the TRS system:
${link}`
}

function getStudentSurveyEmailMessage() {
    let link = getStudentSurveyPublishedLink();
    if (isResponse(link)){
        return link;
    }
    
    return `Hello,

Please complete the following survey about your experience with the TRS system:
${link}`
}

function getEmailsSentResponse(type, amt){
    let msg;
    if (amt == 0){
        msg = `No ${type} emails sent.`;
    }else{
        if (amt == 1){
            msg = `1 ${type} email sent.`;
        }else{
            msg = `${capitalizeFirstLetter(type)} emails sent. # of emails sent: ${amt}.`
        }
    }
    if (type.includes("reminder")){
        if (amt == 0){
            return new NeutralResponse(msg)
        }
        return new SuccessResponse(msg)
    }
    if (amt == 0){
        return new WarningResponse(msg)
    }
    return new SuccessResponse(msg)
}
