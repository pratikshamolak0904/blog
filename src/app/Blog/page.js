// "use client";
// import { useActionState, useState } from "react";
// export default function Blog() {
//   const [isPending, setPending] = useState(false);
//   const onBlog = (previousState, formData) => {
//     setPending(true);
//     setTimeout(() => {
//       let fullName = formData.get("fullName");
//       let userName = formData.get("userName");
//       let title = formData.get("title");
//       let type = formData.get("type");
//       let content = formData.get("content");

//       setPending(false);
//       console.log(fullName, userName, title, type, content);
//     }, 2000);
//   };
//   const [data, action] = useActionState(onBlog, null);
//   return (
//     <>
//       <div className="flex items-center justify-center min-h-screen px-7">
//         <div className="overflow-hidden w-full max-w-xl">
//           <form
//             action={action}
//             autoComplete="off"
//             className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-xl shadow-2xl p-8"
//           >
//             <h2 className="my-4 text-3xl text-center font-bold text-white-800">ADD BLOG</h2>

//             <div className="mb-6">
//               <label className="text-white font-bold block mb-1 text-sm">Fullname</label>
//               <input
//                 disabled={isPending}
//                 name="fullName"
//                 type="text"
//                 placeholder="Abc Pqr Xyz"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
//               />
//             </div>

//             <div className="mb-6">
//               <label className="text-white font-bold block mb-1 text-sm">Username</label>
//               <input
//                 disabled={isPending}
//                 name="userName"
//                 type="email"
//                 placeholder="email-Id"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
//               />
//             </div>

//             <div className="mb-6">
//               <label className="text-white font-bold block mb-1 text-sm">Title</label>
//               <input
//                 disabled={isPending}
//                 name="title"
//                 type="text"
//                 placeholder="Title of Blog"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
//               />
//             </div>

//             <div className="mb-6">
//               <label className="text-white font-bold block mb-1 text-sm">Type</label>
//               <input
//                 disabled={isPending}
//                 name="type"
//                 type="text"
//                 placeholder="Education, Agriculture, Lifestyle, etc..."
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
//               />
//             </div>

//             <div className="mb-6">
//               <label className="text-white font-bold block mb-1 text-sm">Content</label>
//               <textarea
//                 disabled={isPending}
//                 name="content"
//                 placeholder="Start writing your blog here..."
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
//                 rows="6"
//               />
//             </div>
//             <button
//               disabled={isPending}
//               type="submit"
//               className="disabled:cursor-not-allowed disabled:bg-gray-300 w-full py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white text-center rounded-lg transition duration-300 hover:from-orange-500 hover:to-teal-600 active:scale-95"
//             >
//               Submit Blog
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }
