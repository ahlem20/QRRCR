import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice"

const notesAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = notesAdapter.getInitialState()

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotes: builder.query({
            query: () => '/project',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedNotes = responseData.map(note => {
                    note.id = note._id
                    return note
                });
                return notesAdapter.setAll(initialState, loadedNotes)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Note', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Note', id }))
                    ]
                } else return [{ type: 'Note', id: 'LIST' }]
            }
        }),
        addNewProjetText: builder.mutation({
            query: initialNote => ({
                url: '/project',
                method: 'POST',
                body: initialNote, // No need to spread here
              }),
              invalidatesTags: [
                { type: 'Note', id: "LIST" }
              ]
        }),
        addNewProjet: builder.mutation({
            query: initialNote => ({
                url: '/project/Teacher',
                method: 'POST',
                body: {
                    ...initialNote,
                }
            }),
            invalidatesTags: [
                { type: 'Note', id: "LIST" }
            ]
        }),
        activateProject: builder.mutation({
            query: initialNote => ({
                url: '/project/qr',
                method: 'POST',
                body: {
                    ...initialNote,
                }
            }),
            invalidatesTags: [
                { type: 'Note', id: "LIST" }
            ]
        }),
        downloadQr: builder.mutation({
            query: initialNote => ({
              url: '/project/qr',
              method: 'get',
              body: {
                ...initialNote,
              }
            }),
            invalidatesTags: [
              { type: 'Note', id: "LIST" }
            ]
          }),
        updateProjet: builder.mutation({
            query: initialNote => ({
                url: '/project',
                method: 'PATCH',
                body: {
                    ...initialNote,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Note', id: arg.id }
            ]
        }),
        deleteProjet: builder.mutation({
            query: ({ id }) => ({
                url: `/project`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Note', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetNotesQuery,
    useAddNewProjetMutation,
    useAddNewProjetTextMutation,
    useActivateProjectMutation,
    useDownloadQrMutation,
    useUpdateProjetMutation,
    useDeleteProjetMutation,
} = notesApiSlice

// returns the query result object
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select()

// creates memoized selector
const selectNotesData = createSelector(
    selectNotesResult,
    notesResult => notesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds
    // Pass in a selector that returns the notes slice of state
} = notesAdapter.getSelectors(state => selectNotesData(state) ?? initialState)