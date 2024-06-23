import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

function Sidebar({ gibis, onFiltrar }) {
    const { register, watch } = useForm();
    const [opcoes] = useState([
        { filtro: 'disney', label: 'Disney' },
        { filtro: 'marvel', label: 'Marvel Comics' },
        { filtro: 'dc', label: 'DC Comics' },
        { filtro: 'panini', label: 'Panini Comics' },
    ]);

    const watchInputs = watch();

    // Registra dinamicamente todos os campos de opções
    useEffect(() => {
        if (opcoes.length) {
            opcoes.forEach(opcao => register(opcao.filtro));
        }
    }, [opcoes, register]);

    // Monitora mudanças nos filtros selecionados e atualiza a lista filtrada
    useEffect(() => {
        const editorasSelecionadas = opcoes.filter(opcao => watchInputs[opcao.filtro]);
        const novosGibisFiltrados = gibis.filter(gibi =>
            editorasSelecionadas.some(editora => editora.filtro === gibi.editora)
        );
        onFiltrar(novosGibisFiltrados);
    }, [gibis, opcoes, watchInputs, onFiltrar]);

    return (
        <div className="w-64 mt-[5rem] m-auto p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Filtrar por Editora</h2>
            {opcoes.map(opcao => (
                <div key={opcao.filtro} className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        id={opcao.filtro}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        {...register(opcao.filtro)}
                    />
                    <label htmlFor={opcao.filtro} className="ml-2 text-sm text-gray-700">{opcao.label}</label>
                </div>
            ))}
        </div>
    );
}

Sidebar.propTypes = {
    gibis: PropTypes.array.isRequired,
    onFiltrar: PropTypes.func.isRequired,
};

export default Sidebar;
