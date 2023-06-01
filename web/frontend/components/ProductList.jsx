import {
  EmptyState,
  Layout,
  Spinner,
  Card,
  TextContainer,
} from "@shopify/polaris";
import { ProductCard } from "./ProductCard";
import { ResourcePicker } from "@shopify/app-bridge-react";
import { useState } from "react";

export const ProductList = ({ data, isLoading, isRefetching }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(false);

  if (isLoading || isRefetching) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  const handleSelection = (resources) => {
    setIsOpen(false);
    const resourcePicker = resources?.selection[0];
    const selectedItem = data?.products.find((product) => {
      return product.id === resourcePicker.id;
    });
    setSelectedProduct(selectedItem);
  };

  const handleCancel = () => {
    setIsOpen(false);
    console.log("Resource picker closed without selection");
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <Layout>
      <Layout.Section>
        <Card
          title="Search Product"
          sectioned
          primaryFooterAction={{
            content: "search product",
            onAction: handleOpen,
          }}
        >
          <TextContainer spacing="loose">
            <p>Select a product to update its details</p>
          </TextContainer>
        </Card>

        {isOpen && (
          <ResourcePicker
            resourceType="Product"
            open={isOpen}
            onCancel={handleCancel}
            onSelection={handleSelection}
            showVariants={false}
            allowMultiple={false}
            initialSelectionIds={[]}
            showHidden={false}
          />
        )}
      </Layout.Section>

      {selectedProduct && (
        <Layout.Section>
          <ProductCard {...selectedProduct}></ProductCard>
        </Layout.Section>
      )}

      {/* {data?.products.length ? (
        data.products.map((product) => (
          <Layout.Section key={product.id}>
            <ProductCard {...product}></ProductCard>
          </Layout.Section>
        ))
      ) : (
        <Layout.Section>
          <Card>
            <EmptyState
              heading="No Products Found"
              image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
            >
              <p>Add products using the card above</p>
            </EmptyState>
          </Card>
        </Layout.Section>
      )} */}
    </Layout>
  );
};
