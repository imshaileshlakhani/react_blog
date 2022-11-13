import "./editBlog.scss";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/adminNavbar/AdminNavbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useNavigate, useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  useEditPostMutation,
  useGetAllCategoryQuery,
  useGetPostByIdQuery,
} from "../../../services/postApi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditBlog = () => {
  const navigate = useNavigate();
  const [imagePrev, setImagePrev] = useState("");
  const [content, setContent] = useState("");
  const [post, setPost] = useState({
    title: "",
    file: "",
    category: "",
    date: "",
  });
  const { blogId } = useParams();
  const { data: postData, isSuccess: isPost } = useGetPostByIdQuery(blogId);
  const { data, isSuccess } = useGetAllCategoryQuery();
  const [editPost] = useEditPostMutation();

  useEffect(() => {
    if (blogId && isPost) {
      const { content, ...post } = postData;
      setPost({ ...post });
      setContent(content);
    }
  }, [blogId, isPost, postData]);

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
      if (blogId) {
        const formData = new FormData();
        imagePrev && formData.append("image", post.file);
        formData.append("title", post.title);
        formData.append("content", content);
        formData.append("category", post.category);
        formData.append("date", post.date);
        let id = post._id;
        editPost({ formData, id });
        toast.success("Blog Updated");
        setImagePrev("");
        setPost({ title: "", file: "", category: "", date: "" });
        navigate('/admin/blog')
      }
    } else {
      toast.error("Please Fill The Details");
    }
  };

  const { title, category, file } = post;
  return (
    <div className="new">
      <Sidebar />
      <ToastContainer />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Edit Blog</h1>
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
                <img src={imagePrev ? imagePrev : `/image/${file}`} alt="..." />
              </div>
            </div>

            <button className="button">POST</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
