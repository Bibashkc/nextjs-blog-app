import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostFiles } from "../../lib/posts-utils";

function PostDetails(props) {
  return <PostContent post={props.postData} />;
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
