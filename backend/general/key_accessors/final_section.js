
function getFinalStudentMessage() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    let msg = scriptProperties.getProperty(FINALSTUDENTMSG);
    if (msg != null) {
        return msg;
    }
    return "";
}

function resetFinalStudentMessage() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(FINALSTUDENTMSG, "");
}

function setFinalStudentMessage(msg) {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(FINALSTUDENTMSG, msg);
}

function getFinalTeacherMessage() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    let msg = scriptProperties.getProperty(FINALTEACHERMSG);
    if (msg != null) {
        return msg;
    }
    return "";
}

function resetFinalTeacherMessage() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(FINALTEACHERMSG, "");
}

function setFinalTeacherMessage(msg) {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(FINALTEACHERMSG, msg);
}


function initializeFinalStudentEmailsSent() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(FINALSTUDENTMSGSSENT, "false");
}

function initializeFinalTeacherEmailsSent() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(FINALTEACHERMSGSSENT, "false");
}

function initializeStudentEmailsSent() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(FINALSTUDENTMSGSSENT, "false");
}

function initializeTeacherEmailsSent() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(FINALTEACHERMSGSSENT, "false");
}


function finalStudentEmailsSent() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    let strBool = scriptProperties.getProperty(FINALSTUDENTMSGSSENT);
    if (strBool == "true") {
        return true;
    }
    return false;
}

function finalTeacherEmailsSent() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    let strBool = scriptProperties.getProperty(FINALTEACHERMSGSSENT);
    if (strBool == "true") {
        return true;
    }
    return false;
}

function setFinalStudentEmailsSent() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(FINALSTUDENTMSGSSENT, "true");
    checkFinalEmailsSent();
}

function setFinalTeacherEmailsSent() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(FINALTEACHERMSGSSENT, "true");
    checkFinalEmailsSent();
}

function checkFinalEmailsSent(){
    if (finalTeacherEmailsSent() && finalStudentEmailsSent()){
        setProgramState(7);
    }
}