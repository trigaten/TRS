
/**
 * @returns the state of this program
 */
function getProgramState() {
  //try to get state from scriptProperties
  try {
    let scriptProperties = PropertiesService.getDocumentProperties();
    let strState = scriptProperties.getProperty(PROGRAMSTATEKEY);
    if (strState == null) {
      return 0;
    }
    let programState = parseInt(strState);
    return programState;
  } catch (e) {
    return 0;
  }
}

function incrementProgramState() {
  let scriptProperties = PropertiesService.getDocumentProperties();
  scriptProperties.setProperty(PROGRAMSTATEKEY, parseInt(getProgramState()) + 1);
}

function setProgramState(state) {
  let scriptProperties = PropertiesService.getDocumentProperties();
  scriptProperties.setProperty(PROGRAMSTATEKEY, state);
  setNextStep(state);
}

function getLogStep() {
  let scriptProperties = PropertiesService.getDocumentProperties();
  let strStep = scriptProperties.getProperty(LOGSTEPKEY)
  if (strStep == null) {
    throw "Problem with log step."
  }
  return parseInt(strStep);
}

function setLogStep(ls) {
  let scriptProperties = PropertiesService.getDocumentProperties();
  scriptProperties.setProperty(LOGSTEPKEY, ls);
}

function incrementLogStep() {
  let scriptProperties = PropertiesService.getDocumentProperties();
  scriptProperties.setProperty(LOGSTEPKEY, getLogStep() + 1);
}

function getProjectTitle() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getName();
}
