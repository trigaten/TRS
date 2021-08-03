function startTeacherFormsProcess() {
  try {
    validateCurrentUser()
  } catch (e) {
    return handleException(e, UnauthorizedUserException)
  }
  if (testForRepeatedNames()){
    return new FailureResponse("There is a repeated student name. Please fix this.")
  }
  //check if tFF exists
  try {
    let tFF = getTeacherFormsFolder();
  } catch (error) {
    createTeacherFormsFolder();
  }
  return createTeacherForm(0);
}

function getTeachersAndStudents() {
  let teachersAndStudents = {};

  let teacherNames = getTeacherNames();
  if (isResponse(teacherNames)){
    return teacherNames;
  }

  //put teacher names paired with a list of students as a dictionary in teachersAndStudents
  for (var x = 0; x < teacherNames.length; x++) {
    let k = teacherNames[x];
    let v = [];
    teachersAndStudents[k] = v;
  }
  teachersAndStudents[getOtherName()] = [];

  //populate arrays within teachersAndStudents dictionary with students at their corresponding teacher's indices
  var data = getStudentData();

  //start r at 1 to skip headers
  for (var r = 1; r < data.length; r++) {
    var currentStudent = data[r][2];
    //Start c where actual data starts
    for (var c = 3; c < data[0].length; c++) {
      let name = data[r][c];

      if ((name != getOtherName())) {
        let arr = teachersAndStudents[name];

        if (arr.indexOf(currentStudent) == -1) {
          arr.push(currentStudent);
        }

        //CHECK HERE if the student has listed the teacher twice and add accordingly
        //Check if c is an odd index bc we started on on odd and want to look at every two cells together
        if (c % 2 == 1) {
          let first = c;
          let second = c + 1;
          if (data[r][first] == data[r][second]) {
            //tests if the double has already been put in
            if (arr.indexOf(getNameOfSecondInstanceOfStudent(currentStudent)) == -1) {
              arr.push(getNameOfSecondInstanceOfStudent(currentStudent));
            }
          }
        }
      }
    }
  }
  return teachersAndStudents;
}

function createTeacherForm(index) {
  let folder;
  try{
    folder = getTeacherFormsFolder();
  }catch(e){
    return handleException(e, FolderNotFoundException);
  }
  
  let teachersAndStudents = getTeachersAndStudents();
  if (isResponse(teachersAndStudents)){
    return teachersAndStudents;
  }
  let keyList = Object.keys(teachersAndStudents);
  // no more to be created
  if (keyList.length > index) {
    var key = keyList[index];
    if (key == getOtherName()) {
      setProgramState(4);
      if (index == 0) {
        return new WarningResponse(`Attempted to create teacher forms, but none were created.`)
      } else {
        if (index == 1) {
          return new SuccessResponse("1 teacher form created.")
        }
        return new SuccessResponse(`Teacher forms created. # of forms created: ${index}.`)
      }
    }

    var value = teachersAndStudents[key];
    var teacher = key;
    if (teacherFormCreated(teacher)) {
      return createTeacherForm(index + 1);
    }

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
      ScriptApp.newTrigger('updateTeachersDoneList')
        .forForm(form)
        .onFormSubmit()
        .create();
    }
  }

  if (keyList.length > index + 1) {
    return new ContinueResponse(`${teacher} form created`, index)
  } else {
    setProgramState(4);
    return new SuccessResponse(`Teacher forms created. Forms created: ${index + 1}.`)
  }

}

function createTeacherFormsFolder() {
  let projectFolder
  try {
    projectFolder = getProjectFolder();
  } catch (e) {
    return handleException(e, FolderNotFoundException)
  }
   
  let teacherFormsFolder = projectFolder.createFolder("Teacher Forms");
  setTeacherFormsFolderId(teacherFormsFolder.getId())
  return teacherFormsFolder;
}

