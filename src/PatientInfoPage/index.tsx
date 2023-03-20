import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { setPatient } from "../state";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Entry, Patient } from "../types";
import { EntryCheckOption } from "../AddPatientModal/FormField";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();

  const entryCheckOptions: EntryCheckOption[] = [
    { value: "HealthCheck", label: "HealthCheck" },
    { value: "OccupationalHealthcare", label: "OccupationalHealthcare" },
    { value: "Hospital", label: "Hospital" },
  ];

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  const [entryType, setEntryType] = React.useState<EntryCheckOption>(
    entryCheckOptions[0]
  );

  const selectOnChange = (entry: string): void => {
    switch (entry) {
      case "HealthCheck":
        if (entryType.value !== entryCheckOptions[0].value)
          setEntryType(entryCheckOptions[0]);
        return;
      case "OccupationalHealthcare":
        if (entryType.value !== entryCheckOptions[1].value)
          setEntryType(entryCheckOptions[1]);
        return;
      case "Hospital":
        if (entryType.value !== entryCheckOptions[2].value)
          setEntryType(entryCheckOptions[2]);
        return;
      default:
        throw new Error("No type selected, defaulting to HealthCheck");
    }
  };

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: Entry) => {
    try {
      const EntryUrl = `${apiBaseUrl as string}/patients/${
        id as string
      }/entries`;
      const { data: newEntry } = await axios.post<Entry>(EntryUrl, values);
      console.log("Entry Sent!", newEntry);
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  try {
    const [{ patient }, dispatch] = useStateValue();

    React.useEffect(() => {
      const fetchPatient = async () => {
        try {
          //Fixes template literal expression
          if (!id) {
            throw new Error("wrong id");
          }
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );

          dispatch(setPatient(patientFromApi));
        } catch (e) {
          console.error(e);
        }
      };
      void fetchPatient();
    }, [submitNewEntry]);

    if (patient.name === "") return <div>loading</div>;
    else
      return (
        <div>
          <Box>
            <Typography align="center" variant="h6">
              Patient - {patient.id}
            </Typography>
          </Box>

          <div>
            <h1>{patient.name}</h1>
            <p>ssn: {patient.ssn ? patient.ssn : "none"}</p>
            <p>occupation {patient.occupation}</p>
            <h4>entries</h4>
            <EntryDetails patientEntries={patient.entries} />
          </div>

          <div>
            <FormControl>
              <InputLabel id="demo-simple-select-label">ENTRY TYPE</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={entryType.value}
                onChange={(event) =>
                  selectOnChange(event.target.value as string)
                }
              >
                <MenuItem value={"HealthCheck"}>
                  {entryCheckOptions[0].label}
                </MenuItem>
                <MenuItem value={"OccupationalHealthcare"}>
                  {entryCheckOptions[1].label}
                </MenuItem>
                <MenuItem value={"Hospital"}>
                  {entryCheckOptions[2].label}
                </MenuItem>
              </Select>
            </FormControl>

            <AddEntryModal
              id={patient.id}
              modalOpen={modalOpen}
              onSubmit={submitNewEntry}
              error={error}
              onClose={closeModal}
              type={entryType}
            />

            <Button variant="contained" onClick={() => openModal()}>
              Add New Entry
            </Button>
          </div>
        </div>
      );
  } catch (error) {
    console.error(error);
    return <>Error</>;
  }
};

export default PatientInfoPage;
