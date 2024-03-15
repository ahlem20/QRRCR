import { useSelector } from 'react-redux';
import { selectNoteById } from '../../notesApiSlice';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useAuth from "../../../hooks/useAuth";

const Note = ({ noteId }) => {
  const note = useSelector((state) => selectNoteById(state, noteId));
  const { username } = useAuth();

  if (note && note.studentId=== undefined) {
    return (
      <tr className="table__row">
        <td className="py-3 px-4 text-center border">{note.title}</td>
        <td className="py-3 px-4 text-center border">{note.module}</td>
        <td className="py-3 px-4 text-center border">{note.groop}</td> 
        <td className="py-3 px-4 text-center border text-xl">
          <button> <FaEdit />  </button> 
        </td>
        <td className="py-3 px-4 text-center border text-xl">
          <button>  <MdDelete /></button> 
        </td>
      </tr>
    );
  } else {
    return null;
  }
};

export default Note;
