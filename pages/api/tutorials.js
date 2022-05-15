import fs from 'fs/promises';
import matter from 'gray-matter';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const files = await fs.readdir('tutorial');

        const fileStruct = [];
        for (const fileName of files) {
            const folderNum = Number(fileName.split('-')[0]);
            const individualNum = Number(fileName.split('-')[1]);
            const slug = fileName.replace('.md', '');
            const readFile = await fs.readFile(`tutorial/${fileName}`, 'utf-8');
            const { data: frontmatter } = matter(readFile);

            const data = {
                slug,
                frontmatter,
                num: individualNum,
            };

            if (fileStruct[folderNum]) {
                fileStruct[folderNum].push(data);
            } else {
                fileStruct[folderNum] = [data];
            }

            for (const folder in fileStruct) {
                fileStruct[folder].sort((a, b) => Number(a.num) - Number(b.num));
            }
        }

        res.status(200).json(fileStruct);
    } else {
        res.status(405).send();
    }
}
