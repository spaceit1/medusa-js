import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { Container, Heading, Button, Select, Table, DropdownMenu, IconButton } from "@medusajs/ui";
import { EllipsisHorizontal, PencilSquare, Trash, ComputerDesktop, MagnifyingGlass, CloudArrowUp, CheckMini } from "@medusajs/icons";
import { useState, useRef, useEffect } from "react";
import { FileModal } from "../components/custom/file-modal";
import { FocusModal } from "@medusajs/ui";

const ProductWidget = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [language, setLanguage] = useState<string>("");
    const [documentType, setDocumentType] = useState<string>("");
    const [uploadedFiles, setUploadedFiles] = useState<Array<{ fileName: string, language: string, documentType: string }>>([]);
    const [relatedFiles, setRelatedFiles] = useState<Array<{ id:number | string, file_name: string, language: string, document_type: string }>>([]);
    const [selectedFiles, setSelectedFiles] = useState<Array<{ file_name: string, language: string, document_type: string }>>([]); // State for selected files
    const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility
    
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

    const deleteDocument = (index: number, type: string) => {
        if (type === "related") {
            dropFileFromDB(index);
        } else {
            setUploadedFiles((prevFiles) => {
                const updatedFiles = [...prevFiles];
                updatedFiles.splice(index, 1);
                return updatedFiles;
            });
        }
    };

    const dropFileFromDB = async (index: number) => {
        try {
            let file_name = relatedFiles[index].file_name;
            let id = relatedFiles[index].id;

            let response = await fetch('http://localhost:9000/product-documents/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    file_name: file_name,
                }),
            });

            let result = await response.json();
            console.log(result);

            setRelatedFiles((prevFiles) => {
                const updatedFiles = [...prevFiles];
                updatedFiles.splice(index, 1);
                return updatedFiles;
            });

        } catch (error) {
            console.log({ Error: error });
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:9000/product-documents/get', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product_id: getProductIdFromUrl(),
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setRelatedFiles(result);
            console.log(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData(); 
    }, []); 

    const handleUpload = () => {
        if (files.length > 0 && language && documentType) {
            const newUploadedFiles = files.map(file => ({
                fileName: file.name,
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
            const dataToSend = {
                product_id: getProductIdFromUrl(),
                documents: uploadedFiles.map(item => ({
                    file_name: item.fileName,
                    language: item.language,
                    document_type: item.documentType,
                })),
            };

            try {
                const response = await fetch('http://localhost:9000/product-documents/upload', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSend),
                });

                if (response.ok) {
                    const result = await response.json();
                    setUploadedFiles([]);
                    fetchData();
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

    const itemMenu = (index: number, type: string) => {
        return (
            <DropdownMenu>
                <DropdownMenu.Trigger asChild>
                    <IconButton>
                        <EllipsisHorizontal />
                    </IconButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    {/* <DropdownMenu.Item className="gap-x-2" onClick={editDocument}>
                        <PencilSquare className="text-ui-fg-subtle" />
                        Edit
                    </DropdownMenu.Item> */}
                    {/* <DropdownMenu.Separator /> */}
                    <DropdownMenu.Item className="gap-x-2" onClick={() => deleteDocument(index,type)}>
                        <Trash className="text-ui-fg-subtle" />
                        Delete
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu>
        );
    };

    const handleFileSelection = (selectedFiles: Array<{ file_name: string, language: string, document_type: string }>) => {
        setSelectedFiles(selectedFiles); // Set the selected files from the modal
        setModalOpen(false); // Close the modal
    };

    const Modal = () => {
        return (
            <FocusModal open={modalOpen} onOpenChange={setModalOpen}>
                <FocusModal.Trigger asChild>
                    <Button variant="secondary"><MagnifyingGlass />Find files</Button>
                </FocusModal.Trigger>
                <FocusModal.Content>
                    <FocusModal.Header>
                        <Button id='SaveFileButton' onClick={() => handleFileSelection(selectedFiles)}>Save</Button>
                    </FocusModal.Header>
                    <FocusModal.Body className="flex flex-col items-center py-16">
                        <FileModal onClose={() => setModalOpen(false)} setSelectedFiles={handleFileSelection} />
                    </FocusModal.Body>
                </FocusModal.Content>
            </FocusModal>
        )
    }

    return (
        <Container className="divide-y p-0">
            <div className="flex items-center justify-between px-6 py-4">
                <Heading level="h2">Documents</Heading>
            </div>

            {/* File upload section */}
            <div className="px-6 py-4">
                <div className="flex flex-row gap-5">
                    <Button variant="secondary" onClick={handleButtonClick}><ComputerDesktop />Choose Files</Button>
                    <Modal />
                </div>
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
                        variant="secondary" 
                        onClick={handleUpload}
                    >
                        <CloudArrowUp />
                        Upload
                    </Button>
                </div>
            </div>

            {uploadedFiles.length > 0 && (
                <div className="px-6 py-4">
                    <Heading level="h3">Uploaded Files</Heading>
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
                                        <Table.Cell id={`document-name-${index}`}>{item.fileName}</Table.Cell>
                                        <Table.Cell>{item.language}</Table.Cell>
                                        <Table.Cell>{item.documentType}</Table.Cell>
                                        <Table.Cell>{itemMenu(index,'uploaded')}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            )}

            {relatedFiles.length > 0 && (
                <div className="px-6 py-4">
                    <Heading level="h3">Related files</Heading>
                    <div>    
                        <Table>
                            <Table.Row>
                                <Table.Cell>File Name</Table.Cell>
                                <Table.Cell>Language</Table.Cell>
                                <Table.Cell>Document Type</Table.Cell>
                                <Table.Cell>Actions</Table.Cell>
                            </Table.Row>
                            <Table.Body>
                                {relatedFiles.map((item:any, index) => (
                                    <Table.Row key={index}>
                                        <Table.Cell>{item.file_name}</Table.Cell>
                                        <Table.Cell>{item.language}</Table.Cell>
                                        <Table.Cell>{item.document_type}</Table.Cell>
                                        <Table.Cell>{itemMenu(index,'related')}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            )}
            <div className="px-6 py-4">
                <Button 
                    variant="primary" 
                    onClick={handleSave}>
                    <CheckMini />
                    Save
                </Button>
            </div>
        </Container>
    );
};

export const config = defineWidgetConfig({
    zone: "product.details.after",
});

export default ProductWidget;
