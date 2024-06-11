

Image chargée
I have this image why when I use this code to download it he said failed.    import { useSelector } from 'react-redux';
import { selectNoteById } from '../../notesApiSlice';
import { FaEdit, FaDownload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useAuth from "../../../hooks/useAuth";

const Note = ({ noteId }) => {
  const note = useSelector((state) => selectNoteById(state, noteId));
  const { username } = useAuth();
  const handleDownload = () => {
    // Replace 'imagePath' with the actual path of the image in your folder
    const imagePath = '/qrrs.png';
    const link = document.createElement('a');
    link.href = imagePath;
    link.download = 'qrrs.png'; // Use the appropriate file extension
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};


  if (note && note.studentId === username) {
    return (
      <tr className="table__row">
        <td className="py-3 px-4 text-center border">{note.title}</td>
        <td className="py-3 px-4 text-center border">{note.module}</td>
        <td className="py-3 px-4 text-center border text-xl">
          <button onClick={handleDownload}><FaDownload /></button>
        </td>
        <td className="py-3 px-4 text-center border text-xl">
          <button><FaEdit /></button>
        </td>
        <td className="py-3 px-4 text-center border text-xl">
          <button><MdDelete /></button>
        </td>
      </tr>
    );
  } else return null;
};

export default Note;     
