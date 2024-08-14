import React, { useEffect } from "react";
import { useNoteGlobalContext } from "../context/NotesContext";
import { Link } from "react-router-dom";
import { useAuthGlobalContext } from "../context/AuthContext";

const Notes = () => {
  const { notes, GetNotes, DeleteANote, token } = useNoteGlobalContext();

  useEffect(() => {
    GetNotes();
  }, []);

  return (
    <div className="container my-5">
      {token ? (
        <>
          <h2 className="text-center mb-5">MY NOTES</h2>
          <div className="container row">
            {notes.map((cur, index) => {
              const { title, description, tags, _id } = cur;
              return (
                <>
                  <div className=" col-lg-3" key={index}>
                    <div
                      class=" card text-dark mb-3"
                      style={{ width: "18rem", height: "fit-content" }}
                    >
                      <div class="card-body">
                        <h5 class="card-title"> {title} </h5>
                        <h6 class="card-subtitle mb-2 text-muted"> {tags} </h6>
                        <p class="card-text">{description}</p>
                        <Link to={`/edit/${_id}`} className="nav-button-link">
                          <button class="btn btn-success me-3">EDIT</button>
                        </Link>
                        <button
                          onClick={() => {
                            DeleteANote(_id);
                          }}
                          class="btn btn-danger me-3"
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Notes;
