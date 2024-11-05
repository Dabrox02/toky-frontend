export interface Message {
  contentType: string[];
  subject: string;
  from: string;
  date: Date;
  body: string;
}
