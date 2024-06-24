import Modal from "react-responsive-modal"
import Carrinho from "./Carrinho"
import { useState } from "react"
import { RiShoppingCart2Line } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import ModalPesquisa from "./ModalPesquisa";

function Header() {
  const [open, setOpen] = useState(false);
  const [pesquisa, setPesquisa] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const openPesquisa = () => setPesquisa(true);
  const closePesquisa = () => setPesquisa(false);
    return (
      <div>
        <div>
      <div className="flex bg-cyan-700 text-white items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <img src="./logo.png" alt="Logo" className="h-16 m-2 pr-4" />
          <div className="text-center">
            <h1 className="text-2xl">Pinduca Gibis</h1>
            <h2>A Melhor Loja da Avenida</h2>
          </div>
        </div>
  <div className="flex items-center space-x-4">
    <input
      type="text"
      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Buscar produtos"
    />
    <button onClick={openPesquisa} className="px-4 py-2 bg-cyan-700 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <FaSearch />
    </button>
  </div>
  <button
    className="px-8 py-4 bg-cyan-700 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    onClick={onOpenModal}
  >
    <RiShoppingCart2Line />
  </button>

</div>
        </div>
      <Modal open={open} onClose={onCloseModal} center>
        <Carrinho />
      </Modal>
      <Modal open={pesquisa} onClose={closePesquisa} center>
        <ModalPesquisa />
      </Modal>
    </div>
  
    )
  }
  
  export default Header