import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompras } from '../hooks/useCompras';
import CompraCard from '../components/CompraCard';

const ComprasPage: React.FC = () => {
    const { data: compras, isLoading, error } = useCompras();
    const navigate = useNavigate();

    const handleCompraClick = (id: number) => {
        navigate(`/compras/${id}`);
    };

    return (
        <div className="mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Ventas</h1>

        {isLoading && <p>Cargando ventas...</p>}
        {error && <p className="text-destructive">Error al cargar ventas: {error.message}</p>}

        {!isLoading && compras && compras.length === 0 && (
            <p className="text-center text-muted-foreground">Aún no se registran v.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {compras?.map(compra => (
            <CompraCard
                key={compra.id}
                compra={compra}
                onClick={() => handleCompraClick(compra.id)}
            />
            ))}
        </div>
        </div>
    );
};

export default ComprasPage;
