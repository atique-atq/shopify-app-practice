import {
  Button,
  Card,
  Form,
  FormLayout,
  IndexTable,
  TextField,
} from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useState, useCallback } from "react";
import { useAuthenticatedFetch } from "../hooks";

export const CreateMetaField = ({ productId }) => {
  const fetch = useAuthenticatedFetch();
  const [namespace, setNamespace] = useState("");
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [showToast, setShowToast] = useState(false);

  const toggleToast = useCallback(() => setShowToast((active) => !active), []);
  const toastMarkup = showToast ? (
    <Toast content="Metafield Created" onDismiss={toggleToast} />
  ) : null;

  const formContainerStyle = {
    border: "1px solid black",
    padding: "16px",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const type = "single_line_text_field";

    const requestBody = {
      productId: productId,
      namespace: namespace,
      key: key,
      value: value,
      type: type,
    };

    // Perform actions with the submitted values (e.g., create/update metafield)
    const response = await fetch("/api/product/metafield/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    console.log("Yes!!!! Response is", response);
    if (response.ok) {
      toggleToast();
    }
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
      {toastMarkup}
    </div>
  );
};
