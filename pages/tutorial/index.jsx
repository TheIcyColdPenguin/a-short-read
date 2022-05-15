import styles from '../../styles/tutorial.module.scss';

import Sidebar from '../../components/sidebar';

export default function Home() {
    return (
        <Sidebar>
            <div className={styles.main}></div>
        </Sidebar>
    );
}
