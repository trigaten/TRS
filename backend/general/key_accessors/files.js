
/**
 * @returns teacher Sheet object
 */
function getTeacherSheet() {
    try {
        let teacherSheetId = getTeacherSheetId();
        return getSheetById(teacherSheetId);
    } catch (e) {
        throw new SheetNotFoundException("Teachers sheet not found.")
    }
}

function getTeacherSheetId() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    let teacherSheetId = scriptProperties.getProperty(TEACHERSHEETIDKEY);
    if (teacherSheetId != null) {
        return teacherSheetId;
    }
    return "";
}

function setTeacherSheetId(id) {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(TEACHERSHEETIDKEY, id);
}

/**
* @returns student Sheet object
*/
function getStudentSheet() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    try {
        let studentSheetId = scriptProperties.getProperty(STUDENTSHEETIDKEY);
        return getSheetById(studentSheetId);
    } catch (e) {
        throw new SheetNotFoundException("Students sheet not found.")
    }
}

function getStudentSheetId() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    let studentSheetId = scriptProperties.getProperty(STUDENTSHEETIDKEY);
    if (studentSheetId != null) {
        return studentSheetId;
    }
    return "";
}

function setStudentSheetId(id) {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(STUDENTSHEETIDKEY, id);
}

/**
* @returns student Form object
*/
function getStudentForm() {
    try {
        return FormApp.openById(getStudentFormId());
    } catch (e) {
        throw new FormNotFoundException("Student form not found.");
    }
}

function getStudentFormId() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    let studentSheetFormId = scriptProperties.getProperty(STUDENTFORMIDKEY);
    if (studentSheetFormId != null) {
        return studentSheetFormId;
    }
    return "";
}

function setStudentFormId(id) {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(STUDENTFORMIDKEY, id);
}

function getProjectFolderId() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    let id = scriptProperties.getProperty(PROJECTFOLDERIDKEY);
    if (id != null) {
        return id;
    }
    return "";
}

function setProjectFolderId(id) {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(PROJECTFOLDERIDKEY, id);
}

function getProjectFolder() {
    let folder;
    try {
        folder = DriveApp.getFolderById(getProjectFolderId());
        return folder;
    } catch (e) {
        throw new FolderNotFoundException("Project folder not found.")
    }
}

function getTeacherFormsFolder() {
    try {
        return DriveApp.getFolderById(getTeacherFormsFolderId());
    } catch (e) {
        throw new FolderNotFoundException("Teacher forms folder not found.");
    }
}

function getTeacherFormsFolderId() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    let id = scriptProperties.getProperty(TEACHERFORMFOLDERIDKEY)
    if (id != null) {
        return id;
    }
    return "";
}

function setTeacherFormsFolderId(id) {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(TEACHERFORMFOLDERIDKEY, id);
}

function getStudentDataSheet() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    try {
        let studentDataSheetId = scriptProperties.getProperty(STUDENTDATASHEETIDKEY);
        return getSheetById(studentDataSheetId);
    } catch (e) {
        throw new SheetNotFoundException("Students sheet not found.")
    }
}

function getStudentDataSheetId() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    let studentDataSheetId = scriptProperties.getProperty(STUDENTDATASHEETIDKEY);
    if (studentDataSheetId != null) {
        return studentDataSheetId;
    }
    return "";
}

function setStudentDataSheetId(id) {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(STUDENTDATASHEETIDKEY, id);
}

function setFinalStudentSheetId(id) {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(FINALSTUDENTSHEETID, id);
}

function setFinalTeacherSheetId(id) {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(FINALTEACHERSHEETID, id);
}

function getHomeSheetId() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    let id = scriptProperties.getProperty(HOMESHEETIDKEY);
    if (id != null) {
        return id;
    }
    return "";
}

function getHomeSheet() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    try {
        let id = scriptProperties.getProperty(HOMESHEETIDKEY);
        return getSheetById(id);
    } catch (e) {
        throw new SheetNotFoundException("Home sheet not found.")
    }
}

function setHomeSheetId(id) {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(HOMESHEETIDKEY, id);
}

function getFinalStudentSheet() {
    let id = getFinalStudentSheetId();
    try {
        return getSheetById(id);
    } catch (e) {
        throw new SheetNotFoundException("Final student sheet not found.")
    }
}

