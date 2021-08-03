/**
AUTHOR: Sander Schulhoff
DATE: Feb, 7th, 2020
Copyright (C) 2020 Sander Schulhoff <sanderschulhoff@gmail.com>
LICENSE: DO NOT distribute without proprietary operators permission
DESCRIPTION: Main method (Step5) Oh mighty algorithm what WILL you decide -- looks at student data and teacher data 

Flow:

**/


class Node {
  constructor(studentName, t1Name, t2Name, score, studentPreference) {
    this.next = null;
    this.studentName = studentName;
    this.t1Name = t1Name
    this.t2Name = t2Name;
    this.score = score;
    this.studentPreference = studentPreference;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  isEmpty() {
    if (this.head == null) {
      return true;
    }
  }

  push(node) {
    if (this.head == null) {
      this.head = node;
      return;
    }
    // set current to last node in list
    let current = this.head;
    while (current.next != null) {
      current = current.next;
    }
    current.next = node;
  }

  pop() {
    if (this.head == null) { return; }
    let highestScore = this.head.score;
    let beforeHighest = null;
    let beforeCurrent = this.head;
    let current = this.head.next;

    while (current != null) {
      if (current.score > highestScore) {
        highestScore = current.score;
        beforeHighest = beforeCurrent;
      }
      beforeCurrent = current;
      current = current.next;

    }

    let highestNode;
    if (beforeHighest == null) {
      highestNode = this.head;
    } else {
      highestNode = beforeHighest.next;
    }

    if (beforeHighest == null) {
      this.head = this.head.next;
    } else {
      beforeHighest.next = beforeHighest.next.next;
    }

    return highestNode;
  }
}


function runAlgorithm() {
  //get student data
  let studentData = getStudentData();
  if (isResponse(studentData)) {
    return studentData;
  }
  //get teachers scoring of students
  let teacherDataDict = getTeacherDataDict();

  /**
   * CREATE unordered linked list
   */

  //linked list
  let nodeList = new LinkedList();
  for (var r = 1; r < studentData.length; r++) {
    //where the student name is stored
    let student = studentData[r][2];
    for (var c = 3; c < studentData[0].length; c += 2) {
      //String names
      let teacher1Name = studentData[r][c];
      let teacher2Name = studentData[r][c + 1];
      //-3 because getting rid of first 3 non-data columns -- is how many pairs there are total
      let pairTotalNum = (studentData[0].length - 3) / 2
      let score = 0;
      // if there is an other
      if (teacher1Name == getOtherName() || teacher2Name == getOtherName()) {
        if (teacher1Name == teacher2Name) {
          // if both other
          score = 10 * 10;
        } else {
          //if first teacher is other
          if (teacher1Name == getOtherName()) {
            score = 10 * parseInt(teacherDataDict[teacher2Name][student])
            if (parseInt(teacherDataDict[teacher2Name][student]) == 0) {
              score = 0;
            }
          }
          //if second teacher is other
          else {
            score = 10 * parseInt(teacherDataDict[teacher1Name][student])
            if (parseInt(teacherDataDict[teacher1Name][student]) == 0) {
              score = 0;
            }
          }
        }
      }
      // both options are teacher names
      else {
        //both teachers are the same
        if (teacher1Name == teacher2Name) {
          score = parseInt(teacherDataDict[teacher1Name][student]) * parseInt(teacherDataDict[teacher1Name][getNameOfSecondInstanceOfStudent(currentStudent)])
          if (parseInt(teacherDataDict[teacher1Name][student]) == 0 || parseInt(teacherDataDict[teacher1Name][getNameOfSecondInstanceOfStudent(currentStudent)]) == 0) {
            score = 0;
          }
        }
        //both teachers are different
        else {
          score = parseInt(teacherDataDict[teacher1Name][student]) * parseInt(teacherDataDict[teacher2Name][student])
          if (parseInt(teacherDataDict[teacher1Name][student]) == 0 || parseInt(teacherDataDict[teacher2Name][student]) == 0) {
            score = 0;
          }
        }
      }
       
      if (score != 0) {
        score *= (pairTotalNum - (c - 3) / 2)
        // apply bonuses
        let bonus = Math.max(getBonus(studentData, r, teacher1Name), getBonus(studentData, r, teacher2Name));
        if (bonus > 0) {
          score *= 2
        }
      }

      let node = new Node(student, teacher1Name, teacher2Name, score, (c - 3) / 2);
      nodeList.push(node);
    }
  }
  /** GO THROUGH LL */
  let studentsWithPair = 0;

  let teacherToStudents = {};
  //maps from student name to array of 2 teacher recommenders
  let studentToTeachers = {};
  //maps from student, teacher1, teacher2 to teacher1, 2 rank
  let groupToTeachersRank = {};

  let teachers = getTeacherNames();
  // set up storage array
  for (var teacher of teachers) {
    teacherToStudents[teacher] = [];
  }
  teacherToStudents[getOtherName()] = [];

  let teacherLimits = getTeacherLimits()

  while (nodeList.isEmpty()) {
    let node = nodeList.pop();
    if (typeof groupToTeachersRank[node.studentName + node.t1Name + node.t2Name] == "undefined") {
      if (studentToTeachers[node.studentName] == null && node.score > 0) {
        if (teacherLimits[node.t1Name] > 0 && teacherLimits[node.t2Name] > 0) {
          teacherToStudents[node.t1Name].push(node.studentName);
          teacherToStudents[node.t2Name].push(node.studentName);
          studentToTeachers[node.studentName] = [node.t1Name, node.t2Name]
          groupToTeachersRank[node.studentName + node.t1Name + node.t2Name] = node.studentPreference + 1;
          teacherLimits[node.t1Name]--;
          teacherLimits[node.t2Name]--;
          studentsWithPair++;
        }
      }
    }
  }
  let studentN = getStudentNames();
  let studentK = Object.keys(studentToTeachers);
  if (studentsWithPair < studentN.length) {
    for (var item of studentN) {
      if (!studentK.includes(item)) {
        console.log(item);
      }
    }
    for (r = 1; r < studentData.length; r++) {
      //where the student name is stored
      let studentName = studentData[r][2];
      if (typeof studentToTeachers[studentName] == "undefined") {
        let teacherList = []
        for (c = 3; c < studentData[0].length; c += 2) {
          if (teacherList.length == 2) {
            break
          }
          let teacher1Name = studentData[r][c];
          let teacher2Name = studentData[r][c + 1];
          if (teacherLimits[teacher1Name] > 0 && teacherDataDict[teacher1Name][studentName] > 0) {
            teacherList.push(teacher1Name)
          } else {
            if (teacherLimits[teacher2Name] > 0 && teacherDataDict[teacher2Name][studentName] > 0) {
              teacherList.push(teacher2Name)
            }
          }
        }
        if (teacherList.length == 2) {
          let t1Name = teacherList[0]
          let t2Name = teacherList[1]
          teacherToStudents[t1Name].push(studentName);
          teacherToStudents[t2Name].push(studentName);
          studentToTeachers[studentName] = [t1Name, t2Name]
          groupToTeachersRank[studentName + t1Name + t2Name] = -1;
          teacherLimits[t1Name]--;
          teacherLimits[t2Name]--;
          studentsWithPair++;
        }
      }


    }
  }
  generateSheets(studentToTeachers, teacherToStudents, groupToTeachersRank);
}

function getBonus(studentData, r, teacher){
  let count = 0;
  for (var c = 3; c < studentData[0].length; c += 2) {
      //String names
      let teacher1Name = studentData[r][c];
      let teacher2Name = studentData[r][c + 1];
      if (teacher1Name == teacher || teacher2Name == teacher){
        count++;
      }
    }
    if (count >= 3){
      return 1;
    }
    return 0;
}


function getTeacherDataDict() {
  let tFF;
  try {
    tFF = getTeacherFormsFolder();
  } catch (e) {
    return handleException(e, FolderNotFoundException);
  }
  //iterator object
  let teachers = getTeacherNames();
  if (isResponse(teachers)) {
    return teachers;
  }

  //Create dict object from teacher names and their individual data
  let teacherToData = {};

  for (var teacher of teachers) {
    let formName = getTeacherFormName(teacher);
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
        teacherToData[teacher] = teacherData;
      }
    }
  }
  return teacherToData;
}

