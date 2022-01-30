import Head from 'next/head'
import Layout from '../../components/layout'
import Date from '../../components/date'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'

type PostData = {
  id: string;
  title: string;
  date: string;
  contentHtml: string;
}

export const getStatisProps : GetStaticProps = async ({params}) => {
  const postData = await getPostData(`${params?.id}`);
  return {
    props: {
      postData
    }
  }
}

export const getStaticPaths: GetStaticPaths = () => {
    const paths = getAllPostIds()
    return {
      paths,
      fallback: false
    }
}

export default function Post({ postData }: {postData: PostData}) {
  return (
    <Layout home={false}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}