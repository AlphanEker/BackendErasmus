import express from "express";

//USER ENUMS
export type Request_user_create = {
  name: string;
  email: string;
  password: string;
  id: number;
};

export type Reply_user_create = {
  id: number;
};

export type Request_user_get = {
  token: number;
};

export type Reply_user_get = {
  name: string;
  email: string;
  creationDate: string;
  role: string;
  isEmailConfirmed: boolean;
  id: number;
};

//DB ENTITIES
export type SelectQueryArgs = {
  count_rows?: boolean;
  row_offset?: number;
  row_count?: number;
};

export type Table_user = {};

export type Table_email = {};

export type Table_equ_req = {};

//Email
export type Request_email_create = {
  lst: string[]; //who to send the email to
  cc: string;
  content: string;
};

export type File_get_response = {
  fileName: string[];
};
/**
  name: string;
  email: string;
  creationDate: string;
  role: string; 
  isEmailConfirmed: boolean;
  id: number;
  password: string;

  uploadedForms: []file;
  

 */
/**
 * allFiles: []file;
 */
