// src/components/ProductDocuments.tsx
'use client'
import { HttpTypes } from "@medusajs/types";

const fetchDocuments = async (productId: string) => {
  const response = await fetch(`http://localhost:9000/product-documents/get`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product_id: productId }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch documents");
  }

  const data = await response.json();
  return data;
};

const ProductDocuments = async ({ productId }: { productId: string }) => {
  
  const documents = await fetchDocuments(productId);

  return (
    <div>
      <h1>Documents for Product ID: {productId}</h1>
      <pre>{JSON.stringify(documents, null, 2)}</pre>
    </div>
  );
};

export default ProductDocuments;
