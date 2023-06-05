import { Card, FormLayout, TextField } from "@shopify/polaris";
import { useAuthenticatedFetch } from "../hooks";
import { useEffect, useState } from "react";

export const ShowMetaField = ({ metaFieldData }) => {
  console.log("Meta fields are :", metaFieldData);
  const items = metaFieldData.reverse();

  const formContainerStyle = {
    border: "1px solid black",
    padding: "16px",
    marginBottom: "20px",
  };

  return (
    <Card sectioned title="Metafields">
      {items?.map((singleInfo) => (
        <div style={formContainerStyle}>
          <FormLayout key={singleInfo.id}>
            <TextField
              label="Namespace"
              value={singleInfo?.namespace}
              readOnly
            />
            <TextField label="Key" value={singleInfo?.key} readOnly />
            <TextField label="Value" value={singleInfo?.value} readOnly />
          </FormLayout>
        </div>
      ))}
    </Card>
  );
};
