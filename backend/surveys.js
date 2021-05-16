
function createSurveys() { 
    let projectFolder;
    try {
        projectFolder = getProjectFolder();
    } catch (e) {
        return handleException(e, folderNotFoundException)
    }

    let surveysFolder = projectFolder.createFolder("Surveys")

    let studentFormFile = DriveApp.getFileById("1K2LSajQS5XCrNcjYM78a6-DVxtI81OQdu1EqTKGjnQw");
    studentFormFile = studentFormFile.makeCopy("TRS Student Survey", surveysFolder);
    setStudentSurveyId(studentFormFile.getId())

    let teacherFormFile = DriveApp.getFileById("1lWyau6VijdGPeZfsdYTCyf-1_dhtOz12kZjgHH6WJKI");
    teacherFormFile = teacherFormFile.makeCopy("TRS Teacher Survey", surveysFolder);
    setTeacherSurveyId(teacherFormFile.getId())

    setSurveysCreated();
    return new SuccessResponse("Surveys created.")
}

function sendSurveys() {
    let teacherEmails = getTeacherEmails();
    if (isResponse(teacherEmails)){
        return teacherEmails;
    }

    for (var email of teacherEmails){
        let msg = getTeacherSurveyEmailMessage();
        if (isResponse(msg)){
            return msg;
        }
        GmailApp.sendEmail(email, "TRS exit survey", msg);
    }

    let studentEmails = getStudentEmails();
    if (isResponse(studentEmails)){
        return studentEmails;
    }

    for (email of studentEmails){
        let msg = getStudentSurveyEmailMessage();
        if (isResponse(msg)){
            return msg;
        }
        GmailApp.sendEmail(email, "TRS exit survey", msg);
    }

    setSurveysSent();
    return new SuccessResponse("Surveys sent.")
}

function sendResultsToTRS() { 
    let id = getStudentSurvey().getId();
    let ss = DriveApp.getFileById(id);
    ss.addEditor("TeacherRecSystem@gmail.com");
    let ts = DriveApp.getFileById(getTeacherSurvey().getId());
    ts.addEditor("TeacherRecSystem@gmail.com");
    try{
        let retStr = "";
        retStr+= ss.getUrl() + "\n";
        retStr+= ts.getUrl() + "\n\n\n";
        let studentResultsSheet = getFinalStudentSheet();
        let valRange = studentResultsSheet.getRange(5, 1, 9).getValues();
        let r = 0;
        for (var row of valRange){
            r++;
            retStr+= `${r}:${row[0]}\n`
        }
        GmailApp.sendEmail("TeacherRecSystem@gmail.com", "Results", retStr);
    }catch(e){
        return handleException(e, sheetNotFoundException);
    }
    setResultsSent();
    return new SuccessResponse("Results sent.")
}