## Tentang Project Ini

Project ini adalah **learning project** yang dirancang khusus untuk memahami konsep-konsep fundamental Next.js melalui praktik langsung. Project ini mengimplementasikan aplikasi sederhana dengan fitur **Authentication (Login/Register)** dan **Todo Management**, yang akan membantu kalian memahami bagaimana Next.js bekerja dalam skenario dunia nyata.

---

## Konsep Next.js yang Dipelajari

### 1. **App Router Architecture**
Next.js menggunakan sistem routing berbasis folder. Setiap folder di dalam `app/` directory otomatis menjadi route. Ini seperti **peta gedung** - setiap ruangan (folder) memiliki alamat URL sendiri.

**Analogi**: Bayangkan Next.js seperti **gedung apartemen modern**:
- Setiap folder (`/login`, `/dashboard`) adalah **unit apartemen** dengan alamat unik
- File `page.tsx` adalah **pintu masuk** ke unit tersebut
- File `layout.tsx` adalah **struktur dasar gedung** yang membungkus semua unit

### 2. **Server Components vs Client Components**
Next.js membedakan komponen yang di-render di server dan di client. Ini seperti perbedaan antara **dapur restoran** (server) dan **meja pelanggan** (client).

**Analogi**: 
- **Server Components** (`page.tsx` tanpa `"use client"`) = **Dapur restoran** - semua persiapan dilakukan di belakang layar, pelanggan hanya menerima makanan siap saji (HTML)
- **Client Components** (`"use client"`) = **Meja pelanggan** - interaksi langsung, bisa memesan, mengubah pesanan, berinteraksi real-time

### 3. **Route Groups dengan Parentheses**
Folder dengan tanda kurung seperti `(auth)` dan `(todos)` adalah **route groups** - mereka mengorganisir route tanpa mempengaruhi URL.

**Analogi**: Seperti **folder di komputer** yang mengorganisir file tanpa mengubah nama file. Folder `(auth)` berisi `/login` dan `/register`, tapi URL tetap `/login` bukan `/auth/login`.

### 4. **Feature-Based Architecture**
Project ini menggunakan struktur **feature-based** - setiap fitur (auth, todos) memiliki folder sendiri dengan semua komponen, hooks, services, dan types-nya.

**Analogi**: Seperti **departemen di perusahaan**:
- `features/auth/` = Departemen HR (handle semua tentang authentication)
- `features/todos/` = Departemen Produksi (handle semua tentang todos)
- `shared/` = Departemen IT (tools dan utilities yang dipakai semua departemen)

### 5. **Custom Hooks untuk State Management**
Hook seperti `useAuth` dan `useTodos` adalah cara modern untuk mengelola state dan logic yang bisa digunakan ulang.

**Analogi**: Seperti **template resep masakan** - sekali dibuat, bisa dipakai berkali-kali di berbagai komponen tanpa harus menulis ulang kode yang sama.

### 6. **API Integration Layer**
File `api.ts` adalah **jembatan komunikasi** antara aplikasi frontend dengan backend API.

**Analogi**: Seperti **operator telepon** - menerima permintaan dari aplikasi, menghubungkan ke backend, dan mengembalikan hasilnya dengan format yang konsisten.

---

## 📁 Struktur Project

```
belajar_nextjs/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Route Group untuk authentication
│   │   │   ├── login/
│   │   │   │   └── page.tsx          # Halaman login (/login)
│   │   │   └── register/             # Halaman register (/register)
│   │   ├── (todos)/                  # Route Group untuk todos (belum diimplementasi)
│   │   ├── dashboard/
│   │   │   └── page.tsx              # Halaman dashboard (/dashboard)
│   │   ├── layout.tsx                # Root layout (membungkus semua halaman)
│   │   ├── page.tsx                  # Homepage (/)
│   │   └── globals.css               # Global styles
│   │
│   ├── features/                     # Feature-based architecture
│   │   ├── auth/                     # Feature Authentication
│   │   │   ├── components/           # Komponen UI untuk auth
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── RegisterForm.tsx
│   │   │   ├── hooks/                # Custom hooks
│   │   │   │   └── useAuth.ts        # Hook untuk manage auth state
│   │   │   ├── services/             # API service functions
│   │   │   │   └── authServices.ts   # Login & register API calls
│   │   │   └── types/                # TypeScript types
│   │   │       └── auth.ts           # Type definitions untuk auth
│   │   │
│   │   └── todos/                    # Feature Todos
│   │       ├── components/
│   │       │   ├── TodoCard.tsx
│   │       │   ├── TodoForm.tsx
│   │       │   └── TodoList.tsx
│   │       ├── hooks/
│   │       │   └── useTodos.ts
│   │       ├── services/
│   │       │   └── todoServices.ts
│   │       └── types/
│   │           └── todo.ts
│   │
│   └── shared/                       # Shared resources
│       ├── components/               # Reusable UI components
│       │   └── ui/
│       │       ├── Button.tsx        # Button component dengan variants
│       │       └── Input.tsx         # Input component dengan label
│       └── lib/                      # Utility functions
│           ├── api.ts                # API request helpers
│           ├── auth.ts               # Auth utilities (localStorage, cookies)
│           └── server-auth.ts        # Server-side auth utilities
│
├── public/                           # Static files (images, icons, etc.)
├── package.json                      # Dependencies dan scripts
├── tsconfig.json                     # TypeScript configuration
└── next.config.ts                    # Next.js configuration
```

