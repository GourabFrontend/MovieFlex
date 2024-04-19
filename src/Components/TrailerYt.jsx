
import Modal from "react-modal";
import React, { useState } from "react";
import YouTube from "react-youtube";
import axios from "axios";
import { toast } from 'react-toastify';
import { auth } from '../Firebase/Firebase'
import { useNavigate } from "react-router";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: "none",
    background: "none",
    overflow: "visible",
  },
};
const appElement = document.getElementById('root'); 
Modal.setAppElement(appElement);


const TrailerYt = ({ Id, CardId, SliderId }) => {
  const [yt, setYt] = useState([]);
  const navigate = useNavigate()

  const [modalIsOpen, setIsOpen] = useState(false);
  const fetchYt = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${Id || SliderId}/videos?api_key=e93d7bfeef7de70a7dc2636083797c77`
      );
      setYt(response.data.results);
    } catch (error) {
      console.error(error);

    }
  };

  const fetchcard = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/tv/${CardId}/videos?api_key=e93d7bfeef7de70a7dc2636083797c77`);
      setYt(response.data.results);
    } catch (error) {
      console.error(error);
    }
  }

  const openModal = () => {
    if (auth.currentUser?.phoneNumber) {
      setYt(null);
      setIsOpen(true);
      if (Id || SliderId) {
        fetchYt();
      }
      if (CardId) {
        fetchcard();
      }

    } else {
      setIsOpen(false)
      toast.warning("Please login to Watch")
      setTimeout(() => { navigate('/login') }, 4000)
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  console.log(yt)

  return (
    <>
      <div>
        <button
          onClick={openModal}
          className=" bg-gray-700 w-[23%] text-xs md:text-sm lg:text-base rounded-lg text-slate-300 hover:bg-gray-800 hover:text-slate-400"
        >
          Watch Now
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="YouTube Video Modal"
        >
          <YouTube videoId={yt && yt[0]?.key} />

        </Modal>

      </div>

    </>
  );
};

export default TrailerYt;



// import Modal from "react-modal";
// import React, { useState, useEffect } from "react";
// import YouTube from "react-youtube";
// import axios from "axios";
// import { toast } from 'react-toastify';
// import { auth } from '../Firebase/Firebase'
// import { useNavigate } from "react-router";

// const customStyles = {
//   overlay: {
//     backgroundColor: "rgba(0, 0, 0, 0.7)",
//     zIndex: 1000,
//   },
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     border: "none",
//     background: "none",
//     overflow: "visible",
//   },
// };

// // Set the app element for react-modal
// const appElement = document.getElementById('root'); // or another appropriate element
// Modal.setAppElement(appElement);

// const TrailerYt = ({ Id, CardId, SliderId }) => {
//   const [yt, setYt] = useState([]);
//   const navigate = useNavigate()

//   const [modalIsOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     // Fetch YouTube videos when component mounts
//     if (modalIsOpen) {
//       if (auth.currentUser?.phoneNumber) {
//         setYt(null);
//         fetchYt();
//         fetchcard();
//       } else {
//         setIsOpen(false);
//         toast.warning("Please login to Watch");
//         setTimeout(() => { navigate('/login') }, 4000);
//       }
//     }
//   }, [modalIsOpen, navigate]);

//   const fetchYt = async () => {
//     try {
//       const response = await axios.get(`https://api.themoviedb.org/3/movie/${Id || SliderId}/videos?api_key=e93d7bfeef7de70a7dc2636083797c77`);
//       setYt(response.data.results);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchcard = async () => {
//     try {
//       const response = await axios.get(`https://api.themoviedb.org/3/tv/${CardId}/videos?api_key=e93d7bfeef7de70a7dc2636083797c77`);
//       setYt(response.data.results);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   const openModal = () => {
//     setIsOpen(true);
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//   };

//   return (
//     <>
//       <div>
//         <button
//           onClick={openModal}
//           className="bg-gray-700 w-[23%] text-xs md:text-sm lg:text-base rounded-lg text-slate-300 hover:bg-gray-800 hover:text-slate-400"
//         >
//           Watch Now
//         </button>
//         <Modal
//           isOpen={modalIsOpen}
//           onRequestClose={closeModal}
//           style={customStyles}
//           contentLabel="YouTube Video Modal"
//         >
//           {yt && yt[0]?.key && <YouTube videoId={yt[0].key} />}
//         </Modal>
//       </div>
//     </>
//   );
// };

// export default TrailerYt;
