import axios from "axios";
import React from "react";
import { apiBaseUrl } from "../constants";
import { Diagnosis, Entry } from "../types";
import { Healing, LocalHospital, Work } from "@material-ui/icons";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@material-ui/core";

const EntryDetails = (props: { patientEntries: Entry[] }): JSX.Element => {
  const [diagnosisList, setDiagnosisList] = React.useState<Diagnosis[] | null>(
    null
  );

  React.useEffect(() => {
    const fetchDiagnosisList = async () => {
      const { data: diagnosisFromApi } = await axios.get<Diagnosis[]>(
        `${apiBaseUrl}/diagnoses`
      );

      setDiagnosisList(diagnosisFromApi);
    };

    void fetchDiagnosisList();
  }, []);

  const findDiagnosisInfo = (code: string): Diagnosis | undefined => {
    return diagnosisList?.find((diagnosis) => {
      if (diagnosis.code === code) {
        return diagnosis;
      }
    });
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  return (
    <List>
      {props.patientEntries.map((entry: Entry, i: number) => {
        switch (entry.type) {
          case "HealthCheck":
            return (
              <div
                key={i}
                style={{
                  border: "solid black 5px",
                  padding: 5,
                  marginTop: 5,
                  marginBottom: 5,
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Healing />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={entry.type} secondary={entry.date} />
                  <ListItemText primary={entry.date} />
                  <ListItemText primary={entry.description} />
                  <List>
                    {entry.diagnosisCodes?.map((dc, i) => {
                      const fullDiagnosis: Diagnosis | undefined =
                        findDiagnosisInfo(dc);
                      return (
                        <ListItemText
                          key={i}
                          primary={fullDiagnosis?.code}
                          secondary={fullDiagnosis?.name}
                        ></ListItemText>
                      );
                    })}
                  </List>
                </ListItem>
              </div>
            );
          case "Hospital":
            return (
              <div
                key={i}
                style={{
                  border: "solid black 5px",
                  padding: 5,
                  marginTop: 5,
                  marginBottom: 5,
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <LocalHospital />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={entry.type} secondary={entry.date} />
                  <ListItemText primary={entry.date} />
                  <ListItemText primary={entry.description} />
                </ListItem>
                <List>
                  {entry.diagnosisCodes?.map((dc, i) => {
                    const fullDiagnosis: Diagnosis | undefined =
                      findDiagnosisInfo(dc);
                    return (
                      <ListItemText
                        key={i}
                        primary={fullDiagnosis?.code}
                        secondary={fullDiagnosis?.name}
                      ></ListItemText>
                    );
                  })}
                </List>
              </div>
            );
          case "OccupationalHealthcare":
            return (
              <div
                key={i}
                style={{
                  border: "solid black 5px",
                  padding: 5,
                  marginTop: 5,
                  marginBottom: 5,
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Work />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={entry.type} secondary={entry.date} />
                  <ListItemText primary={entry.date} />
                  <ListItemText primary={entry.description} />
                </ListItem>
                <List>
                  {entry.diagnosisCodes?.map((dc, i) => {
                    const fullDiagnosis: Diagnosis | undefined =
                      findDiagnosisInfo(dc);
                    return (
                      <ListItemText
                        key={i}
                        primary={fullDiagnosis?.code}
                        secondary={fullDiagnosis?.name}
                      ></ListItemText>
                    );
                  })}
                </List>
              </div>
            );
          default:
            return assertNever(entry);
        }
      })}
    </List>
  );
};

export default EntryDetails;
