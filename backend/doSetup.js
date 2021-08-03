
function doSetup() {
  var scriptProperties = PropertiesService.getDocumentProperties();
  try{
    validateCurrentUser();
  }catch(e){
    return handleException(e, UnauthorizedUserException);
  }

  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }

  scriptProperties.deleteAllProperties()

  let spreadsheetId = SpreadsheetApp.getActiveSpreadsheet().getId();
  let spreadsheetFile = DriveApp.getFileById(spreadsheetId);
  setProjectFolderId(spreadsheetFile.getParents().next().getId())

  //sheet names
  const homeSheetName = "Home Sheet"
  const studentsSheetName = "Students Sheet"
  const teachersSheetName = "Teachers Sheet"

  let projectFolder;
  try {
    projectFolder = getProjectFolder()
  } catch (e) {
    return handleException(e, folderNotFoundException)
  }

  //make individual sheets
  let spreadSheet = SpreadsheetApp.getActive();

  let sheets = spreadSheet.getSheets();
  for (var sheet of sheets) {
    let sheetName = sheet.getName();
    if (sheetName == homeSheetName || sheetName == studentsSheetName || sheetName == teachersSheetName) {
      const date = new Date();
      sheet.setName(sheetName + date.getTime());
    }
  }

  let homeSheet = makeHomeSheet();
  let teachersSheet = makeTeachersSheet();
  let studentsSheet = makeStudentsSheet();

  generateEmailDrafts()

  //END AREA
  SpreadsheetApp.setActiveSheet(homeSheet)
  setProjectFolderId(projectFolder.getId());
  setHomeSheetId(homeSheet.getSheetId().toString());
  setTeacherSheetId(teachersSheet.getSheetId().toString());
  setStudentSheetId(studentsSheet.getSheetId().toString());
  setProgramState(1);
  orderSheets();
  setAmountOfTeacherPairs(6);
  setLogStep(0);
  return new SuccessResponse("All set up! Go ahead and start entering student and teacher emails.")
}

function generateEmailDrafts(){
  // student form email
  let studentFormEmail = GmailApp.createDraft("", "Your Teacher Recommender Form", getDefaultStudentEmailText());
  setStudentFormEmailId(studentFormEmail.getId());
  
}

function getProjectName() {
  let spreadSheet = SpreadsheetApp.getActive();
  return spreadSheet.getName();
}

function makeHomeSheet() {
  let externalSS = SpreadsheetApp.openById("1enHI-SrQXgM8HaYfMOtNQ7RpdeCCf0dbtyIcgKMksn8");
  let sheet = externalSS.getSheetByName("Home Sheet");
  
  let destination = SpreadsheetApp.getActive();
  let homeSheet = sheet.copyTo(destination);
  homeSheet.setName("Home Sheet")

  return homeSheet;
}

function makeStudentsSheet() {
  let externalSS = SpreadsheetApp.openById("1enHI-SrQXgM8HaYfMOtNQ7RpdeCCf0dbtyIcgKMksn8");
  let sheet = externalSS.getSheetByName("Students Sheet");

  let destination = SpreadsheetApp.getActive();
  let studentsSheet = sheet.copyTo(destination);
  studentsSheet.setName("Students Sheet")

  return studentsSheet;
}

function makeTeachersSheet() {
  let externalSS = SpreadsheetApp.openById("1enHI-SrQXgM8HaYfMOtNQ7RpdeCCf0dbtyIcgKMksn8");
  let sheet = externalSS.getSheetByName("Teachers Sheet");

  let destination = SpreadsheetApp.getActive();
  let studentsSheet = sheet.copyTo(destination);
  studentsSheet.setName("Teachers Sheet")

  return studentsSheet;
}

