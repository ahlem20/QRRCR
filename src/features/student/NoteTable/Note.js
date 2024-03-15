import { useSelector } from 'react-redux';
import { selectNoteById } from '../../notesApiSlice';
import useAuth from "../../../hooks/useAuth";

const Note = ({ noteId }) => {
  const note = useSelector((state) => selectNoteById(state, noteId));
  const { username } = useAuth();

  if (note && note.studentId === username) {
    return (
      <tr className="table__row">
        <td className="py-3 px-4 text-center border">{note.title}</td>
        <td className="py-3 px-4 text-center border">{note.module}</td>
        <td className="py-3 px-4 text-center border">{note.note}</td>
        <td className="py-3 px-4 text-center border">{note.mark}</td>
      </tr>
    );
  } else {
    return null;
  }
};

export default Note;
