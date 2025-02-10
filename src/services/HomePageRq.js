import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import CoverPage from './CoverPage';

// Fetch data function
const fetchData = async () => {
    const response = await axios.get('https://api.mangadex.org/manga');
    return response.data;
};

// Utility function for class names
const classNames = (...classes) => classes.filter(Boolean).join(' ');

// MangaItem component to render individual manga
const MangaItem = React.memo(({ manga }) => (
    <a href={`/details/${manga.id}`} key={manga.id}>
        <div className="mt-4">
            <div className="text-xs font-bold text-sky-500">
                {manga.attributes.status === "completed" ? (
                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                        {manga.attributes.status}
                    </span>
                ) : manga.attributes.status === "ongoing" ? (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                        {manga.attributes.status}
                    </span>
                ) : (
                    <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                        {manga.attributes.status}
                    </span>
                )}
            </div>
            <div className="mt-1 font-bold text-gray-700">
                <a href={`/details/${manga.id}`} className="hover:underline">
                    {manga.attributes.title?.en}
                </a>
            </div>
            <div className="mt-2 text-sm text-gray-600">{manga.attributes.year}</div>
            <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{manga.attributes.description?.en}</p>
            <div className="flex flex-wrap mt-4">
                {manga.attributes.tags.map((tag) => (
                    <span key={tag.id} className="bg-blue-100 text-blue-500 text-xs mb-2 font-medium me-2 px-2.5 py-1 rounded-sm">
                        {tag.attributes?.name?.en}
                    </span>
                ))}
            </div>
        </div>
    </a>
));

// HomePageRq component
export const HomePageRq = () => {
    const { data, status, isLoading, isFetching } = useQuery(
        ['manga'],
        fetchData,
        {
            staleTime: 5 * 60 * 1000, // 5 minutes
            cacheTime: 10 * 60 * 1000, // 10 minutes
            retry: 1, // Retry once if the query fails
        }
    );

    if (isLoading) {
        return <div>Loading data...</div>;
    }

    if (status === 'error') {
        return <div>Error fetching data</div>;
    }

    return (
        <div>
            <div className="bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto mt-0 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-4 sm:mt-4 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                        {data.data.map((manga) => (
                            <MangaItem key={manga.id} manga={manga} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePageRq;