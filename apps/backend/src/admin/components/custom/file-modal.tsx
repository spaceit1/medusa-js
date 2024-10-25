import React, { useState, useEffect } from 'react';
import { Checkbox, Button, Table } from "@medusajs/ui";
import { Skeleton } from "../common/skeleton";

interface FileModalProps {
    onClose: () => void;
    setSelectedFiles: (selectedFiles: { file_name: string; language: string; document_type: string; }[]) => void;
}

export const FileModal: React.FC<FileModalProps> = ({ onClose, setSelectedFiles }) => {
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
            const initialSelectionState = data.reduce((acc: Record<number | string, boolean>, row: { id: number | string }) => {
                acc[row.id] = false;
                return acc;
            }, {});
            setSelectedRows(initialSelectionState);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleSelectRow = (id: number | string) => {
        setSelectedRows((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleConfirm = () => {
        const selectedFiles = rows.filter(row => selectedRows[row.id]).map(row => ({
            file_name: row.file_name,
            language: row.language,
            document_type: row.document_type,
        }));
        console.log("Wybrane pliki:", selectedFiles);
        setSelectedFiles(selectedFiles); 
        onClose(); 
    };

    return (
        <>
            {isLoading ? (
                <Skeleton className="loading" />
            ) : (
                <>
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell></Table.HeaderCell>
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
                                            onCheckedChange={() => toggleSelectRow(row.id)}
                                            aria-label={`Select ${row.file_name}`}
                                            checked={!!selectedRows[row.id]}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>{row.file_name}</Table.Cell>
                                    <Table.Cell>{row.language}</Table.Cell>
                                    <Table.Cell>{row.document_type}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                    <Button className='absolute top-[6px] right-[20px]' onClick={handleConfirm}>Save</Button>
                </>
            )}
        </>
    );
};
