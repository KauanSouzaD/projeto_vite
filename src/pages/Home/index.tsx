import { Link } from "react-router-dom";
import "../../App.css";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">✓</span>
            </div>
            <h1 className="text-xl font-bold text-blue-600">TaskFlow</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-medium transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium transition"
            >
              Registrar
            </Link>
          </div>
        </div>
      </header>
      <section className="px-6 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Organize suas tarefas com TaskFlow
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Sistema completo de agendamento de tarefas para você gerenciar seu
          tempo de forma eficiente. Planeje, organize e acompanhe todas as suas
          atividades em um só lugar.
        </p>
        <Link
          to="/Register"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold text-lg transition shadow-lg"
        >
          Começar Agora
        </Link>
      </section>

      <section className="px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-2xl p-8 shadow-sm border text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Agendamento Fácil
            </h3>
            <p className="text-gray-600">
              Crie e organize suas tarefas com apenas alguns cliques
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Lembretes 
            </h3>
            <p className="text-gray-600">
              Nunca esqueça uma tarefa importante com nossos lembretes
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Acompanhamento
            </h3>
            <p className="text-gray-600">
              Visualize seu progresso e complete suas metas diárias
            </p>
          </div>
        </div>
      </section>
      <section className="px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">
          Recursos do TaskFlow
        </h2>
        <p className="text-gray-600 text-lg">
          Tudo que você precisa para gerenciar suas tarefas de forma
          profissional
        </p>
      </section>
    </div>
  );
}
