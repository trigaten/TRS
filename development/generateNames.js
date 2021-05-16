function generateStudentNames(n=100){
    let ss = SpreadsheetApp.openById("1MWs3A0F4_fOXAiTz92NAJTekVuh5KQl_46cuBaqDXZM");
    let namesSheet = ss.getSheetByName("Names")
    let studentNames = flatten(namesSheet.getRange(1, 1, 1000).getValues());
    return studentNames.slice(0, n);
}

function generateTeacherNamesFirst(n=100){
    let ss = SpreadsheetApp.openById("1MWs3A0F4_fOXAiTz92NAJTekVuh5KQl_46cuBaqDXZM");
    let namesSheet = ss.getSheetByName("Names")
    let teacherNames = flatten(namesSheet.getRange(1, 2, 1000).getValues());
    return teacherNames.slice(0, n);
}

function generateTeacherNamesFirstLast(n=100){
    let ss = SpreadsheetApp.openById("1MWs3A0F4_fOXAiTz92NAJTekVuh5KQl_46cuBaqDXZM");
    let namesSheet = ss.getSheetByName("Names")
    let teacherNames = flatten(namesSheet.getRange(1, 2, 1000).getValues());
    let lastNames = flatten(namesSheet.getRange(1, 3, 1000).getValues());
    for (var x = 0; x < n; x++){
      teacherNames[x]+= " " + lastNames[x];
    }

    return teacherNames.slice(0, n);
}

function generateEmails(names){
  let emails = [];
  for (var name of names){
    emails.push(trim(name.splice(0, 7)) + Math.floor(Math.random() * 10) + "@ellisberg.org")
  }
  return emails;
}

function flatten(arrayOfArrays){
  return [].concat.apply([], arrayOfArrays);
}

function answerStudentForms(){
  let studentNames = getStudentNames();
  
}


