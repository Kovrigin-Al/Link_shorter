import React from "react";
import { Link } from "react-router-dom";

export const LinksList = ({ links }) => {
  if (!links.length) {
    return <p className="center">No links were created</p>;
  }
  return (
    <div className="row">
      <div className="col s10 offset-s1">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Original link</th>
              <th>Short link</th>
              <th>Details</th>
            </tr>
          </thead>

          <tbody>
            {links.map((link, index) => {
              return (
                <tr key={link._id}>
                  <td>{index + 1}</td>
                  <td>{link.from}</td>
                  <td>{link.to}</td>
                  <td>
                    <Link to={`/detail/${link._id}`}>open detail</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
