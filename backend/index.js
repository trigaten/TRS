
// function onOpen() {
//     SpreadsheetApp.getUi().createMenu('TRS')
//         .addItem('Show sidebar', 'showSidebar')
//         .addItem('resetState', 'resetState')
//         .addItem('seeState', 'seeState')
//         .addItem('incrementProgramState', 'incrementProgramState')
//         .addItem('resetSheets', 'resetSheets')
//         .addToUi();
// }

function showSidebar() {    
    var state = getProgramState();
    
    var HTMLFile = "";
    switch (state) {
        case 0: HTMLFile = "setup"
            break;
        case 1: HTMLFile = "main"
            break;
        default: HTMLFile = "main"
    }

    SpreadsheetApp.getUi().showSidebar(
        HtmlService.createTemplateFromFile("frontend/" + HTMLFile).evaluate()
            .setTitle('Teacher Recommender System'));
}

function onInstall() {
    onOpen();
}

function onOpen() {
    var ui = SpreadsheetApp.getUi();
    var menu = ui.createAddonMenu();
    menu
        .addItem('Open TRS', 'showSidebar')
        .addToUi();

}