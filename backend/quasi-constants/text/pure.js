//for when a student lists a teacher twice (so for both of their choices)
//This returns what the second version of that student's name should be called
function getNameOfSecondInstanceOfStudent(name) {
    return "Second recommendation for " + name;
}

function getNoteText() {
    return `<b>A note from your counseling team</b>:<br>`
}

function getDefaultStudentEmailText() {
    return `Hello,<br><br>
    
    Please see the form below. Fill out your teacher recommender preferences according to the instructions in the form.<br>
    Here is a video that shows how to fill out your form: [STUDENT_TUTORIAL_LINK].<br><br>
    
    Your form: [FORM_LINK]`
}

function getDefaultTeacherEmailText() {
    return `Hello [TEACHER_NAME],<br><br>

    Please see the form below containing students who have listed you as a potential rec writer. Fill out your preferences based on the instructions inside.
    <br>
    Here is a video explaining how to fill it out: [TEACHER_TUTORIAL_LINK].
    <br>
    Your form: [FORM_LINK]`
}

function getDefaultStudentReminderEmailText() {
    return `Hello,
    
You have not filled out your teacher recommender form yet.

Here is a video explaining how to fill it out: [STUDENT_TUTORIAL_LINK].

Your form: [FORM_LINK]`
}

function getDefaultTeacherReminderEmailText() {
    return `Hello [TEACHER_NAME],
    
You have not filled out your teacher recommender form yet.
Here is a video explaining how to fill it out: [TEACHER_TUTORIAL_LINK].
Your form: [FORM_LINK]`
}

function getDefaultStudentResultText() {
    return `Hello [STUDENT_NAME],<br><br>
    Your teacher recommenders are [TEACHER_RECOMMENDERS].<br><br>`;
}

function getDefaultTeacherResultText() {
    return `Hello [TEACHER_NAME],<br><br>
    Your assigned students are below:
    [STUDENTS]`;
}

function getDefaultTeacherResultNoneText() {
    return `Hello [TEACHER_NAME],<br><br>
    You were not assigned any students.`;
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

function getStudentReminderSubject(){
    return 'Reminder to Complete Your Student Form'
}

function getTeacherReminderSubject(){
    return 'Reminder to Complete Your Teacher Form'
}

function getStudentResultSubject(){
    return 'Your Teacher Recommenders'
}

function getTeacherResultSubject(){
    return 'Your Student Recommendation List'
}