function getFinalStudentSheetId() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    let id = scriptProperties.getProperty(FINALSTUDENTSHEETID);
    if (id != null) {
        return id;
    }
    return "";
}

function getFinalTeacherSheet() {
    try {
        let id = getFinalTeacherSheetId();
        return getSheetById(id);
    } catch (e) {
        throw new SheetNotFoundException("Final teacher sheet not found.")
    }
}

function getFinalTeacherSheetId() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    let id = scriptProperties.getProperty(FINALTEACHERSHEETID);
    if (id != null) {
        return id;
    }
    return "";
}
// AUTOGEN
const STUDENTFORMEMAILID = "STUDENTFORMEMAILID"
function setStudentFormEmailId(id) {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(STUDENTFORMEMAILID, id);
}
function getStudentFormEmailId() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    let id = scriptProperties.getProperty(STUDENTFORMEMAILID);
    if (id != null) {
        return id;
    }
    return "";
}

function getStudentFormEmail() {
    let id = getStudentFormEmailId();
    try {
        return GmailApp.getDraft(id);
    } catch (e) {
        throw new EmailNotFoundException("Student Form Email not found.")
    }
}

const TEACHERFORMEMAILID = "TEACHERFORMEMAILID"
function setTeacherFormEmailId(id) {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(TEACHERFORMEMAILID, id);
}
function getTeacherFormEmailId() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    let id = scriptProperties.getProperty(TEACHERFORMEMAILID);
    if (id != null) {
        return id;
    }
    return "";
}

function getTeacherFormEmail() {
    let id = getTeacherFormEmailId();
    try {
        return GmailApp.getDraft(id);
    } catch (e) {
        throw new EmailNotFoundException("Teacher Form Email not found.")
    }
}

const STUDENTFORMREMINDEREMAILID = "STUDENTFORMREMINDEREMAILID"
function setStudentFormReminderEmailId(id) {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(STUDENTFORMREMINDEREMAILID, id);
}
function getStudentFormReminderEmailId() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    let id = scriptProperties.getProperty(STUDENTFORMREMINDEREMAILID);
    if (id != null) {
        return id;
    }
    return "";
}

function getStudentFormReminderEmail() {
    let id = getStudentFormReminderEmailId();
    try {
        return GmailApp.getDraft(id);
    } catch (e) {
        throw new EmailNotFoundException("Student Reminder Email not found.")
    }
}

const TEACHERFORMREMINDEREMAILID = "TEACHERFORMREMINDEREMAILID"
function setTeacherFormReminderEmailId(id) {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(TEACHERFORMREMINDEREMAILID, id);
}
function getTeacherFormReminderEmailId() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    let id = scriptProperties.getProperty(TEACHERFORMREMINDEREMAILID);
    if (id != null) {
        return id;
    }
    return "";
}

function getTeacherFormReminderEmail() {
    let id = getTeacherFormReminderEmailId();
    try {
        return GmailApp.getDraft(id);
    } catch (e) {
        throw new EmailNotFoundException("Teacher Reminder Email not found.")
    }
}

const STUDENTRESULTEMAILID = "STUDENTRESULTEMAILID"
function setStudentResultEmailId(id) {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(STUDENTRESULTEMAILID, id);
}
function getStudentResultEmailId() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    let id = scriptProperties.getProperty(STUDENTRESULTEMAILID);
    if (id != null) {
        return id;
    }
    return "";
}

function getStudentResultEmail() {
    let id = getStudentResultEmailId();
    try {
        return GmailApp.getDraft(id);
    } catch (e) {
        throw new EmailNotFoundException("Student Result Email not found.")
    }
}

const TEACHERRESULTEMAILID = "TEACHERRESULTEMAILID"
function setTeacherResultEmailId(id) {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(TEACHERRESULTEMAILID, id);
}
function getTeacherResultEmailId() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    let id = scriptProperties.getProperty(TEACHERRESULTEMAILID);
    if (id != null) {
        return id;
    }
    return "";
}

function getTeacherResultEmail() {
    let id = getTeacherResultEmailId();
    try {
        return GmailApp.getDraft(id);
    } catch (e) {
        throw new EmailNotFoundException("Teacher Result Email not found.")
    }
}