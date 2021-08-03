function setNextStep(step) {
  let stepDict = {
    1: "Add Emails And Create Student Forms",
    2: "Send Student Forms",
    3: "Create Teacher Forms",
    4: "Send Teacher Forms",
    5: "Run Algorithm",
    6: "Finished, But Send Final Results",
    7: "All done-- Send Surveys?"
  }
  let homeSheet;
  try {
    homeSheet = getHomeSheet();
  } catch (e) {
    return handleException(e, SheetNotFoundException)
  }
  try {
    let stepCell = homeSheet.getRange(5, 3);
    stepCell.setValue(stepDict[step])
    homeSheet.autoResizeColumn(3)
  } catch (e) { }
}

function logAction(action) {
  let homeSheet;
  try {
    homeSheet = getHomeSheet();

  } catch (e) {
    return handleException(e, SheetNotFoundException)
  }
  try {
    let logCell = homeSheet.getRange(getLogStep() + 6, 1);
    logCell.setValue(action);
    homeSheet.autoResizeColumn(1);
    incrementLogStep();
  } catch (e) { }
}

function updateStudentsDoneList(e) {
  let studentEmail = e.response.getRespondentEmail()
  let studentSheet;
  try {
    studentSheet = getStudentSheet();
  } catch (error) {
    return handleException(error, SheetNotFoundException);
  }
  let doneList = studentSheet.getRange("E6:E").getValues();

  for (var x = 0; x < doneList.length; x++) {
    doneList[x] = doneList[x][0];
  }

  let filteredDoneList = doneList.filter(String);
  if (filteredDoneList.indexOf(studentEmail) < 0) {
    for (x = 0; x < doneList.length; x++) {
      if (doneList[x] == "") {
        studentSheet.getRange(x + 6, 5).setValue(studentEmail);
        break;
      }
    }

    let totalDone = filteredDoneList.length;

    let studentEmails = getStudentEmails();
    if (isResponse(studentEmails)) {
      return studentEmails;
    }
    let totalToDo = studentEmails.length;

    studentSheet.getRange(5, 6).setValue(totalDone + 1 + "/" + totalToDo)
    if (totalDone + 1 >= totalToDo) {
      studentSheet.getRange(5, 6).setBackground("green");
      notifyEditors("Student form responses all recorded.")
    }
  }
}

function updateTeachersDoneList(e) {
  let teacherEmail = e.response.getRespondentEmail()
  let numOfTeachers = countTeacherForms();

  let teacherSheet;
  try {
    teacherSheet = getTeacherSheet();
  } catch (error) {
    return handleException(error, SheetNotFoundException)
  }

  let teacherEmailCols = teacherSheet.getRange("B6:B").getValues();
  let doneCols = teacherSheet.getRange("C6:C").getValues();

  for (var x = 0; x < teacherEmailCols.length; x++) {
    teacherEmailCols[x] = teacherEmailCols[x][0];
    doneCols[x] = doneCols[x][0];
  }

  let totalDone = doneCols.filter(String).length;
  let index = teacherEmailCols.indexOf(teacherEmail);
  if (index >= 0) {
    if (teacherSheet.getRange(index + 6, 3).getValue() != "Yes") {
      teacherSheet.getRange(index + 6, 3).setValue("Yes");
      totalDone += 1;
    }
  }

  teacherSheet.getRange(5, 4).setValue(totalDone + "/" + numOfTeachers);
  if (totalDone >= countTeacherForms()) {
    teacherSheet.getRange(5, 4).setBackground("green");
    notifyEditors("Teacher form responses all recorded.")
  }
}

function countTeacherForms() {
  let tFF;
  try {
    tFF = getTeacherFormsFolder();
  } catch (e) {
    return 0;
  }

  let files = tFF.getFilesByType(MimeType.GOOGLE_FORMS);
  let count = 0;
  while (files.hasNext()) {
    files.next();
    count += 1;
  }

  return count;
}

