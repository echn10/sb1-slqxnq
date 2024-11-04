import React, { useState } from 'react';
import { BookOpen, GraduationCap, Users } from 'lucide-react';

// Datos de ejemplo (simulando colecciones)
const PROFESORES = [
  { id: 1, nombre: "Dr. García", curso: "Programación" },
  { id: 2, nombre: "Dra. López", curso: "Matemática" },
  { id: 3, nombre: "Prof. Martínez", curso: "Contabilidad" },
  { id: 4, nombre: "Prof. Smith", curso: "Inglés" },
  { id: 5, nombre: "Dr. Rodríguez", curso: "Sociología" }
];

const CURSOS = [
  { id: 1, nombre: "Programación", profesor: "Dr. García", horario: "Lun-Mie 8:00-10:00" },
  { id: 2, nombre: "Matemática", profesor: "Dra. López", horario: "Mar-Jue 10:00-12:00" },
  { id: 3, nombre: "Contabilidad", profesor: "Prof. Martínez", horario: "Lun-Mie 14:00-16:00" },
  { id: 4, nombre: "Inglés", profesor: "Prof. Smith", horario: "Mar-Jue 14:00-16:00" },
  { id: 5, nombre: "Sociología", profesor: "Dr. Rodríguez", horario: "Vie 8:00-12:00" }
];

function App() {
  const [estudiante, setEstudiante] = useState({ codigo: '', nombre: '' });
  const [cursosMatriculados, setCursosMatriculados] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notas] = useState({
    'Programación': 15,
    'Matemática': 17,
    'Contabilidad': 16,
    'Inglés': 18,
    'Sociología': 15
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (estudiante.codigo && estudiante.nombre) {
      setIsLoggedIn(true);
    }
  };

  const matricularCurso = (curso) => {
    if (!cursosMatriculados.find(c => c.id === curso.id)) {
      setCursosMatriculados([...cursosMatriculados, curso]);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex justify-center mb-6">
            <GraduationCap className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Sistema Académico UNI
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Código de Estudiante</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={estudiante.codigo}
                onChange={(e) => setEstudiante({...estudiante, codigo: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={estudiante.nombre}
                onChange={(e) => setEstudiante({...estudiante, nombre: e.target.value})}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="font-bold text-lg">UNI Virtual</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>{estudiante.nombre}</span>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Cursos Disponibles</h2>
            <div className="space-y-4">
              {CURSOS.map(curso => (
                <div key={curso.id} className="border p-4 rounded-lg">
                  <h3 className="font-semibold">{curso.nombre}</h3>
                  <p className="text-sm text-gray-600">Profesor: {curso.profesor}</p>
                  <p className="text-sm text-gray-600">Horario: {curso.horario}</p>
                  <button
                    onClick={() => matricularCurso(curso)}
                    disabled={cursosMatriculados.find(c => c.id === curso.id)}
                    className="mt-2 bg-blue-600 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {cursosMatriculados.find(c => c.id === curso.id) ? 'Matriculado' : 'Matricular'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Mis Cursos Matriculados</h2>
              <div className="space-y-4">
                {cursosMatriculados.map(curso => (
                  <div key={curso.id} className="border p-4 rounded-lg">
                    <h3 className="font-semibold">{curso.nombre}</h3>
                    <p className="text-sm text-gray-600">Profesor: {curso.profesor}</p>
                    <p className="text-sm text-gray-600">Horario: {curso.horario}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Mis Notas</h2>
              <div className="space-y-2">
                {Object.entries(notas).map(([curso, nota]) => (
                  <div key={curso} className="flex justify-between items-center">
                    <span>{curso}</span>
                    <span className="font-semibold">{nota}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;