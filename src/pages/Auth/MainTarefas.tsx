import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import "../../App.css";

interface Tarefa {
  id: string;
  titulo: string;
  descricao: string;
  concluida: boolean;
  criadaEm: string;
}

export default function MainTarefas() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [novaTarefa, setNovaTarefa] = useState("");
  const [descricao, setDescricao] = useState("");
  const [filtroAtivo, setFiltroAtivo] = useState<
    "todas" | "ativas" | "concluidas"
  >("todas");
  const [alerta, setAlerta] = useState<{
    tipo: "sucesso" | "erro";
    mensagem: string;
  } | null>(null);
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

 
  useEffect(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    if (tarefasSalvas) {
      setTarefas(JSON.parse(tarefasSalvas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  if (!auth) throw new Error("AuthContext not found");

  function handleLogout() {
    auth.logout();
    navigate("/", { replace: true });
  }

  function handleAdicionarTarefa() {
    if (!novaTarefa.trim()) {
      setAlerta({
        tipo: "erro",
        mensagem: "Digite o título da tarefa",
      });
      setTimeout(() => setAlerta(null), 3000);
      return;
    }

    const novaTarefaObj: Tarefa = {
      id: Date.now().toString(),
      titulo: novaTarefa,
      descricao: descricao,
      concluida: false,
      criadaEm: new Date().toISOString(),
    };

    setTarefas([...tarefas, novaTarefaObj]);
    setAlerta({
      tipo: "sucesso",
      mensagem: "Tarefa adicionada com sucesso!",
    });
    setTimeout(() => setAlerta(null), 3000);
    setNovaTarefa("");
    setDescricao("");
  }

  function toggleTarefa(id: string) {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    );
  }

  function deletarTarefa(id: string) {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  }

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtroAtivo === "ativas") return !tarefa.concluida;
    if (filtroAtivo === "concluidas") return tarefa.concluida;
    return true;
  });

  const totalTarefas = tarefas.length;
  const tarefasConcluidas = tarefas.filter((t) => t.concluida).length;
  const tarefasAtivas = totalTarefas - tarefasConcluidas;

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
        {/* Alerta */}
        {alerta && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
              alerta.tipo === "sucesso"
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <span className="text-2xl">
              {alerta.tipo === "sucesso" ? "✓" : "⚠"}
            </span>
            <span
              className={`font-medium ${
                alerta.tipo === "sucesso" ? "text-green-800" : "text-red-800"
              }`}
            >
              {alerta.mensagem}
            </span>
          </div>
        )}

        {/* Título e contador */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Minhas Tarefas</h2>
          <p className="text-gray-600 mt-1">
            {tarefasConcluidas} de {totalTarefas} concluídas
          </p>
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
              Todas ({totalTarefas})
            </button>
            <button
              onClick={() => setFiltroAtivo("ativas")}
              className={`flex-1 py-3 px-4 font-medium transition ${
                filtroAtivo === "ativas"
                  ? "bg-white text-blue-600 border-b-2 border-blue-600"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Ativas ({tarefasAtivas})
            </button>
            <button
              onClick={() => setFiltroAtivo("concluidas")}
              className={`flex-1 py-3 px-4 font-medium transition ${
                filtroAtivo === "concluidas"
                  ? "bg-white text-blue-600 border-b-2 border-blue-600"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Concluídas ({tarefasConcluidas})
            </button>
          </div>
        </div>

        {/* Lista de Tarefas */}
        {tarefasFiltradas.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">Nenhuma tarefa ainda</p>
            <p className="text-sm mt-2">Adicione sua primeira tarefa acima</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tarefasFiltradas.map((tarefa) => (
              <div
                key={tarefa.id}
                className="bg-white rounded-lg shadow-sm border p-4 flex items-start space-x-3"
              >
                <input
                  type="checkbox"
                  checked={tarefa.concluida}
                  onChange={() => toggleTarefa(tarefa.id)}
                  className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <div className="flex-1">
                  <h3
                    className={`font-medium text-gray-900 ${
                      tarefa.concluida ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {tarefa.titulo}
                  </h3>
                  {tarefa.descricao && (
                    <p
                      className={`text-sm text-gray-600 mt-1 ${
                        tarefa.concluida ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {tarefa.descricao}
                    </p>
                  )}
                  <span className="text-xs text-gray-400 mt-2 inline-block">
                    {new Date(tarefa.criadaEm).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <button
                  onClick={() => deletarTarefa(tarefa.id)}
                  className="text-red-500 hover:text-red-700 transition p-1"
                  title="Deletar tarefa"
                >
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
