import React, { useState, useEffect } from 'react';
import { Checkbox, Button, Table, Input } from "@medusajs/ui";
import { Skeleton } from "../common/skeleton";

interface FileModalProps {
    onClose: () => void;
    setSelectedFiles: (selectedFiles: { file_name: string; language: string; document_type: string; }[]) => void;
}

export const FileModal: React.FC<FileModalProps> = ({ onClose, setSelectedFiles }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState<Array<{ id: number | string; file_name: string; language: string; document_type: string }>>([]);
    const [selectedRows, setSelectedRows] = useState<Record<number | string, boolean>>({});
    const [searchTerm, setSearchTerm] = useState("");
    
    // Stany dla checkboxów filtrujących po typie dokumentu
    const [showInstruction, setShowInstruction] = useState(false);
    const [showCertificate, setShowCertificate] = useState(false);
    const [showComplianceCard, setShowComplianceCard] = useState(false);
    const [showOther, setShowOther] = useState(false);

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

    // Filtrowanie wierszy na podstawie `searchTerm` i zaznaczonych checkboxów typu dokumentu
    const filteredRows = rows.filter(row => {
        const matchesSearchTerm = row.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.document_type.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesDocumentType = (
            (!showInstruction && !showCertificate && !showComplianceCard && !showOther) || // Brak zaznaczonego checkboxa oznacza wyświetlenie wszystkich
            (showInstruction && row.document_type === "instruction") ||
            (showCertificate && row.document_type === "certificate") ||
            (showComplianceCard && row.document_type === "compliance_card") ||
            (showOther && row.document_type === "other")
        );

        return matchesSearchTerm && matchesDocumentType;
    });

    return (
        <>
            {isLoading ? (
                <Skeleton className="loading" />
            ) : (
                <>
                    <div className="absolute left-[70px] top-[57px] flex flex-row gap-10 items-center">
                        <Input
                            className="w-[300px]"
                            placeholder="Start typing ..."
                            id="files-search-bar"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        
                        <div className="flex flex-row gap-2 items-center">
                            <Checkbox
                                checked={showInstruction}
                                onCheckedChange={() => setShowInstruction(prev => !prev)}
                            />
                            <span>instruction</span>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <Checkbox
                                checked={showCertificate}
                                onCheckedChange={() => setShowCertificate(prev => !prev)}
                            />
                            <span>certificate</span>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <Checkbox
                                checked={showComplianceCard}
                                onCheckedChange={() => setShowComplianceCard(prev => !prev)}
                            />
                            <span>compliance card</span>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <Checkbox
                                checked={showOther}
                                onCheckedChange={() => setShowOther(prev => !prev)}
                            />
                            <span>other</span>
                        </div>
                    </div>

                    <div style={{ width: '100%', maxHeight: '58%', overflowY: 'auto' }}>
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
                                {filteredRows.map((row) => (
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
                    </div>
                    <Button className='absolute top-[6px] right-[20px]' onClick={handleConfirm}>Save</Button>
                </>
            )}
        </>
    );
};
