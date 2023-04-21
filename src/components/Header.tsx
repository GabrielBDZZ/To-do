import rocket from '../assets/rocket.svg'

import styles from './Header.module.css'

export function Header () {
    return (
        <header className={styles.header}>
            
            <p className={styles.logo1}>
            <img src={rocket}/>
            to</p>
            <p className={styles.logo2}>do</p>
        </header>
    )
}