// different server-side exceptions which can be thrown
class GroupException extends Error {
    constructor(message) {
      super(message); 
      this.name = "GroupException"; 
    }
}

//TODO use
class NoDataException extends Error {
    constructor(message) {
      super(message); 
      this.name = "noDataExcepction"; 
    }
}

class UnevenDataException extends Error {
    constructor(message) {
      super(message); 
      this.name = "UnevenDataException"; 
    }
}

class InvalidEmailException extends Error {
    constructor(message) {
      super(message); 
      this.name = "InvalidEmailException"; 
    }
}

class FormatTypeException extends Error {
    constructor(message) {
      super(message); 
      this.name = "FormatTypeException"; 
    }
}

class FormNotFoundException extends Error {
    constructor(message) {
      super(message); 
      this.name = "FormNotFoundException"; 
    }
}

class SheetNotFoundException extends Error {
    constructor(message) {
      super(message); 
      this.name = "SheetNotFoundException"; 
    }
}

class FileNotFoundException extends Error {
  constructor(message) {
    super(message); 
    this.name = "FileNotFoundException"; 
  }
}

class FolderNotFoundException extends Error {
  constructor(message) {
    super(message);
    this.name = "FolderNotFoundException"; 
  }
}

class EmailNotFoundException extends Error {
  constructor(message) {
    super(message);
    this.name = "EmailNotFoundException"; 
  }
}

class UnknownException extends Error {
    constructor(message) {
      super(message); 
      this.name = "UnknownException"; 
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
