import React, { useEffect, useState } from 'react';
import { fetchData } from '../services/api';

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetchData('/users');
                setData(response);
            } catch (error) {
                console.error('Erro:', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            )}
        </div>
    );
}