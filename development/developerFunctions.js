
function resetState() {
    scriptProperties.setProperty(PROGRAMSTATEKEY, 0);
}

function seeState() {
    showAlert(parseInt(scriptProperties.getProperty(PROGRAMSTATEKEY)))
}

function resetSheets() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheets = ss.getSheets();
    for (var i in sheets) {

        var sheetName = sheets[i].getName();
        if (sheetName != "Home Sheet"){
            var formUrl = sheets[i].getFormUrl();
            if (formUrl){
                FormApp.openByUrl(formUrl).removeDestination();
            }
            ss.deleteSheet(sheets[i]);
        }
    }
}

/** creates and returns a Google Sheet in folder of given Id with given name 
Actually just creates it then moves to folder
Returns the file
**/
function createGoogleSheet(folderId, name) {
    var sheet = SpreadsheetApp.create(name);
    var file = DriveApp.getFileById(sheet.getId());
    DriveApp.getFolderById(folderId).addFile(file); //SPECIFIC
    DriveApp.getRootFolder().removeFile(file);
    return file;
}