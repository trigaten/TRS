/**
AUTHOR: Sander Schulhoff
DATE: Feb, 7th, 2020
Copyright (C) 2020 Sander Schulhoff <sanderschulhoff@gmail.com>
LICENSE: DO NOT distribute without proprietary operators permission
DESCRIPTION: Main method (Step5) Oh mighty algorithm what WILL you decide -- looks at student data and teacher data 

Flow:

**/

function runAlgorithm(repeatTeacherBonus = false) {
  try {
    validateCurrentUser()
  } catch (e) {
    return handleException(e, UnauthorizedUserException)
  }
  if (testForRepeatedNames()) {
    return new FailureResponse("There is a repeated student name. Please fix this.")
  }
  //maps from student name to array of 2 teacher recommenders
  let studentToTeachers = {};
  //maps from teacher name to the teacher's students
  let teacherToStudents = {};
  //maps from student, teacher1, teacher2 to teacher1, 2 rank
  let groupToTeachersRank = {};
  let teachers = getTeacherNames();
  if (isResponse(teachers)) {
    return teachers;
  }
  for (var index in teachers) {
    let teacher = teachers[index];
    teacherToStudents[teacher] = [];
  }
  teacherToStudents[getOtherName()] = [];
  //maps from teacher name to how many more students they can take
  let teacherLimits = getTeacherLimits();
  //maps from [r, c] pair to score 
  let scores = new Map();

  //dictionary of dictionaries
  //teacherData[SOMETEACHERNAME] gives a dictionary of student names to that teacher's score of the student
  let teacherData = getTeacherDataDict();
  if (isResponse(teacherData)) {
    return teacherData;
  }
  let studentData = getStudentData();
  if (isResponse(studentData)) {
    return studentData;
  }
  for (var r = 1; r < studentData.length; r++) {
    //where the student name is stored
    let currentStudent = studentData[r][2];
    for (var c = 3; c < studentData[0].length; c += 2) {

      let position = [r, c];
      //String names
      let teacher1Name = studentData[r][c];
      let teacher2Name = studentData[r][c + 1];
      if (groupToTeachersRank[currentStudent + teacher1Name + teacher2Name] == null) {
        groupToTeachersRank[currentStudent + teacher1Name + teacher2Name] = (c - 1) / 2;
      }
      let teacher1 = teacherData[teacher1Name];
      let teacher2 = teacherData[teacher2Name];
      //-3 because getting rid of first 3 non-data columns -- is how many pairs there are total
      let pairTotalNum = (studentData[0].length - 3) / 2
      let score = 0;
      //IF there is a double usage of a teacher
      if (teacher1Name == teacher2Name) {
        //if both are other
        if (teacher1Name == getOtherName()) {
          score = 20 * (pairTotalNum - (c - 3) / 2);
        } else {
          //same teacher so
          var Trank1 = teacher1[getNameOfSecondInstanceOfStudent(currentStudent)];
          var Trank2 = teacher1[currentStudent];
          //(pairTotalNum - (c-3)/2) gives essentially the opposite of position -- so if the location is the 4th pair choice it will be 2 bc 6-4=2
          score = Trank1 * Trank2 * (pairTotalNum - (c - 3) / 2);
        }
      } else {
        //if teachers are different
        try {
          Trank1 = teacher1[currentStudent];
        } catch (e) {
          Trank1 = 10
        }
        try {
          Trank2 = teacher2[currentStudent];
        } catch (e) {
          Trank2 = 10
        }
        if (teacher1Name == getOtherName()) {
          //(pairTotalNum - (c-3)/2) gives essentially the opposite of position -- so if the location is the 4th pair choice it will be 2 bc 6-4=2
          score = Trank2 * Trank2 * (pairTotalNum - (c - 3) / 2);
        } else if (teacher2Name == getOtherName()) {
          //since second is other, double count first
          score = 10 * Trank1 * (pairTotalNum - (c - 3) / 2);
        } else {
          score = 10 * Trank2 * (pairTotalNum - (c - 3) / 2);
        }
      }
      if (repeatTeacherBonus){
        
      }
      scores.set(position, score);
    }
  }

  //while there are still items left in the array
  while (scores.size > 0) {
    //Looping continuously to find highest scores
    let maxScore = -1;
    //initialize to values outside domain/range of data array
    let maxPos = [-1, -1];
    scores.forEach((score, position) => {
      score = scores.get(position);
      if (score > maxScore) {
        maxScore = score;
        maxPos = position;
      }
    })

    //maxPos is a [r, c] array where r and c are ints so just take its first value to get row
    var row = maxPos[0];
    var column = maxPos[1];
    //col 2 is where student name is stored
    let student = studentData[row][2];
    //make sure student hasn't already been assigned any teachers
    if (studentToTeachers[student] == null) {
      let teacher1Name = studentData[row][column];
      let teacher2Name = studentData[row][column + 1];
      //if the student chose the same teacher for this pair
      if (teacher1Name == teacher2Name) {
        if (teacherLimits[teacher1Name] >= 2) {
          teacherLimits[teacher1Name] -= 2;
          studentToTeachers[student] = [teacher1Name, teacher1Name];
          teacherToStudents[teacher1Name].push(student);
          teacherToStudents[teacher2Name].push(student);
        }
      } else {
        if (teacherLimits[teacher1Name] >= 1 && teacherLimits[teacher2Name] >= 1) {
          teacherLimits[teacher1Name] -= 1;
          teacherLimits[teacher2Name] -= 1;
          studentToTeachers[student] = [teacher1Name, teacher2Name];
          teacherToStudents[teacher1Name].push(student);
          teacherToStudents[teacher2Name].push(student);
        }
      }
    }

    scores.delete(maxPos);
  }
  generateSheets(studentToTeachers, teacherToStudents, groupToTeachersRank);
  lockTeacherForms();
  setProgramState(6);
  orderSheets();
  return new SuccessResponse(`Student-teacher pairings made.`)
}

