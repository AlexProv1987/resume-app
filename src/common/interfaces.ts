export interface User {
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
};

export interface ContactMethod{
  contact_type:string,
  order:number,
  value:string,
}

export interface Social{
  platform:string,
  url:string,
  order:number,
}

export interface ApplicantRecord {
  id:string,
  accepting_work: string,
  applicant_bio: string,
  banner_img: string,
  applicant_photo: string,
  user_reltn: User,
  contact_method:ContactMethod[],
  social:Social[],
};
