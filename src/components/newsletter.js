import React, { useState } from "react"
import addToMailchimp from 'gatsby-plugin-mailchimp'

export default function Newsletter() {
    const [emailInput, setEmailInput] = useState("");
    const [mailChimpMessage, setMailChimpMessage] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (emailInput) {
            const result = await addToMailchimp(emailInput)
            setMailChimpMessage(result)
        }
    }

    return (
        <div>
            <p>
                Like what you See? You can get more articles and videos by joining the Now You See It newsletter. No spam, ever. Enter your email to join hundreds of others getting ad-free, algorithm-free media criticism.
            </p>
            <div className="w-100">
                <form onSubmit={handleSubmit} className="newsletter-form position-relative mb-3 mt-3">
                    <input
                        onChange={e => setEmailInput(e.target.value)}
                        value={emailInput}
                        type="text"
                        name="name"
                        placeholder="My email address is...." aria-labelledby="enteremailaddress" />
                    <button
                        type="submit"
                        value="Submit"
                        className="newsletter-button ms-2">
                        Try the free newsletter
                    </button>
                    {mailChimpMessage.msg &&
                        <p
                            className={mailChimpMessage.result === "success" ? "text-success" : "text-danger"}
                            dangerouslySetInnerHTML={{ __html: mailChimpMessage.msg }} />}
                </form>
            </div>
        </div>
    )
}