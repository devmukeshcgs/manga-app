import React, { use, useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import { useParams } from "react-router";

const fetchData = async (id) => {
    return await axios.get(`https://api.mangadex.org/manga/${id}`)
        .then(response => response.data)
}
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const fetchChapterImages = async () => {
    // Fetch chapter data
    const chapterResponse = await fetch(
        `https://api.mangadex.org/chapter/${chapterId}`
    );
    if (!chapterResponse.ok) {
        throw new Error("Failed to fetch chapter data");
    }
    const chapterData = await chapterResponse.json();

    // Extract hash and filenames
    const hash = chapterData.data.attributes.hash;
    const filenames = chapterData.data.attributes.data;

    // Construct image URLs
    return filenames.map(
        (filename) => `https://uploads.mangadex.org/data/${hash}/${filename}`
    );
};

export const DetailsPage = ({ }) => {
    let params = useParams();
    console.log("xxxxxxxxxxx", params.id);
    // const queryClient = useQueryClien 
    const { data, status,  isFetching } = useQuery('manga', () => fetchData(params.id))

    const {
        data: imageUrls,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["chapterImages", chapterId], // Unique key for caching
        queryFn: fetchChapterImages,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="App">
            <h1>MangaDex Image Viewer</h1>
            <div className="image-container">
                {imageUrls.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        alt={`Page ${index + 1}`}
                        style={{ width: "100%", marginBottom: "10px" }}
                    />
                ))}
            </div>
        </div>
    );
}
export default DetailsPage

