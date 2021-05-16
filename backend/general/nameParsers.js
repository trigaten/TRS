/**
 * @param name - 'lastname, firstname' format 
 * @returns a String in 'firstname lastname' format
 * Also gets rid of spaces on ends of inputs
 * For example, 
 * Input: 'Cena, John '
 * Output: 'John Cena'
**/
function parseNameLastFirst(name) {
    //strips whitespace from beginning and end of String
    let trimmedName = name.trim();
    //gets index of the comma
    let indexOfComma = trimmedName.indexOf(',');
    
    let lastName = trimmedName.substring(0, indexOfComma);
    //+2 because substring is inclusive for first index given and need to get past comma and space
    let firstName = trimmedName.substring(indexOfComma+2, trimmedName.length);
    
    return firstName + " " + lastName;
  }

/**takes 'lastname, firstname' format a returns 'firstname'**/
function getFirstName(name) {
  //strips whitespace from beginning and end of String
  let trimmedName = name.trim();
  //gets index of the comma
  let indexOfComma = trimmedName.indexOf(',');
  
  //+2 because substring is inclusive for first index given and need to get past comma and space
  let firstName = trimmedName.substring(indexOfComma+2, trimmedName.length);
  
  return firstName;
}

/**takes 'lastname firstname' format a returns 'firstname'**/
function getFirstNameSpace(name) {
  //strips whitespace from beginning and end of String
  let trimmedName = name.trim();
  let firstName = "";
  for (var i = 0; i < trimmedName.length; i++){
    if (name[i] == " "){
      break;
    }else{
      firstName+=name[i];
    }
  }
  return firstName;
}
