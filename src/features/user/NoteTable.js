import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./NoteBD";

const NotesList = () => {
    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery('notesList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    let content;

    if (isLoading) content = <p>Loading...</p>;

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>;
    }

    if (isSuccess) {
        const { ids } = notes;

        const tableContent = ids?.length
            ? ids.map(noteId => <Note key={noteId} noteId={noteId} />)
            : null;

        content = (
            <table className="table-auto w-full  border border-gray-300 rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                <tr>
                        <th className="px-4 py-2 text-center border">العنوان</th>
                        <th className="px-4 py-2 text-center border">المادة</th>
                        <th className="px-4 py-2 text-center border">العلامة</th>
                        <th className="px-4 py-2 text-center border">الملاحظة</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        );
    }

    return content;
};

export default NotesList;
