import React from 'react';
import { FaTimes, FaEdit } from 'react-icons/fa';

export interface AlertCardProps {
  name: string;
  stock: number;
  lote: string;
  vencimiento: string;
  level: 'ALTO' | 'NORMAL' | 'BAJO';
  onDelete?: () => void;
  onEdit?: () => void;
}

const badgeColors = {
  ALTO: '#2ecc71',
  NORMAL: '#f1c40f',
  BAJO: '#e74c3c',
};

export const AlertCard: React.FC<AlertCardProps> = ({
  name,
  stock,
  lote,
  vencimiento,
  level,
  onDelete,
  onEdit,
}) => {
  return (
    <div style={styles.cardContainer}>
      <div style={{ ...styles.badge, backgroundColor: badgeColors[level] }}>
        {level}
      </div>
      <div style={styles.content}>
        <h4 style={{ margin: '0 0 8px 0' }}>{name}</h4>
        <p style={{ margin: 0 }}>
          <strong>Stock:</strong> {stock}
        </p>
        <p style={{ margin: 0 }}>
          <strong>Lote:</strong> {lote}
        </p>
        <p style={{ margin: 0 }}>
          <strong>Vencimiento:</strong> {vencimiento}
        </p>
      </div>
      <div style={styles.actions}>
        <FaEdit
          style={{ ...styles.icon, marginRight: 8 }}
          onClick={onEdit}
          title="Editar alerta"
        />
        <FaTimes
          style={styles.icon}
          onClick={onDelete}
          title="Borrar alerta"
        />
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  cardContainer: {
    border: '1px solid #ccc',
    borderRadius: 8,
    padding: '12px 16px',
    marginBottom: 12,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    color: '#fff',
    padding: '4px 8px',
    borderRadius: 4,
    fontWeight: 'bold',
    marginRight: 16,
    minWidth: 60,
    textAlign: 'center',
  },
  content: {
    flexGrow: 1,
  },
  actions: {
    marginLeft: 12,
    display: 'flex',
  },
  icon: {
    cursor: 'pointer',
    fontSize: 18,
  },
};