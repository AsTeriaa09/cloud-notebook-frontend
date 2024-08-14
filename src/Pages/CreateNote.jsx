import React from "react";
import { useNoteGlobalContext } from "../context/NotesContext";
import { Link } from "react-router-dom";
import Login from "../Pages/Login";
import { useAuthGlobalContext } from "../context/AuthContext";

const CreateNote = () => {
  const { createNote, AddNote, handleInfoChange, token } =
    useNoteGlobalContext();
  
 
  return (
    <>
      <div className="CreateNote container mt-5 ">
        {token ? (
          <>
            <h2 className="text-center">✍️ ADD A NOTE </h2>
            <form onSubmit={AddNote}>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Title"
                  id="title"
                  name="title"
                  value={createNote.title}
                  onChange={handleInfoChange}
                />
              </div>
              <div class="mb-3">
                <textarea
                  type="text"
                  class="form-control"
                  placeholder="Description"
                  id="description"
                  name="description"
                  value={createNote.description}
                  onChange={handleInfoChange}
                />
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Tag"
                  id="tags"
                  name="tags"
                  value={createNote.tags}
                  onChange={handleInfoChange}
                />
              </div>

              <button type="submit" class="btn btn-warning ">
                ADD NOTE
              </button>
            </form>
          </>
        ) : (
          <>
            <Login />
          </>
        )}
      </div>
    </>
  );
};

export default CreateNote;
