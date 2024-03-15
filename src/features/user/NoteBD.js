import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectNoteById } from './notesApiSlice'

const Note = ({ noteId }) => {

    const note = useSelector(state => selectNoteById(state, noteId))

    const navigate = useNavigate()

    if (note) {
       
        const handleEdit = () => navigate(`/dash/notes/${noteId}`)

        return (
            <tr className="table__row">
              <td className="py-3 px-4 text-center border">{note.title}</td>
              <td className="py-3 px-4 text-center border">{note.module}</td>
              <td className="py-3 px-4 text-center border">{note.note}</td>
              <td className="py-3 px-4 text-center border">{note.mark}</td>

                
            </tr>
        )

    } else return null
}
export default Note