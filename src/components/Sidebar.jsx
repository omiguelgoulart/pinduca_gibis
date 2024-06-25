import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

function Sidebar({ gibis, onFiltrar, onOrdenar }) {
    const { register, watch } = useForm();
    const [opcoes] = useState([
        { filtro: 'disney', label: 'Disney' },
        { filtro: 'marvel', label: 'Marvel Comics' },
        { filtro: 'dc', label: 'DC Comics' },
        { filtro: 'panini', label: 'Panini Comics' },
    ]);

    const watchInputs = watch();

    useEffect(() => {
        const editorasSelecionadas = opcoes.filter(opcao => watchInputs[opcao.filtro]);
        let novosGibisFiltrados = gibis.filter(gibi =>
            editorasSelecionadas.some(editora => editora.filtro === gibi.editora)
        );

        onFiltrar(novosGibisFiltrados);
    }, [watchInputs, gibis, opcoes, onFiltrar]);

    const handleSortChange = (event) => {
        onOrdenar(event.target.value);
    };

    return (
        <div className="w-64 mt-[5rem] m-auto p-4 bg-white shadow-md rounded-lg">
            {/* Filtrar por editora */}
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
            {/* Ordenar por valor */}
            <h2 className="text-lg font-semibold mb-4">Ordenar por Valor</h2>
            <select className="w-full mb-4 p-2 border rounded" id="ordenarGibis" onChange={handleSortChange}>
                <option value="">Selecione</option>
                <option value="maior-para-menor">Maior para Menor</option>
                <option value="menor-para-maior">Menor para Maior</option>
            </select>
        </div>
    );
}

Sidebar.propTypes = {
    gibis: PropTypes.array.isRequired,
    onFiltrar: PropTypes.func.isRequired,
    onOrdenar: PropTypes.func.isRequired,
};

export default Sidebar;
