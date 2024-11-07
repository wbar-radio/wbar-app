import React, {useState, useEffect} from 'react';

export default function FeedbackForm() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const iframe = document.getElementById('feedback-form-iframe');
        iframe.onload = () => setLoading(false);
    }, []);

    return (
        <div>
            {loading && (
                <div className="spinner-border text-light" style={{width: '6rem', height: '6rem'}} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
            <iframe
                id="feedback-form-iframe"
                src="https://docs.google.com/forms/d/e/1FAIpQLSdrU00XxtYxR9FHDB-yhDaW7L5h1gDo2zDbYR0tt5OP8QlEWA/viewform?embedded=true"
                width="100%"
                height="1356px"
                style={{display: loading ? 'none' : 'block'}}
            ></iframe>
        </div>
    );
}