import React, { useEffect, useState } from 'react';
import './AgrotechNews.css'; // Assuming you'll create a new CSS file for the Agrotech News page

const AgrotechNews = () => {
    const [news, setNews] = useState([]);

    // Simulating an API call to fetch news (you can replace it with a real API)
    useEffect(() => {
        const fetchNews = async () => {
            // Simulated news articles. Replace this with an API call if needed.
            const newsArticles = [
                {
                    id: 1,
                    title: 'Blockchain in Agriculture: The Future of Farming',
                    date: 'September 20, 2024',
                    excerpt: 'Blockchain technology is revolutionizing the agricultural industry. From ensuring supply chain transparency to enabling farmers to tokenize assets, this is how blockchain is shaping the future of farming.',
                    link: '#',
                },
                {
                    id: 2,
                    title: 'How Drones Are Enhancing Crop Monitoring',
                    date: 'September 18, 2024',
                    excerpt: 'Drones are now widely used in the agricultural industry to monitor crop health, analyze fields, and optimize irrigation systems.',
                    link: '#',
                },
                {
                    id: 3,
                    title: 'Sustainable Agriculture: Tech and Trends',
                    date: 'September 15, 2024',
                    excerpt: 'Sustainable agriculture is the key to ensuring long-term food security. Here are some of the latest tech trends that are helping farmers meet sustainability goals.',
                    link: '#',
                },
            ];
            setNews(newsArticles);
        };

        fetchNews();
    }, []);

    return (
        <div className="agrotech-news">
            <div className="news-header">
                <h1>Agrotech News</h1>
                <p>Stay updated with the latest advancements in agriculture and technology.</p>
            </div>
            <div className="news-container">
                {news.map(article => (
                    <div key={article.id} className="news-article">
                        <h2>{article.title}</h2>
                        <p className="news-date">{article.date}</p>
                        <p>{article.excerpt}</p>
                        <a href={article.link} className="read-more">Read more</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AgrotechNews;
