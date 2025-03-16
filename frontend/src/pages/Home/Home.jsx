import React, { useContext, useEffect, useState } from "react";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axiosInstance from "../../utils/axiosinstance";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/Cards/EmptyCard";
import emptyCardImg from "../../assets/emptycard.jpg";
import noDataImg from "../../assets/nodata.jpg";
import Header from "../../components/Header/Header";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShow: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShow: false,
    type: "add",
    message: "",
  });

  const [userInfo, setUserInfo] = useState(null);
  const [notesInfo, setNotesInfo] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  // edit note
  const handleEdit = (noteDetail) => {
    setOpenAddEditModal({ isShow: true, type: "edit", data: noteDetail });
  };
  // delete note
  const deleteNote = async (noteData) => {
    const noteId = noteData._id;
    console.log(noteId);
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);
      // handle successful delete note response
      if (response.data && !response.data.error) {
        showToastMessage("Note deleted successful", "delete");
        getNotesInfo();
      }
    } catch (error) {
      // handle edit note error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  // search notes
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });
      // handle successful search note response
      if (response.data && response.data.notes) {
        console.log("aq");
        setIsSearch(true);
        setNotesInfo(response.data.notes);
      }
    } catch (error) {
      console.log(error);
      // query null
      if (error.response.status === 400) {
        console.log("qqqq");
        getNotesInfo();
      }
    }
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(
        "/update-note-pinned/" + noteId,
        {
          isPinned: !noteData.isPinned,
        }
      );
      // handle successful edit note response
      if (response.data && response.data.note) {
        showToastMessage("Note updated successful");
        getNotesInfo();
      }
    } catch (error) {
      console.log(error)
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getNotesInfo();
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShow: true,
      message,
      type,
    });
  };
  // close Toast
  const handleCloseToast = () => {
    setShowToastMsg({
      isShow: false,
      message: "",
    });
  };

  // get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");

      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getNotesInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");

      if (response.data && response.data.notes) {
        setNotesInfo(response.data.notes);
      }
    } catch (error) {
      if (error.response.status === 401) {
        console.log("An unexpected error occurred. Please try again.");
        return;
      }
    }
  };

  useEffect(() => {
    getUserInfo();
    getNotesInfo();
    return () => {};
  }, []);

  return (
    <>
      <Header 
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      <div className="container mx-auto">
        {notesInfo.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-8">
            {notesInfo.map((note, index) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={moment(note.createOn).format("MMM Do YYYY HH:MM")}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => handleEdit(note)}
                onDelete={() => deleteNote(note)}
                onPinNote={() => updateIsPinned(note)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? noDataImg : emptyCardImg}
            message={
              isSearch
                ? "No result search"
                : "Let click blue button to make your first note."
            }
          />
        )}
      </div>
      <button
        className="w-16 h-16 flex items-center justify-center 
          rounded-2xl bg-blue-500 hover:bg-blue-600
          absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShow: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShow}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0, 2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShow: false, data: null });
          }}
          getNotesInfo={getNotesInfo}
          showToastMessage={showToastMessage}
        />
      </Modal>
      <Toast
        isShow={showToastMsg.isShow}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
