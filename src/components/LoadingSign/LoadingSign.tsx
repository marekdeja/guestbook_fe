import styles from './LoadingSign.module.scss'

const LoadingSign = () => {
   const text = 'Loading...'.split('').map((char, i) => (
      <span key={i} style={{ animationDelay: `${i / 10}s` }}>
         {char}
      </span>
   ))

   return <div className={styles.loading}>{text}</div>
}

export default LoadingSign
