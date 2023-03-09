import { LightningElement } from 'lwc';
import getAddress from '@salesforce/apex/SmartyAPI.getAddress'

export default class AutoAddress extends LightningElement {

    name =""
    phone=""
    website = ""
    accountNumber=""

    doneTypingInterval = 300;
    typingTimer;

    suggestion;

    city =''
    state=''
    postalCode=''
    street=''

    handleInputChange(event) {
        clearTimeout(this.typingTimer);
        console.log('Here')
        let value = event.target.value;
        this.typingTimer = setTimeout(() => {
            if(value){
                getAddress({ search: value }).then((result) => {
                    let temp  = JSON.parse(result);
                    let suggestionList = []
                    temp.suggestions.forEach((elem)=>{
                        let address = ''+elem.street_line +','+elem.city +','+elem.state +','+elem.zipcode;
                        
                        suggestionList.push({id : Date.now(),value:address}); 
                    })
                    console.log('this.suggestion '+suggestionList)
                    this.suggestion = suggestionList
             //       const suggestionPane = this.template.querySelector('.slds-popover');
               //     suggestionPane.classList.remove('slds-hide');
                })
            }
        }, this.doneTypingInterval);

      }

      setAddress(event){
        let placeId = event.currentTarget.dataset.value.split(',');
        let key  = event.currentTarget.dataset.key
        this.suggestion = undefined
        console.log('Selected value'+placeId)
        console.log('Selected key ',key)
        this.street = placeId.length > 0 ? placeId[0] :''
        this.city = placeId.length > 1 ? placeId[1] : ''
        this.state = placeId.length > 2 ? placeId[2] : ''
        this.postalCode = placeId.length > 3 ? placeId[3] : ''
      }

      handleClick(event){

      }
}