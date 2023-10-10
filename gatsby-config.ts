import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
    siteMetadata: {
        title: `Help Docs`,
        siteUrl: `https://help.xeelee.org`,
        helpLink: `mailto:chris@xeelee.org?subject=Gently%20Hugged%20web%20site%20help`,
    },
    // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
    // If you use VSCode you can also use the GraphQL plugin
    // Learn more at: https://gatsby.dev/graphql-typegen
    graphqlTypegen: true,
    plugins: [
        "gatsby-plugin-sass",
        "gatsby-plugin-image",
        {
            resolve: "gatsby-plugin-mdx",
            options: {
                gatsbyRemarkPlugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 1200,
                        },
                    },
                    {
                        resolve: `gatsby-remark-autolink-headers`,
                        options: {
                            icon: false,
                        },
                    },
                ],
            },
        },
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        `gatsby-transformer-json`,
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "images",
                "path": `${__dirname}/static/images/`,
            },
            __key: "images"
        }, {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "pages",
                "path": `${__dirname}/src/pages/`
            },
            __key: "pages"
        }, {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "documents",
                "path": "./src/documents/"
            },
            __key: "documents"
        }, {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "data",
                "path": "./src/data/"
            },
            __key: "data"
        },
    ]
};

export default config;
