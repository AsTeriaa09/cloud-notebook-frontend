import React, { useContext, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const NoteContext = React.createContext();
const PostNoteURI = "http://localhost:4000/api/notesRoute/notes";
const NotesURI = "http://localhost:4000/api/notesRoute/getNotes";

const NoteProvider = ({ children }) => {
  // to add note
  const NoteInfo = { title: "", description: "", tags: "" };
  const [createNote, setCreateNote] = useState(NoteInfo);

  //to fetch note
  const [notes, setNotes] = useState([]);

  // TO GET SINGLE NOTE BY ID TO EDIT
  const [singleNotes, setSingleNote] = useState({
    title: "",
    description: "",
    tags: "",
  });

  //   token
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleInfoChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCreateNote({ ...createNote, [name]: value });
    setSingleNote({ ...singleNotes, [name]: value });
  };

  // to add note
  const AddNote = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(PostNoteURI, createNote, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      //console.log(response.data)
      if (response.status === 200) {
        //storeTokenInLocal(response.data.token);
        alert("note created successfully! ");
        setCreateNote(NoteInfo);
        setNotes([...notes, response.data.notes]);
      } else {
        alert("error creating note");
      }
    } catch (error) {
      console.log("notes error", error);
    }
  };

  //   to fetch notes
  const GetNotes = async () => {
    try {
      const response = await axios.get(NotesURI, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      //console.log(response.data);
      if (response.status === 200) {
        setNotes(response.data.GetNotes);
      }
    } catch (error) {
      console.log("notes error", error);
    }
  };

  // to delete a note
  const DeleteANote = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/notesRoute/getNotes/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        GetNotes();
        alert("note deleted successfully!");
      } else {
        alert("error deleting note");
      }
    } catch (error) {
      console.log("note deletion error", error);
    }
  };

  // to get single note
  const getSingleNote = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/notesRoute/getNotes/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        //console.log(response.data);
        setSingleNote(response.data);
      }
    } catch (error) {
      console.log(" error getting note", error);
    }
  };

  // to update a note
  const updateNote = async (e,id, navigate) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/notesRoute/getNotes/edit/${id}`,
        singleNotes,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        alert("updated successfully!");
        navigate("/");
        setCreateNote(NoteInfo)
      }
    } catch (error) {
      console.log(" error updating note", error);
    }
  };

  return (
    <>
      <NoteContext.Provider
        value={{
          AddNote,
          createNote,
          handleInfoChange,
          notes,
          GetNotes,
          token,
          DeleteANote,
          singleNotes,
          getSingleNote,
          updateNote,
        }}
      >
        {children}
      </NoteContext.Provider>
    </>
  );
};

const useNoteGlobalContext = () => {
  return useContext(NoteContext);
};

export { NoteContext, NoteProvider, useNoteGlobalContext };
