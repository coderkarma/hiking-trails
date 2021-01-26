import { useRouter } from 'next/router';
import { getAllTrailIds, getTrailData } from '../../lib/trails';

const Trail = ({ trailData }) => {
	const router = useRouter();
	const { trail_id } = router.query;

	return (
		<div>
			<h1>{trailData.title}</h1>
			<p>{trailData.id}</p>
			<div
				dangerouslySetInnerHTML={{
					__html: trailData.contentHtml,
				}}></div>
			<aside>Miles: {trailData.miles}</aside>
		</div>
	);
};

export async function getStaticPaths() {
	const paths = getAllTrailIds();

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const trailData = await getTrailData(params.trail_id);

	return {
		props: {
			trailData,
		},
	};
}

export default Trail;
