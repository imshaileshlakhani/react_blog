import "./gridCard.scss";
import Button from "@mui/material/Button";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

const GridCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="card">
      <div className="img">
        <p className="categoty">{data.category}</p>
        <img src={`/image/${data.file}`} alt="baner" />
      </div>
      <div className="body">
        <h2 className="heading">
          {data.title.slice(0, 20)} {data.title.length > 20 ? "..." : ""}
        </h2>
        <p
          className="content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data.content.slice(0, 120)),
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
      </div>
    </div>
  );
};

export default GridCard;
