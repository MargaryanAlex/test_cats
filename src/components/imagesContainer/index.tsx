import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { ThunkDispatch } from "redux-thunk";
import { addCatsTC, getCatsTC } from "../../redux/reducers/imgsReducer";
import { store } from "../../redux/store";
import "./style.scss";

const ImagesContainer: React.FC<any> = ({ state, getCats, addCats }) => {
  const [page, setPage] = useState<number>(1);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getCats(`category_ids=${id}`);
    } else {
      getCats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="P-images-container">
      <div className="P-images">
        {state.map(
          (
            item: { id: string; url: string; height: string; width: string },
            index: number
          ) => {
            return (
              <div className="P-photo" key={index}>
                <img src={item.url} alt="cats" />
              </div>
            );
          }
        )}
      </div>
      <button
        onClick={() => {
          addCats(page + 1);
          setPage(page + 1);
        }}
      >
        Load more ...
      </button>
    </div>
  );
};
const mapState = (state: store) => ({
  state: state.ImgsReducer,
});
const mapDispatch = (dispatch: ThunkDispatch<any, any, any>) => ({
  getCats(data?: string) {
    dispatch(getCatsTC(data));
  },
  addCats(data: number) {
    dispatch(addCatsTC(data));
  },
});
export default connect(mapState, mapDispatch)(ImagesContainer);
