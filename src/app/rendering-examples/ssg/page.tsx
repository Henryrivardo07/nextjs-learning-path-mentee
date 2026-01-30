/**
 * SSG - Static Site Generation
 * 
 * Konsep: Generate di BUILD TIME
 * - HTML sudah siap sebelum user request
 * - Sangat cepat (dari CDN)
 * - Cocok untuk: Blog, dokumentasi, landing pages
 */

import axios from 'axios';
import { getServerToken } from '@/shared/lib/server-auth';
import type { Todo } from '@/features/todos/types/todo';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// ISR: Revalidate setiap 1 jam (optional)
// export const revalidate = 3600;

export default async function SSGPage() {
  let todos: Todo[] = [];
  let needsAuth = false;

  try {
    const token = await getServerToken();
    
    const response = await axios.get(`${API_URL}/todos?page=1&limit=10&order=asc`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      // next: { revalidate: 3600 } = ISR (regenerate setiap 1 jam)
    });
    
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
        <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6 rounded">
          <h1 className="text-2xl font-bold text-green-800 mb-2">SSG - Static Site Generation</h1>
          <p className="text-green-700 text-sm">
            Generate di <strong>BUILD TIME</strong>. 
            HTML sudah ready → sangat cepat! 
            Buka Network tab → tidak ada API call saat page load.
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
          <p className="font-semibold mb-2">Kapan pakai SSG?</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Blog posts atau artikel</li>
            <li>Dokumentasi</li>
            <li>Landing pages</li>
            <li>Content yang jarang berubah</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
