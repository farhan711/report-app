import React from 'react';
import { RecoilRoot } from 'recoil';
import { Header } from './components/Header';
import { ReportActions } from './components/ReportActions'
import { ReportContainer } from './components/Report/ReportContainer';


function App() {

  return (
    <>
      <RecoilRoot>
        <Header />
        <ReportActions />
        < ReportContainer />
      </RecoilRoot>
    </>
  );
}

export default App;
