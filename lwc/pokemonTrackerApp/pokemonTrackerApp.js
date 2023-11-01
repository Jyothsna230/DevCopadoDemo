import { LightningElement,api,wire } from 'lwc';
import {getRecord, getFieldValue } from 'lightning/uiRecordApi';

const NAME = 'Poke__c.Name';
const LATITUDE = 'Poke__c.Location__Latitude__s';
const LONGITUDE = 'Poke__c.Location__Longitude__s';

const pokemonFields = [NAME,LATITUDE,LONGITUDE];

export default class PokemonTrackerApp extends LightningElement {

    @api recordId;
    mapMarkers=[];
    name;
    cardTitle;

    @wire(getRecord,{recordId: '$recordId', fields: pokemonFields})
    getPokemons({error,data}){
        if(error){
            console.log('error:', +error);

        }
        else if(data){
            this.name = getFieldValue(data, NAME);
            this.cardTitle = this.name;

            const Latitude = getFieldValue(data,LATITUDE);
            const Longitude = getFieldValue(data,LONGITUDE);

            this.mapMarkers = [{
                location: {Latitude, Longitude},
                title: this.name,
                description:`Coords : ${Latitude},${Longitude}`
            }]

            console.log('this.mapMarkers :' +JSON.stringify(this.mapMarkers));
        }
    }
}