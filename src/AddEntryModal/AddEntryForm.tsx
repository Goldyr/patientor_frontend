import React from "react";
import { Entry } from "../types";
import { EntryCheckOption } from "../AddPatientModal/FormField";
import HealthcheckForm from "./Forms/HealthcheckForm";
import OccupationalhealthcareForm from "./Forms/OccupationalhealthcareForm";
import HospitalForm from "./Forms/HospitalForm";

interface Props {
  id: string;
  type: EntryCheckOption;
  onSubmit: (newEntry: Entry) => void;
  onClose: () => void;
}

export const AddEntryForm = ({ id, onSubmit, onClose, type }: Props) => {
  switch (type.value) {
    case "HealthCheck":
      return <HealthcheckForm id={id} onSubmit={onSubmit} onClose={onClose} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalhealthcareForm
          id={id}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      );
    case "Hospital":
      return <HospitalForm id={id} onSubmit={onSubmit} onClose={onClose} />;
    default:
      throw new Error("No type selected, defaulting to HealthCheck");
  }
};

export default AddEntryForm;
