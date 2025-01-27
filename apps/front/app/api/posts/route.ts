import { NextResponse } from 'next/server';
import type { PostType } from '@repo/ui/interface';

const generatePosts = (page: number, limit: number): Array<PostType> =>
  Array.from({ length: limit }, (_, index) => {
    const postIndex = (page - 1) * limit + index + 1;
    return {
      id: postIndex,
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'textStyle',
                  attrs: {
                    color: '#FF5733',
                  },
                },
              ],
              text: `샘플 텍스트 ${postIndex}`,
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'textStyle',
                  attrs: {
                    color: '#FF5733',
                  },
                },
              ],
              text: `샘플 텍스트 ${postIndex}`,
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'textStyle',
                  attrs: {
                    color: '#FF5733',
                  },
                },
                {
                  type: 'italic',
                },
              ],
              text: '강조된 텍스트',
            },
          ],
        },
        {
          type: 'image',
          attrs: {
            src: 'https://github.com/shadcn.png',
            alt: `샘플 이미지 ${postIndex}`,
            title: `샘플 제목 ${postIndex}`,
          },
        },
      ],
    };
  });

export function GET(request: Request): Response {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '3', 10);
    const total = 1000;

    if (page < 1 || limit < 1) {
      return NextResponse.json(
        { error: 'Invalid page or limit parameters' },
        { status: 400 },
      );
    }

    const posts = generatePosts(page, limit);
    const hasMore = page * limit < total;

    return NextResponse.json({ posts, hasMore });
  } catch (error) {
    return NextResponse.json(
      { error: '데이터를 가져오는 데 실패했습니다.' },
      { status: 500 },
    );
  }
}
