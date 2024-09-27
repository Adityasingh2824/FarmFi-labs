import React, { useEffect, useState } from 'react';
import './AgrotechNews.css';

// Define types for the news article data
interface Article {
    title: string;
    description: string | null;
    content: string | null;
    publishedAt: string;
    url: string;
}

// Define the AgrotechNews component
const AgrotechNews: React.FC = () => {
    const [news, setNews] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Function to fetch news using the API key
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(
                    'https://newsapi.org/v2/everything?q=agriculture OR agrotech&apiKey=27a9a5d9409f4953a488eb1f227a98c3'
                );
                const data = await response.json();

                if (data.status === 'ok') {
                    setNews(data.articles);
                    setLoading(false);
                } else {
                    throw new Error('Failed to fetch news');
                }
            } catch (error) {
                setError((error as Error).message);
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return <p>Loading news...</p>;
    }

    if (error) {
        return <p>Error fetching news: {error}</p>;
    }

    return (
        <div className="agrotech-news">
            <div className="news-header">
                <h1>Agrotech News</h1>
                <p>Stay updated with the latest advancements in agriculture and technology.</p>
            </div>
            <div className="news-container">
                {news.map((article, index) => (
                    <div key={index} className="news-article">
                        <h2>{article.title}</h2>
                        <p className="news-date">{new Date(article.publishedAt).toDateString()}</p>
                        <p>{article.description || article.content}</p>
                        <a href={article.url} className="read-more" target="_blank" rel="noopener noreferrer">
                            Read more
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AgrotechNews;