
/**
 * Creates forms for teachers to fill out
**/
function createTeacherForms() {
  initializeTeachersAndStudents()
  let folder = getTeacherFormsFolder();
  //Going through for each teacher and their list of students
  for (var key of keyList) {
    var value = teachersAndStudents[key];
    var teacher = key;
    var students = value

    //if any students chose the teacher
    if (students.length > 0) {
      var item = getTeacherFormName(teacher);
      var form = FormApp.create(item);
      form.setTitle('Teacher Recommender Selection')
        .setDescription(getTeacherFormDescription())
        .setConfirmationMessage('Thanks for responding!')
        .setAllowResponseEdits(true)
        .setCollectEmail(true);
      form.setLimitOneResponsePerUser(true);
      form.setProgressBar(true);
      // form.requiresLogin(true);

      //CHANGES form location to given folder
      var file = DriveApp.getFileById(form.getId());

      folder.addFile(file);
      DriveApp.getRootFolder().removeFile(file);

      // Add a question that asks teacher the max amt of recs they can do
      var recMax = form.addTextItem().setTitle('What is the maximum number of recommendations you would like to write?');
      var textValidation = FormApp.createTextValidation()
        .requireWholeNumber()
        .requireNumberGreaterThanOrEqualTo(0)
        .build();
      recMax.setValidation(textValidation);
      recMax.setRequired(true)
      //adds a scale 0-10 question for each student name
      for (var x = 0; x < students.length; x++) {
        form.addScaleItem()
          .setBounds(0, 10)
          .setTitle(students[x] + "")
          .setRequired(true)
      }
      if (!doesTriggerExist('updateStudentsDoneList')) {
        ScriptApp.newTrigger('updateTeachersDoneList')
          .forForm(form)
          .onFormSubmit()
          .create();
      }
    }
  }
  lockStudentForm();
  setProgramState(4);
  logAction("Created Teacher Forms")
  return "success"
}


/**
 * Simple alert function
 * @param {String} message 
 */
function showAlert(message) {
  var ui = SpreadsheetApp.getUi();
  if (message == null) {
    message = "NULL";
  }
  ui.alert(message);
}

/**
 * More complex alert function that asks for confirmation
 * @param {String} message - message initially shown to user
 * @param {String} start - message shown if click yess
 * @param {String} cancel - message shown if click x or cancel
 */
function showAlertWithConfirmation(message, start = 'Function Begun', cancel = 'Run Canceled') {
  var ui = SpreadsheetApp.getUi(); // Same variations.

  var result = ui.alert(
    'Please confirm',
    message,
    ui.ButtonSet.YES_NO);

  // Process the user's response.
  if (result == ui.Button.YES) {
    // User clicked "Yes".
    ui.alert(start);
    return true;
  } else {
    // User clicked "No" or X in the title bar.
    ui.alert(cancel);
    return false;
  }
}

//TODO implement regular check of row size -- onEdit?
function setDropdown(sheet, startRow, column, optionsList, howManyColumns) {
  //define the dropdown/validation rules
  var rangeRule = SpreadsheetApp.newDataValidation().requireValueInList(optionsList);
  //set the dropdown validation for the row
  sheet.getRange(startRow, column, howManyColumns, 1).setDataValidation(rangeRule); // set range to your range
}
