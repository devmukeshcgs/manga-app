import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 

const fetchMangaDetails = async (mangaId) => {
  const { data } = await axios.get(`https://api.mangadex.org/manga/${mangaId}`);
  return data.data;
};

const fetchMangaPages = async (chapterId) => {
  const { data } = await axios.get(`https://api.mangadex.org/at-home/server/${chapterId}`);
  return data;
};

const MangaDetails = () => {
  const { mangaId } = useParams(); // Get mangaId from the URL
  const navigate = useNavigate(); // For navigation

  const { data: mangaDetails, isLoading: isDetailsLoading, isError: isDetailsError } = useQuery({
    queryKey: ['mangaDetails', mangaId],
    queryFn: () => fetchMangaDetails(mangaId),
  });

  const chapterId = mangaDetails?.relationships.find((rel) => rel.type === 'chapter')?.id;

  const { data: mangaPages, isLoading: isPagesLoading, isError: isPagesError } = useQuery({
    queryKey: ['mangaPages', chapterId],
    queryFn: () => fetchMangaPages(chapterId),
    enabled: !!chapterId,
  });

  if (isDetailsLoading || isPagesLoading) return <div>Loading...</div>;
  if (isDetailsError || isPagesError) return <div>Error fetching manga details</div>;

  return (
    <div>
      <button
        onClick={() => navigate('/')} // Navigate back to the manga list
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Back to List
      </button>
      <h1 className="text-2xl font-bold">{mangaDetails.attributes.title.en}</h1>
      <p className="text-gray-600">{mangaDetails.attributes.description.en}</p>
      
      <div className="mt-4">
        {mangaPages?.chapter?.data.map((page, index) => (
          <img
            key={index}
            src={`https://uploads.mangadex.org/data/${mangaPages.chapter.hash}/${page}`}
            alt={`Page ${index + 1}`}
            className="w-full mb-4"
          />
        ))}
      </div>
    </div>
  );
};

export default MangaDetails;