import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { Container, Heading, Button, Select, Table, DropdownMenu, IconButton,  Toaster, toast, Input } from "@medusajs/ui";
import { EllipsisHorizontal, PencilSquare, Trash, ComputerDesktop, MagnifyingGlass, CloudArrowUp, CheckMini } from "@medusajs/icons";
import { useState, useRef, useEffect } from "react";
import { FileModal } from "../components/custom/file-modal";
import { FocusModal } from "@medusajs/ui";

const CustomerWidget = () => {

    type customers = {
        email: string;
        name: string;
        created: string;
    };

    const [customers, setCustomers] = useState<customers[]>([]);

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
            <div className="py-4 px-8">
                <div className="flex justify-end px-6">
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
                
                <h1>Tutaj wyswietla sie uzytkownicy</h1>

            </div>


        </Container>
    );
};

export const config = defineWidgetConfig({
    zone: "customer.list.after",
});

export default CustomerWidget;
