"use client"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
  
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"
import { FormFieldType } from "./forms/PatientForm"
import React from "react"
import Image from "next/image"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { E164Number } from "libphonenumber-js/core"
interface CustomProps {
    control : Control<any>,
    fieldType : FormFieldType ,
    name : string,
    label? : string ,
    placeholder? : string ,
    iconSrc?: string ,
    iconAlt? : string 
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect? :boolean,
    children ? : React.ReactNode,
    renderSkeleton ? : (field : any) => React.ReactNode
    

}

const RenderField = ({field , props} : {field : any ; props : CustomProps})=>{
    switch (props.fieldType) {
        case FormFieldType.INPUT:
            return(
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                   {props.iconSrc && (
                    <Image 
                        src={props.iconSrc}
                        height={24}
                        width={24}
                        alt={props.iconAlt || 'icon'}
                        className="ml-2"    
                    />
                   )} 

                   <FormControl>
                        <Input
                            placeholder={props.placeholder}
                            {...field}
                            className="shad-input border-0"
                        />
                   </FormControl>
                </div>
            )
            break;
            
        case FormFieldType.PHONE_INPUT:
            return(
                <FormControl>
                    <PhoneInput 
                        defaultCountry="IN"    
                        placeholder={props.placeholder}
                        international
                        withCountryCallingCode
                        value={field.value as E164Number | undefined}
                        onChange={field.onChange}
                        className="input-phone shad-input border-0"
                    />

                </FormControl>
            )
        default:
            break;
    }
}
const CustomForm = (props : CustomProps) => {
  return (
    <FormField
        control={props.control}
        name={props.name}
        render={({ field }) => (
            <FormItem className="flex-1">
                {
                    props.fieldType !== FormFieldType.CHECKBOX && props.label && (
                        <FormLabel> {props.label}</FormLabel>
                    )
                }

                <RenderField field={field} props={props}/>

                <FormMessage className="shad-error"/>
            </FormItem>

        )}
      />
  )
}

export default CustomForm;
