import { LightningElement } from 'lwc';
import getPokemons from '@salesforce/apex/PokemonClass.getPokemons'

export default class PokemonCardDetails extends LightningElement {

    Pokemons;
    error;
    serachvalue ='Pokemon';
    isSearchNotAvailable = false;
    
    connectedCallback(){
        this.loadPokemons(this.serachvalue);
    }
    
    handleChange(event){
      this.serachvalue = event.target.value;
      this.loadPokemons(this.serachvalue);
    }

    loadPokemons(searchvalue){
        getPokemons({serachKey: searchvalue})
        .then(result=>{
            this.Pokemons = result;
            console.log('this.Pokemons: '+JSON.stringify(this.Pokemons));
            if(this.Pokemons.length >0){
                this.isSearchNotAvailable = false;
            }else{
                this.isSearchNotAvailable = true;
            }
        })
        .catch(error=>{
            this.error = error;
            this.isSearchNotAvailable = false;
            console.log('error :'+JSON.stringify(error));
        })
    }
}