//Does not say if emails actually exist or not
//throws a String describing the problem if there is one
function validateStudentEmailSection(studentAddRemoveColVals, studentGroupIndivColVals, studentEmailColVals, addRemoveList, groupIndivList, emailList, startIndex){
    const errorIndex = startIndex + 1;
    //make sure the data is balanced correctly
    for (var x = 0; x < studentAddRemoveColVals.length; x++){
        //if there is nothing on this row
        if (studentAddRemoveColVals[x] == ""){
            if (studentGroupIndivColVals[x] == ""){
                if (studentEmailColVals[x] == ""){
                    continue;
                }
            }
        }
        if (studentAddRemoveColVals[x] == "" || studentGroupIndivColVals[x] == "" || studentEmailColVals[x] == ""){
            throw new unevenDataException("You have uneven data on line " + errorIndex);
        }
    }

    //validate data
    for (x = 0; x < groupIndivList.length; x++){
        if (!(groupIndivList[x] == "Individual" || groupIndivList[x] == "Group")){
            throw new formatTypeException("Must choose 'Individual' or 'Group' on line " + x + errorIndex); 
        }
        if (!(addRemoveList[x] == "Add" || addRemoveList[x] == "Remove")){
            throw new formatTypeException("Must choose 'Add' or 'Remove' on line " + x + errorIndex); 
        }
        if (!validateEmail(emailList[x])){
            throw new invalidEmailException("Invalid email on line " + x + errorIndex); 
        }
    }
}

function getStudentEmails(){
    var studentSheet = getStudentSheet();
    //index at which names start
    const startIndex = 5;
    const errorIndex = startIndex + 1;
    //determines length of column where teacher names are stored

    var studentAddRemoveColVals = studentSheet.getRange("A1:A").getValues().slice(startIndex);
    var studentGroupIndivColVals = studentSheet.getRange("B1:B").getValues().slice(startIndex);
    var studentEmailColVals = studentSheet.getRange("C1:C").getValues().slice(startIndex);
    for (var x = 0; x < studentAddRemoveColVals.length; x++){
        studentAddRemoveColVals[x] = studentAddRemoveColVals[x][0];
        studentGroupIndivColVals[x] = studentGroupIndivColVals[x][0];
        studentEmailColVals[x] = studentEmailColVals[x][0];
    }
    

    var addRemoveList = studentAddRemoveColVals.filter(String);
    var groupIndivList = studentGroupIndivColVals.filter(String);
    var emailList = studentEmailColVals.filter(String);

    validateStudentEmailSection(studentAddRemoveColVals, studentGroupIndivColVals, studentEmailColVals, addRemoveList, groupIndivList, emailList, startIndex);

    var additionEmailList = new Array();
    var removeEmailList = new Array();

    for (x = 0; x < addRemoveList.length; x++){
        if (groupIndivList[x] == "Individual"){
            if (addRemoveList[x] == "Add"){
                additionEmailList.push(emailList[x]);
            }else{
                removeEmailList.push(emailList[x]);
            }
        }else{
            try{
                var group = GroupsApp.getGroupByEmail(emailList[x])
                var tempEmails = new Array();
                for (var user of group.getUsers()){
                    tempEmails.push(user.getEmail());
                }
                if (addRemoveList[x] == "Add"){
                    additionEmailList = additionEmailList.concat(tempEmails);
                }else{
                    removeEmailList = removeEmailList.concat(tempEmails);
                }
            }catch(e){
                throw new groupException("Problem with group on line " + errorIndex); 
            }
        }
    }

    //do removals
    var finalEmailList = additionEmailList;
    for (x = 0; x < removeEmailList.length; x++){
      console.log(removeEmailList[x])
        let index = finalEmailList.indexOf(removeEmailList[x]);
        if (index >= 0){
            finalEmailList.splice(x, 1);
        }
    }
    console.log(finalEmailList)
    return finalEmailList;
}

