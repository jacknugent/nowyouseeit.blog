import React from "react";
import Layout from "../components/layout";
import NewsletterForm from "../components/newsletterform";
import SEO from "../components/seo";
import OriginalTranscript from "../../content/indiana-jones/original-raiders-transcript.pdf";
import StyledTranscript from "../../content/indiana-jones/styled-raiders-transcript.pdf";

export default function IndianaJones() {
    return (
        <Layout>
            <SEO title="Indiana Jones" />
            <div className="medium-layout mb-5">
                <h1>The Indiana Jones Archives</h1>
                <p className="mb-4 mt-3">
                    <a href={OriginalTranscript} target="_blank" rel="noopener noreferrer">
                        The Official Lost Transcript
                    </a>
                    <br />
                    <a href={StyledTranscript} target="_blank" rel="noopener noreferrer">
                        The Lost Transcript typed up and easier to read
                    </a>
                </p>
                <hr />
                <div className="mt-4">
                    <NewsletterForm>
                        Like what you See? You can get more articles and videos by joining the Now You See It newsletter. No spam, ever. Enter your email to join hundreds of others getting algorithm-free media criticism.
                    </NewsletterForm>
                </div>
            </div>
        </Layout >
    )
}