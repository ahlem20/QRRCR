import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isStudent = false
    let isTeacher = false
    let status = "Student"

    if (token) {
        const decoded = jwtDecode(token)
        const { username,id , roles } = decoded.UserInfo

        isStudent = roles.includes('Student')
        isTeacher = roles.includes('Teacher')

        if (isStudent) status = "Student"
        if (isTeacher) status = "Teacher"

        return { username, roles, id ,status, isStudent, isTeacher }
    }

    return { username: '',id:'', roles: [], isStudent, isTeacher, status }
}
export default useAuth