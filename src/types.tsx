import React, { Component } from 'react'

export interface ICVObject{
    id: string;
    name: string;
    firstName: string;
    birthDate: string;
    pictureName: string;
    phone: string;
    email: string;
    country: string;
    state: string;
    city: string;
    npa: string;
    address: string;
    housenumber: string;
    allSections?: Section[];
}

export interface ISection{
    fieldType : string;
    fieldData : string[];
    fieldCustomisation?: string[];
    title?: string;
}

export class CVObject implements ICVObject{
    id = "string";
    name= "string";
    firstName= "string";
    birthDate= "string";
    pictureName= "string";
    phone= "string";
    email= "string";
    country= "string";
    state= "string";
    city= "string";
    npa= "string";
    address= "string";
    housenumber= "string";
    allSections?: Section[] | undefined;
}

export class Section implements ISection {
    fieldType= "string";
    fieldData= ["string"];
    fieldCustomisation?: string[] | undefined;
    title?: string | undefined;

}
