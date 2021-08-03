
function surveysCreated(){
  let scriptProperties = PropertiesService.getDocumentProperties();
    let sc = scriptProperties.getProperty(SURVEYSCREATED);
    if (sc == "true"){
      return true;
    }
    return false;
  }
  
  function surveysSent(){
    let scriptProperties = PropertiesService.getDocumentProperties();
    let sc = scriptProperties.getProperty(SURVEYSSENT);
    if (sc == "true"){
      return true;
    }
    return false;
  }
  
  function resultsSent(){
    let scriptProperties = PropertiesService.getDocumentProperties();
    let sc = scriptProperties.getProperty(RESULTSSENT);
    if (sc == "true"){
      return true;
    }
    return false;
  }
  
  function setSurveysCreated(){
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(SURVEYSCREATED, "true");
  }
  
  function setSurveysSent(){
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(SURVEYSSENT, "true");
  }
  
  function setResultsSent(){
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(RESULTSSENT, "true");
  }
  
  function resetSurveysCreated(){
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(SURVEYSCREATED, "false");
  }
  
  function resetSurveysSent(){
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(SURVEYSSENT, "false");
  }
  
  function resetResultsSent(){
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(RESULTSSENT, "false");
  }
  
  function setStudentSurveyId(id){
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(STUDENTSURVEYID, id);
  }
  
  function setTeacherSurveyId(id){
    let scriptProperties = PropertiesService.getDocumentProperties();
    scriptProperties.setProperty(TEACHERSURVEYID, id);
  }
  
  function getStudentSurveyPublishedLink(){
    try {
      let form = getStudentSurvey();
      return form.getPublishedUrl();
    } catch (e) {
      return handleException(e, FormNotFoundException);
    }
 }
  
  function getTeacherSurveyPublishedLink(){
    try {
      let form = getTeacherSurvey();
      return form.getPublishedUrl();
    } catch (e) {
      return handleException(e, FormNotFoundException);
    }
  }
  
  function getStudentSurvey(){
    let scriptProperties = PropertiesService.getDocumentProperties();
    try {
      return FormApp.openById(scriptProperties.getProperty(STUDENTSURVEYID));
    } catch (error) {
      throw new FormNotFoundException("Student survey not found.")
    }
  }
  
  function getTeacherSurvey(){
    let scriptProperties = PropertiesService.getDocumentProperties();
    try {
      return FormApp.openById(scriptProperties.getProperty(TEACHERSURVEYID));
    } catch (error) {
      throw new FormNotFoundException("Teacher survey not found.")
    }
  }