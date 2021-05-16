function doStudentResponses(){
    let names = generateStudentNames(39);
    // let emails = getStudentEmails();
    let form = getStudentForm();
    form.setCollectEmail(false)
    form.setLimitOneResponsePerUser(false);
    for (var name of names){
        let response = form.createResponse();
        let items = form.getItems();
        let nameItem = items[0];
        let nameItemResponse = nameItem.asTextItem().createResponse(name)
        response.withItemResponse(nameItemResponse);

        for (var x = 1; x < items.length; x++){
          let item = items[x];
          let choices = item.asListItem().getChoices()
          let choice = choices[Math.floor(Math.random() * choices.length)];
          let itemResponse = item.asListItem().createResponse(choice.getValue());
          response.withItemResponse(itemResponse)
        }
        response.submit();
    }
}


function doTeacherResponses() {
  let teachers = getTeacherNames();
  let tFF = getTeacherFormsFolder();
  for (var x = 0; x < teachers.length; x++) {
    let formName = getTeacherFormName(teachers[x]);
    if (tFF.getFilesByName(formName).hasNext()) {
      //since only one form by that name, just take the .next() of the iterator object
      let file = tFF.getFilesByName(formName).next();
      let form = FormApp.openById(file.getId());
      form.setCollectEmail(false)
      let response = form.createResponse();
      let items = form.getItems();
      let numItem = items[0];
      let numItemReponse = numItem.asTextItem().createResponse(Math.floor(Math.random() * 44));
      response.withItemResponse(numItemReponse);
      for (var y = 1; y < items.length; y++){
        let item = items[y];
        let itemReponse = item.asScaleItem().createResponse(Math.floor(Math.random() * 11));
        response.withItemResponse(itemReponse);
      }
      response.submit();
    }
  }
}
