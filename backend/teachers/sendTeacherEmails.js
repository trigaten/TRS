function sendTeacherEmails() {
    try {
        validateCurrentUser();
    } catch (e) {
        return handleException(e, UnauthorizedUserException);
    }
    let tFF;
    try {
        tFF = getTeacherFormsFolder();
    } catch (e) {
        return handleException(e, formNotFoundException);
    }
    let teacherNames = getTeacherNames();
    if (isResponse(teacherNames)){
        return teacherNames
    }
    let emails = getTeacherEmails();
    if (isResponse(emails)){
        return emails;
    }
    for (var x = 0; x < teacherNames.length; x++) {
        let email = emails[x];
        let name = teacherNames[x];
        let files = tFF.getFilesByName(getTeacherFormName(teacherNames[x]));
        if (files.hasNext()) {
            let file = files.next();
            let form = FormApp.openById(file.getId());
            let link = form.getPublishedUrl();
            emailTeacherForm(name, email, link);
        } else {
            emailTeacherNoForm(name, email);
        }
    }

    setProgramState(5);
    if (x > 0) {
        return new SuccessResponse("Teacher emails have been sent. Emails sent: " + x)
    } else {
        return new WarningResponse("Attempted to send teacher emails. None were sent, but you may move on to the next step.")
    }
}

function emailTeacherForm(teacherName, teacherEmail, formLink) {
    var msg = getTeacherEmailText(teacherName, formLink)
    GmailApp.sendEmail(teacherEmail, "Student Rec Form", "", { htmlBody: msg });
}

function emailTeacherNoForm(teacherName, teacherEmail) {
    var msg = getTeacherEmailNoFormText(teacherName)
    GmailApp.sendEmail(teacherEmail, "Student Rec Form", "", { htmlBody: msg });
}

function sendTeacherReminderEmails() {
    var teacherEmailsToRemind = getTeacherEmails();
    if (isResponse(teacherEmailsToRemind)){
        return teacherEmailsToRemind;
    }
    var teacherNames = getTeacherNames();
    if (isResponse(teacherNames)){
        return teacherNames;
    }

    let tFF;
    try {
        tFF = getTeacherFormsFolder();
    } catch (e) {
        return handleException(e, folderNotFoundException)
    }

    for (var x = 0; x < teacherNames.length; x++) {
        let files = tFF.getFilesByName(getTeacherFormName(teacherNames[x]));
        if (files.hasNext()) {
            let file = files.next();
            let form = FormApp.openById(file.getId());
            let responses = form.getResponses();
            if (responses.length > 0) {
                let response = responses[0];
                let email = response.getRespondentEmail();
                let index = teacherEmailsToRemind.indexOf(email);
                if (index > -1) {
                    teacherEmailsToRemind.splice(index, 1);
                    teacherNames.splice(index, 1);
                }
            }
        }
    }

    let emailsSent = 0;
    for (x = 0; x < teacherEmailsToRemind.length; x++) {
        let email = teacherEmailsToRemind[x];
        let name = teacherNames[x];
        let files = tFF.getFilesByName(getTeacherFormName(name));
        if (files.hasNext()) {
            let file = files.next();
            let form = FormApp.openById(file.getId());
            emailTeacherReminder(name, email, form.getPublishedUrl());
            emailsSent++;
        }
    }
    
    return getEmailsSentResponse("teacher reminder", x)
}

function emailTeacherReminder(teacherName, teacherEmail, formLink) {
    let msg = getTeacherReminderText(teacherName, formLink);
    GmailApp.sendEmail(teacherEmail, "Teacher Recommendation Form Reminder", msg);
}