function betaUpdateTeachersDoneList() {
  let done = 0;
  let tFF;
  try {
    tFF = getTeacherFormsFolder();
  } catch (e) {
    return handleException(e, FolderNotFoundException);
  }

  let teacherSheet;
  try {
    teacherSheet = getTeacherSheet();
  } catch (e) {
    return handleException(e, SheetNotFoundException)
  }

  //index at which names start
  const startIndex = 5

  var teacherNameCol = teacherSheet.getRange("A1:A").getValues().slice(startIndex);
  var responseRecordedColVals = teacherSheet.getRange("C1:C").getValues().slice(startIndex);

  // reduce dimensionality
  for (var x = 0; x < teacherNameCol.length; x++) {
    teacherNameCol[x] = teacherNameCol[x][0];
    responseRecordedColVals[x] = responseRecordedColVals[x][0];
  }

  for (x = 0; x < teacherNameCol.length; x++) {
    if (teacherNameCol[x] == ""){
      continue;
    }
    // if no info on whether response recorded in sheet
    if (responseRecordedColVals[x] != "Yes") {
      if (responseRecordedColVals[x] != "NA") {
        let files = tFF.getFilesByName(getTeacherFormName(teacherNameCol[x]));
        if (files.hasNext()) {
          // if there is a response
          if (FormApp.openById(files.next().getId()).getResponses()[0] != null) {
            teacherSheet.getRange(x + 6, 3).setValue("Yes");
            done++;
          }
        } else {
          // fill in as NA because this teacher doesn't have a form
          teacherSheet.getRange(x + 6, 3).setValue("NA");
        }
      }
    } else {
      done++;
    }
  }

  teacherSheet.getRange(5, 4).setValue(done + "/" + countTeacherForms());
  if (done >= countTeacherForms()) {
    teacherSheet.getRange(5, 4).setBackground("green");
    notifyEditors("Teacher form responses all recorded.")
  }
}


function betaUpdateTeachersDoneList() {
  let done = 0;
  let tFF;
  try {
    tFF = getTeacherFormsFolder();
  } catch (e) {
    return handleException(e, FolderNotFoundException);
  }

  let teacherSheet;
  try {
    teacherSheet = getTeacherSheet();
  } catch (e) {
    return handleException(e, SheetNotFoundException)
  }

  //index at which names start
  const startIndex = 5

  var teacherNameCol = teacherSheet.getRange("A1:A").getValues().slice(startIndex);
  var responseRecordedColVals = teacherSheet.getRange("C1:C").getValues().slice(startIndex);

  // reduce dimensionality
  for (var x = 0; x < teacherNameCol.length; x++) {
    teacherNameCol[x] = teacherNameCol[x][0];
    responseRecordedColVals[x] = responseRecordedColVals[x][0];
  }

  for (x = 0; x < teacherNameCol.length; x++) {
    if (teacherNameCol[x] == ""){
      continue;
    }
    // if no info on whether response recorded in sheet
    if (responseRecordedColVals[x] != "Yes") {
      if (responseRecordedColVals[x] != "NA") {
        let files = tFF.getFilesByName(getTeacherFormName(teacherNameCol[x]));
        if (files.hasNext()) {
          // if there is a response
          if (FormApp.openById(files.next().getId()).getResponses()[0] != null) {
            teacherSheet.getRange(x + 6, 3).setValue("Yes");
            done++;
          }
        } else {
          // fill in as NA because this teacher doesn't have a form
          teacherSheet.getRange(x + 6, 3).setValue("NA");
        }
      }
    } else {
      done++;
    }
  }

  teacherSheet.getRange(5, 4).setValue(done + "/" + countTeacherForms());
  if (done >= countTeacherForms()) {
    teacherSheet.getRange(5, 4).setBackground("green");
    notifyEditors("Teacher form responses all recorded.")
  }
}

