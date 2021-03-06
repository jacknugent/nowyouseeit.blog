import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import NewsletterForm from "../components/newsletterform";
import SEO from "../components/seo";

export default function Newsletter() {
  return (
    <Layout>
      <SEO title="Newsletter" />
      <div className="medium-layout mt-5 mb-5">
        <NewsletterForm>
          Get access to Now You See It articles and videos by joining our newsletter. No spam, ever. Enter your email to join hundreds of others getting algorithm-free media criticism.
        </NewsletterForm>
      </div>
    </Layout>
  )
}