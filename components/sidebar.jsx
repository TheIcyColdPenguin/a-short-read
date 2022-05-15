import { useContext } from 'react';
import { TutorialsContext } from './TutorialsContext';

import Link from 'next/link';

import styles from '../styles/sidebar.module.scss';

export default function Sidebar({ children }) {
    const tutorials = useContext(TutorialsContext);

    if (!tutorials) {
        return (
            <div className={styles.main}>
                <div className={styles.folder}>Loading....</div>
                <div>{children}</div>
            </div>
        );
    }

    return (
        <div className={styles.main}>
            <div>
                <h4 className={styles.heading}>Lessons</h4>
                {tutorials.map((folder, i) => {
                    return (
                        <div className={styles.folder + ' ' + styles.link} key={i}>
                            <Link href={`/tutorial/${folder[0].slug}`}>
                                <a>{folder[0].frontmatter.title}</a>
                            </Link>
                            {folder.slice(1).map((lesson, j) => {
                                return (
                                    <div key={j} className={styles.link + ' ' + styles.innerlink}>
                                        <Link href={`/tutorial/${lesson.slug}`}>
                                            <a>{lesson.frontmatter.title}</a>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            <div>{children}</div>
        </div>
    );
}
