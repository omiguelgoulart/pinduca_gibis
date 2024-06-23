import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";

class Gibi {
  constructor(id, titulo, descricao, foto, editora, preco, estoque) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.foto = foto;
    this.editora = editora;
    this.preco = preco;
    this.estoque = estoque;
  }
}

function FormGibi() {
  const { register, handleSubmit, setFocus, reset } = useForm();
  const [, setGibiList] = useState([]);

  function cadastraGibi(data) {
    // Gerar ID único para o gibi
    const id = Date.now(); // Usando timestamp como ID único (você pode ajustar conforme necessário)

    const novaEntrada = new Gibi(
      id,
      data.titulo,
      data.descricao,
      data.foto,
      data.editora,
      parseFloat(data.preco),
      parseInt(data.estoque)
    );

    const entradaExistente = JSON.parse(localStorage.getItem("gibis")) || [];
    const entradaAtualizada = [...entradaExistente, novaEntrada];
    localStorage.setItem("gibis", JSON.stringify(entradaAtualizada));

    setGibiList(entradaAtualizada); // Atualiza o estado local (opcional, dependendo da sua aplicação)
    setFocus("titulo");
    toast.success("Gibi cadastrado com sucesso!");
    reset();
  }
function refreshPage() {
    window.location.reload();
}


  return (
    <form onSubmit={handleSubmit(cadastraGibi)} className="p-4 bg-blue-50">
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="font-bold text-base">Título:</label>
          <input
            type="text"
            {...register("titulo", { required: true })}
            className="p-2 text-base border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="font-bold text-base">Descrição:</label>
          <input
            type="text"
            {...register("descricao", { required: true })}
            className="p-2 text-base border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="font-bold text-base">Foto:</label>
          <input
            type="text"
            {...register("foto", { required: true })}
            className="p-2 text-base border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="font-bold text-base">Editora:</label>
          <select
            {...register("editora", { required: true })}
            className="p-2 text-base border border-gray-300 rounded-md w-full"
          >
            <option value="">Selecione a Editora</option>
            <option value="disney">Disney</option>
            <option value="marvel">Marvel Comics</option>
            <option value="dc">DC Comics</option>
            <option value="panini">Panini Comics</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="font-bold text-base">Preço:</label>
          <input
            type="number"
            step="0.01"
            {...register("preco", { required: true })}
            className="p-2 text-base border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="font-bold text-base">Estoque:</label>
          <input
            type="number"
            {...register("estoque", { required: true })}
            className="p-2 text-base border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <button onClick={refreshPage}
            type="submit"
            className="px-3 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
          >
            Cadastrar
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormGibi;
