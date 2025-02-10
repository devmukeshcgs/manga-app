import React from 'react'
import { useNavigate } from 'react-router-dom';
import CoverPage from '../services/CoverPage';
export default function MangaItem({ manga }) {
    const navigate = useNavigate();

    return (
        <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => navigate(`/manga/${manga.id}`)}>
            <div className="mt-4">
                <CoverPage mangaid={manga.id} />

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
        </div>
    )
}
