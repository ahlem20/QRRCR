import { useGetUsersQuery } from "./usersApiSlice";
import User from './User';

const UsersList = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetUsersQuery();

    let content;

    if (isLoading) {
        content = <p className="text-center my-4">Loading...</p>;
    }

    if (isError) {
        content = <p className="text-center my-4 text-red-600">{error?.data?.message}</p>;
    }

    if (isSuccess) {
        const { ids } = users;

        const tableContent = ids?.length
            ? ids.map(userId => <User key={userId} userId={userId} />)
            : null;

     
        content = (
            <table className="w-full table-auto border border-gray-300" style={{ borderCollapse: "collapse" }}>
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2 text-left border">Username</th>
                        <th className="px-4 py-2 text-left border">Roles</th>
                        <th className="px-4 py-2 text-left border">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen p-6">
                   <h1>ahlem</h1>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">User List</h1>
            {content}
        </div>
    );
};

export default UsersList;
