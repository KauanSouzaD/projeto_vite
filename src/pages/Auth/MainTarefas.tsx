import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import "../../App.css";

interface Tarefa {
  id: string;
  titulo: string;
  descricao: string;
  concluida: boolean;
}

export default function MainTarefas() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [filtro, setFiltro] = useState("todas");
  const [alerta, setAlerta] = useState<{
    tipo: "sucesso" | "erro";
    mensagem: string;
  } | null>(null);
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  if (!auth) throw new Error("AuthContext not found");

  function mostrarAlerta(tipo: "sucesso" | "erro", mensagem: string) {
    setAlerta({ tipo, mensagem });
    setTimeout(() => setAlerta(null), 3000);
  }

  function handleLogout() {
    auth?.logout();
    navigate("/", { replace: true });
  }

  function adicionarTarefa() {
    if (!titulo.trim()) {
      return mostrarAlerta("erro", "Escreva o título da tarefa.");
    }

    const novaTarefa = {
      id: Date.now().toString(),
      titulo,
      descricao,
      concluida: false,
    };

    setTarefas([...tarefas, novaTarefa]);
    setTitulo("");
    setDescricao("");
    mostrarAlerta("sucesso", "Tarefa adicionada!");
  }

  function alternarStatus(id: string) {
    setTarefas(
      tarefas.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t))
    );
  }

  function excluirTarefa(id: string) {
    setTarefas(tarefas.filter((t) => t.id !== id));
  }

  const tarefasFiltradas = tarefas.filter((t) => {
    if (filtro === "ativas") return !t.concluida;
    if (filtro === "concluidas") return t.concluida;
    return true;
  });

 
  const getFiltroBtnClass = (name: string) =>
    `px-3 py-1 rounded transition-colors ${
      filtro === name ? "text-blue-600 font-medium" : "text-gray-700"
    } hover:text-blue-600`;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
             TaskFlow</h1>
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-500">{auth.user?.email}</p>
          <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium shadow-sm"
            >
              Sair
            </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4">
        {alerta && (
          <div
            className={`p-2 rounded mb-3 ${
              alerta.tipo === "sucesso" ? "bg-green-200" : "bg-red-200"
            }`}
          >
            {alerta.mensagem}
          </div>
        )}

        <div className="bg-white rounded shadow p-4 mb-4">
          <h2 className="font-bold text-lg mb-2">Nova Tarefa</h2>
          <input
            className="w-full border-2 border-gray-200 p-3 mb-3 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            placeholder="Título da tarefa..."
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <textarea
            className="w-full border-2 border-gray-200 p-3 mb-4 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200 min-h-[100px] resize-none"
            placeholder="Descrição (opcional)..."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />


          <button
            onClick={adicionarTarefa}
            className="bg-blue-600 text-white w-full py-2 rounded"
          >
            Adicionar Tarefa
          </button>
        </div>

        <div className="flex justify-around bg-white rounded shadow p-2 mb-4">
          <button
            className={getFiltroBtnClass("todas")}
            onClick={() => setFiltro("todas")}
            aria-pressed={filtro === "todas"}
          >
            Todas
          </button>
          <button
            className={getFiltroBtnClass("ativas")}
            onClick={() => setFiltro("ativas")}
            aria-pressed={filtro === "ativas"}
          >
            Ativas
          </button>
          <button
            className={getFiltroBtnClass("concluidas")}
            onClick={() => setFiltro("concluidas")}
            aria-pressed={filtro === "concluidas"}
          >
            Concluídas
          </button>
        </div>

        <div className="bg-white rounded shadow p-4">
          {tarefasFiltradas.length === 0 ? (
            <p className="text-center text-gray-500">Nenhuma tarefa.</p>
          ) : (
            tarefasFiltradas.map((t) => (
              <div
                key={t.id}
                className="flex justify-between items-center border-b p-2"
              >
                <div className="text-gray-900">
                  <input
                    type="checkbox"
                    checked={t.concluida}
                    onChange={() => alternarStatus(t.id)}
                    className="mt-2 mr-2 w-3 h-3 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className={t.concluida ? "line-through" : ""}>
                    {t.titulo}
                  </span>
                  <span className={t.concluida ? "line-through" : ""}>
                    {t.descricao && ` - ${t.descricao}`}
                  </span>
                </div>

                <button
                  onClick={() => excluirTarefa(t.id)}
                  className="text-red-600"
                >
                  excluir
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
