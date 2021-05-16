function getStudentMessage() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    let msg = scriptProperties.getProperty(STUDENTMSG);
    if (msg != null) {
        return msg;
    }
    return "";
}

function resetStudentMessage() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(STUDENTMSG, "");
}

function setStudentMessage(msg) {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(STUDENTMSG, msg);
}

function getAmountOfTeacherPairs() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    let amt = scriptProperties.getProperty(TEACHERPAIRAMOUNT);
    if (amt != null) {
        try{
            return parseInt(amt);
        }catch(e){
            throw "Amount of teacher pairs not found."
        }
    }
    return "";
}

function setAmountOfTeacherPairs(amt) {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(TEACHERPAIRAMOUNT, amt);
}

function getStudentFormsDoneAmount() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    try {
        let formsDoneStr = scriptProperties.getProperty(STUDENTFORMSDONE);
        return parseInt(formsDoneStr);
    } catch (e) {
        throw "Can't find amount of student forms done."
    }
}

function setStudentFormsDoneAmount(amt) {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(STUDENTFORMSDONE, amt);
}

function incrementStudentFormsDoneAmount() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(STUDENTFORMSDONE, getStudentFormsDoneAmount() + 1);
}

function setStudentEmailsSent() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(STUDENTMSGSSENT, "true");
}

function studentEmailsSent() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    if (scriptProperties.getProperty(STUDENTMSGSSENT) == "true") {
        return true;
    }
    return false;
}