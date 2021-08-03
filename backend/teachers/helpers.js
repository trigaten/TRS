//Does not say if emails actually exist or not
//throws a String describing the problem if there is one
function validateTeacherEmailSection(teacherNameCol, teacherEmailColVals, emailList, startIndex) {
    const errorIndex = startIndex + 1;
    //make sure the data is balanced correctly
    for (var x = 0; x < teacherNameCol.length; x++) {
        //if there is nothing on this row
        if (teacherNameCol[x] == "") {
            if (teacherEmailColVals[x] == "") {
                    continue;
            }
        }
        if (teacherNameCol[x] == "" || teacherEmailColVals[x] == "") {
            throw new UnevenDataException("You have uneven data on line " + errorIndex);
        }
    }
    //validate emails
    for (x = 0; x < emailList.length; x++) {
        if (!validateEmail(emailList[x])) {
            throw new InvalidEmailException("Invalid email on line " + x + errorIndex);
        }
    }
}

function getTeacherEmails() {
    let teacherSheet;
    try {
        teacherSheet = getTeacherSheet();
    } catch (e) {
        return handleException(e, SheetNotFoundException);
    }
    //index at which names start
    const startIndex = 5
    
    var teacherNameCol = teacherSheet.getRange("A1:A").getValues().slice(startIndex);
    var teacherEmailColVals = teacherSheet.getRange("B1:B").getValues().slice(startIndex);
    // reduce dimensionality
    for (var x = 0; x < teacherNameCol.length; x++) {
        teacherNameCol[x] = teacherNameCol[x][0];
        teacherEmailColVals[x] = teacherEmailColVals[x][0];
    }
    var emailList = teacherEmailColVals.filter(String);
    try {
        validateTeacherEmailSection(teacherNameCol, teacherEmailColVals, emailList, startIndex);
    } catch (e) {
        return new FailureResponse(e.message);
    }
    
    return emailList;
}

function getTeacherNames() {
    let teacherSheet;
    try {
        teacherSheet = getTeacherSheet();
    } catch (e) {
        return handleException(e, SheetNotFoundException)
    }
    //index at which names start
    const startIndex = 5
    //determines length of column where teacher names are stored

    var teacherNameCol = teacherSheet.getRange("A1:A").getValues().slice(startIndex);
    var teacherEmailColVals = teacherSheet.getRange("B1:B").getValues().slice(startIndex);
    // reduce dimensionality
    for (var x = 0; x < teacherNameCol.length; x++) {
        teacherNameCol[x] = teacherNameCol[x][0];
        teacherEmailColVals[x] = teacherEmailColVals[x][0];
    }
    var nameList = teacherNameCol.filter(String);

    return nameList;
}

function teacherFormCreated(name){
    let tFF;
    try{
         tFF = getTeacherFormsFolder();
    }catch(e){
        return false;
    }
    
    let files = tFF.getFilesByName(getTeacherFormName(name))
    if (files.hasNext()){
        return true;
    }
    return false;
}