import  { useState, useCallback } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import ListaGibi from './components/ListaGibi';
import FormGibi from './components/FormGibi';
import Header from './components/Header';
import Sidebar from './components/Sidebar.jsx'; // Importa a Sidebar

function App() {
    const [open, setOpen] = useState(false);
    const [gibis, ] = useState(JSON.parse(localStorage.getItem('gibis')) || []);
    const [gibisFiltrados, setGibisFiltrados] = useState([]);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    // Função para filtrar gibis com base nas editoras selecionadas
    const handleFiltrarGibis = useCallback((filtrados) => {
        setGibisFiltrados(filtrados);
    }, []);

    return (
        <div className="flex flex-col h-screen">
            <Header />

            <div className="flex flex-1">
                <div className="w-1/5 bg-gray-200">
                    <Sidebar gibis={gibis} onFiltrar={handleFiltrarGibis} />
                </div>

                <div className="w-4/5 bg-gray-200">
                    <div className="px-8 py-4">
                        <button onClick={onOpenModal} className="px-3 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600">
                            Open modal
                        </button>
                        <Modal open={open} onClose={onCloseModal} center>
                            <FormGibi />
                        </Modal>
                        <ListaGibi gibis={gibisFiltrados.length > 0 ? gibisFiltrados : gibis} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
