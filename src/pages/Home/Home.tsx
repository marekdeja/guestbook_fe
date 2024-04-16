import { useEffect, useState } from 'react'
import { guestBookApi } from '@/api/service'
import useGetAllEntries from '@/hooks/useGetAllEntries'

import styles from './Home.module.scss'

const Home = () => {
   const [userName, setUserName] = useState<string>('')
   const [userText, setUserText] = useState<string>('')

   const { getEntries, allEntries } = useGetAllEntries()
   const reversedEntries = allEntries && [...allEntries].reverse()

   useEffect(() => {
      getEntries()
   }, [])

   const postEntry = async () => {
      if (userName && userText) {
         await guestBookApi.postEntry({ userName, userText, entryDate: new Date().toISOString() })
         getEntries()
      }
   }

   return (
      <div className={styles.guestbookContainer}>
         <div className={styles.title}> Guestbook</div>

         <div className={styles.inputContainer}>
            <input
               className={styles.inputField}
               type="text"
               placeholder="Enter Name"
               onChange={(e) => setUserName(e.target.value)}
            />
            <textarea
               className={`${styles.inputField} ${styles.textArea}`}
               placeholder="Enter Message"
               onChange={(e) => setUserText(e.target.value)}
            />
            <button className={styles.submitButton} onClick={postEntry}>
               Submit
            </button>
         </div>

         <div className={styles.entriesContainer}>
            {reversedEntries &&
               reversedEntries.map((entry) => (
                  <div className={styles.entry} key={entry._id}>
                     <div className={styles.entryHeader}>
                        <div className={styles.entryUser}>{entry.userName}</div>
                        <div className={styles.entryDate}>
                           {new Date(entry.entryDate).toLocaleDateString()}
                        </div>
                     </div>
                     <div className={styles.entryText}>{entry.userText}</div>
                  </div>
               ))}
         </div>
      </div>
   )
}

export default Home
