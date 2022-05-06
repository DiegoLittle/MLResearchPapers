import {remark} from 'remark';
import html from 'remark-html';



export async function markdownToHtml(markdown) {
    const result = await remark().use(html).process(markdown);
    return result.toString();
  }

  export const renderMarkdown = async (
    markdownContent: string
  ): Promise<string> => {
    return await markdownToHtml(markdownContent || '');
  };