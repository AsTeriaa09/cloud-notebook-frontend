import React, { useEffect, useState } from "react";
import { useNoteGlobalContext } from "../context/NotesContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleInfoChange, singleNotes, getSingleNote, updateNote } =
    useNoteGlobalContext();

  useEffect(() => {
    getSingleNote(id);
  }, [id]);

  return (
    <>
      <div className="container CreateNote">
        <h2 className="text-center mt-5">UPDATE NOTE</h2>
        <form
          onSubmit={(e) => {
            updateNote(e, id, navigate);
          }}
        >
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Title"
              id="title"
              name="title"
              value={singleNotes.title}
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
              value={singleNotes.description}
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
              value={singleNotes.tags}
              onChange={handleInfoChange}
            />
          </div>

          <button type="submit" class="btn btn-warning ">
            UPDATE
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateNote;
