import React, { useState, useEffect } from 'react';
import { Product } from '../data/initialData';
import { AlertData } from './AlertsList';

interface AlertConfigModalProps {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
  onSaveAlert: (data: {
    alertId?: string;
    productId: number;
    highThreshold: number;
    normalThreshold: number;
    lowThreshold: number;
  }) => void;
  currentAlert?: AlertData;
}

export const AlertConfigModal: React.FC<AlertConfigModalProps> = ({
  products,
  isOpen,
  onClose,
  onSaveAlert,
  currentAlert,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<number | ''>('');
  const [highThreshold, setHighThreshold] = useState<number>(80);
  const [normalThreshold, setNormalThreshold] = useState<number>(50);
  const [lowThreshold, setLowThreshold] = useState<number>(20);

  useEffect(() => {
    if (currentAlert) {
      const product = products.find(
        (p) => p.name === currentAlert.productName
      );
      setSelectedProductId(product ? product.id : '');
      setHighThreshold(currentAlert.highThreshold);
      setNormalThreshold(currentAlert.normalThreshold);
      setLowThreshold(currentAlert.lowThreshold);
    } else {
      setSelectedProductId('');
      setHighThreshold(80);
      setNormalThreshold(50);
      setLowThreshold(20);
    }
  }, [currentAlert, products]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (selectedProductId === '') return;
    onSaveAlert({
      alertId: currentAlert?.id,
      productId: Number(selectedProductId),
      highThreshold,
      normalThreshold,
      lowThreshold,
    });
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>{currentAlert ? 'Editar Alerta' : 'Agregar Alerta'}</h2>

        <label style={styles.label}>
          Producto:
          <select
            style={styles.input}
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(Number(e.target.value))}
            disabled={Boolean(currentAlert)} 
          >
            <option value="">Seleccione un producto</option>
            {products.map((prod) => (
              <option key={prod.id} value={prod.id}>
                {prod.name}
              </option>
            ))}
          </select>
        </label>

        <label style={styles.label}>
          Cantidad para “ALTO”:
          <input
            style={styles.input}
            type="number"
            value={highThreshold}
            onChange={(e) => setHighThreshold(Number(e.target.value))}
          />
        </label>

        <label style={styles.label}>
          Cantidad para “NORMAL”:
          <input
            style={styles.input}
            type="number"
            value={normalThreshold}
            onChange={(e) => setNormalThreshold(Number(e.target.value))}
          />
        </label>

        <label style={styles.label}>
          Cantidad para “BAJO”:
          <input
            style={styles.input}
            type="number"
            value={lowThreshold}
            onChange={(e) => setLowThreshold(Number(e.target.value))}
          />
        </label>

        <div style={styles.buttons}>
          <button onClick={handleSave}>
            {currentAlert ? 'Guardar cambios' : 'Crear Alerta'}
          </button>
          <button onClick={onClose} style={{ marginLeft: 8 }}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  modal: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 8,
    width: '400px',
    maxWidth: '90%',
  },
  label: {
    display: 'block',
    marginBottom: 12,
  },
  input: {
    display: 'block',
    marginTop: 4,
    width: '100%',
    padding: '6px',
    borderRadius: 4,
    border: '1px solid #ccc',
  },
  buttons: {
    marginTop: 16,
    textAlign: 'right',
  },
};