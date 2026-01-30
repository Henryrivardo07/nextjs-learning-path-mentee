/**
 * CSR - Client-Side Rendering
 * 
 * Konsep: Render di BROWSER (client)
 * - Data di-fetch setelah JavaScript load
 * - Cocok untuk: Interactive dashboards
 */

'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '@/shared/lib/auth';
import type { Todo } from '@/features/todos/types/todo';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function CSRPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [needsAuth, setNeedsAuth] = useState(false);

  useEffect(() => {
    async function fetchTodos() {
      try {
        setIsLoading(true);
        const token = getToken();
        
        const response = await axios.get(`${API_URL}/todos?page=1&limit=10&order=asc`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        
        const data = response.data;
        setTodos(data.success && data.data?.todos ? data.data.todos : []);
        setNeedsAuth(false);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          setNeedsAuth(true);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-purple-100 border-l-4 border-purple-500 p-4 mb-6 rounded">
          <h1 className="text-2xl font-bold text-purple-800 mb-2">CSR - Client-Side Rendering</h1>
          <p className="text-purple-700 text-sm">
            Render di <strong>BROWSER</strong>. 
            Buka Network tab → lihat API call terjadi setelah page load.
            Perhatikan loading state!
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-3 text-gray-600">Loading todos...</p>
          </div>
        ) : (
          <>
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
          </>
        )}

        {/* Info Box */}
        <div className="mt-6 bg-gray-100 p-4 rounded text-sm">
          <p className="font-semibold mb-2">Kapan pakai CSR?</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Interactive dashboards</li>
            <li>User-specific content (tidak perlu SEO)</li>
            <li>Aplikasi yang sangat interaktif</li>
          </ul>
          <p className="mt-2 text-xs text-gray-600">
            ⚠️ SEO kurang optimal karena content tidak ada di HTML awal.
          </p>
        </div>
      </div>
    </div>
  );
}
