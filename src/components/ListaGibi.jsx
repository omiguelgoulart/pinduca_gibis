import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'sonner';

function ListaGibi({ gibis }) {
  const [gibisFiltrados, setGibisFiltrados] = useState([]);

  useEffect(() => {
    setGibisFiltrados(gibis);
  }, [gibis]);

  function adicionarAoCarrinho(id) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const gibiIndex = gibis.findIndex((g) => g.id === id);
    const gibi = gibis[gibiIndex];

    if (gibi.estoque > 0) {
      const carrinhoIndex = carrinho.findIndex((item) => item.id === id);
      if (carrinhoIndex === -1) {
        carrinho.push({ ...gibi, quantidade: 1 });
      } else {
        carrinho[carrinhoIndex].quantidade += 1;
      }

      // Atualiza o carrinho no localStorage
      localStorage.setItem('carrinho', JSON.stringify(carrinho));

      // Atualiza o estoque do gibi no localStorage
      const updatedGibis = [...gibis];
      updatedGibis[gibiIndex].estoque -= 1;
      localStorage.setItem('gibis', JSON.stringify(updatedGibis));

      // Atualiza o estado local para refletir a mudança
      setGibisFiltrados(updatedGibis);

      toast.success('Item adicionado ao carrinho');
    }
  }

  function formatarDinheiro(valor) {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formatter.format(valor);
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2 bg-gray-200">
        {gibisFiltrados.map((gibi) => (
          <div key={gibi.id} className="bg-white border-2 border-gray-300 rounded-lg p-4 flex flex-col items-center justify-around">
            <img src={gibi.foto} alt="gibi" className="w-48 h-64 object-cover mb-4 rounded" />
            <div className="text-center flex flex-col items-center w-full">
              <h3 className="text-lg font-bold max-w-full truncate">{gibi.titulo}</h3>
              <p className="text-sm text-gray-700 mb-2 max-w-full truncate-2-lines">
                {gibi.descricao.length > 60 ? `${gibi.descricao.substring(0, 57)}...` : gibi.descricao}
              </p>
              <h2 className="text-xl font-bold text-green-600 mb-2">{formatarDinheiro(gibi.preco)}</h2>
              <div className="flex items-center justify-between w-full">
                <h2 className="text-sm font-semibold">Qtd: {gibi.estoque}</h2>
                {gibi.estoque > 0 ? (
                  <button
                    onClick={() => adicionarAoCarrinho(gibi.id)}
                    className="px-3 py-2 bg-cyan-700 text-white font-bold rounded hover:bg-blue-600"
                  >
                    Comprar
                  </button>
                ) : (
                  <span className="text-red-500 font-bold">Item indisponível</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

ListaGibi.propTypes = {
  gibis: PropTypes.array.isRequired,
};

export default ListaGibi;
