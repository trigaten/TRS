function getTeacherMessage() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    let msg = scriptProperties.getProperty(TEACHERMSG);
    if (msg != null) {
        return msg;
    }
    return "";
}

function resetTeacherMessage() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(TEACHERMSG, "");
}

function setTeacherMessage(msg) {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(TEACHERMSG, msg);
}

function getTeacherFormsDoneAmount() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    return parseInt(scriptProperties.getProperty(TEACHERFORMSDONE));
}

function setTeacherFormsDoneAmount(amt) {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(TEACHERFORMSDONE, amt);
}

function incrementTeacherFormsDoneAmount() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(TEACHERFORMSDONE, getTeacherFormsDoneAmount() + 1);
}

function setTeacherEmailsSent() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(TEACHERMSGSSENT, "true");
}

function teacherEmailsSent() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    if (scriptProperties.getProperty(TEACHERMSGSSENT) != "true") {
        return true;
    }
    return false;
}
