import { useState, useCallback, useEffect } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import ListaGibi from './components/ListaGibi';
import FormGibi from './components/FormGibi';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { Toaster } from 'sonner';

function App() {
    const [open, setOpen] = useState(false);
    const [gibis, setGibis] = useState(JSON.parse(localStorage.getItem('gibis')) || []);
    const [gibisFiltrados, setGibisFiltrados] = useState([]);
    const [gibisOrdenados, setGibisOrdenados] = useState([]);

    useEffect(() => {
        const storedGibis = JSON.parse(localStorage.getItem('gibis')) || [];
        setGibis(storedGibis);
    }, []);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const handleFiltrarGibis = useCallback((filtrados) => {
        setGibisFiltrados(filtrados);
    }, []);

    const handleOrdenarGibis = useCallback((criterio) => {
        let ordenados = [...gibis];
        if (criterio === 'maior-para-menor') {
            ordenados.sort((a, b) => b.preco - a.preco);
        } else if (criterio === 'menor-para-maior') {
            ordenados.sort((a, b) => a.preco - b.preco);
        }
        setGibisOrdenados(ordenados);
    }, [gibis]);

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-1">
                <div className="w-1/5 bg-gray-200">
                    <Sidebar gibis={gibis} onFiltrar={handleFiltrarGibis} onOrdenar={handleOrdenarGibis} />
                </div>
                <div className="w-4/5 bg-gray-200">
                    <div className="px-8 py-4">
                        <button onClick={onOpenModal} className="px-3 py-2 bg-cyan-700 text-white font-bold rounded hover:bg-blue-600">
                            Inserir Gibi
                        </button>
                        <Modal open={open} onClose={onCloseModal} center>
                            <FormGibi />
                        </Modal>
                        <ListaGibi gibis={gibisFiltrados.length > 0 ? gibisFiltrados : gibisOrdenados.length > 0 ? gibisOrdenados : gibis} />
                    </div>
                </div>
            </div>
            <Toaster richColors bottom-center />
        </div>
    );
}

export default App;
