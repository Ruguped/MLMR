// src/components/ToastContainer.jsx
import { useToastStore } from '../../store/toastStore';

const STYLES = {
  success: { bg: 'bg-success', icon: 'bi-check-circle-fill' },
  error: { bg: 'bg-danger', icon: 'bi-x-circle-fill' },
  warning: { bg: 'bg-warning text-dark', icon: 'bi-exclamation-triangle-fill' },
  info: { bg: 'bg-info', icon: 'bi-info-circle-fill' },
};

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 9999999 }}>
      {toasts.map(toast => {
        const style = STYLES[toast.type] || STYLES.info;
        return (
          <div key={toast.id} className={`toast show ${style.bg} text-white`} role="alert">
            <div className="toast-body d-flex align-items-center">
              <i className={`bi ${style.icon} me-2`}></i>
              <span className="flex-grow-1">{toast.message}</span>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                style={{
                  background: 'rgba(255,255,255,0.25)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '16px',
                  color: '#fff',
                  fontWeight: 'bold',
                  marginLeft: '10px',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.4)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.25)'}
              >×</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}