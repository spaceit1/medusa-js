import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { Container, Heading, Button, Select, Table, DropdownMenu, IconButton,  Toaster, toast, Input, Switch } from "@medusajs/ui";
import { EllipsisHorizontal, PencilSquare, Trash, ComputerDesktop, MagnifyingGlass, CloudArrowUp, CheckMini } from "@medusajs/icons";
import { useState, useRef, useEffect } from "react";
import { FileModal } from "../components/custom/file-modal";
import { FocusModal } from "@medusajs/ui";


const CustomerWidget = () => {

    type Customer = {
        id: string;
        company_name: string | null;
        email: string;
        created_at: string;
        approved: boolean;
    };
    const [customers, setCustomers] = useState<Customer[]>([]);

    const fetchCustomers = async () => {
        try {
            const response = await fetch("http://localhost:9000/admin/customers/get-customers",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await response.json();
            console.log(data);
            setCustomers(data);           
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    return(
        <Container className="divide-y p-0">
            <div className="flex items-center justify-between px-6 py-4">
                <Heading level="h1">Inactive customers</Heading>
            </div>
            <div className="py-4 px-2">
                <div className="flex justify-between px-6">
                        <Button variant="secondary">Activate</Button>
                        <Input
                            type="search"
                            className="w-[216px] flex items-center justify-center"
                            placeholder="Search"
                            id="customer-search-bar"
                            //value={searchTerm}
                            //onChange={(e) => setSearchTerm(e.target.value)}
                        />
                </div>
            </div>
            <div className="px-6 py-4">
                
                
                    <Table>
                    <Table.Row>
                        <Table.Cell>Status</Table.Cell>
                        <Table.Cell>Email</Table.Cell>
                        <Table.Cell>Company name</Table.Cell>
                        <Table.Cell>Created</Table.Cell>
                    </Table.Row>
                    <Table.Body>
                    {customers && customers.map((customer) => (
                            <Table.Row>
                                <Table.Cell><Switch /></Table.Cell>
                                <Table.Cell>{customer.email}</Table.Cell>
                                <Table.Cell>{customer.company_name != null ? customer.company_name : "no data"}</Table.Cell>
                                <Table.Cell>{customer.created_at}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                

            </div>


        </Container>
    );
};

export const config = defineWidgetConfig({
    zone: "customer.list.after",
});

export default CustomerWidget;
