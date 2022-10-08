import axios from "axios";

export interface State {
  id: number;
  name: string;
}
interface CustomAction {
  type: string;
  data: State[];
}

const MAIN_URL = "https://api.thecatapi.com/v1/images/search?limit=10&";

let category = "";

const initialState: State[] = [];
const GET_CATS = "GET_CATS";
const ADD_CATS = "ADD_CATS";
const ImgsReducer = (state = initialState, action: CustomAction) => {
  switch (action.type) {
    case GET_CATS:
      return [...action.data];
    case ADD_CATS:
      return [...state, ...action.data];
    default:
      return [];
  }
};

export default ImgsReducer;

const getCatsAC: (data: State[]) => CustomAction = (data) => ({
  type: GET_CATS,
  data,
});
const addCatsAC: (data: State[]) => CustomAction = (data) => ({
  type: ADD_CATS,
  data,
});

export const getCatsTC: (data?: string) => void = (data) => (dispatch: any) => {
  category = data ? `${data}` : "";
  axios({
    method: "GET",
    url: MAIN_URL + `page=1${data ? `&${data}` : ""}`,
  }).then((response) => {
    dispatch(getCatsAC(response.data as State[]));
  });
};
export const addCatsTC: (data: number) => void = (data) => (dispatch: any) => {
  axios({
    method: "GET",
    url:
      MAIN_URL +
      `page=${data}${category.length > 0 ? `&${category}` : ""}`,
  }).then((response) => {
    dispatch(addCatsAC(response.data as State[]));
  });
};
