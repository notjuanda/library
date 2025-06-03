import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useCreateCompra } from '@/modules/compras/hooks/useCreateCompra';
import type { DetalleCompraCreate } from '@/modules/core/types/compra.types';

interface Props {
    monto: number;
    detalles: DetalleCompraCreate[];
    qrText?: string;
}

const ProcesarPagoPage: React.FC<Props> = ({ monto, detalles, qrText }) => {
    const [archivo, setArchivo] = useState<File | null>(null);
    const [mostrarForm, setMostrarForm] = useState(false);

    const textoQR =
        qrText ?? `pago-monto-${monto.toFixed(2)}-${Math.random().toString(36).substring(2, 8)}`;

    const { mutate: crearCompra, status, error } = useCreateCompra();

    const handleArchivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
        setArchivo(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!archivo) {
        alert('Por favor selecciona un comprobante de pago.');
        return;
        }

        crearCompra(
        {
            compra: {
            monto_total: monto,
            qr: textoQR,
            detalles: detalles,
            },
            comprobanteFile: archivo,
        },
        {
            onSuccess() {
            alert('Compra creada exitosamente!');
            setMostrarForm(false);
            setArchivo(null);
            },
            onError(err: Error) {
            alert(`Error creando compra: ${err.message}`);
            },
        }
        );
    };

    return (
        <div style={{ maxWidth: 400, margin: '50px auto', textAlign: 'center' }}>
        <h1>Procesar Pago</h1>
        <p>
            Escanea este código QR para pagar <strong>${monto.toFixed(2)}</strong>
        </p>
        <QRCodeCanvas value={textoQR} size={256} bgColor="#fff" fgColor="#000" level="H" includeMargin />
        <p style={{ marginTop: 20, fontWeight: 'bold' }}>Código QR: {textoQR}</p>

        {!mostrarForm && (
            <button
            onClick={() => setMostrarForm(true)}
            style={{ marginTop: 30, padding: '10px 20px', cursor: 'pointer' }}
            disabled={status === 'pending'}
            >
            Ya pagué
            </button>
        )}

        {mostrarForm && (
            <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
            <label>
                Subir comprobante de pago:
                <input
                type="file"
                accept="image/*"
                onChange={handleArchivoChange}
                disabled={status === 'pending'}
                />
            </label>
            <br />
            <button
                type="submit"
                disabled={status === 'pending' || !archivo}
                style={{ marginTop: 15, padding: '8px 16px' }}
            >
                {status === 'pending' ? 'Enviando...' : 'Enviar comprobante'}
            </button>
            <br />
            <button
                type="button"
                onClick={() => {
                setMostrarForm(false);
                setArchivo(null);
                }}
                disabled={status === 'pending'}
                style={{ marginTop: 10, color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
            >
                Cancelar
            </button>
            </form>
        )}

        {error && <p style={{ color: 'red', marginTop: 10 }}>Error: {error.message}</p>}
        </div>
    );
};

export default ProcesarPagoPage;
