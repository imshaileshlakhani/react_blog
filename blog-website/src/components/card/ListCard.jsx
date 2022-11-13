import "./listCard.scss";
import Button from "@mui/material/Button";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InsertCommentSharpIcon from "@mui/icons-material/InsertCommentSharp";
import { useNavigate } from "react-router-dom";
import { useGetCommentsByBlogIdQuery } from "../../services/commentApi";
import { useGetLikesByBlogIdQuery } from "../../services/likeApi";
import DOMPurify from "dompurify";

const ListCard = ({ data }) => {
  const navigate = useNavigate();
  const { data: commentData } = useGetCommentsByBlogIdQuery(data._id);
  const { data: likeData } = useGetLikesByBlogIdQuery(data._id);
  return (
    <div className="list_card">
      <div className="img">
        <p className="categoty">{data.category}</p>
        <img src={`/image/${data.file}`} alt="baner" />
      </div>
      <div className="list_card_body">
        <h3 className="heading">
          {data.title.slice(0, 40)} {data.title.length > 40 ? "..." : ""}
        </h3>
        <p
          className="content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data.content.slice(0, 200)),
          }}
        ></p>
        <Button
          variant="contained"
          className="read_more"
          onClick={() => navigate(`/blog/${data._id}`)}
        >
          Read More
          <ArrowRightAltIcon />
        </Button>
        <p className="edit_date">
          <small className="text-muted">Last updated {data.date}</small>
        </p>
        <div className="blog_icons">
          <span className="blog_icon">
            <span>{likeData && likeData.length}</span>
            <FavoriteIcon />
          </span>
          <span className="blog_icon">
            <span>{commentData && commentData.length}</span>
            <InsertCommentSharpIcon />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
