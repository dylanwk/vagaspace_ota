import fs from 'fs'; // provides functions to interact w filesystem
import matter from 'gray-matter'; // extracting metadata from markdown files
import path from 'path'; // file path and directories
import moment from 'moment'; // manipulating dates
import { remark } from 'remark'; // parse and process markdown content
import html from 'remark-html'; // converts markdown to html

import type { ArticleItem } from './types';

const articlesDirectory = path.join(process.cwd(), 'articles');

const getSortedArticles = (): ArticleItem[] => {
  const fileNames = fs.readdirSync(articlesDirectory);

  const allArticlesData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');

    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    const matterResult = matter(fileContents);

    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      category: matterResult.data.category,
      image: matterResult.data.image,
      description: matterResult.data.description,
      author: matterResult.data.author,
      authorImage: matterResult.data.authorImage,
      readTime: matterResult.data.readTime
    };
  });

  return allArticlesData.sort((a, b) => {
    const format = 'MM-DD-YYYY';
    const dateOne = moment(a.date, format);
    const dateTwo = moment(b.date, format);

    if (dateOne.isBefore(dateTwo)) {
      return 1;
    } else if (dateTwo.isAfter(dateOne)) {
      return -1;
    } else {
      return 0;
    }
  });
};

export const getCategorizedArticles = (): Record<string, ArticleItem[]> => {
  const sortedArticles = getSortedArticles();
  const categorizedArticles: Record<string, ArticleItem[]> = {};

  sortedArticles.forEach((article) => {
    if (!categorizedArticles[article.category]) {
      categorizedArticles[article.category] = [];
    }
    categorizedArticles[article.category].push(article);
  });
  return categorizedArticles;
};

export const getArticleData = async (id: string) => {
  const fullPath = path.join(articlesDirectory, `${id}.md`);

  const fileContents = fs.readFileSync(fullPath, 'utf-8');

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    title: matterResult.data.title,
    category: matterResult.data.category,
    date: moment(matterResult.data.date, 'MM-DD-YYYY').format('MMMM Do YYYY'),
    image: matterResult.data.image,
    description: matterResult.data.description,
    author: matterResult.data.author,
    authorImage: matterResult.data.authorImage,
    readTime: matterResult.data.readTime
  };
};
