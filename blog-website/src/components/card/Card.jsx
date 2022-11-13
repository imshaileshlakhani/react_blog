import "./card.scss";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDeletePostMutation } from "../../services/postApi";
import DOMPurify from "dompurify";

const Card = ({ data }) => {
  const navigate = useNavigate();
  const [deletePost] = useDeletePostMutation();
  return (
    <div className="card">
      <div className="img">
        <img src={`/image/${data.file}`} alt="baner" />
      </div>
      <div className="body">
        <h3 className="card_title">
          {data.title.slice(0, 27)} {data.title.length > 27 ? "..." : ""}
        </h3>
        <p
          className="content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data.content.slice(0, 120)),
          }}
        ></p>
        <Button
          variant="contained"
          className="button btn_view"
          onClick={() => navigate(`/blog/${data._id}`)}
        >
          View
        </Button>
        <Button
          variant="contained"
          className="button btn_edit"
          onClick={() => navigate(`/admin/edit/${data._id}`)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          className="button btn_delete"
          onClick={() => deletePost(data._id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Card;
