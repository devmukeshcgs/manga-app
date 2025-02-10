import React, { useEffect, useState } from 'react';

// import { searchManga } from './services/mangadexService';
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router";


import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from 'react-query'
import Header from './Header';
// import DetailsPage from './services/DetailsPage';
import Coverpage from './services/CoverPage';
import { HomePage } from './services/HomePage'
import HomePageRq from './services/HomePageRq';
import MangaDetails from './component/MangaDetails';
import MangaList from './component/MangaList';

const queryClient = new QueryClient()

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [mangaList, setMangaList] = useState([]);
  const [selectedMangaId, setSelectedMangaId] = useState(null);
  return (<QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Header />
      {/* {selectedMangaId ? (
        <MangaDetails mangaId={selectedMangaId} onBack={() => setSelectedMangaId(null)} />
      ) : (
        <MangaList onMangaClick={setSelectedMangaId} />
      )} */}
      <Routes>
        {/* <Route index element={<HomePageRq />} /> */}
        <Route path="/cover" element={<Coverpage />} />
        <Route path="/" element={<MangaList />} />
        <Route path="/manga/:mangaId" element={<MangaDetails />} />
        {/* <Route index element={<HomePage />} /> */}
        {/* <Route path="/details/:id" element={<DetailsPage />} /> */}
        {/* <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route> */}

        {/* <Route path="concerts">
          <Route index element={<ConcertsHome />} />
          <Route path=":city" element={<City />} />
          <Route path="trending" element={<Trending />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  </QueryClientProvider >
  );
}

export default App;
