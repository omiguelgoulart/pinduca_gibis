import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Toaster, toast } from 'sonner';

function ListaGibi({ gibis }) {
  const [, setGibiList] = useState(gibis);
  const [gibisFiltrados, setGibisFiltrados] = useState(gibis);

  useEffect(() => {
    setGibiList(gibis);
    setGibisFiltrados(gibis);
  }, [gibis]);

  

  function adicionarAoCarrinho(id) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const gibi = gibis.find((g) => g.id === id);

    if (gibi.estoque > 0) {
      const index = carrinho.findIndex((item) => item.id === id);
      if (index === -1) {
        carrinho.push({ ...gibi, estoque: 1 });
      } else {
        carrinho[index].estoque += 1;
      }

      const updatedGibis = gibis.map((item) =>
        item.id === id ? { ...item, estoque: item.estoque - 1 } : item
      );

      setGibiList(updatedGibis);
      setGibisFiltrados(updatedGibis);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));

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
      <Toaster position="top-right" richColors />
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
                    className="px-3 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
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
