import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const postApi = createApi({
    reducerPath: 'post',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/',
    }),
    tagTypes: ['post'],
    endpoints: (builder) => ({
        // getPostOfPage: builder.query({
        //     query: (page) => ({
        //         url: `post?_page=${page}&_limit=2`,
        //         method: 'GET',
        //     }),
        //     providesTags: ['post'],
        // }),
        // getPostByCategory: builder.query({
        //     query: ({ value, page }) => ({
        //         url: `post?category=${value}&_page=${page}&_limit=2`,
        //         method: 'GET',
        //     }),
        //     providesTags: ['post'],
        // }),

        getAllCategory: builder.query({
            query: () => ({
                url: 'category',
                method: 'GET',
            }),
            providesTags: ['post'],
        }),
        addCategory: builder.mutation({
            query: (body) => ({
                url: 'category',
                method: 'POST',
                body,
                header: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }),
            invalidatesTags: ['post'],
        }),
        getAllPost: builder.query({
            query: () => ({
                url: `post`,
                method: 'GET',
            }),
            providesTags: ['post'],
        }),
        getPostById: builder.query({
            query: (id) => ({
                url: `post/${id}`,
                method: 'GET',
            }),
            providesTags: ['post'],
        }),
        getAllPostByCategory: builder.query({
            query: (value) => ({
                url: `search-post/${value}`,
                method: 'GET',
            }),
            providesTags: ['post'],
        }),
        addPost: builder.mutation({
            query: (body) => ({
                url: 'post',
                method: 'POST',
                body,
                header: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }),
            invalidatesTags: ['post'],
        }),
        editPost: builder.mutation({
            query: ({ formData, id }) => ({
                url: `post?id=${id}`,
                method: 'PUT',
                body: formData,
                header: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `post/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['post'],
        })
    })
})

export default postApi.reducer
export const { useGetAllPostQuery, useGetPostByIdQuery, useAddPostMutation, useDeletePostMutation, useEditPostMutation, useAddCategoryMutation, useGetAllCategoryQuery, useGetPostByCategoryQuery, useGetPostOfPageQuery, useGetAllPostByCategoryQuery } = postApi

