import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostFiles } from "../../lib/posts-utils";
import Head from "next/head";
function PostDetails(props) {
  return (
    <>
      <Head>
        <title>{props.postData.title}</title>
        <meta name="description" content={props.postData.excerpt} />
      </Head>
      <PostContent post={props.postData} />
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;
  const postData = getPostData(slug);
  return {
    props: { postData },
  };
}

export async function getStaticPaths() {
  const postFiles = getPostFiles();
  const paths = postFiles.map((postFile) => ({
    params: { slug: postFile.replace(/\.md$/, "") },
  }));
  return { paths, fallback: false };
}

export default PostDetails;
