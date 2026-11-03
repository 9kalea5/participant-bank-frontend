export interface Participant {
    id: number;
    name: string;
    bic: string;
    shortName: string;
    email: string;
    phoneNumber: string;
    status: string;
    logoPath: string | null;
}

export interface ParticipantResponse {
  status: string,
  message: string,
  institution: ParticipantInfo,
  success: string
}

export interface ParticipantInfo {
    createdBy: number,
    createdDate: string,
    modifiedBy: number | null,
    modifiedDate: string,
    id: number,
    name: string,
    bic: string,
    shortName: string,
    address: string,
    email: string,
    phoneNumber: string,
    logoPath: string | null,
    status: string
  }