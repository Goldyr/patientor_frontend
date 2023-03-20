import React from "react";
import Button from "@material-ui/core/Button";
import { Formik, Form, Field } from "formik";
import { Entry } from "../../types";
import { Grid } from "@material-ui/core";
import { TextField, DisabledTextField } from "../../AddPatientModal/FormField";
import { DiagnosisSelection } from "../../AddPatientModal/FormField";
import { useStateValue } from "../../state";

interface Props {
  id: string;
  onSubmit: (newEntry: Entry) => void;
  onClose: () => void;
}

const HospitalForm = ({ id, onSubmit, onClose }: Props) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        id: id,
        date: "",
        specialist: "",
        type: "Hospital",
        description: "",
        discharge: {
          date: "",
          criteria: "",
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.id) {
          errors.id = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }

        console.log(errors);
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Type"
              placeholder="Type"
              name="type"
              component={DisabledTextField}
              fullWidth={true}
              disabled
            />

            <Field
              label="ID"
              placeholder={id}
              name="id"
              component={DisabledTextField}
              fullWidth={true}
            />

            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
              fullWidth={true}
            />

            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
              fullWidth={true}
            />

            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
              fullWidth={true}
            />

            <Field
              label="Discharge date"
              placeholder="Discharge date"
              name="discharge.date"
              component={TextField}
              fullWidth={true}
            />

            <Field
              label="Discharge criteria"
              placeholder="Discharge criteria"
              name="discharge.criteria"
              component={TextField}
              fullWidth={true}
            />

            <DiagnosisSelection
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              diagnoses={diagnosis}
            />

            <Grid style={{ margin: 10 }}>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  style={{ float: "right" }}
                  type="submit"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default HospitalForm;
