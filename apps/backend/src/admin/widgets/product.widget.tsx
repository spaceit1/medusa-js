import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Button, Select, Table } from "@medusajs/ui"
import { useState, useRef } from "react"

const ProductWidget = () => {
  const [files, setFiles] = useState<File[]>([])
  const [language, setLanguage] = useState<string>("")
  const [documentType, setDocumentType] = useState<string>("")
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ file: File, language: string, documentType: string }>>([])

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files)) 
    }
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click() 
    }
  }

  const handleUpload = () => {
    if (files.length > 0 && language && documentType) {
      const newUploadedFiles = files.map(file => ({
        file,
        language,
        documentType,
      }))
      setUploadedFiles([...uploadedFiles, ...newUploadedFiles])
      setFiles([]) 
    } else {
      alert("Please select files, language, and document type.")
    }
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Documents</Heading>
      </div>
      
      {/* Sekcja dodawania plików */}
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

      {/* Sekcja wyboru języka i rodzaju dokumentu */}
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
              <Select.Item value="pl">Polish (PL)</Select.Item>
              <Select.Item value="en">English (EN)</Select.Item>
              <Select.Item value="de">German (DE)</Select.Item>
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

        <Button 
          variant="primary" 
          onClick={handleUpload}
        >
          Upload
        </Button>
      </div>

      {/* Tabela z plikami */}
      <div className="px-6 py-4">
        {uploadedFiles.length > 0 && (
          <div>
            <Table>
                <Table.Row>
                  <Table.Cell>File Name</Table.Cell>
                  <Table.Cell>Language</Table.Cell>
                  <Table.Cell>Document Type</Table.Cell>
                  <Table.Cell>Preview</Table.Cell>
                </Table.Row>
              <Table.Body>
                {uploadedFiles.map((item, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{item.file.name}</Table.Cell>
                    <Table.Cell>{item.language}</Table.Cell>
                    <Table.Cell>{item.documentType}</Table.Cell>
                    <Table.Cell>
                      {item.file.type.startsWith("image/") && (
                        <img 
                          src={URL.createObjectURL(item.file)} 
                          alt={item.file.name} 
                          className="w-32 h-32 object-cover" 
                        />
                      )}
                      {item.file.type === "application/pdf" && (
                        <a 
                          href={URL.createObjectURL(item.file)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500"
                        >
                          View PDF
                        </a>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.after",
})

export default ProductWidget
