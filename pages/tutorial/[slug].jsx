import fs from 'fs/promises';
import matter from 'gray-matter';
import md from 'markdown-it';
import Sidebar from '../../components/sidebar';

import styles from '../../styles/tutorial.module.scss';

export default function TutorialPage({ frontmatter, content }) {
    return (
        <Sidebar>
            <div className={'prose ' + styles.page}>
                <h1>{frontmatter.title}</h1>
                <div
                    dangerouslySetInnerHTML={{
                        __html: md({ html: true }).render(content),
                    }}
                />
            </div>
        </Sidebar>
    );
}

export async function getStaticPaths() {
    const files = await fs.readdir('tutorial');
    const paths = files.map(fileName => ({
        params: {
            slug: fileName.replace('.md', ''),
        },
    }));
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params: { slug } }) {
    const fileName = await fs.readFile(`tutorial/${slug}.md`, 'utf-8');
    const { data: frontmatter, content } = matter(fileName);
    return {
        props: {
            frontmatter,
            content,
        },
    };
}
