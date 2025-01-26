import React from "react";
import { useQuery } from 'react-query'

// Replace with your manga ID
const mangaId = "cace0b4c-6696-4d08-ae26-6c8be207ef36";

// // Fetch manga details including cover art relationship
// const fetchMangaDetails = async () => {
//   const response = await fetch(
//     `https://api.mangadex.org/manga/${mangaId}?includes[]=cover_art`
//   );
//   if (!response.ok) {
//     throw new Error("Failed to fetch manga details");
//   }
//   return response.json();
// };

// // Fetch cover art details to get the image URL
// const fetchCoverImageUrl = async (coverArtId) => {
//   const response = await fetch(
//     `https://api.mangadex.org/cover/${coverArtId}`
//   );
//   if (!response.ok) {
//     throw new Error("Failed to fetch cover art details");
//   }
//   const data = await response.json();
//   const fileName = data.data.attributes.fileName;
//   return `https://uploads.mangadex.org/covers/${mangaId}/${fileName}`;
// };

function CoverPage({ mangaid }) {
    // Fetch manga details including cover art relationship
    const fetchMangaDetails = async () => {
        const response = await fetch(
            `https://api.mangadex.org/manga/${mangaid}?includes[]=cover_art`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch manga details");
        }
        return response.json();
    };

    // Fetch cover art details to get the image URL
    const fetchCoverImageUrl = async (coverArtId) => {
        const response = await fetch(
            `https://api.mangadex.org/cover/${coverArtId}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch cover art details");
        }
        const data = await response.json();
        const fileName = data.data.attributes.fileName;
        return `https://uploads.mangadex.org/covers/${mangaid}/${fileName}`;
    };




    // Fetch manga details
    const {
        data: mangaDetails,
        isLoading: isMangaLoading,
        isError: isMangaError,
        error: mangaError,
    } = useQuery({
        queryKey: ["mangaDetails", mangaid],
        queryFn: fetchMangaDetails,
    });

    // Extract cover art ID from manga details
    const coverArtId = mangaDetails?.data?.relationships?.find(
        (rel) => rel.type === "cover_art"
    )?.id;

    // Fetch cover image URL
    const {
        data: coverImageUrl,
        isLoading: isCoverLoading,
        isError: isCoverError,
        error: coverError,
    } = useQuery({
        queryKey: ["coverImage", coverArtId],
        queryFn: () => fetchCoverImageUrl(coverArtId),
        enabled: !!coverArtId, // Only fetch if coverArtId is available
    });

    if (isMangaLoading || isCoverLoading) {
        return <div>Loading...</div>;
    }

    if (isMangaError) {
        return <div>Error fetching manga details: {mangaError.message}</div>;
    }

    if (isCoverError) {
        return <div>Error fetching cover image: {coverError.message}</div>;
    }

    return (
        <div className="CoverPage">
            {coverImageUrl && (
                <img
                    src={coverImageUrl}
                    alt="Manga Cover"
                    style={{ maxWidth: "100%", height: "auto" }}
                />
            )}
        </div>
    );
}

export default CoverPage;