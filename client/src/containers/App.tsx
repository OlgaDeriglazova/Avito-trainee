import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';

import Form from '../pages/Form/Form';
import ListAds from '../pages/ListAds/ListAds';
import AdPage from '../pages/AdPage/AdPage';
import Page404 from '../pages/Page404/Page404'

function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate replace to="/list" />} />
        <Route path="/list" element={<ListAds />} />
        <Route path='/form' element={<Form />}/>
        <Route path='/items/:id' element={<AdPage />}/>
        <Route path='*' element={<Page404 />}/>
      </Routes>
  )
}
export default App;
