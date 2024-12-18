import React, { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import Navbar from "./components/Navbar"
import AddMeal from './pages/AddMeal'
import MealDetail from "./pages/MealDetail"
import EditMeal from './pages/EditMeal'
import CalView from './pages/CalView'


function Logout(){
  localStorage.clear()
  return <Navigate to= "/login"/>

}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path = "/" element={
              <ProtectedRoute>
                <Navbar/>
                <Home />
              </ProtectedRoute>
          }
          />
          <Route path = "/addMeal" element = {
            <ProtectedRoute>
              <Navbar/>
              <AddMeal/>
            </ProtectedRoute>
            }
            />

          <Route path = "/meal/:id/view" element = {
            <ProtectedRoute>
              <Navbar/>
              <MealDetail/>
            </ProtectedRoute>
            }
          />

          <Route path = "/meal/:id/edit" element = {
            <ProtectedRoute>
              <Navbar/>
              <EditMeal/>
            </ProtectedRoute>
            }
          />



        <Route path = "/login" element= { <Login/>}/>
        <Route path = "/logout" element= { <Logout/>}/>
        <Route path = "/register" element= { <RegisterAndLogout/>}/>


        
        <Route path = "*" element= { <NotFound/>}/>


      </Routes>
    </BrowserRouter>
  )

}

export default App
