import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toogleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constant";
import { cacheResults } from "../utils/searchSlice";
const Head = () => {
  const dispacth = useDispatch();
  const [searchQuery, setSeacrchQuery] = useState();
  const [suggestion, setSuggestions] = useState([]);
  const [showsuggestion, setShowsuggestion] = useState(false);
  const searchCache = useSelector((store) => store.search);

  const toggleMenuHandler = () => {
    dispacth(toogleMenu());
  };

  const getSearchSuggestions = async () => {
    try {
      const result = await fetch(YOUTUBE_SEARCH_API + searchQuery);
      const response = await result.json();
      console.log(response);
      setSuggestions(response[1]);
      // update cache
      dispacth(
        cacheResults({
          [searchQuery]: response[1],
        })
      );
    } catch (error) {
      console.log("err", error);
    }
  };
  useEffect(() => {
    // make an API call after every key press
    // if diff between 2 API calls is <200ms decline
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchCache]);
      } else {
        getSearchSuggestions();
      }
    }, 200);
    return () => {
      console.log(timer);
      clearInterval(timer);
    };
  }, [searchQuery]);
  return (
    <div className="grid grid-flow-col  p-5 m-2 shadow-lg">
      <div className="flex col-span-1">
        <img
          className="h-8 cursor-pointer"
          alt="menu"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0OBQgMAAWlpKQpJSaenZ309PUAAAAIAAD8/Pz5+fna2tqop6dvbW1oZmevrq4tKivFxMQYExRiYGC+vr7Dc4WrAAABB0lEQVR4nO3cS3LCMBAFQGIIIBPbhN/9jxqSyiIsTUnlydB9g1eSNV5MvdUKAAAAAAAAAAAAAAAAXtEwvscwDk3yHabSb2Loy/TRIOHUv8XRH+sHHMrSqR6U+hd1jHSE90P8lHC2/Lc0/0vzMy3WMdynxaFBwu+Jv4uh0cQHAAAAAAAAAIB59jG0ijdcT9sYTtcmK0PncumiuJRz/YD7bbf0ut4f3br+GvQt2PblrXrC3WbpUA/6sXrC/GeY/zvM/5aGmofHZiu0S//M/GoVDwAAAAAAAAAAZsjeuRerN1HL7hPy95fm76DNnzD/Lc3/0rxAJ3v+Xn0AAAAAAAAAAAAAAAD4T74AYhs1O+vt3ioAAAAASUVORK5CYII="
          onClick={() => toggleMenuHandler()}
        />
        <img
          className="h-8 mx-2"
          alt="youtube-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
        />
      </div>
      <div className="col-span-10 px-10">
        <div>
          <input
            className=" px-5 w-1/2 border border-gray-400 p-2  rounded-l-full"
            type="text"
            value={searchQuery}
            onChange={(e) => setSeacrchQuery(e.target.value)}
            onFocus={() => setShowsuggestion(true)}
            onBlur={() => setShowsuggestion(false)}
          />
          <button className="border border-gray-100 px-5 p-2 rounded-r-full bg-gray-100">
            search
          </button>
        </div>
        {showsuggestion && (
          <div className="fixed bg-white py-2 px-5 w-[32rem] shadow-lg rounded-lg border border-gray-100">
            <ul>
              {suggestion.map((suggestion) => {
                return (
                  <li
                    key={suggestion}
                    className="py-2 px-3 shadow-sm hover:bg-gray-100"
                  >
                    &#x1F50D;{suggestion}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <div className="col-span-1">
        <img
          className="h-8"
          alt="user"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        />
      </div>
    </div>
  );
};

export default Head;
