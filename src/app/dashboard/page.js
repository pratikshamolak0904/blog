"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

export default function Dashboard() {
  const [data, setData] = useState(JSON.parse(Cookies.get("user")));
  const [isPending, setPending] = useState(false);
  const [isShow, setShow] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [product, setProduct] = useState([]);
  const [updateId, setUpdateId] = useState("");
  const [actionStatus, setActionStatus] = useState("add");

  const getProduct = () => {
    setTimeout(async () => {
      const res = await axios.get("/api/product");
      const resData = res.data;
      if (resData.status) {
        setProduct(resData.message);
      }
    }, 500);
  };

  const onBlogSubmit = (formData) => {
    if (actionStatus === "add") {
      setTimeout(async () => {
        const res = await axios.post("/api/product", formData);
        const resData = res.data;
        if (resData.status) {
          toast.success(resData.message);
          reset();
          onToggle();
          getProduct();
          setActionStatus("add");
        } else {
          toast.error(resData.message);
        }
      }, 1000);
    } else {
      setTimeout(async () => {
        const updatedData = {
          id: updateId,
          fullname: formData.fullname,
          username: formData.username,
          title: formData.title,
          type: formData.type,
          content: formData.content,
        };
        const res = await axios.put("/api/product", updatedData);
        const resData = res.data;
        if (resData.status) {
          toast.success(resData.message);
          reset();
          onToggle();
          getProduct();
          setActionStatus("add");
        } else {
          toast.error(resData.message);
        }
      }, 1000);
    }
  };

  const onToggle = () => {
    setShow((prevState) => !prevState);
  };

  const onDelete = async (id) => {
    const res = await axios.delete("/api/product", { data: { id } });
    const resData = res.data;
    if (resData.status) {
      toast.success(resData.message);
      getProduct();
    } else {
      toast.error(resData.message);
    }
  };

  const onUpdate = (item) => {
    setValue("fullname", item.fullname);
    setValue("username", item.username);
    setValue("title", item.title);
    setValue("type", item.type);
    setValue("content", item.content);
    onToggle();
    setActionStatus("update");
    setUpdateId(item._id);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-gray-300 w-100 min-h-screen">
        <div className="w-100 py-6 px-10 bg-white flex align-center justify-between shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Welcome, {data.username}
          </h2>
          <button
            className={`p-2 rounded border text-sm font-bold text-purple-900 border-1 border-purple-800 transition 
              duration-0.25s hover:bg-purple-900 hover:text-white active:scale-95 
              ${isShow ? "bg-white-900" : "bg-purple"}`}
            onClick={onToggle}
          >
            {actionStatus === "add" ? "Add Blog" : "Update Blog"}
          </button>
        </div>
        {isShow && (
          <form
            onSubmit={handleSubmit(onBlogSubmit)}
            className="bg-white w-1/3 p-5 my-10 mx-auto rounded shadow-lg"
          >
            <h2 className="text-lg font-bold">
              {actionStatus === "add" ? "Add Blog(s)" : "Update Blog"}
            </h2>
            <div className="my-4">
              <label className="text-gray-500 text-sm">Fullname</label>
              <input
                {...register("fullname")}
                required
                disabled={isPending}
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 border rounded-lg focus:border-teal-500 focus:ring-teal-500 transition"
              />
            </div>
            <div className="my-4">
              <label className="text-gray-500 text-sm">Username</label>
              <input
                {...register("username")}
                required
                disabled={isPending}
                type="email"
                placeholder="Username"
                className="w-full px-4 py-3 border rounded-lg focus:border-teal-500 focus:ring-teal-500 transition"
              />
            </div>
            <div className="my-4">
              <label className="text-gray-500 text-sm">Title</label>
              <input
                {...register("title")}
                required
                disabled={isPending}
                type="text"
                placeholder="Title"
                className="w-full px-4 py-3 border rounded-lg focus:border-teal-500 focus:ring-teal-500 transition"
              />
            </div>
            <div className="my-4">
              <label className="text-gray-500 text-sm">Type</label>
              <input
                {...register("type")}
                required
                disabled={isPending}
                type="text"
                placeholder="Type"
                className="w-full px-4 py-3 border rounded-lg focus:border-teal-500 focus:ring-teal-500 transition"
              />
            </div>
            <div className="my-4">
              <label className="text-gray-500 text-sm">Content</label>
              <input
                {...register("content")}
                required
                disabled={isPending}
                type="text"
                placeholder="Content"
                className="w-full px-4 py-3 border rounded-lg focus:border-teal-500 focus:ring-teal-500 transition"
              />
            </div>
            <button
              disabled={isPending}
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg transition hover:from-orange-500 hover:to-teal-600"
            >
              {actionStatus === "add" ? "Add Blog" : "Update Blog"}
            </button>
          </form>
        )}
        {!isShow && (
          <div className="grid grid-cols-1 md:grid-cols-3 my-5 mx-5 gap-4">
            {product.length === 0 ? (
              <p className="text-center col-span-3">No Products Available</p>
            ) : (
              product.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-5 hover:shadow-xl transition mx-auto"
                  style={{ maxWidth: "400px" }}
                >
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-bold-600 text-gap">Fullname: {item.fullname}</p>
                  <p className="text-sm text-bold-600 text-gap">Username: {item.username}</p>
                  <p className="text-sm text-bold-600 text-gap">Type:     {item.type}</p>
                  <p className="text-sm text-bold-600 text-gap">Content:  {item.content}</p>
                  <div className="flex justify-between mt-4">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                      onClick={() => onUpdate(item)}
                    >
                      Update
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded"
                      onClick={() => onDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}
