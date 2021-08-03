/**
 * Creates the form for the students to fill out
**/
function createStudentForm(amountOfPairs=2) {
    try {
        validateCurrentUser()
    } catch (e) {
        return handleException(e, UnauthorizedUserException)
    }
    //get Spreadsheet
    var spreadSheet = SpreadsheetApp.getActive();
    //creates form
    var form = FormApp.create("Teacher Recommender Form" + new Date().getFullYear());
    //save form id
    setStudentFormId(form.getId())

    //sets data destination of form
    form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadSheet.getId());
    if (!doesTriggerExist('updateStudentsDoneList')) {
        ScriptApp.newTrigger('updateStudentsDoneList')
            .forForm(form)
            .onFormSubmit()
            .create();
    }

    var sheets = spreadSheet.getSheets();
    if (sheets.length > 0) {
        //name the sheet
        var formDestinationSheet = sheets[0];
        //in case there is already a sheet with this name
        try {
            formDestinationSheet.setName("Student Data");
            setStudentDataSheetId(formDestinationSheet.getSheetId());
        }
        catch (e) {
            return new FailureResponse("I couldn't rename the Student Data sheet.");
        }
    } else {
        return new FailureResponse("There are no sheets in this project.")
    }

    //changes location of form to project folder
    let folder;
    try {
        folder = getProjectFolder();
    } catch (e) {
        return handleException(e, FolderNotFoundException);
    }
    var formId = form.getId();
    var file = DriveApp.getFileById(formId);
    folder.addFile(file);
    DriveApp.getRootFolder().removeFile(file);

    //setting title and description
    form.setTitle('Teacher Recommender Selection')
        .setDescription(getStudentFormDescription())
        .setConfirmationMessage('Thanks for responding!')
        .setAllowResponseEdits(true)
        .setCollectEmail(true);
    form.setLimitOneResponsePerUser(true);
    form.setProgressBar(true);

    //creates the questions on form
    const dashes = "----------------------------------\n"

    // single line text field for student name
    var item = "Please put the name teachers know you by";
    form.addTextItem()
        .setTitle(item)
        .setRequired(true);

    //gets all the teacher names
    var choices = getTeacherNames();
    if (isResponse(choices)){
        return choices;
    }
    //appends an "other" option
    choices.push(getOtherName());

    for (var x = 1; x <= amountOfPairs; x++) {
        item = dashes + "#" + x + " Teacher pair: Teacher A";
        form.addListItem()
            .setTitle(item)
            .setChoiceValues(choices)
            .setRequired(true);
        item = "#" + x + " Teacher pair: Teacher B";
        form.addListItem()
            .setTitle(item)
            .setChoiceValues(choices)
            .setRequired(true);
    }

    setAmountOfTeacherPairs(amountOfPairs);

    setProgramState(2);
    orderSheets();
    return new SuccessResponse(`Student form created with ${choices.length} teacher option${s(choices.length)}.`)
}

