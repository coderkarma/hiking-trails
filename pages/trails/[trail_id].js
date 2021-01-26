import { useRouter } from "next/router";
import { getAllTrailIds, getTrailData } from "../../lib/trails";

const Trail = ({ trailData }) => {
    const router = useRouter();
    // const { trail_id } = router.query;

    const infoDomain = new URL(trailData.info_url).host;

    return (
        <div>
            <h1>{trailData.title}</h1>
            <div
                dangerouslySetInnerHTML={{
                    __html: trailData.contentHtml,
                }}
            ></div>
            <aside class="box">
                <h3>Trail Info</h3>
                <ul>
                    <li>
                        <strong>Location:</strong> {trailData.location}
                    </li>
                    {trailData.elevation_change ? (
                        <li>
                            <strong>Elevation change:</strong>{" "}
                            {trailData.elevation_change}
                        </li>
                    ) : null}
                    <li>
                        <strong>Miles:</strong> {trailData.miles}
                    </li>
                    <li>
                        <strong>More info:</strong>{" "}
                        <a
                            href={trailData.info_url}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            {infoDomain}
                        </a>
                    </li>
                </ul>
            </aside>
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
