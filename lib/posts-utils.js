import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getPostFiles() {
  return fs.readdirSync(path.join(process.cwd(), "content", "posts"));
}

export function getPostData(fileName) {
  const postSlug = fileName.replace(/\.md$/, "");

  const filePath = path.join(
    process.cwd(),
    "content",
    "posts",
    `${postSlug}.md`
  );
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };
  return postData;
}

export function getAllPosts() {
  const postFiles = fs.readdirSync(
    path.join(process.cwd(), "content", "posts")
  );
  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });
  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );
  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((post) => post.isFeatured);
  return featuredPosts;
}
