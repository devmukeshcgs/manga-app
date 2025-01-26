import React, { useEffect, useState } from 'react';

// import { searchManga } from './services/mangadexService';
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router";


import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from 'react-query'
import { HomePage } from './services/HomePage'
import Header from './Header';
// import DetailsPage from './services/DetailsPage';
import Coverpage from './services/CoverPage';

const queryClient = new QueryClient()

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [mangaList, setMangaList] = useState([]);

  return (<QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        {/* <Route path="/details/:id" element={<DetailsPage />} /> */}
        <Route path="/cover" element={<Coverpage />} />

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
