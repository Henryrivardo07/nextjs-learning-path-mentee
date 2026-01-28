type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TodoDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Todo Detail Page</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-lg text-gray-700">
            Ini TODO Dengan{" "}
            <span className="font-bold text-red-500">ID :{id} </span>
          </p>
        </div>
      </div>
    </div>
  );
}
