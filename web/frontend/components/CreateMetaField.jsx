import {
  Button,
  Card,
  Form,
  FormLayout,
  IndexTable,
  TextField,
} from "@shopify/polaris";
import { useState } from "react";

export const CreateMetaField = () => {
  const [namespace, setNamespace] = useState("");
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const formContainerStyle = {
    border: "1px solid black",
    padding: "16px",
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform actions with the submitted values (e.g., create/update metafield)
    console.log("Namespace:", namespace);
    console.log("Key:", key);
    console.log("Value:", value);

    // Reset form fields
    setNamespace("");
    setKey("");
    setValue("");
  };
  return (
    <div style={formContainerStyle}>
      <Form onSubmit={handleSubmit}>
        <FormLayout>
          <TextField
            label="Namespace"
            value={namespace}
            onChange={setNamespace}
            required
          />
          <TextField label="Key" value={key} onChange={setKey} required />
          <TextField label="Value" value={value} onChange={setValue} required />
          <Button submit>Submit</Button>
        </FormLayout>
      </Form>
    </div>
  );
};
