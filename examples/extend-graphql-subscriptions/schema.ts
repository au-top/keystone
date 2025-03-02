import { list, graphQLSchemaExtension } from '@keystone-6/core';
import { select, relationship, text, timestamp } from '@keystone-6/core/fields';
import { pubSub } from './websocket';

import type { Lists } from '.keystone/types';

export const lists: Lists = {
  Post: list({
    hooks: {
      // this hook publishes posts to the 'POST_UPDATED' channel when a post mutated
      afterOperation: async ({ item }) => {
        // WARNING: passing this item directly to pubSub bypasses any contextual access control
        //    if you want access control, you need to use a different architecture
        //
        //   tl;dr Keystone access filters are not respected in this scenario
        console.log('POST_UPDATED', { id: item?.id });

        pubSub.publish('POST_UPDATED', {
          postUpdated: item,
        });
      },
    },
    fields: {
      title: text({ validation: { isRequired: true } }),
      status: select({
        type: 'enum',
        options: [
          { label: 'Draft', value: 'draft' },
          { label: 'Published', value: 'published' },
        ],
      }),
      content: text(),
      publishDate: timestamp(),
      author: relationship({ ref: 'Author.posts', many: false }),
    },
  }),

  Author: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({ isIndexed: 'unique', validation: { isRequired: true } }),
      posts: relationship({ ref: 'Post.author', many: true }),
    },
  }),
};

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: `
    type Mutation {
      """ Publish a post """
      publishPost(id: ID!): Post
    }

    type Time {
      iso: String!
    }

    type Subscription {
      postPublished: Post
      postUpdated: Post
      time: Time
    }`,

  resolvers: {
    Mutation: {
      // custom mutation to publish a post
      publishPost: async (root, { id }, context) => {
        // we use `context.db.Post`, not `context.query.Post`
        //   as this matches the type needed for GraphQL resolvers
        const post = context.db.Post.updateOne({
          where: { id },
          data: { status: 'published', publishDate: new Date().toISOString() },
        });

        console.log('POST_PUBLISHED', { id });

        // WARNING: passing this item directly to pubSub bypasses any contextual access control
        //    if you want access control, you need to use a different architecture
        //
        //   tl;dr Keystone access filters are not respected in this scenario
        pubSub.publish('POST_PUBLISHED', {
          postPublished: post,
        });

        return post;
      },
    },

    // add the subscription resolvers
    Subscription: {
      time: {
        // @ts-ignore
        subscribe: () => pubSub.asyncIterator(['TIME']),
      },
      postPublished: {
        // @ts-ignore
        subscribe: () => pubSub.asyncIterator(['POST_PUBLISHED']),
      },
      postUpdated: {
        // @ts-ignore
        subscribe: () => pubSub.asyncIterator(['POST_UPDATED']),
      },
    },
  },
});
