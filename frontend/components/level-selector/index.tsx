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
import { USER_LEVEL } from "@/constants"
import { RiArrowDropDownLine } from "react-icons/ri";

const LanguageSelector = ({level, onChoose}) => {
  return (
    <div className = "flex items-center">
      <span className = "font-medium mr-2"> Level : </span>
      <div className = "flex-1" >
        <Menu isLazy closeOnSelect = {false}>
          <MenuButton as={Button} bg = "#D9D9D9" padding= "4px" paddingLeft = "10px" width = "100%">
            <div className ="flex justify-between">
              {level}
              <RiArrowDropDownLine className = "w-6 h-6"/>
            </div>
          </MenuButton>
          <MenuList width = "100%" zIndex = {1000}>
            { USER_LEVEL.map((lev) =>(
              <MenuItem padding = "4px" paddingLeft = "10px" key = {lev} 
                fontWeight ={
                  lev === level ? "bold" : ""
                }
                bg = {
                    lev === level ? "#8CC0D6" : "#D9D9D9"
                }
                onClick ={() => onChoose(lev)}> {lev}
               
              </MenuItem>
            ))}
          </MenuList>
        </Menu>  
      </div>
    </div>
  )
}

export default LanguageSelector;