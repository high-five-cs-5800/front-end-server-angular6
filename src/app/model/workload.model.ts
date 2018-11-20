
import { Contact } from "./contact.model";
import { Keyword } from "./keyword.model";

export class Workloads {
  id: string;
  case_type: number; 
  case_purpose: string;
  subject: string;
  product_line: string;
  archive: boolean;
  _contact_info: Contact[];
  _keywordList: Keyword[];
  case_request_detail: string;
  help_response_detail: string;
  userAccountId: string;  
}



