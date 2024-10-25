import { Checkbox, Button, FocusModal, Heading, Input, Label, Text } from "@medusajs/ui";
import { Skeleton } from "../common/skeleton";
import { Table } from "@medusajs/ui";
import { useState, useEffect } from "react";

export function FileModal() {
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState<Array<{ id: number | string; file_name: string; language: string; document_type: string }>>([]);
  const [selectedRows, setSelectedRows] = useState<Record<number | string, boolean>>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:9000/product-documents/get-all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setRows(data);

      // Ustawienie stanu `selectedRows` na `false` dla wszystkich wierszy
      const initialSelectionState = data.reduce((acc: Record<number | string, boolean>, row: { id: number | string }) => {
        acc[row.id] = false;
        return acc;
      }, {});
      setSelectedRows(initialSelectionState);
    } catch (error) {
      console.error("Błąd podczas pobierania danych:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSelectAll = () => {
    const allSelected = Object.values(selectedRows).every(Boolean); // Sprawdza, czy wszystkie są zaznaczone
    const newSelectionState = Object.keys(selectedRows).reduce((acc: Record<number | string, boolean>, id) => {
      acc[id] = !allSelected; // Zmiana zaznaczenia
      return acc;
    }, {});
    setSelectedRows(newSelectionState);
  };

  const toggleSelectRow = (id: number | string) => {
    setSelectedRows((prev) => ({ ...prev, [id]: !prev[id] })); // Przełączanie zaznaczenia
  };

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <Skeleton className="w-full h-24 mb-6" />
          <Skeleton className="w-full h-8 mb-2" />
          <Skeleton className="w-full h-8 mb-2" />
          <Skeleton className="w-full h-8 mb-2" />
          <Skeleton className="w-full h-8 mb-2" />
        </div>
      ) : (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
              </Table.HeaderCell>
              <Table.HeaderCell>File Name</Table.HeaderCell>
              <Table.HeaderCell>Language</Table.HeaderCell>
              <Table.HeaderCell>Document Type</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows.map((row) => (
              <Table.Row key={row.id}>
                <Table.Cell>
                  <Checkbox
                    onChange={() => toggleSelectRow(row.id)} // Przełączanie stanu checkboxa dla konkretnego wiersza
                    //checked={selectedRows[row.id] || false} // Ustawienie stanu checkboxa
                    aria-label={`Zaznacz ${row.file_name}`}
                  />
                </Table.Cell>
                <Table.Cell>{row.file_name}</Table.Cell>
                <Table.Cell>{row.language}</Table.Cell>
                <Table.Cell>{row.document_type}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </>
  );
}
