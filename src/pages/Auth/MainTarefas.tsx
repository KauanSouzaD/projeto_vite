import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import "../../App.css";

export default function MainTarefas() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [novaTarefa, setNovaTarefa] = useState("");
  const [descricao, setDescricao] = useState("");
  const [filtroAtivo, setFiltroAtivo] = useState<
    "todas" | "ativas" | "concluidas"
  >("todas");

  if (!auth) throw new Error("AuthContext not found");

  function handleLogout() {
    auth.logout();
    navigate("/", { replace: true });
  }

  function handleAdicionarTarefa() {
    if (!novaTarefa.trim()) {
      alert("Digite o título da tarefa");
      return;
    }
    // Lógica para adicionar tarefa
    console.log("Nova tarefa:", novaTarefa, descricao);
    setNovaTarefa("");
    setDescricao("");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">📝</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
              <p className="text-sm text-gray-500">
                {auth.user?.email || "ks0520512@gmail.com"}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition"
          >
            <span className="text-sm font-medium">Sair</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Título e contador */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Minhas Tarefas</h2>
          <p className="text-gray-600 mt-1">0 de 0 concluídas</p>
        </div>

        {/* Card de Nova Tarefa */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <input
            type="text"
            placeholder="Nova tarefa..."
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
          />

          <textarea
            placeholder="Descrição (opcional)"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none text-gray-900"
          />

          <button
            onClick={handleAdicionarTarefa}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center space-x-2"
          >
            <span className="text-xl">+</span>
            <span>Adicionar Tarefa</span>
          </button>
        </div>

        {/* Abas de Filtro */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-6">
          <div className="flex">
            <button
              onClick={() => setFiltroAtivo("todas")}
              className={`flex-1 py-3 px-4 font-medium transition ${
                filtroAtivo === "todas"
                  ? "bg-white text-blue-600 border-b-2 border-blue-600"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Todas (0)
            </button>
            <button
              onClick={() => setFiltroAtivo("ativas")}
              className={`flex-1 py-3 px-4 font-medium transition ${
                filtroAtivo === "ativas"
                  ? "bg-white text-blue-600 border-b-2 border-blue-600"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Ativas (0)
            </button>
            <button
              onClick={() => setFiltroAtivo("concluidas")}
              className={`flex-1 py-3 px-4 font-medium transition ${
                filtroAtivo === "concluidas"
                  ? "bg-white text-blue-600 border-b-2 border-blue-600"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Concluídas (0)
            </button>
          </div>
        </div>

        {/* Lista de Tarefas (vazia por enquanto) */}
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg">Nenhuma tarefa ainda</p>
          <p className="text-sm mt-2">Adicione sua primeira tarefa acima</p>
        </div>
      </main>
    </div>
  );
}
