import React, { useState } from "react";
import addToMailchimp from "gatsby-plugin-mailchimp";

type MailChimpResponse = {
    msg: string;
    result: "success" | "error"
}

export default function NewsletterForm({ children }) {
    const [emailInput, setEmailInput] = useState("");
    const [mailChimpMessage, setMailChimpMessage] = useState<MailChimpResponse | undefined>(undefined);

    const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
        e.preventDefault()
        if (emailInput) {
            const result = await addToMailchimp(emailInput, null, null)
            if(result.msg.includes("Almost finished...")) {
                result.msg = "Almost finished... We need to confirm your email address. To complete the subscription process, please click the link in the email we just sent you (it may be in your spam/promotions folder)";
            }
            setMailChimpMessage(result)
        }
    }

    return (
        <div>
            <p>
                {children}
            </p>
            <div className="w-100">
                <form onSubmit={handleSubmit} className="newsletter-form position-relative mb-3 mt-3">
                    <label className="newsletter-label" htmlFor="newsletterInput">Sign Up for Newsletter</label>
                    <input
                        className="newsletter-input"
                        id="newsletterInput"
                        type="text"
                        name="names"
                        placeholder="My email address is...."
                        onChange={e => setEmailInput(e.target.value)}
                        value={emailInput} />
                    <button
                        type="submit"
                        value="Submit"
                        className="newsletter-button ml-2">
                        Try the free newsletter
                    </button>
                    {mailChimpMessage &&
                        <p
                            className={mailChimpMessage.result === "success" ? "text-success mt-1" : "text-danger mt-1"}
                            dangerouslySetInnerHTML={{ __html: mailChimpMessage.msg }} />}
                </form>
            </div>
        </div>
    )
}