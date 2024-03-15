import { useGetNotesQuery } from "../../notesApiSlice"
import Note from "./Note"; // Check if the filename is exactly 'NoteDB'
import Sidebar from '../../../components/sidebareE';
import DashHeader from '../../../components/DashHeader';
const NotesList = () => {
    const {
        data: project,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery()

    console.log("isLoading:", isLoading);
    console.log("isError:", isError);
    console.log("isSuccess:", isSuccess);
    console.log("error:", error);
    console.log("project:", project);


    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = project

        const tableContent = ids?.length
            ? ids.map(noteId => <Note key={noteId} noteId={noteId} />)
            : null

        content = (
            <table className="table-auto w-full border-collapse border border-gray-800" dir="rtl">
            <thead className="bg-gray-200">
                <tr>
                    <th className="border bg-white p-2">العنوان</th>
                    <th className="border bg-white p-2">المادة</th>
                    <th className="border bg-white p-2">العلامة</th>
                    <th className="border bg-white p-2">الملاحظة</th>
                </tr>
            </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return (
        <div className="flex h-screen">
             <main className="flex-grow bg-gray-100 w-3/4 overflow-y-auto"> 
             <DashHeader />
                <h1 className="text-4xl font-semibold text-gray-800 mb-8 mt-6 text-center">قائمة التقيمات</h1>
                {content}
            </main>
            <Sidebar />
        </div>
    );
}
export default NotesList