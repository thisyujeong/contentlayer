import { blog, post, site_config } from '@sourcebit/sdk/types'
import React, { FC } from 'react'
import BlogPostFooter from '../components/BlogPostFooter'
import { Layout } from '../components/index'
import { Link, withPrefix } from '../utils'

const Blog: FC<{ doc: blog; config: site_config; posts: post[] }> = ({ doc, config, posts }) => (
  <Layout doc={doc} config={config}>
    <div className="outer">
      <div className="inner">
        <div className="grid post-feed">
          {posts.map((post, post_idx) => (
            <article key={post_idx} className="cell post">
              <div className="card">
                {post.thumb_image && (
                  <Link className="post-thumbnail" href={withPrefix(post.__computed.urlPath)}>
                    <img src={withPrefix(post.thumb_image)} alt={post.thumb_image_alt} />
                  </Link>
                )}
                <div className="post-body">
                  <header className="post-header">
                    <h2 className="post-title">
                      <Link href={withPrefix(post.__computed.urlPath)}>{post.title}</Link>
                    </h2>
                  </header>
                  <div className="post-excerpt">
                    <p>{post.excerpt}</p>
                  </div>
                  <BlogPostFooter post={post} dateType="short" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  </Layout>
)

export default Blog