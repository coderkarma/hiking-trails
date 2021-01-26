import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const trailsDirectory = path.join(process.cwd(), 'trails');

export function getAllTrailIds() {
	const fileNames = fs.readdirSync(trailsDirectory);
	return fileNames.map((fileName) => {
		return {
			params: {
				trail_id: fileName.replace(/\.md$/, ''),
			},
		};
	});
}

export async function getTrailData(trail_id) {
	const fullPath = path.join(trailsDirectory, `${trail_id}.md`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');

	const matterResult = matter(fileContents);

	const processedContent = await remark()
		.use(html)
		.process(matterResult.content);

	const contentHtml = processedContent.toString();

	return {
		trail_id,
		contentHtml,
		...matterResult.data,
	};
}
