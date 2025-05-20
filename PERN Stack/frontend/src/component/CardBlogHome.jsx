const CardBlogHome = ({ image, title, description }) => {
  return (
    <div
      className="card rounded-4 shadow-sm m-3"
      style={{ width: "20rem", backgroundColor: "#e9d7cb", padding: "1rem" }}
    >
      <img
        src={image}
        className="card-img-top rounded-4"
        alt={title}
        style={{ height: "180px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5
          className="card-title fw-bold"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </h5>
        <p
          className="card-text text-muted"
          style={{
            fontSize: "0.9rem",
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </p>
        <button className="btn btn-outline-secondary btn-sm rounded-pill">
          Read More
        </button>
      </div>
    </div>
  );
};

export default CardBlogHome;
