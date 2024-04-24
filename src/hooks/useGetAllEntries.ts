import { AppDispatch, RootState } from '@/store'
import { fetchAllEntries } from '@/store/slices/guestBookSlice'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllEntries = () => {
   const dispatch = useDispatch<AppDispatch>()

   const guestBook = useSelector((state: RootState) => state.guestBook)

   const { allEntries, loading, error } = guestBook

   const getEntries = useCallback(async () => {
      const response = await dispatch(fetchAllEntries())
      return response.payload
   }, [dispatch])

   return { getEntries, allEntries, loading, error }
}

export default useGetAllEntries
