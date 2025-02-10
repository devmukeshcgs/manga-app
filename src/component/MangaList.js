import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MangaItem from './MangaItem';

const fetchMangaList = async () => {
    const { data } = await axios.get('https://api.mangadex.org/manga', {
        params: {
            limit: 10, // Adjust the limit as needed
            offset: 0,
        },
    });
    return data.data;
};

const MangaList = () => {
    const navigate = useNavigate();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['mangaList'],
        queryFn: fetchMangaList,
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching manga list</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((manga) => (<MangaItem key={manga.id} manga={manga} />))}
        </div>
    );
};

export default MangaList;