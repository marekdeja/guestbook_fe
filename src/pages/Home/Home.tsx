import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import useGetAllEntries from '@/hooks/useGetAllEntries'
import { postEntry } from '@/store/slices/guestBookSlice'
import LoadingSign from '@/components/LoadingSign/LoadingSign'
import styles from './Home.module.scss'

const Home = () => {
   const dispatch = useDispatch<AppDispatch>()

   const [userName, setUserName] = useState<string>('')
   const [userText, setUserText] = useState<string>('')

   const { getEntries, allEntries, loading, error } = useGetAllEntries()
   const reversedEntries = allEntries && [...allEntries].reverse()

   useEffect(() => {
      getEntries()
   }, [])

   const sendEntry = async () => {
      if (userName && userText) {
         dispatch(postEntry({ userName, userText, entryDate: new Date().toISOString() }))
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
            <button className={styles.submitButton} onClick={sendEntry}>
               Submit
            </button>
         </div>

         <div className={styles.entriesContainer}>
            <div className={styles.infoContainer}>
               {loading && <LoadingSign />}
               {error !== null && <div className={styles.failed}>Connection to server failed.</div>}
            </div>
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
