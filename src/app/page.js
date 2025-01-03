import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="bg-blue-800 text-white p-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blogs</h2>
        <div className="space-x-4">
          <Link href="/login" className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600">
            Login
          </Link>
          
          
        </div>
      </div>
      <img src="https://cdn.pixabay.com/photo/2015/11/06/13/25/blog-1027861_640.jpg" alt="Restaurant" className="w-full h-[800px] object-contain"
    />

      <div className="p-6">
      </div>
    </>
  );
}
