import React, { useState } from 'react';
import { AlertsList, AlertData } from '../components/AlertsList';
import { AlertConfigModal } from '../components/AlertConfigModal';
import { initialData, Product } from '../data/initialData';
import { v4 as uuidv4 } from 'uuid';

const Home: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAlert, setEditingAlert] = useState<AlertData | null>(null);

  const handleOpenModal = () => {
    setEditingAlert(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // ========== Lógica para calcular el "level" ==========
  const calculateLevel = (
    stock: number,
    highThreshold: number,
    normalThreshold: number
  ): 'ALTO' | 'NORMAL' | 'BAJO' => {
    if (stock >= highThreshold) return 'ALTO';
    if (stock >= normalThreshold) return 'NORMAL';
    return 'BAJO';
  };


  const handleSaveAlert = ({
    alertId,
    productId,
    highThreshold,
    normalThreshold,
    lowThreshold,
  }: {
    alertId?: string;
    productId: number;
    highThreshold: number;
    normalThreshold: number;
    lowThreshold: number;
  }) => {
    const product = initialData.find((p) => p.id === productId);
    if (!product) return;

    const duplicated = alerts.some(
      (a) => a.productName === product.name && a.id !== alertId
    );
    if (duplicated) {
      alert('Ya existe una alerta para este producto.');
      return;
    }

    const newLevel = calculateLevel(
      product.stock,
      highThreshold,
      normalThreshold
    );

    if (!alertId) {

      // ========== Crear nueva alerta ==========
      const newAlert: AlertData = {
        id: uuidv4(),
        productName: product.name,
        stock: product.stock,
        lote: product.lote,
        vencimiento: product.vencimiento,
        level: newLevel,
        highThreshold,
        normalThreshold,
        lowThreshold,
      };

      setAlerts((prev) => [...prev, newAlert]);
    } else {

      // ========== Editar alerta existente ==========
      setAlerts((prev) =>
        prev.map((alert) => {
          if (alert.id === alertId) {
            return {
              ...alert,
              highThreshold,
              normalThreshold,
              lowThreshold,
              level: newLevel,
            };
          }
          return alert;
        })
      );
    }
  };

  // ========== Eliminar una alerta ==========
  const handleDeleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  // ========== Editar una alerta ==========
  const handleEditAlert = (id: string) => {
    const alertToEdit = alerts.find((a) => a.id === id);
    if (alertToEdit) {
      setEditingAlert(alertToEdit);
      setModalOpen(true);
    }
  };

  return (
    <div style={styles.root}>
      <div style={styles.container}>
        <div style={styles.headerCard}>
          <h1 style={styles.title}>Alerta de Stock</h1>
          <p style={styles.subtitle}>
            Monitorea tus productos y configura alertas cuando el stock sea ALTO, NORMAL o BAJO.
          </p>
          
          <button style={styles.addButton} onClick={handleOpenModal}>
            Agregar alerta
          </button>
        </div>

        <div style={styles.alertsWrapper}>
          <AlertsList
            alerts={alerts}
            onDeleteAlert={handleDeleteAlert}
            onEditAlert={handleEditAlert}
          />
        </div>
      </div>

      <AlertConfigModal
        products={initialData}
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSaveAlert={handleSaveAlert}
        currentAlert={editingAlert || undefined}
      />
    </div>
  );
};

export default Home;

// Lo ideal es migrarlo a ../styles.css
const styles: { [key: string]: React.CSSProperties } = {
  root: {
    minHeight: '100vh',
    background: 'linear-gradient(120deg, #3498db, #8e44ad)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"Open Sans", Arial, sans-serif',
    color: '#333',
  },
  container: {
    maxWidth: '1100px',
    width: '100%',
    margin: '40px',
  },
  headerCard: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '24px',
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '2rem',
    color: '#2c3e50',
  },
  subtitle: {
    margin: '0 0 16px 0',
    fontSize: '1rem',
    color: '#7f8c8d',
  },
  addButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    outline: 'none',
    padding: '12px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 600,
    transition: 'background-color 0.3s',
  },
  alertsWrapper: {
    backgroundColor: '#fdfdfd',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
};