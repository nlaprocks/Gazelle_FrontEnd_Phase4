import React, { useEffect, useState } from "react";
import { Search, Settings, ChevronUp, ChevronDown } from "lucide-react";

const MenuItem = ({ title, items, color }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-1">
            <div
                className={`flex items-center justify-between p-2 bg-white rounded-md cursor-pointer`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center">
                    <div className={`w-1 h-6 ${color} mr-2`}></div>
                    <span>{title}</span>
                </div>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            {isOpen && (
                <div className="ml-3 mt-1">
                    {items.map((item, index) => (
                        <div key={index} className="p-2 bg-white rounded-md mt-1">
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const Sidebar = () => {

    // const [retailers, setRetailers] = useState([]);

    // Add this to your existing data fetching logic
    useEffect(() => {
        // Fetch products data
        // const fetchProducts = async () => {
        //     // Replace with your actual API endpoint
        //     const response = await fetch('/api/products');
        //     const data = await response.json();
        //     setProducts(data);
        // };

        // setRetailers(["Kevins", "Starbucks", "Del Real"]);

        // fetchProducts();
    }, []);

    // const products = [{
    //     id: 1,
    //     name: 'Product 1'
    // }, {
    //     id: 2,
    //     name: 'Product 2'
    // }, {
    //     id: 3,
    //     name: 'Product 3'
    // }];

    return (
        <div className="bg-gray-100 pt-4 px-4 h-full w-full mr-1">
            <div className="flex items-center bg-white rounded-md mb-4">
                <Search className="ml-2 text-gray-400" size={20} />
                <input type="text" placeholder="Search" className="w-full p-2 mb-0 rounded-md focus:outline-none" />
                <Settings className="mr-2 text-gray-400" size={20} />
            </div>

            <MenuItem title="Retailer 1" items={["Kevins", "Starbucks", "Brand 1", "Brand 2"]} color="bg-yellow-500" />
            <MenuItem title="Retailer 2" items={["Starbucks", "Del Real", "Brand 1", "Brand 2"]} color="bg-red-500" />
            <MenuItem title="Retailer 3" items={["Kevins", "Del Real", "Brand 1", "Brand 2"]} color="bg-green-500" />
        </div>
    );
};

export default Sidebar;
