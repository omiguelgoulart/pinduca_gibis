import { useState, useEffect } from 'react';
import {  toast } from 'sonner';

function Carrinho() {
    const [items, setItems] = useState([]);

    // Recuperar itens do carrinho do localStorage
    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('carrinho')) || [];
        setItems(cartItems);
    }, []);

    // Calcular preço total
    const total = items.reduce((acc, item) => acc + item.preco * item.estoque, 0);

    // Função para limpar o carrinho após a compra
    const handleFinalizarCompra = () => {
        setItems([]);
        localStorage.removeItem('carrinho');
        toast.success('Compra finalizada com sucesso!');
    };

    function formatarDinheiro(valor) {
        const formatter = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
        return formatter.format(valor);
      }

    // Renderizar o carrinho
    return (
        <>
            
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Carrinho de Compras</h2>
            {items.length === 0 ? (
                <p>Seu carrinho está vazio.</p>
            ) : (
                <div className="space-y-4">
                    {items.map((item, index) => (
                        <div key={index} className="flex justify-between items-end border-b pb-2">
                            <div className="flex items-center space-x-4">
                                <img src={item.foto} alt={item.titulo} className="w-16 h-16 object-cover" />
                                <div>
                                    <p className="font-medium">{item.titulo}</p>
                                    <p className="text-gray-600">Quantidade: {item.estoque}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-800">{formatarDinheiro(item.preco)}</p>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-lg font-semibold">Total:</p>
                        <p className="text-lg font-semibold">{formatarDinheiro(total)}</p>
                    </div>
                    <button
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        onClick={handleFinalizarCompra}
                    >
                        Finalizar Compra
                    </button>
                </div>
            )}
        </div>
        
        </>
    );
}

export default Carrinho;
