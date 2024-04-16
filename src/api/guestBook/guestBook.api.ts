import httpClient from '@/common/http/httpClient'
import {
   GetAllEntriesResponse,
   GuestBookService as IGuestBookService,
   UserEntry,
} from '@/api/guestBook/guestBook.model'

const GuestBookService = (): IGuestBookService => {
   return {
      getAllEntries: (): HttpPromise<GetAllEntriesResponse> => {
         return httpClient.get('/api/getAll')
      },
      postEntry: (userEntry: UserEntry): HttpPromise<void> => {
         return httpClient.post('/api/postEntry', { data: userEntry })
      },
   }
}

export default GuestBookService()
