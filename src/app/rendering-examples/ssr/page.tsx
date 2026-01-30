/**
 * SSR - Server-Side Rendering
 * 
 * Konsep: Render di SERVER setiap request
 * - Data selalu fresh
 * - SEO friendly
 * - Cocok untuk: Dashboard, data real-time
 */

import axios from 'axios';
import { getServerToken } from '@/shared/lib/server-auth';
import type { Todo } from '@/features/todos/types/todo';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default async function SSRPage() {
  let todos: Todo[] = [];
  let needsAuth = false;

  try {
    const token = await getServerToken();
    
    const response = await axios.get(`${API_URL}/todos?page=1&limit=10&order=asc`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      // cache: 'no-store' = SSR (fetch setiap request)
    });
    
    // Handle response structure
    const data = response.data;
    todos = data.success && data.data?.todos ? data.data.todos : [];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      needsAuth = true;
    }
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-6 rounded">
          <h1 className="text-2xl font-bold text-blue-800 mb-2">SSR - Server-Side Rendering</h1>
          <p className="text-blue-700 text-sm">
            Render di <strong>SERVER</strong> setiap request. 
            Buka Network tab → lihat fetch terjadi saat page load.
          </p>
        </div>

        {/* Auth Warning */}
        {needsAuth && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
            Silakan <a href="/login" className="underline font-semibold">login</a> untuk melihat data.
          </div>
        )}

        {/* Todo List */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Todos ({todos.length})</h2>
          {todos.length === 0 ? (
            <p className="text-gray-500">No todos found</p>
          ) : (
            <ul className="space-y-2">
              {todos.map((todo) => (
                <li key={todo.id} className="p-3 border rounded flex items-center gap-3">
                  <input type="checkbox" checked={todo.completed} readOnly className="w-4 h-4" />
                  <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                    {todo.title}
                  </span>
                  <span className={`ml-auto px-2 py-1 rounded text-xs ${
                    todo.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                    todo.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {todo.priority}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-gray-100 p-4 rounded text-sm">
          <p className="font-semibold mb-2">Kapan pakai SSR?</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Data real-time yang sering berubah</li>
            <li>User-specific content</li>
            <li>Perlu SEO tapi data dinamis</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
