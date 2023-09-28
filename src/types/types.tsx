export interface Data {
  data: {
    id: string;
    type: string;
    attributes: {
      coverImage: string;
      personalInformation: {
        firstName: {
          internalUse: boolean;
          show: boolean;
        };
        lastName: {
          internalUse: boolean;
          show: boolean;
        };
        emailId: {
          internalUse: boolean;
          show: boolean;
        };
        phoneNumber: {
          internalUse: boolean;
          show: boolean;
        };
        nationality: {
          internalUse: boolean;
          show: boolean;
        };
        currentResidence: {
          internalUse: boolean;
          show: boolean;
        };
        idNumber: {
          internalUse: boolean;
          show: boolean;
        };
        dateOfBirth: {
          internalUse: boolean;
          show: boolean;
        };
        gender: {
          internalUse: boolean;
          show: boolean;
        };
        personalQuestions: {
          id: string;
          type: string;
          question: string;
          choices: string[];
          maxChoice: number;
          disqualify: boolean;
          other: boolean;
        }[];
      };
      profile: {
        education: {
          mandatory: boolean;
          show: boolean;
        };
        experience: {
          mandatory: boolean;
          show: boolean;
        };
        resume: {
          mandatory: boolean;
          show: boolean;
        };
        profileQuestions: {
          id: string;
          type: string;
          question: string;
          choices: string[];
          maxChoice: number;
          disqualify: boolean;
          other: boolean;
        }[];
      };
      customisedQuestions: {
        id: string;
        type: string;
        question: string;
        choices: string[];
        maxChoice: number;
        disqualify: boolean;
        other: boolean;
      }[];
    };
  };
}

export interface InformationProps {
  data: Data | any;
  setData: any;
}

export type QuestionProps = {
  id: string;
  type: string;
  question: string;
  choices: string[];
  maxChoice: number;
  disqualify: boolean;
  other: boolean;
}[];

export interface LabelProps {
  label: string;
  internal?: boolean;
  show?: boolean;
  value?: string;
  sub?: string;
  showOptions?: boolean;
  data: Data | any;
  setData: any;
  profile?: boolean;
}

export interface AddQuestionProps {
  open: boolean;
  setOpen: any;
}

export interface ChoiceProps {
  choice: string;
  index: number;
  showPlus: boolean;
  setQuestion: any;
  question: any;
}
