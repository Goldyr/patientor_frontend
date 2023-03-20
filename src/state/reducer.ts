import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

interface NewEntryData  {
  patientId: string;
  entry: Entry;
}

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
    type: "UPDATE_PATIENT";
    payload: NewEntryData;
  };

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients,
  };
};

export const setPatient = (patient: Patient): Action => {
  return {
    type: "SET_PATIENT",
    payload: patient,
  };
};

export const setDiagnosisList = (diagnosis: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosis,
  };
};

export const updatePatientEntries = (data: NewEntryData): Action => {
  return {
    type: "UPDATE_PATIENT",
    payload: data,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: action.payload,
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: action.payload
        };
    case "UPDATE_PATIENT":
      const patients = state.patients;
      console.log(patients[action.payload.patientId].entries);
      console.log(patients[action.payload.patientId]);
      //patients[action.payload.patientId].entries.push(action.payload.entry);
      return {
        ...state,
        patients: patients
        };
    default:
      return state;
  }
};
