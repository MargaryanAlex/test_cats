import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./style.scss";
import logo from "../../assets/images/logo.png";
interface Ipages {
  id: string;
  name: string;
}
const SideBar = () => {
  const [pages, setPages] = useState<Ipages[]>([{ id: "", name: "" }]);
  const [width, setWidth] = useState(window.innerWidth);
  const [show, setShow] = useState(false);
  const resize = (e: Event) => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://api.thecatapi.com/v1/categories",
    }).then((response) => {
      setPages([...(response.data as Ipages[])]);
    });
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="P-sidebar">
      <div className="P-container">
        <img className="P-logo" src={logo} alt="logo" />
        {width < 606 && (
          <svg
            fill="#ffffff"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            width="50px"
            height="50px"
            onClick={() => {
              setShow(true);
            }}
          >
            <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z" />
          </svg>
        )}
        {width > 606 && (
          <div className="P-links">
            {pages.map((item, index) => {
              return (
                <div key={item.name + index}>
                  <NavLink to={`/category${item.id}`}>{item.name}</NavLink>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {width < 606 && (
        <div
          className="P-right-sidebar"
          style={{ right: show ? "0" : "-100%" }}
        >
          <div className="P-logo">
            <svg
              fill="#ffffff"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              width="50px"
              height="50px"
              onClick={() => {
                setShow(false);
              }}
            >
              {" "}
              <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z" />
            </svg>
          </div>
          <div className="P-links">
            {pages.map((item, index) => {
              return (
                <div key={item.name + index}>
                  <NavLink to={`/category${item.id}`}>{item.name}</NavLink>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
