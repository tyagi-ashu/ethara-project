import {api} from './api';

export const taskApi = api.injectEndpoints({
    endpoints : (builder) =>({
        addTask: builder.mutation({
            query: (newTask) => ({
                url: '/tasks',
                method: 'POST',
                body: newTask,
            }),
            invalidatesTags: ['Project']
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Project']
        }),
        updateTaskStatus: builder.mutation({
            query: ({taskId, status}) => ({
                url: `/tasks/${taskId}/status`,
                method: 'PATCH',
                body: {status},
            }),
            invalidatesTags: ['Project']
        })

    })
});

export const {useAddTaskMutation, useDeleteTaskMutation, useUpdateTaskStatusMutation}=taskApi;