public with sharing class SmartyAPI {
    @AuraEnabled
    public static string getAddress(String search){
        try {
            search = search.replace(' ','%20');
            System.debug('search String '+search);
            String authId = System.Label.SmartyAuthId; //Custom Label
            String token = System.Label.SmartyToken; //Custom Label
            String url = 'https://us-autocomplete-pro.api.smartystreets.com/lookup?auth-id='+authId+'&auth-token='+token+'&search='+search;
            System.debug('search Url '+url);
            
            HttpRequest req = new HttpRequest();
            req.setEndpoint(url);
            req.setMethod('GET');
            Http http = new Http();
            HTTPResponse res = http.send(req);
            System.debug(res.getBody());
            return res.getBody();

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}