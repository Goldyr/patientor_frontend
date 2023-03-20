import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import { Alert } from "@material-ui/lab";
import React from "react";
import { EntryCheckOption } from "../AddPatientModal/FormField";
import { Entry } from "../types";
import AddEntryForm from "./AddEntryForm";

interface Props {
  modalOpen: boolean;
  id: string;
  type: EntryCheckOption;
  onClose: () => void;
  onSubmit: (values: Entry) => void;
  error?: string;
}

const AddEntryModal = ({
  modalOpen,
  id,
  onClose,
  onSubmit,
  error,
  type,
}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <AddEntryForm id={id} onSubmit={onSubmit} onClose={onClose} type={type} />
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
