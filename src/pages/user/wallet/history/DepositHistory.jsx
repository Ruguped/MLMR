import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyDeposits } from '../../../../libs/authApi';
import './DepositHistory.css';

export default function DepositHistory({ onClose }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['deposits', currentPage, statusFilter],
    queryFn: async () => {
      const res = await getMyDeposits(currentPage, statusFilter);
      return res.data;
    }
  });

  const deposits = data?.deposits || [];
  const pagination = data?.pagination || { currentPage: 1, totalPages: 1, total: 0 };

  // Status badge color mapping
  function getStatusClass(status) {
    switch (status) {
      case 'approved': return 'status-approved';
      case 'pending': return 'status-pending';
      case 'confirmed': return 'status-confirmed';
      case 'rejected': return 'status-rejected';
      case 'failed': return 'status-failed';
      default: return '';
    }
  }

  // Format date
  function formatDate(dateString) {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  return (
    <div className="deposit-history-overlay" onClick={onClose}>
      <div className="deposit-history-modal" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="deposit-history-header">
          <h3>Deposit History</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        {/* Filter */}
        <div className="deposit-history-filter">
          <label>Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Content */}
        <div className="deposit-history-content">
          {isLoading ? (
            <div className="loading-state">Loading deposits...</div>
          ) : isError ? (
            <div className="error-state">Failed to load deposits</div>
          ) : deposits.length === 0 ? (
            <div className="empty-state">No deposits found</div>
          ) : (
            <table className="deposit-table">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Currency</th>
                  <th>Network</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Tx Hash</th>
                </tr>
              </thead>
              <tbody>
                {deposits.map((deposit) => (
                  <tr key={deposit._id}>
                    <td className="amount-cell">{deposit.amount}</td>
                    <td>{deposit.currency}</td>
                    <td>{deposit.network}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(deposit.status)}`}>
                        {deposit.status}
                      </span>
                    </td>
                    <td>{formatDate(deposit.createdAt)}</td>
                    <td className="hash-cell" title={deposit.transactionHash}>
                      {deposit.transactionHash
                        ? `${deposit.transactionHash.slice(0, 8)}...`
                        : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="deposit-history-pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              Previous
            </button>
            <span>Page {pagination.currentPage} of {pagination.totalPages}</span>
            <button
              disabled={currentPage === pagination.totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              Next
            </button>
          </div>
        )}

        {/* Total count */}
        <div className="deposit-history-footer">
          Total: {pagination.total} deposits
        </div>

      </div>
    </div>
  );
}
