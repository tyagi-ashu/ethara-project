import {api} from './api';
//used tags here and not noQueryStarted, becuase refetching is automatic here, and also we dont need to update anything in redux store
export const projectApi = api.injectEndpoints({
    endpoints : (builder) =>({
        getProjects: builder.query({
            query: ()=>'projects/show',
            providesTags: ['Project']
        }),
        //for addTask
        getProjectById: builder.query({
            query: (id) => `/projects/${id}`
        }),
        //for dashboard
        getProjectByMember: builder.query({
            query: () => `/projects/member`,
            providesTags :['Project']
        }),
        addProject: builder.mutation({
            query: (newProject) => ({
                url: '/projects',
                method: 'POST',
                body: newProject,
            }),
            invalidatesTags: ['Project']
        }),
        deleteProject: builder.mutation({
            query: (id) => ({
                url: `/projects/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Project']
        }),
        addMember: builder.mutation({
            query: ({member, projectId}) => ({
                url: `projects/${projectId}/addmember`,
                method: 'POST',
                body: {member},
            }),
            invalidatesTags: ['Project']
        })
    })
});

export const {useGetProjectsQuery, useAddProjectMutation, useGetProjectByIdQuery, useDeleteProjectMutation, useGetProjectByMemberQuery, useAddMemberMutation} = projectApi;