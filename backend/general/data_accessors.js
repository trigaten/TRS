
function getStudentNames() {
    let studentData;
    try{
        studentData = getStudentData();
    }catch(e){
        return handleException(e, sheetNotFoundException);
    }
    let names = [];
    for (var r = 1; r < studentData.length; r++) {
        names.push(studentData[r][2]);
    }
    return names;
}

function getStudentData() {
    let studentDataSheet
    try {
        studentDataSheet = getStudentDataSheet();
    } catch (e) {
        return handleException(e, sheetNotFoundException)
    }
    return studentDataSheet.getDataRange().getValues();
}

function getFinalStudentSheetData() {
    let sheet;
    try{
        sheet = getFinalStudentSheet();
    }catch(e){
        return handleException(e, sheetNotFoundException)
    }
    let lastRow = sheet.getLastRow();
    if (lastRow == 0){
        return [[]]
    }
    return sheet.getDataRange().getValues();
}

function getFinalTeacherSheetData() {
    let sheet;
    try{
        sheet = getFinalTeacherSheet();
    }catch(e){
        return handleException(e, sheetNotFoundException);
    }
    let lastRow = sheet.getLastRow();
    if (lastRow == 0){
        return [[]];
    }
    return sheet.getDataRange().getValues();
}

function getTeacherEmailFormat(){
    try {
        let teacherSheet = getTeacherSheet();
        let range = teacherSheet.getRange(5, 1);
        let values = range.getValues();
        return values[0][0];
    } catch (e) {
        return handleException(e, sheetNotFoundException);
    }
  }

function getStudentNameToEmailDict(){
    let studentForm;
    try{
        studentForm = getStudentForm();
    }catch(e){
        return handleException(e, formNotFoundException)
    }
    let dict = {};
    for (var response of studentForm.getResponses()){
        let itemResponses = response.getItemResponses();
        let name = itemResponses[0].getResponse()
        let email = response.getRespondentEmail();
        dict[name] = email;
    }
    console.log(dict)
    return dict;
}