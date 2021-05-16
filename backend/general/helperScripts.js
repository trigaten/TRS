function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent();
}

function includeIncluded(filename) {
  return HtmlService.createTemplateFromFile(filename).evaluate().getContent();
}

function getStudentFormPublishedLink() {
  try {
    let form = getStudentForm();
    return form.getPublishedUrl();
  } catch (e) {
    return handleException(e, formNotFoundException)
  }
}

function getSheetById(id) {
  try {
    return SpreadsheetApp.getActive().getSheets().filter(
      function (s) { return s.getSheetId() == id; }
    )[0];
  } catch (e) {
    throw new sheetNotFoundError("Sheet not found.");
  }
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

//input is name in first last or last first form. It gets flipped.
function flipName(name) {
  let firstPart = ""
  let lastPart = ""
  for (var i = 0; i < name.length; i++) {
    if (name[i] == " ") {
      lastPart = name.substring(i + 1, name.length);
      break;
    } else {
      firstPart += name[i];
    }
  }
  return lastPart + " " + firstPart;
}

//takes array of names and flips them all
function flipNames(names) {
  for (var i = 0; i < names.length; i++) {
    names[i] = flipName((names[i]).trim());
  }
  return names;
}

function getTeacherEmailName(name) {
  let format = getTeacherEmailFormat();
  if (isResponse(format)){
    return format;
  }
  if (format == "Name: Last, First") {
    return parseNameLastFirst(name)
  }
  return name;
}

function lockStudentForm() {
  try {
    let studentForm = getStudentForm();
    studentForm.setAllowResponseEdits(false);
    studentForm.setAcceptingResponses(false);
  } catch (error) {
    return handleException(e, formNotFoundException);
  }
}

function lockTeacherForms() {
  let teacherNames = getTeacherEmails();
  if (isResponse(teacherNames)){
    return teacherNames;
  }
  for (var x = 0; x < teacherNames.length; x++) {
    let tFF;
    try {
      tFF = getTeacherFormsFolder();
    } catch (e) {
      return handleException(e, folderNotFoundException);
    }
    let name = teacherNames[x];
    let files = tFF.getFilesByName(getTeacherFormName(name));
    if (files.hasNext()) {
      let file = files.next();
      let form = FormApp.openById(file.getId());
      form.setAllowResponseEdits(false);
      form.setAcceptingResponses(false);
    }
  }
}

function createSheet(name) {
  let externalSS = SpreadsheetApp.openById("1enHI-SrQXgM8HaYfMOtNQ7RpdeCCf0dbtyIcgKMksn8");
  let sheet = externalSS.getSheetByName(name);
  let destination = SpreadsheetApp.getActive();
  let newSheet = sheet.copyTo(destination);
  newSheet.setName(name);
  return newSheet;
}

function doesTriggerExist(functionName) {
  let triggers = ScriptApp.getProjectTriggers();
  for (var trigger of triggers) {
    if (trigger.getHandlerFunction() == functionName) {
      return true;
    }
  }
  return false;
}

function notifyEditors(message) {
  let curSS = SpreadsheetApp.getActive();
  let msg = `Hello counselors,

This is an email from TRS to notify you of the following:
${message}
TRS Google Sheet: ${curSS.getUrl()}`

  let editors = curSS.getEditors();
  let emails = "";
  for (var editor of editors) {
    emails += editor.getEmail() + ","
  }
  GmailApp.sendEmail(emails, `TRS: ${message}`, msg);
}

function notifyTRS(message) {
  let user = Session.getActiveUser();
  let email = user.getEmail();
  GmailApp.sendEmail("teacherrecsystem@gmail.com", `Error: ${email}`, message);
}

function orderSheets(){
  let ss = SpreadsheetApp.getActive();
  let order  = ["Home Sheet", "Teachers Sheet", "Students Sheet", "Student Data", "Student Results", "Teacher Results"]
  let index = 1;
  for (var sheetName of order){
    let sheet = ss.getSheetByName(sheetName)
    if (sheet != null){
      ss.setActiveSheet(sheet)
      ss.moveActiveSheet(index)
      index++
    }
  }
  ss.setActiveSheet(getHomeSheet());
}

function s(val){
  if (val > 1 || val == 0){
    return "s";
  }
  return "";
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function notResponse(object){
  if (object instanceof Response){
    return false;
  }
  return true;
}

function isResponse(object){
  if (object instanceof Response){
    return true;
  }
  return false;
}

function testForRepeatedNames(){
  let studentNames = getStudentNames();
  if (notResponse(studentNames)){
    return new Set(studentNames).size !== studentNames.length; 
  }
  return false;
}

function validateCurrentUser(){
  let user = Session.getActiveUser();
  let email = user.getEmail();
  let domain = email.substr(email.indexOf("@") + 1); 
  let externalSS = SpreadsheetApp.openById("1enHI-SrQXgM8HaYfMOtNQ7RpdeCCf0dbtyIcgKMksn8");
  let sheet = externalSS.getSheetByName("Validation");
  let values = sheet.getDataRange().getValues();

  for (var x = 0; x < values.length; x++){
    let item = values[x][0];
    if (item == domain || item == email){
      return true;
    }
  }

  throw new UnauthorizedUserException(email);
}

