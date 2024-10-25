import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { Container, Heading, Button, Select, Table, DropdownMenu, IconButton } from "@medusajs/ui";
import { EllipsisHorizontal, PencilSquare, Trash } from "@medusajs/icons";
import { useState, useRef } from "react";

const ProductWidget = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [language, setLanguage] = useState<string>("");
    const [documentType, setDocumentType] = useState<string>("");
    const [uploadedFiles, setUploadedFiles] = useState<Array<{ fileName: string, language: string, documentType: string }>>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles(Array.from(event.target.files));
        }
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const editDocument = () => {
        // Implement your edit logic here
    };

    const deleteDocument = (index: number) => {
        setUploadedFiles(uploadedFiles.filter((_, i) => i !== index)); // Remove file at index
    };

    const handleUpload = () => {
        if (files.length > 0 && language && documentType) {
            const newUploadedFiles = files.map(file => ({
                fileName: file.name,  // Zapisujemy tylko nazwę pliku
                language,
                documentType,
            }));
            setUploadedFiles([...uploadedFiles, ...newUploadedFiles]);
            setFiles([]); // Clear file input after upload
        } else {
            alert("Please select files, language, and document type.");
        }
    };

    const handleSave = async () => {
        if (uploadedFiles.length > 0) {
            // Prepare JSON data to be sent
            const dataToSend = {
                product_id: getProductIdFromUrl(),
                documents: uploadedFiles.map(item => ({
                    file_name: item.fileName, // Zapisujemy tylko nazwę pliku
                    language: item.language,
                    document_type: item.documentType,
                })),
            };
    
            try {
                // Upload data to Medusa server
                const response = await fetch('http://localhost:9000/product-documents/upload', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Set content type to JSON
                    },
                    body: JSON.stringify(dataToSend), // Send JSON data
                });
    
                if (response.ok) {
                    const result = await response.json();
                    console.log(result);
                    // Reset uploadedFiles after saving
                    setUploadedFiles([]);
                } else {
                    console.error('File save failed:', response.statusText);
                }
            } catch (error) {
                console.error('Error saving files:', error);
            }
        } else {
            alert("No files to save.");
        }
    };

    const getProductIdFromUrl = () => {
        let productUrl = location.href;
        let splittedUrl = productUrl.split('/');
        return splittedUrl[splittedUrl.length - 1];
    };

    const itemMenu = (index: number) => {
        return (
            <DropdownMenu>
                <DropdownMenu.Trigger asChild>
                    <IconButton>
                        <EllipsisHorizontal />
                    </IconButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Item className="gap-x-2" onClick={editDocument}>
                        <PencilSquare className="text-ui-fg-subtle" />
                        Edit
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item className="gap-x-2" onClick={() => deleteDocument(index)}>
                        <Trash className="text-ui-fg-subtle" />
                        Delete
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu>
        );
    };

    return (
        <Container className="divide-y p-0">
            <div className="flex items-center justify-between px-6 py-4">
                <Heading level="h2">Documents</Heading>
            </div>

            {/* File upload section */}
            <div className="px-6 py-4">
                <Button variant="secondary" onClick={handleButtonClick}>Choose Files</Button>
                <input 
                    ref={fileInputRef}
                    type="file" 
                    multiple 
                    accept="image/*,application/pdf"
                    onChange={handleFileChange} 
                    className="hidden" 
                />
            </div>

            <div className="px-6 py-4">
                <div className="mb-4">
                    <label className="block mb-2">Select Language:</label>
                    <Select 
                        name="language"
                        value={language} 
                        onValueChange={setLanguage} 
                    >
                        <Select.Trigger>
                            <Select.Value placeholder="Select a language" />
                        </Select.Trigger>
                        <Select.Content className="z-50">
                            <Select.Item value="PL">Polish (PL)</Select.Item>
                            <Select.Item value="EN">English (EN)</Select.Item>
                            <Select.Item value="DE">German (DE)</Select.Item>
                        </Select.Content>
                    </Select>
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Select Document Type:</label>
                    <Select 
                        name="documentType"
                        value={documentType} 
                        onValueChange={setDocumentType} 
                    >
                        <Select.Trigger>
                            <Select.Value placeholder="Select a document type" />
                        </Select.Trigger>
                        <Select.Content className="z-50">
                            <Select.Item value="instruction">Instruction</Select.Item>
                            <Select.Item value="certificate">Certificate</Select.Item>
                            <Select.Item value="compliance_card">Compliance Card</Select.Item>
                            <Select.Item value="catalog_card">Catalog Card</Select.Item>
                            <Select.Item value="other">Other</Select.Item>
                        </Select.Content>
                    </Select>
                </div>
                <div className="flex flex-row gap-5">
                    <Button 
                        variant="primary" 
                        onClick={handleUpload}
                    >
                        Upload
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </div>
            </div>

            {/* File table */}
            <div className="px-6 py-4">
                {uploadedFiles.length > 0 && (
                    <div>
                        <Table>
                            <Table.Row>
                                <Table.Cell>File Name</Table.Cell>
                                <Table.Cell>Language</Table.Cell>
                                <Table.Cell>Document Type</Table.Cell>
                                <Table.Cell>Actions</Table.Cell>
                            </Table.Row>
                            <Table.Body>
                                {uploadedFiles.map((item, index) => (
                                    <Table.Row key={index}>
                                        <Table.Cell>{item.fileName}</Table.Cell>
                                        <Table.Cell>{item.language}</Table.Cell>
                                        <Table.Cell>{item.documentType}</Table.Cell>
                                        <Table.Cell>{itemMenu(index)}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                )}
            </div>
        </Container>
    );
};

export const config = defineWidgetConfig({
    zone: "product.details.after",
});

export default ProductWidget;