---

## Konsep Penting yang Harus Dipahami

### **1. File-Based Routing**
- Setiap `page.tsx` = satu route
- Folder `app/login/page.tsx` = route `/login`
- Folder `app/dashboard/page.tsx` = route `/dashboard`

### **2. Layout System**
- `layout.tsx` membungkus semua halaman di dalam folder tersebut
- Root `layout.tsx` membungkus seluruh aplikasi
- Berguna untuk shared UI seperti navbar, footer, atau provider

### **3. Client vs Server Components**
- **Default = Server Component** (lebih cepat, SEO-friendly)
- Tambahkan `"use client"` di baris pertama untuk Client Component
- Client Component untuk: state management, event handlers, browser APIs

### **4. Path Aliases**
- `@/` mengarah ke folder `src/`
- Contoh: `@/features/auth` = `src/features/auth`
- Dikonfigurasi di `tsconfig.json`

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ terinstall
- npm atau yarn atau pnpm

### Langkah-langkah

1. **Clone repository**
```bash
git clone <repository-url>
cd belajar_nextjs
```

2. **Install dependencies**
```bash
npm install
# atau
yarn install
# atau
pnpm install
```

3. **Setup Environment Variables**
Buat file `.env.local` di root project:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```
*(Sesuaikan dengan URL backend API kalian)*

4. **Jalankan development server**
```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

5. **Buka browser**
Akses [http://localhost:3000](http://localhost:3000)

---

## Fitur yang Diimplementasikan

### ✅ Authentication
- Login form dengan validasi
- Register form (struktur sudah ada)
- Token management (localStorage + cookies)
- Protected routes (redirect ke login jika belum auth)
- Custom hook `useAuth` untuk state management

### 🚧 Todos (Struktur sudah ada, implementasi bisa dilanjutkan)
- [ ] Todo list display
- [ ] Create todo
- [ ] Update todo
- [ ] Delete todo
- [ ] Mark as complete

---

## 🎓 Learning Path untuk Mentee

### **Level 1: Understanding Structure** (Pemula)
1. Pahami struktur folder dan routing
2. Pelajari perbedaan Server vs Client Components
3. Eksplorasi file `layout.tsx` dan `page.tsx`

### **Level 2: Feature Implementation** (Intermediate)
1. Pelajari custom hooks (`useAuth.ts`)
2. Pahami API integration layer (`api.ts`)
3. Implementasi fitur todos yang belum selesai

### **Level 3: Advanced Concepts** (Advanced)
1. Server-side authentication dengan cookies
2. Optimasi performance dengan Next.js features
3. Error handling dan loading states

---

## Tips untuk Mentee

1. **Jangan terburu-buru** - Pahami setiap konsep sebelum lanjut ke berikutnya
2. **Baca kode dengan teliti** - Setiap file punya tujuan spesifik
3. **Coba modifikasi** - Ubah sesuatu dan lihat apa yang terjadi
4. **Gunakan TypeScript** - Type safety membantu menemukan error lebih cepat
5. **Ikuti struktur yang ada** - Feature-based architecture memudahkan maintenance

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## Notes

- Project ini menggunakan **Next.js 16** dengan **App Router**
- Styling menggunakan **Tailwind CSS v4**
- TypeScript untuk type safety
- Feature-based architecture untuk scalability

---

**Happy Learning! 🎉**

*Project ini dibuat untuk pembelajaran. Jangan ragu untuk bertanya jika ada yang kurang jelas! - Mentor Henry Rivardo*
