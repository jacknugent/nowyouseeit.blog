import React from "react";
import Layout from "../components/layout";
import NewsletterForm from "../components/newsletterform";
import SEO from "../components/seo";

export default function Newsletter() {
  return (
    <Layout>
      <SEO title="Newsletter" />
      <div className="newsletter-page medium-layout">
        <NewsletterForm />
      </div>
    </Layout>
  )
}