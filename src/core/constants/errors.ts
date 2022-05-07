import { ApolloError } from 'apollo-server-express';
import { ERROR_MESSAGE, ERROR_CODE } from './errorMessage';

export class InvalidInputError extends ApolloError {
  constructor(errorData: any) {
    super(ERROR_MESSAGE.INVALID_INPUT_ERROR, ERROR_CODE.INVALID_INPUT_ERROR);

    Object.defineProperty(this, 'name', { value: errorData });
  }
}

export class InvalidEmailError extends ApolloError {
  constructor(errorData: any) {
    super(ERROR_MESSAGE.INVALID_INPUT_EMAIL_ERROR, ERROR_CODE.INVALID_INPUT_EMAIL_ERROR);

    Object.defineProperty(this, 'name', { value: errorData });
  }
}

export class InvalidUidError extends ApolloError {
    constructor(errorData: any) {
      super(ERROR_MESSAGE.INVALID_INPUT_EMAIL_ERROR, ERROR_CODE.INVALID_INPUT_EMAIL_ERROR);
  
      Object.defineProperty(this, 'name', { value: errorData });
    }
  }
  

export class HttpStatus extends ApolloError {
  constructor(errorData: any) {
    super(ERROR_MESSAGE.HTTP_STATUS_ERROR, ERROR_CODE.HTTP_STATUS_ERROR);

    Object.defineProperty(this, 'name', { value: errorData });
  }
}

export class InvalidRoleError extends ApolloError {
  constructor(errorData: any) {
    super(ERROR_MESSAGE.ROLE_ERROR, ERROR_CODE.ROLE_ERROR);

    Object.defineProperty(this, 'name', { value: errorData });
  }
}

