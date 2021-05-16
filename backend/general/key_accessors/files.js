
/**
 * @returns teacher Sheet object
 */
function getTeacherSheet() {
    try {
        let teacherSheetId = getTeacherSheetId();
        let teacherSheet = getSheetById(teacherSheetId);
        return teacherSheet;
    } catch (e) {
        throw new sheetNotFoundException("Teachers sheet not found.")
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
        let studentSheet = getSheetById(studentSheetId);
        return studentSheet;
    } catch (e) {
        throw new sheetNotFoundException("Students sheet not found.")
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
        let studentSheetForm = FormApp.openById(getStudentFormId());
        return studentSheetForm;
    } catch (e) {
        throw new formNotFoundException("Student form not found.");
    }
}

function getStudentFormId() {
    let scriptProperties = PropertiesService.getDocumentProperties();
    let studentSheetFormId = scriptProperties.getProperty(STUDENTFORMIDKEY);
    if (studentSheetFormId != null){
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
    if (id != null){
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
    try{
      folder = DriveApp.getFolderById(getProjectFolderId());
      return folder;
    }catch(e){
      throw new folderNotFoundException("Project folder not found.")
    }
}

function getTeacherFormsFolder() {
    try {
        let folder = DriveApp.getFolderById(getTeacherFormsFolderId());
        return folder;
    } catch (e) {
        throw new folderNotFoundException("Teacher forms folder not found.");
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
        throw new sheetNotFoundException("Students sheet not found.")
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
        throw new sheetNotFoundException("Home sheet not found.")
    }
}

function setHomeSheetId(id) {
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(HOMESHEETIDKEY, id);
}

function getFinalStudentSheet(){
    let id = getFinalStudentSheetId();
    try {
        return getSheetById(id);
    } catch (e) {
        throw new sheetNotFoundException("Final student sheet not found.")
    }
}

function getFinalStudentSheetId(){
    let scriptProperties = PropertiesService.getDocumentProperties();
    let id = scriptProperties.getProperty(FINALSTUDENTSHEETID);
    if (id != null){
        return id;
    }
    return "";
}

function getFinalTeacherSheet(){
    try {
        let id = getFinalTeacherSheetId();
        return getSheetById(id);
    } catch (e) {
        throw new sheetNotFoundException("Final teacher sheet not found.")
    }
}

function getFinalTeacherSheetId(){
    let scriptProperties = PropertiesService.getDocumentProperties();
    let id = scriptProperties.getProperty(FINALTEACHERSHEETID);
    if (id != null){
        return id;
    }
    return "";
}