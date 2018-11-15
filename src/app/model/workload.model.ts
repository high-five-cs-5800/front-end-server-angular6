export class Workloads {
  id: string;
  cast_type: number; 
  case_purpose: string;
  subject: string;
  product_line: string;
  archive: boolean;
  contacts: Contacts;
  keywordss: Keywords;

}

export class Contacts{
  First: string;
  Last: string;
  email: string;
  company: string;
  phone_number: string;
  id: string;
  workloadId: string;
}

export class Keywords {
  word: string;
  id: string;
  workloadId: string;
}

