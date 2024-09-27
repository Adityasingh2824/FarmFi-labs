import React, { useState, useEffect } from 'react';
import './Orders.css'; // Import corresponding CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faCheckCircle, faTimesCircle, faClock } from '@fortawesome/free-solid-svg-icons';

// Define a type for the order
interface Order {
    id: number;
    type: 'Buy' | 'Sell';
    commodity: string;
    amount: string;
    status: 'Completed' | 'Pending' | 'Cancelled';
}

const Orders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([
        { id: 1, type: 'Buy', commodity: 'Wheat', amount: '100', status: 'Completed' },
        { id: 2, type: 'Sell', commodity: 'Corn', amount: '200', status: 'Pending' },
        { id: 3, type: 'Buy', commodity: 'Soybean', amount: '150', status: 'Cancelled' },
    ]);

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Simulating a loading time for fetching orders
        const timeout = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="orders-page">
            <header className="orders-header">
                <h1>Order Management</h1>
                <p>View and manage all your orders related to trading and tokenization.</p>
            </header>

            <section className="orders-content">
                {loading ? (
                    <div className="loading-state">
                        <FontAwesomeIcon icon={faSyncAlt} spin size="2x" />
                        <p>Loading orders...</p>
                    </div>
                ) : (
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Type</th>
                                <th>Commodity</th>
                                <th>Amount (Tons)</th>
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
                                    <td>
                                        <span className={`status-label ${order.status.toLowerCase()}`}>
                                            <FontAwesomeIcon
                                                icon={
                                                    order.status === 'Completed'
                                                        ? faCheckCircle
                                                        : order.status === 'Pending'
                                                        ? faClock
                                                        : faTimesCircle
                                                }
                                            />{' '}
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>

            <footer className="orders-footer">
                <button className="refresh-button" onClick={() => setLoading(true)}>
                    <FontAwesomeIcon icon={faSyncAlt} /> Refresh Orders
                </button>
            </footer>
        </div>
    );
};

export default Orders;