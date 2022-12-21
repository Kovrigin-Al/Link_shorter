import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/httpHooks";

export const CreatePage = () => {
  const auth = useContext(AuthContext)
  const { request } = useHttp();
  const [link, setLink] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    //updete text input to prevent overlapping
    window.M.updateTextFields()
  }, [])
  

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      try {
        const response = await request("/api/link/createLink", "POST", {
          from: link,
        }, {Authorization: `Bearer ${auth.token}`});
        console.log(response);
        navigate(`/detail/${response.link._id}`)
      } catch (error) {
        console.log('Submiting form error')
      }
    }
  };

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "1rem" }}>
        <div className="input-field">
          <input
            placeholder="Insert a link"
            id="link"
            type="text"
            onChange={(e) => {
              setLink(e.target.value);
            }}
            onKeyUp={handleKeyPress}
            value={link}
          />
          <label htmlFor="link">Insert link</label>
        </div>
      </div>
    </div>
  );
};
