import "./newBlog.scss";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/adminNavbar/AdminNavbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  useAddPostMutation,
  useGetAllCategoryQuery,
} from "../../../services/postApi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NewBlog = () => {
  const [imagePrev, setImagePrev] = useState("");
  const [content, setContent] = useState("");
  const [post, setPost] = useState({
    title: "",
    file: "",
    category: "",
    date: "",
  });
  const { data, isSuccess } = useGetAllCategoryQuery();
  const [addPost] = useAddPostMutation();

  const handleState = (e) => {
    const type = e.target.type;
    type === "file" && setImagePrev(URL.createObjectURL(e.target.files[0]));
    const value = type === "file" ? e.target.files[0] : e.target.value;
    setPost((prev) => ({
      ...prev,
      [e.target.name]: value,
      date: new Date().toDateString(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      post.title &&
      content &&
      post.file &&
      post.category &&
      post.category !== "Select Category"
    ) {
      const formData = new FormData();
      formData.append("image", post.file);
      formData.append("title", post.title);
      formData.append("content", content);
      formData.append("category", post.category);
      formData.append("date", post.date);
      addPost(formData);
      toast.success("New Blog Posted");
      setPost({ title: "", file: "", category: "", date: "" });
      setContent("");
    } else {
      toast.error("Please Fill The Details");
    }
  };

  const { title, category } = post;
  return (
    <div className="new">
      <Sidebar />
      <ToastContainer />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Blog</h1>
        </div>
        <div className="bottom">
          <form onSubmit={handleSubmit}>
            <div className="formInput">
              <label>Title</label>
              <input
                type="text"
                placeholder="Enter Blog Title"
                name="title"
                value={title}
                onChange={(e) => handleState(e)}
              />
            </div>
            <div className="formInput">
              <label>Category</label>
              <select
                name="category"
                id="category"
                value={category}
                onChange={(e) => handleState(e)}
              >
                <option value="Select Category">Select Category</option>
                {isSuccess &&
                  data.map((element) => (
                    <Fragment key={element._id}>
                      <option value={element.category}>
                        {element.category}
                      </option>
                    </Fragment>
                  ))}
              </select>
            </div>
            <div className="formInput">
              <label>Content</label>
              <div className="editorContainer">
                <ReactQuill
                  className="editor"
                  theme="snow"
                  value={content}
                  onChange={setContent}
                />
              </div>
            </div>

            <div className="formInput">
              <label htmlFor="file">
                Choose Image: <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={(e) => handleState(e)}
                style={{ display: "none" }}
              />
              <div className="preview">
                <img
                  src={
                    imagePrev
                      ? imagePrev
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt="..."
                />
              </div>
            </div>

            <button className="button">POST</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBlog;
