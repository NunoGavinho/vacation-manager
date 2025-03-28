import React, { useEffect, useState } from 'react';
import { vacationService } from '../services/vacationService';
import { Vacation } from '../models/Vacation';

export default function Admin() {
    const [requests, setRequests] = useState<Vacation[]>([]);

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = async () => {
        const pending = await vacationService.getPendingRequests();
        setRequests(pending);
    };

    const handleDecision = async (id: number, decision: 'approved' | 'rejected') => {
        if (decision === 'approved') {
            await vacationService.approveRequest(id);
        } else {
            await vacationService.rejectRequest(id);
        }
        loadRequests();
    };

    return (
        <div className="admin-container">
            <h2>Solicitações de Férias Pendentes</h2>

            {requests.length === 0 ? (
                <p>Nenhuma solicitação pendente</p>
            ) : (
                <div className="requests-list">
                    {requests.map(request => (
                        <div key={request.id} className="request-card">
                            <h3>{request.title}</h3>
                            <p><strong>Solicitante:</strong> {request.userName || request.userEmail}</p>
                            <p><strong>Período:</strong> {request.start.toLocaleDateString()} a {request.end.toLocaleDateString()}</p>

                            <div className="action-buttons">
                                <button
                                    onClick={() => handleDecision(request.id, 'approved')}
                                    className="approve-btn"
                                >
                                    Aprovar
                                </button>
                                <button
                                    onClick={() => handleDecision(request.id, 'rejected')}
                                    className="reject-btn"
                                >
                                    Rejeitar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}