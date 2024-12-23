export interface Product {
    id: number;
    name: string;
    stock: number;
    lote: string;
    vencimiento: string;
  }
  
  export const initialData: Product[] = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      stock: Math.floor(Math.random() * 100),
      lote: 'L-12345',
      vencimiento: '2025-05-10',
    },
    {
      id: 2,
      name: 'Ibuprofeno 600mg',
      stock: Math.floor(Math.random() * 100),
      lote: 'L-67890',
      vencimiento: '2024-12-01',
    },
    {
      id: 3,
      name: 'Amoxicilina 500mg',
      stock: Math.floor(Math.random() * 100),
      lote: 'L-54321',
      vencimiento: '2026-07-22',
    },
    {
      id: 4,
      name: 'Omeprazol 20mg',
      stock: Math.floor(Math.random() * 100),
      lote: 'L-98765',
      vencimiento: '2025-01-15',
    },
    {
      id: 5,
      name: 'Dipirona 500mg',
      stock: Math.floor(Math.random() * 100),
      lote: 'L-11111',
      vencimiento: '2023-09-10',
    },
  ];