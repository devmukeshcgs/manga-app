import React from 'react'
import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import CoverPage from './CoverPage'

const fetchData = async () => {
    return await axios.get('https://api.mangadex.org/manga')
        .then(response => response.data)
}
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export const HomePage = () => {
    // const queryClient = useQueryClient()
    const { data, status, isLoading, isFetching } = useQuery(
        {
            queryKey: ["manga"],
            queryFn: fetchData,
        }
    )
    // const { status, data, error, isFetching } = usePosts()
    console.log(data);

    return (
        <div>
            {status === 'loading' && <div>Loading data</div>}
            {status === 'error' && <div>Error fetching data</div>}
            {status === 'success' && (
                <div className="bg-white">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto mt-0 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16  pt-4 sm:mt-4 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                            {data.data.map((manga) => (
                                <a href='' key={manga.id}>
                                    {/* <img className="rounded-lg" src={img} alt={imgAlt} /> */}
                                    <CoverPage mangaid={manga.id} />

                                    <div className="mt-4">
                                        <div className="text-xs font-bold text-sky-500">
                                            {manga.attributes.status == "completed" ? (<span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ">{manga.attributes.status}</span>
                                            ) : (manga.attributes.status == "ongoing" ? (<span class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full  ">{manga.attributes.status}</span>) : (<span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ">{manga.attributes.status}</span>))}
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
                                                <span className="bg-blue-100 text-blue-500 text-xs mb-2 font-medium me-2 px-2.5 py-1 rounded-sm">{tag.attributes?.name?.en}</span>))}
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default HomePage

