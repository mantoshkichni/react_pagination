import "./styles.css";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { Items } from "./Items";
export default function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 12;
  const currentItems = data?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data?.length / 12);
  useEffect(() => {
    getData();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  const getData = async () => {
    const userData = await axios.get(
      "https://jsonplaceholder.typicode.com/photos"
    );
    console.log(userData.data.length);
    setData(userData.data);

    console.log("pagecount=>" + pageCount);
    console.log(data);
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 12) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return loading ? (
    <div className="loading">
      <ReactLoading
        type={"spinningBubbles"}
        color="orange"
        className={"loading"}
        height={"10%"}
        width={"10%"}
      />
    </div>
  ) : (
    <div className="App">
      <div className="grid">
        <Items currentItems={currentItems} />
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount / 10}
        previousLabel="< previous"
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        activeClassName="active"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
      />
    </div>
  );
}
