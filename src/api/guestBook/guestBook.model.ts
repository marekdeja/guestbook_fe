export interface UserEntry {
   userText: string
   userName: string
   entryDate: string
}

export interface GetAllEntriesResponse {
   userEntries: UserEntry[]
}

export interface GuestBookService {
   getAllEntries: () => HttpPromise<GetAllEntriesResponse>
   postEntry: (userEntry: UserEntry) => HttpPromise<void>
}
