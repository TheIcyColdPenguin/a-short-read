import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.scss';

export default function Home() {
    return (
        <div className={styles.main}>
            <Head>
                <title>a series of not so short lessons</title>
                <meta name="description" content="a series of not so short lessons" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <span>hey there</span>
            <span>
                Enjoy the{' '}
                <Link href="/tutorial">
                    <a>tutorials</a>
                </Link>
                !
            </span>
        </div>
    );
}
