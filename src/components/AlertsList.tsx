import React from 'react';
import { AlertCard } from './AlertCard';

export interface AlertData {
  id: string;
  productName: string;
  stock: number;
  lote: string;
  vencimiento: string;
  level: 'ALTO' | 'NORMAL' | 'BAJO';
  highThreshold: number;
  normalThreshold: number;
  lowThreshold: number;
}

interface AlertsListProps {
  alerts: AlertData[];
  onDeleteAlert: (id: string) => void;
  onEditAlert: (id: string) => void;
}

export const AlertsList: React.FC<AlertsListProps> = ({
  alerts,
  onDeleteAlert,
  onEditAlert,
}) => {
  return (
    <div>
      {alerts.map((alert) => (
        <AlertCard
          key={alert.id}
          name={alert.productName}
          stock={alert.stock}
          lote={alert.lote}
          vencimiento={alert.vencimiento}
          level={alert.level}
          onDelete={() => onDeleteAlert(alert.id)}
          onEdit={() => onEditAlert(alert.id)}
        />
      ))}
    </div>
  );
};