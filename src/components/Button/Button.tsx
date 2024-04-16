import buttonStyles from './Button.module.scss'

const Button = () => {
   return (
      <button className={buttonStyles.button}>
         <span className={buttonStyles.label}>Button</span>
      </button>
   )
}

export default Button
