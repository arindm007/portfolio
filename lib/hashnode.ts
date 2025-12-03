import { GraphQLClient, gql } from 'graphql-request';

const HASHNODE_API_URL = 'https://gql.hashnode.com';
// TODO: Replace with user's actual publication host
const PUBLICATION_HOST = 'arindamchakraborty.hashnode.dev';

const client = new GraphQLClient(HASHNODE_API_URL);

export const getPosts = async () => {
  const query = gql`
    query Publication {
      publication(host: "${PUBLICATION_HOST}") {
        isTeam
        title
        posts(first: 10) {
          edges {
            node {
              id
              title
              brief
              slug
              coverImage {
                url
              }
              publishedAt
              author {
                name
                profilePicture
              }
            }
          }
        }
      }
    }
  `;

  return client.request(query);
};

export const getPostBySlug = async (slug: string) => {
  const query = gql`
    query Post($slug: String!, $host: String!) {
      publication(host: $host) {
        post(slug: $slug) {
          id
          title
          subtitle
          content {
            html
          }
          coverImage {
            url
          }
          publishedAt
          author {
            name
            profilePicture
          }
        }
      }
    }
  `;

  return client.request(query, { slug, host: PUBLICATION_HOST });
};

export const getDailyPosts = async () => {
  const query = gql`
    query DailyPosts($host: String!) {
      publication(host: $host) {
        posts(first: 20, filter: { tagSlugs: ["daily", "til"] }) {
          edges {
            node {
              id
              title
              brief
              slug
              publishedAt
              tags {
                slug
              }
            }
          }
        }
      }
    }
  `;

  return client.request(query, { host: PUBLICATION_HOST });
};
