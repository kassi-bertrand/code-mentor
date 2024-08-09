import { Box } from "@chakra-ui/react"
import React from 'react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button
  } from '@chakra-ui/react'
import { LANGUAGE_VERSIONS } from "@/constants"
import { RiArrowDropDownLine } from "react-icons/ri";
import { Weight } from "lucide-react";

interface LanguageSelectorProps {
  language: string;
  onSelect: (lang: string) => void;
}


const languages= Object.entries(LANGUAGE_VERSIONS)

const LanguageSelector: React.FC<LanguageSelectorProps>= ({language, onSelect}) => {
  return (
    <div className = "flex items-center">
      <span className = "font-medium mr-2"> Language : </span>
      <div className = "flex-1" >
        <Menu isLazy closeOnSelect = {false}>
          <MenuButton as={Button} bg = "#D9D9D9" padding= "4px" paddingLeft = "10px" width = "100%">
            <div className ="flex justify-between">
              {language}
              <RiArrowDropDownLine className = "w-6 h-6"/>
            </div>
          </MenuButton>
          <MenuList width = "100%" zIndex = {1000}>
            { languages.map(([lang, version]) =>(
              <MenuItem padding = "4px" paddingLeft = "10px" key = {lang} 
                fontWeight ={
                  lang === language ? "bold" : ""
                }
                bg = {
                    lang === language ? "#8CC0D6" : "#D9D9D9"
                }
                onClick ={() => onSelect(lang)}> {lang}
                &nbsp;
                  <span > ({version}) </span>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>  
      </div>
    </div>
  )
}

export default LanguageSelector;