/**generates final sheets in main SS with all the info - within this are 2 sheets - one with students and their two teachers and another with teachers and their lists of students**/
function generateSheets(studentToTeachers, teacherToStudents, groupToTeachersRank) {
  let teacherSheet = createSheet("Teacher Results");
  let studentSheet = createSheet("Student Results");
  setFinalStudentSheetId(studentSheet.getSheetId())
  setFinalTeacherSheetId(teacherSheet.getSheetId())

  var col = 1;
  let ranks = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  let nonRank = 0;
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
    
    if (rank == -1){
      nonRank++;
      studentSheet.getRange(1, col).setBackground("white");
    }else{
      ranks[rank-1]++;
      studentSheet.getRange(1, col).setBackground(colors[rank-1]);
    }

    col += 1;
  }

  for (var x = 0; x < getAmountOfTeacherPairs(); x++){
    studentSheet.getRange(5+x, 1).setBackground(colors[x]);
    studentSheet.getRange(5+x, 1).setValue(ranks[x])
  }

  studentSheet.getRange(5+x, 1).setValue("No rank: " + nonRank)

  col = 1;
  var row = 1;
  for (var teacher in teacherToStudents) {
    if (teacherToStudents[teacher].length > 0) {
      let students = teacherToStudents[teacher];
      teacherSheet.getRange(row, col).setValue(teacher);
      row += 1;
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
    return handleException(e, FolderNotFoundException);
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
