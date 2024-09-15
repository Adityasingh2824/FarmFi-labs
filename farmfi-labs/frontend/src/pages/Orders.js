// src/pages/Orders.js
import React, { useState, useEffect } from 'react';
import './Orders.css'; // Import corresponding CSS for styling

const Orders = () => {
    // Sample data to simulate fetching orders from an API
    const [orders, setOrders] = useState([
        { id: 1, type: 'Buy', commodity: 'Wheat', amount: '100', status: 'Completed' },
        { id: 2, type: 'Sell', commodity: 'Corn', amount: '200', status: 'Pending' },
        { id: 3, type: 'Buy', commodity: 'Soybean', amount: '150', status: 'Cancelled' },
    ]);

    useEffect(() => {
        // In a real-world scenario, you'd fetch orders from an API
        // Example: fetchOrdersFromAPI();
    }, []);

    return (
        <div className="orders-page">
            <h1>Orders</h1>
            <p>Manage and view all orders related to the tokenization and trading of agricultural commodities.</p>
            
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Type</th>
                        <th>Commodity</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.type}</td>
                            <td>{order.commodity}</td>
                            <td>{order.amount}</td>
                            <td className={`status-${order.status.toLowerCase()}`}>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;