function getTeacherDataDict() {
  let tFF;
  try {
    tFF = getTeacherFormsFolder();
  } catch (e) {
    return handleException(e, folderNotFoundException);
  }
  //iterator object
  let teachers = getTeacherNames();
  if (isResponse(teachers)) {
    return teachers;
  }

  //Create dict object from teacher names and their individual data
  let teacherToData = {};

  for (var x = 0; x < teachers.length; x++) {
    let formName = getTeacherFormName(teachers[x]);
    if (tFF.getFilesByName(formName).hasNext()) {
      //since only one form by that name, just take the .next() of the iterator object
      let file = tFF.getFilesByName(formName).next();
      let form = FormApp.openById(file.getId());
      //Should only be one response
      let response = form.getResponses()[0];
      if (response != null) {
        let itemResponses = response.getItemResponses();
        let teacherData = {};
        //start at one so miss first how many students question
        for (var y = 1; y < itemResponses.length; y++) {
          let item = itemResponses[y];
          let name = item.getItem().getTitle();
          number = item.getResponse();
          teacherData[name] = number;
        }
        teacherToData[teachers[x]] = teacherData;
      }
    }
  }
  return teacherToData;
}

function applyRepeatTeacherBonus(){
  
}

/**generates final sheets in main SS with all the info - within this are 2 sheets - one with students and their two teachers and another with teachers and their lists of students**/
function generateSheets(studentToTeachers, teacherToStudents, groupToTeachersRank) {
  let teacherSheet = createSheet("Teacher Results");
  let studentSheet = createSheet("Student Results");
  setFinalStudentSheetId(studentSheet.getSheetId())
  setFinalTeacherSheetId(teacherSheet.getSheetId())

  var col = 1;
  let ranks = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  let colors = ["blue", "red", "green", "yellow", "pink", "purple", "orange", "aquamarine", "cadetblue"]
  for (var key in studentToTeachers) {
    //starts at 1,1 not 0,0
    studentSheet.getRange(1, col).setValue(key);
    var pair = studentToTeachers[key];
    //first teacher name
    studentSheet.getRange(2, col).setValue(pair[0]);
    //second teacher name
    studentSheet.getRange(3, col).setValue(pair[1]);
    var rank = groupToTeachersRank[key + pair[0] + pair[1]];
    
    ranks[rank-1]++;

    studentSheet.getRange(1, col).setBackground(colors[rank-1]);

    col += 1;
  }

  for (var x = 0; x < getAmountOfTeacherPairs(); x++){
    studentSheet.getRange(5+x, 1).setBackground(colors[x]);
    studentSheet.getRange(5+x, 1).setValue(ranks[x])
  }
  col = 1;
  var row = 1;
  for (var teacher in teacherToStudents) {
    if (teacherToStudents[teacher].length > 0) {
      let students = teacherToStudents[teacher];
      teacherSheet.getRange(row, col).setValue(teacher);
      row += 1;
      students = flipNames(students);
      students.sort();
      students = flipNames(students);
      for (key in students) {
        let student = students[key];
        teacherSheet.getRange(row, col).setValue(student);
        row += 1;
      }
      row = 1;
      col += 1;
    }
  }
}


function getTeacherLimits() {
  let teacherLimits = {};
  teacherLimits[getOtherName()] = 100000000;

  let tFF;
  try {
    tFF = getTeacherFormsFolder();
  } catch (e) {
    return handleException(e, folderNotFoundException);
  }

  //iterator object
  let files = tFF.getFiles();

  while (files.hasNext()) {
    let file = files.next();
    let form = FormApp.openById(file.getId());
    let name = file.toString();
    name = name.substring(0, name.length - 5);
    //first response bc only should be one
    let responses = form.getResponses();
    if (responses.length > 0) {
      //first item, which is how many students
      let howMany = responses[0].getItemResponses()[0].getResponse();
      teacherLimits[name] = howMany;
    } else {
      teacherLimits[name] = 0;
    }

  }
  return teacherLimits;
}

// function bumpTeacherDataDict(dataDict, upperLimit = 10) {

// }