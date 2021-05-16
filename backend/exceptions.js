// different server-side exceptions which can be thrown
class groupException extends Error {
    constructor(message) {
      super(message); 
      this.name = "groupException"; 
    }
}

class noDataException extends Error {
    constructor(message) {
      super(message); 
      this.name = "noDataExcepction"; 
    }
}

class unevenDataException extends Error {
    constructor(message) {
      super(message); 
      this.name = "unevenDataException"; 
    }
}

class invalidEmailException extends Error {
    constructor(message) {
      super(message); 
      this.name = "invalidEmailException"; 
    }
}

class formatTypeException extends Error {
    constructor(message) {
      super(message); 
      this.name = "formatTypeException"; 
    }
}


class formNotFoundException extends Error {
    constructor(message) {
      super(message); 
      this.name = "formNotFoundException"; 
    }
}

class sheetNotFoundException extends Error {
    constructor(message) {
      super(message); 
      this.name = "sheetNotFoundException"; 
    }
}

class fileNotFoundException extends Error {
  constructor(message) {
    super(message); 
    this.name = "fileNotFoundException"; 
  }
}

class folderNotFoundException extends Error {
  constructor(message) {
    super(message);
    this.name = "folderNotFoundException"; 
  }
}

class unknownException extends Error {
    constructor(message) {
      super(message); 
      this.name = "unknownException"; 
    }
}

class UnauthorizedUserException extends Error {
  constructor(email) {
    super(`Unauthorized user: ${email}. Please contact TRS at teacherrecsystem@gmail.com.`); 
    this.name = "unauthorizedUserException"; 
  }
}


/**
 * Attempts to handle error used passed exception type
 * @param {Exception} e - exception to handle
 * @param {exceptionType} exceptionType - type of exception to try to handle
 * @param {String} msg - optional FailureResponse message param
 */
function handleException(e, exceptionType, msg=null){
  if (e instanceof exceptionType){
    if (msg == null){
      return new FailureResponse(e.message);
    }else{
      return new FailureResponse(msg);
    }
  }
  throw e;
}
