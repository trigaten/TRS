
function sendFinalStudentEmails() {
    try {
        validateCurrentUser()
    } catch (e) {
        return handleException(e, UnauthorizedUserException)
    }
    //the sheet where the algorithm's choices are
    let studentVals = getFinalStudentSheetData()
    console.log(studentVals)
    let studentNames = getStudentNames();
    let nameToEmailDict = getStudentNameToEmailDict();
    if (isResponse(studentVals)){
        return studentVals;
    }
    if (isResponse(studentNames)){
        return studentNames;
    }
    if (isResponse(nameToEmailDict)){
        return nameToEmailDict;
    }

    let numEmails = studentVals[0].length
    for (var c = 0; c < numEmails; c++) {
        let studentName = studentVals[0][c]
        if (studentName == ""){
          numEmails = 0;
          break
        }
        let teacher1 = studentVals[1][c];
        let teacher2 = studentVals[2][c];

        let email = nameToEmailDict[studentName];
        sendFinalStudentEmail(studentName, teacher1, teacher2, email);
    }
    setFinalStudentEmailsSent();
    return getEmailsSentResponse("student result", numEmails);
}

function sendFinalTeacherEmails() {
    try {
        validateCurrentUser()
    } catch (e) {
        return handleException(e, UnauthorizedUserException)
    }
    //the sheet where the algorithm's choices are
    let teacherVals = getFinalTeacherSheetData();
    if (isResponse(teacherVals)){
        return teacherVals;
    }
    let teacherEmails = getTeacherEmails();
    if (isResponse(teacherEmails)){
        return teacherEmails;
    }
    let teacherNames = getTeacherNames();
    if (isResponse(teacherNames)){
        return teacherNames;
    }

    let numEmails = teacherVals[0].length
    let numSent = 0;
    for (var c = 0; c < numEmails; c++) {
        let teacherName = getTeacherEmailName(teacherVals[0][c]);
        if (teacherVals[0][c] != getOtherName()) {
            let students = [];
            let index = teacherNames.indexOf(teacherVals[0][c]);
            let teacherEmail = teacherEmails[index];
            //start at one to avoid teacher name
            for (var r = 1; r < teacherVals.length; r++) {
                let studentName = teacherVals[r][c];
                if (studentName == "") {
                    break;
                } else {
                    students.push(studentName);
                }
            }
            sendFinalTeacherEmail(teacherName, students, teacherEmail);
            numSent++;
        }
    }
    setFinalTeacherEmailsSent();
    return getEmailsSentResponse("teacher result", numSent)
}

function sendFinalStudentEmail(studentName, teacher1, teacher2, studentEmail) {
    let msg = getFinalStudentEmailMessage(studentName, teacher1, teacher2);
    GmailApp.sendEmail(studentEmail, "Your Teacher Recommenders", "", { htmlBody: msg });
}

function sendFinalTeacherEmail(teacherName, studentList, teacherEmail) {
    let msg = getFinalTeacherEmailMessage(teacherName, studentList);
    GmailApp.sendEmail(teacherEmail, "Your Student Recommendation List", "", { htmlBody: msg });
}
