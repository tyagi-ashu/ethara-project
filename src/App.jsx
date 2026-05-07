import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import {useGetMeQuery} from './apis/userApi';
import Dashboards from './pages/dashboard';
import Projects from './pages/project';
import AddTask from './pages/addTask';
function App() {
  //to fetch restaurant data on app load or refresh
  const {data,isLoading} = useGetMeQuery();
  //console.log(data);
  if(isLoading) return <p>Loading...</p>;
  return (
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/users/login' element={<Login/>}/>
        <Route path='/users/register' element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboards/>}/>
        <Route path='/projects/show' element={<Projects/>}/>
        <Route path='/tasks/:id' element={<AddTask/>}/>
      </Routes>
  )
}

export default App
