import React, { useState, useEffect, useCallback } from "react";

import axios from "axios";
import { useRouter } from "next/router";
import NotesIcon from '@mui/icons-material/Notes';
import PeopleIcon from '@mui/icons-material/People';
import BookIcon from '@mui/icons-material/Book';
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import ResourceSidebar from "../../components/resource/ResourceSidebar";
import PageOne from "../../components/subpages"

import {
    Contributors,
    Main,
    PersonalNotes
  } from "../../components/resource/subpages";

const ResourcePage = () => {

  const menus = [
    { id: 1, name: "Resource & Discussion", icon: <NotesIcon />, page: <Main/> },
    { id: 2, name: "Contributors", icon: <NotesIcon />, page: <Contributors/> },
    { id: 3, name: "My Notes", icon: <NotesIcon />, page: <PersonalNotes/> },
  ];






  return (
    <>
      <div>
        <ResourceSidebar menus = {menus}/>
      </div>
    </>
  );
};

export default ResourcePage;
