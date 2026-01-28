/**
 * Rendering Examples - Index Page
 * Halaman utama untuk navigasi ke contoh SSR, SSG, dan CSR
 */

import Link from "next/link";

export default function RenderingExamplesPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Rendering Strategies Demo
          </h1>
          <p className="text-lg text-gray-600">
            Pelajari perbedaan antara SSR, SSG, dan CSR dengan contoh praktis
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* SSR Card */}
          <Link
            href="/rendering-examples/ssr"
            className="block bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-blue-500"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🔄</span>
              </div>
              <h2 className="text-xl font-bold text-blue-800">SSR</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Server-Side Rendering</strong>
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>✅ Render di server setiap request</li>
              <li>✅ Data selalu fresh</li>
              <li>✅ SEO friendly</li>
              <li>⚠️ Lebih lambat</li>
            </ul>
            <div className="mt-4 text-blue-600 text-sm font-medium">
              Lihat contoh →
            </div>
          </Link>

          {/* SSG Card */}
          <Link
            href="/rendering-examples/ssg"
            className="block bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-green-500"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <h2 className="text-xl font-bold text-green-800">SSG</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Static Site Generation</strong>
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>✅ Generate saat build time</li>
              <li>✅ Sangat cepat</li>
              <li>✅ SEO friendly</li>
              <li>⚠️ Data bisa stale</li>
            </ul>
            <div className="mt-4 text-green-600 text-sm font-medium">
              Lihat contoh →
            </div>
          </Link>

          {/* CSR Card */}
          <Link
            href="/rendering-examples/csr"
            className="block bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-purple-500"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💻</span>
              </div>
              <h2 className="text-xl font-bold text-purple-800">CSR</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Client-Side Rendering</strong>
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>✅ Render di browser</li>
              <li>✅ Sangat interaktif</li>
              <li>✅ Load server rendah</li>
              <li>⚠️ SEO kurang optimal</li>
            </ul>
            <div className="mt-4 text-purple-600 text-sm font-medium">
              Lihat contoh →
            </div>
          </Link>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-3">
            Cara Menguji Perbedaannya:
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li>
              Buka <strong>DevTools</strong> (F12) → Tab{" "}
              <strong>Network</strong>
            </li>
            <li>Kunjungi masing-masing halaman (SSR, SSG, CSR)</li>
            <li>
              Perhatikan:
              <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                <li>
                  <strong>SSR:</strong> API call terjadi saat page load (di
                  server)
                </li>
                <li>
                  <strong>SSG:</strong> Tidak ada API call (data sudah di HTML)
                </li>
                <li>
                  <strong>CSR:</strong> API call terjadi setelah JavaScript load
                  (di browser)
                </li>
              </ul>
            </li>
            <li>
              Lihat <strong>View Page Source</strong> untuk melihat HTML yang
              dikirim
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
