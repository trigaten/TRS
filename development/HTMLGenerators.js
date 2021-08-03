function genSettings() {
    let ret = "";
    let items = [{ name: "Project State", function: "ProgramState" },
        { name: "Main Project Folder", function: "ProjectFolderId" },
    { name: "Home Sheet", function: "HomeSheetId" },
    { name: "Student Sheet", function: "StudentSheetId" },
    { name: "Teacher Sheet", function: "TeacherSheetId" },
    { name: "Student Form", function: "StudentFormId" },
    { name: "Student Form Data Sheet", function: "StudentDataSheetId" },
    { name: "Teacher Forms Folder", function: "TeacherFormsFolderId" },
    { name: "Student Results Sheet", function: "FinalStudentSheetId" },
    { name: "Teacher Results Sheet", function: "FinalTeacherSheetId" }]

    for (var item of items) {
        ret += `
        <!-- ${item.name} -->
                <div class="input-field col s12">
                    <input placeholder="${item.name} Id" id="${item.function}" type="text" onchange="google.script.run.withFailureHandler(toastUnknownError).set${item.function}(document.getElementById('${item.function}').value)">
                    <label for="${item.function}">${item.name} Id</label>
                </div>
                <script>
                    google.script.run
                    .withSuccessHandler(display${item.function})
                    .withFailureHandler(toastUnknownError)
                    .get${item.function}();
                    function display${item.function}(id) {
                        document.getElementById("${item.function}").value = id;
                    }
                </script>`
    }
    console.log(ret)
}
// genSettings()

function responseGenerator() {
    let ret = ""
    let items = [{ function: "createSurveys", action: "create the student surveys", doneMsg: "Surveys Created" },
    { function: "sendSurveys", action: "send the student surveys", doneMsg: "Surveys Sent" },
    { function: "sendResults", action: "send the results to TRS", doneMsg: "Results Sent" }];

    for (var item of items) {
        ret += `
        function confirm${capitalizeFirstLetter(item.function)}() {
            confirmExecution(${item.function}, "Are you sure you would like to ${item.action}?");
        }
    
        function ${item.function}() {
            showProgressBar();
                google.script.run
                    .withSuccessHandler(handle${capitalizeFirstLetter(item.function)}Result)
                    .withFailureHandler(toastUnknownError)
                    .${item.function}();
        }
    
        function handle${capitalizeFirstLetter(item.function)}Result(result) {
            if (result == "success") {
                toastSuccessWithMsg("${item.doneMsg}")
            } else {
                toastKnownError(result);
            }
            hideProgressBar();
            doSettingsUpdate();
        }`
    }
    console.log(ret)
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function setterGetterGen(){
    let items = [{name: "Student Form Email Draft", function: "StudentFormEmailDraftId"}]
}