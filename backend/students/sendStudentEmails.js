function sendStudentEmails() {
    try {
        validateCurrentUser()
    } catch (e) {
        return handleException(e, UnauthorizedUserException)
    }
    var studentEmails;
    try {
        studentEmails = getStudentEmails();
    } catch (e) {
        return new FailureResponse(e.message);
    }
    //send 'em
    for (var email of studentEmails) {
        emailStudentForm(email);
    }
    setProgramState(3);

    return getEmailsSentResponse("student", x);
}

function emailStudentForm(studentEmail) {
    let msg = getStudentEmailText();
    GmailApp.sendEmail(studentEmail, "Teacher Recommender Request Form", "", { htmlBody: msg });
}

function sendStudentReminderEmails() {
    var studentEmails;
    try {
        studentEmails = getStudentEmails();
    } catch (e) {
        return new FailureResponse(e.message);
    }

    //will fail if student form cannot be found (probably hasn't been created yet)
    try {
        var form = getStudentForm();
        var responses = form.getResponses();
        for (var x = 0; x < responses.length; x++) {
            var response = responses[x];
            var email = response.getRespondentEmail();
            var index = studentEmails.indexOf(email)
            if (index > -1) {
                studentEmails.splice(index, 1)
                x--;
            }
        }
    } catch (e) {
        return new FailureResponse(e.message);
    }

    for (x = 0; x < studentEmails.length; x++) {
        email = studentEmails[x];
        emailStudentReminder(email);
    }

    return getEmailsSentResponse("student reminder", x)
}

function emailStudentReminder(studentEmail) {
    let msg = getStudentReminderText();
    GmailApp.sendEmail(studentEmail, "Teacher Recommendation Form Reminder", msg);
}