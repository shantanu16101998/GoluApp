const facebookConfig = require('../config/facebook')
const axiosModule = require('axios')



let userTokens = ""

function auth(request : {},response : any){
    return response.redirect('https://www.facebook.com/v15.0/dialog/oauth?response_type=code&client_id=575427578042258&redirect_uri=https://57ef-2401-4900-1cb9-a1d9-8c5e-2e5c-b745-5c45.ngrok-free.app/auth/callback')
}

function authCallback(request : any,response : any){
    const code = request.query.code;


      axiosModule.post('https://graph.facebook.com/v15.0/oauth/access_token?code=' + code + '&client_id=' + facebookConfig.client_id + '&client_secret=' + facebookConfig.client_secret + '&redirect_uri=' + facebookConfig.redirect_uri)
      .then((response: any)  => {
        // Handle the response here
        console.log(response.data);
        const access_token = response.data.access_token;

        userTokens = access_token;
      })
      .catch((error:any) => {
        console.error(error);
      });

    
    response.send('Authentication successful! You can now post on behalf of the user.');
}


module.exports = {
    auth,
    authCallback
  };