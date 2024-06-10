import { useGetNotesQuery } from "../../notesApiSlice"
import Note from "./QrsBD"; // Check if the filename is exactly 'NoteDB'
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
            <table className="w-full table-auto border border-gray-300" style={{ borderCollapse: "collapse", direction: 'rtl' }}>
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2 text-center border bg-white">العنوان</th>
                        <th className="px-4 py-2 text-center border bg-white">المقياس</th>
                        <th className="px-4 py-2 text-center border bg-white"> تحميل</th>
                        <th className="px-4 py-2 text-center border bg-white">التعديل</th>
                        <th className="px-4 py-2 text-center border bg-white">حذف</th>
                    </tr>
                </thead>
                <tbody>{tableContent}</tbody>
            </table>
        );
    }

    return (
        <div className="flex h-screen">
            <main className="flex-grow bg-gray-100 w-3/4 overflow-y-auto">
                <DashHeader />
                <h1 className="text-4xl font-semibold text-gray-800 mb-8 mt-6 text-center">قائمة المراجع</h1>
                {content}
            </main>
            <Sidebar />
          
        </div>
    );
}

export default NotesList;

