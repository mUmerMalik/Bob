import {SET_COUNTER,INCREMENT_COUNTER,DECREMENT_COUNTER,CLEAR_COUNTER} from './types'
import { Actions } from 'react-native-router-flux';
import { LoginButton, AccessToken ,LoginManager ,GraphRequest,GraphRequestManager,} from 'react-native-fbsdk';
import appleAuth,{ AppleButton,AppleAuthRequestOperation,AppleAuthRequestScope,AppleAuthCredentialState } from '@invertase/react-native-apple-authentication';

import {
    Linking, Alert
  } from 'react-native';


export const counterIncrement=()=>{
    return{
        type:INCREMENT_COUNTER
    }
}

export const counterDecrement=()=>{
    return{
        type:DECREMENT_COUNTER
    }
}

export const counterClear=()=>{
    return{
        type:CLEAR_COUNTER
    }
}

export const counterSet=(recievednumber)=>{
    return{
        type:SET_COUNTER,
        payload:recievednumber
    }

}

export const Functionname=(para1)=>{
    return{
        type:'Typename',
        value1:para1
    }

}
//////////////////////////////////
export const UpdateLoading = (v) => {
    return {
        type: 'LoadingUpdate',
        value: v
    }
}

export const UpdateDisable = (v) => {
    return {
        type: 'DisableUpdate',
        value: v
    }
}
export const UpdateProfile = (info) => {
   // console.log(info)
    return {
        type: 'ProfileUpdate',
        data: info
    }
}
export const UpdateProfileGoogle = (info) => {
    // console.log(info)
     return {
         type: 'ProfileUpdateGoogle',
         data: info
     }
 }

export const UpdateUserImage = (info) => {
    // console.log(info)
     return {
         type: 'ProfileUpdateImage',
         data: info
     }
 }

export const UpdateBusinesses = (info) => {
    // console.log(info)
     return {
         type: 'BusinessUpdate',
         data: info
     }
 }


 export const UpdateFeaturedBusinesses = (info) => {
    // console.log(info)
     return {
         type: 'BusinessFeaturedUpdate',
         data: info
     }
 }

 export const UpdateSearchBusinesses = (info) => {
    // console.log(info)
     return {
         type: 'BusinessSearchUpdate',
         data: info
     }
 }
 export const UpdateUserBusinesses = (info) => {
    // console.log(info)
     return {
         type: 'UpdateUserBusinesses',
         data: info
     }
 }

 export const UpdateCategories = (info) => {
    // console.log(info)
     return {
         type: 'CategoriesUpdate',
         data: info
     }
 }

 export const UpdateFavourities = (info) => {
    // console.log(info)
     return {
         type: 'FavouritiesUpdate',
         data: info
     }
 }

 export const FavouritiesFlag = (info) => {
    // console.log(info)
     return {
         type: 'FavouritiesFlag',
         data: info
     }
 }

 export const Updatecategory = (info) => {
    // console.log(info)
     return {
         type: 'Updatecategory',
         data: info
     }
 }

 export const UserType = (info) => {
    // console.log(info)
     return {
         type: 'UserType',
         data: info
     }
 }

 export const UpdateCategoryId = (info) => {
     console.log(info)
     return {
         type: 'UpdateCategoryId',
         data: info
     }
 }

 export const UpdateInfluencers = (info) => {
    console.log(info)
    return {
        type: 'UpdateInfluencers',
        data: info
    }
}

export const UpdateUsersInfluencers = (info) => {
    console.log(info)
    return {
        type: 'UpdateUsersInfluencers',
        data: info
    }
}

export const SignIn = (values) => {
    console.log('fun called')
    return async (dispatch, state) => {
        try {
            dispatch(UpdateLoading(true))
            dispatch(UpdateLoading(true))

            await fetch(state().url + 'user_login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(
                            {
                                "email":values.email,
                                "password":values.password,
                                "login_type":"local"
                             }),
                          })
            .then(response => {
              const statusCode = response.status;
              const data = response.json();
              return Promise.all([statusCode, data]);

            })
            .then(data => {
               console.log('login data',data[1].data)
              console.log(data[1].status);
              if(data[1].status==200){
              dispatch(UpdateProfile(data[1].data))
              alert(data[1].message)
                Actions.dashboard()
                dispatch(UpdateLoading(false))
                dispatch(UpdateDisable(false))
dispatch(UserType(data[1].data.user_type))
              }
              else{
                alert(data[1].message)
                dispatch(UpdateLoading(false))
                dispatch(UpdateDisable(false))

              }
             
        
            })
            .catch(err => {
                alert('Check your internet connection, Try Again')

                console.log('failed',err)  
                dispatch(UpdateLoading(false))
                dispatch(UpdateDisable(false))

           
              })
            
        } catch (error) {
            console.log(error);
            dispatch(UpdateLoading(false))
            alert('Check your internet connection, Try Again')
            dispatch(UpdateDisable(false))


        }
    }
}






export const GoogleSignIn = (values) => {
    console.log('googel socail media',values.email)
    return async (dispatch, state) => {
        try {
            dispatch(UpdateLoading(true))
            await fetch(state().url + 'user_login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(
                    {
                        "login_type": "social",
                        "user": {"email": values.email, "familyName":values.familyName, "givenName": values.givenName, "id": values.id}
                    }        
                    
                    ),
                          })
            .then(response => {
              const statusCode = response.status;
              const data = response.json();
              return Promise.all([statusCode, data]);
            })
            .then(data => {
               console.log('login data',data)
              console.log(data[1].status);
              if(data[1].status==200){
              dispatch(UpdateProfileGoogle(data[1].data))
              alert(data[1].message)
                Actions.dashboard()
                dispatch(UpdateLoading(false))

              }
              else{
                alert(data[1].message)
                dispatch(UpdateLoading(false))

              }
             
        
            })
            .catch(err => {
                alert('Check your internet connection, Try Again')

                console.log('failed',err)  
                dispatch(UpdateLoading(false))

           
              })
            
        } catch (error) {
            console.log(error);
            dispatch(UpdateLoading(false))
            alert('Check your internet connection, Try Again')

        }
    }
}


export const AppleLogIn = (values) => {
    
  console.log('in Second Function ---------->')
  console.log(values)
//   console.log('apple eamil',values.email)
//   console.log('apple family',values.fullName.familyName)
//   console.log('apple given name',values.fullName.givenName)
   console.log('apple token',values.identityToken)
   console.log('apple user',values.user)






  return async (dispatch, state) => {
    try {
        dispatch(UpdateLoading(true))
        await fetch(state().url + 'apple_login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(
                {
                    "login_type": "social",
                    // "user": {"email": values.email, "familyName":values.fullName.familyName, "givenName":values.fullName.givenName}
                    "user": {"user_id":values.user, "familyName":values.fullName.familyName, "givenName":values.fullName.givenName}
                }        
                
                ),
                      })
        .then(response => {
          const statusCode = response.status;
          const data = response.json();
          return Promise.all([statusCode, data]);
        })
        .then(data => {
           console.log('login data',data)
          console.log(data[1].status);
          if(data[1].status==200){
          dispatch(UpdateProfileGoogle(data[1].data))
          alert(data[1].message)
            Actions.dashboard()
            dispatch(UpdateLoading(false))

          }
          else{
            alert(data[1].message)
            dispatch(UpdateLoading(false))

          }
         
    
        })
        .catch(err => {
            alert('Check your internet connection, Try Again')

            console.log('failed',err)  
            dispatch(UpdateLoading(false))

       
          })
        
    } catch (error) {
        console.log(error);
        dispatch(UpdateLoading(false))
        alert('Check your internet connection, Try Again')

    }
}


}

export const AppleSignIn = () => {

console.log('Apple Function is calling in action----------------->')
console.log('Apple Loign Support',appleAuth.isSupported)
//if(appleAuth.isSupported){
    return async (dispatch, state) => {
        try {


            appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
              }).then(appleAuthRequestResponse=>{
                // console.log('apple Data',appleAuthRequestResponse)
        
                dispatch(AppleLogIn(appleAuthRequestResponse))

                // console.log('apple emial',appleAuthRequestResponse.email)
                // console.log('apple givenname',appleAuthRequestResponse.fullName.givenName)
                // console.log('apple family name',appleAuthRequestResponse.fullName.familyName)
                // console.log('apple token',appleAuthRequestResponse.identityToken)
          
                
            })



            
        } catch (error) {
            console.log(error);
            dispatch(UpdateLoading(false))
            alert(error)

        }
    }
//}
//else{
  //  alert('Phone Is Not Supported For Apple Login')
//}
}

export const FacebookLogIn = (values) => {
    console.log('facebook socail media',values)
    return async (dispatch, state) => {
        try {
           
            dispatch(UpdateLoading(true))
            await fetch(state().url + 'user_login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(
                    {
                        "login_type": "facebook",
                        "user": {"email": values.name, "id": values.id, "name": values.name}
                    }        
                    
                    ),
                          })
            .then(response => {
              const statusCode = response.status;
              const data = response.json();
              return Promise.all([statusCode, data]);
            })
            .then(data => {
               console.log('login data',data[1].data)
              console.log(data[1].status);
              if(data[1].status==200){
              dispatch(UpdateProfileGoogle(data[1].data))
              alert(data[1].message)
                Actions.dashboard()
                dispatch(UpdateLoading(false))

              }
              else{
                alert(data[1].message)
                dispatch(UpdateLoading(false))

              }
             
        
            })
            .catch(err => {
                alert('Something Wrong Try Again')

                console.log('failed',err)  
                dispatch(UpdateLoading(false))

           
              })
            
        } catch (error) {
            console.log(error);
            dispatch(UpdateLoading(false))
            alert('Check your internet connection, Try Again')

        }
    }
}







export const FacebookSignIn = (values) => {
    console.log('calling')
   // console.log('facebook socail media',values.email)
    return async (dispatch, state) => {
        try {



    await LoginManager.logInWithPermissions(["public_profile",]).then(
        function(result) {
          if (result.isCancelled) {
            console.log("Login cancelled");
          } else {
             AccessToken.getCurrentAccessToken().then(
              (data) => {
                  const picurl = { url: '/imgurl' };
                  const currentAccessToken = data.accessToken;
                fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + data.accessToken)
                      .then((response) => response.json())
                      .then((json) => {
                        console.log(json)

                          json.fblogin = true
                          json.picurl = picurl.url;
                          console.log(json.name, "=>", json.id, "=>", json.friends, "=>", picurl.url, "=>");

                          dispatch(FacebookLogIn(json))
})
                      .catch((err) => {
                          console.log(err)
                        //  dispatch(ErrorUpdate(err));
                          alert('ERROR GETTING DATA FROM FACEBOOK', err)
                      })
              })
             

          }

        },
        function(error) {
          console.log("Login fail with error: " + error);
        }

      );





            
        } catch (error) {
            console.log(error);
            dispatch(UpdateLoading(false))
            alert('Something Wrong Try Again')

        }
    }
}

export const UpdateProfileUser = (values) => {
    console.log(values)
    return async (dispatch, state) => {
        try {
            dispatch(UpdateLoading(true))
            await fetch(state().url + 'update_user', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(
                            {
                                "email":values.email,
                                "password":values.password,
                                "first_name":values.first_name,
                                "last_name":values.last_name,
                                "id":values.user_id
                             }),
                          })
            .then(response => {
              const statusCode = response.status;
              const data = response.json();
              return Promise.all([statusCode, data]);
            })
            .then(data => {
             //   console.log(data[1].data)
              console.log(data);
              if(data[1].status==200){
                dispatch(UpdateProfile(data[1].data))

              alert(data[1].message)
             //   Actions.dashboard()
             dispatch(UpdateLoading(false))

              }
              else{
                alert('Check your internet connection, Try Again')
                dispatch(UpdateLoading(false))

              }
             
        
            })
            .catch(err => {
                console.log('failed',err)  
                dispatch(UpdateLoading(false))
                alert('Check your internet connection, Try Again')


              })
            
        } catch (error) {
            console.log(error);
            dispatch(UpdateLoading(false))
            alert('Check your internet connection, Try Again')

        }
    }
}




export const UpdateProfileImage = (values) => {
    console.log(values)
    var user_id = values.id.toString();
    console.log(user_id)
    return async (dispatch, state) => {
        try {
            dispatch(UpdateLoading(true))
            await fetch(state().url + 'update_user_profile', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(
                            {
                                "id":user_id,
                                "file":values.image,
                           
                             }
                             ),
                          })
            .then(response => {
              const statusCode = response.status;
              const data = response.json();
              return Promise.all([statusCode, data]);
            })
            .then(data => {
             //   console.log(data[1].data)
              console.log(data);
              if(data[1].status==200){
                dispatch(UpdateUserImage(data[1].data))

            //  alert(data[1].message)
             //   Actions.dashboard()
             dispatch(UpdateLoading(false))

              }
              else{
                  console.log(data)
                alert('Try Again')
                dispatch(UpdateLoading(false))

              }
             
        
            })
            .catch(err => {
                console.log('failed',err)  
                dispatch(UpdateLoading(false))
                alert('Check your internet connection, Try Again')


              })
            
        } catch (error) {
            console.log(error);
            dispatch(UpdateLoading(false))
            alert('Check your internet connection, Try Again')

        }
    }
}






export const getbusinesses = (values) => {
    console.log('get business called ------> category data->',values)
    return async (dispatch, state) => {
        try {
            dispatch(UpdateLoading(true))
        //    dispatch(UpdateBusinesses([]))
            await fetch(state().url + 'get_category', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(
                            {
                                "category_id":values.category_id,
                             }),
                          })
            .then(response => {
              const statusCode = response.status;
              const data = response.json();
              return Promise.all([statusCode, data]);
            })
            .then(data => {
             // console.log(data)
             // console.log(data[1].status);
              if(data[1].status==200){

                if(data[1].data.length!=0){
              dispatch(UpdateBusinesses(data[1].data))
              console.log(data[1].data.length)
           
             // alert(data[1].message)
               // Actions.dashboard()
               dispatch(UpdateLoading(false))
               dispatch(UpdateCategoryId(values))

                }
                else{
                 //   alert('There is no business in this category')
                    dispatch(UpdateLoading(false))
                    dispatch(UpdateBusinesses([]))

                }
              }
              else{
                alert('Check your internet connection, Try Again')
                dispatch(UpdateLoading(false))
                dispatch(UpdateBusinesses([]))

              }
             
        
            })
            .catch(err => {
                alert('Check your internet connection, Try Again')
                dispatch(UpdateLoading(false))

              })
            
        } catch (error) {
            alert('Check your internet connection, Try Again')

            console.log(error);
            dispatch(UpdateLoading(false))
        }
    }
}



export const ratebusiness = (values) => {
    console.log('rate business called',values)
    return async (dispatch, state) => {
        try {
            console.log(state().user_id)
            if(state().user_id!=''){

            dispatch(UpdateLoading(true))
            await fetch(state().url + 'rate_business', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(
                            {
                                "user_id":values.user_id, "business_id": values.business_id, "rating": values.rate
                             }),
                          })
            .then(response => {
              const statusCode = response.status;
              const data = response.json();
              return Promise.all([statusCode, data]);
            })
            .then(data => {
              if(data[1].status==200){
                  values={
                      category_id:state().category_id
                  }
                  dispatch(getbusinesses(values))
             alert('Review submit successfull')
               // Actions.dashboard()
               dispatch(UpdateLoading(false))
               
Actions.pop()
              }
              else{
                alert(data[1].message)
                dispatch(UpdateLoading(false))

              }
             
        
            })
            .catch(err => {
                alert('Check your internet connection, Try Again')
                dispatch(UpdateLoading(false))

              })
            }
            else{
                alert('Please Create an Account')
                Actions.login()
            }
        } catch (error) {
            alert('Check your internet connection, Try Again')

            console.log(error);
            dispatch(UpdateLoading(false))
        }
    }
}



export const feature_business = (values) => {
    console.log('feature business called')
    return async (dispatch, state) => {
        try {
            if(state.user_id!=''){
            dispatch(UpdateLoading(true))
            await fetch(state().url + 'get_featured', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(
                            {
                                "user_id":values.user_id, "business_id": values.business_id, "package":values.package,"caption":values.caption,"insta_username":values.insta_username,"insta_file":values.insta_file,'stripe_token':values.stripe_token
                             }),
                          })
            .then(response => {
              const statusCode = response.status;
              const data = response.json();
              return Promise.all([statusCode, data]);
            })
            .then(data => {
                console.log(data)
              if(data[1].status==200){
             alert(data[1].message)

               // Actions.dashboard()
               dispatch(UpdateLoading(false))
            Actions.dashboard()

              }
              else{
                alert('Fill the form Carefully')
                dispatch(UpdateLoading(false))

              }
             
        
            })
            .catch(err => {
                alert('Check your internet connection, Try Again')
                dispatch(UpdateLoading(false))
                console.log(err)

              })
            }
            else{
alert("Please Create an Account")
Actions.login()
            }   
        } catch (error) {
            alert('Check your internet connection, Try Again')

            console.log(error);
            dispatch(UpdateLoading(false))
        }
    }
}


export const featured_businesses = (values) => {
    console.log('featureed businesss business called')
    return async (dispatch, state) => {
        try {
            dispatch(UpdateLoading(true))
            await fetch(state().url + 'public_featured_businesses', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
             
                          }
                          )
            .then(response => {
              const statusCode = response.status;
              const data = response.json();
              return Promise.all([statusCode, data]);
            })
            .then(data => {
              //  console.log('featured business',data[1].business_data)
              if(data[1].status==200){
                  
                dispatch(UpdateFeaturedBusinesses(data[1].business_data))

               dispatch(UpdateLoading(false))

              }
              else{
              //    alert('There is no featured businesses')
                dispatch(UpdateLoading(false))

              }
             
        
            })
            .catch(err => {
              //  alert('Something Wrong Try Again')
                dispatch(UpdateLoading(false))
                console.log(err)

              })
            
        } catch (error) {
           // alert('Something Wrong Try Again')

            console.log(error);
            dispatch(UpdateLoading(false))
        }
    }
}


export const get_user_businesses = (values) => {
    console.log('get user business called and value is',values)
    return async (dispatch, state) => {
        try {
            dispatch(UpdateLoading(true))
            await fetch(state().url + 'user_businesses', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(
                            {
                                "user_id":values.user_id,
                             }),
                          })
            .then(response => {
              const statusCode = response.status;
              const data = response.json();
              return Promise.all([statusCode, data]);
            })
            .then(data => {
             //  console.log(data[1].business_data)
              console.log('user business data',data);
              if(data[1].status==200){
              dispatch(UpdateUserBusinesses(data[1].business_data))
             // alert(data[1].message)
               // Actions.dashboard()
               dispatch(UpdateLoading(false))

              }
              else{
                alert('First You have to create business')
                dispatch(UpdateLoading(false))
                Actions.edit_business()

              }
             
        
            })
            .catch(err => {
                alert('Something Wrong Try Again List Not Updated')
                dispatch(UpdateLoading(false))

              })
            
        } catch (error) {
            alert('Something Wrong Try Again')

            console.log(error);
            dispatch(UpdateLoading(false))
        }
    }
}


export const getcategories = () => {
    console.log('get categories called')
    return async (dispatch, state) => {
        try {
            dispatch(UpdateLoading(true))
            await fetch(state().url + 'get_categories', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                          })
            .then(response => {
              const statusCode = response.status;
              const data = response.json();
              return Promise.all([statusCode, data]);
            })
            .then(data => {
               console.log(data)
             // console.log(data[1].status);
              if(data[1].status==200){
              dispatch(UpdateCategories(data[1].data))
             // alert(data[1].message)
               // Actions.dashboard()
              dispatch(UpdateLoading(false))

              }
              else{
             //   alert(data[1].message)
                dispatch(UpdateLoading(false))
             //   alert('Something Wrong Try Again')

              }
             
        
            })
            .catch(err => {
                console.log('failed',err)  
                dispatch(UpdateLoading(false))
             //   alert('Something Wrong Try Again')

           
              })
            
        } catch (error) {
            console.log(error);
            dispatch(UpdateLoading(false))
          //  alert('Something Wrong Try Again')

        }
    }
}



export const addfavourite = (values) => {
    console.log('calling add favourite',values)
    return async (dispatch, state) => {
        try {
            if(state().user_id!=''){
                dispatch(UpdateLoading(true))
            await fetch(state().url + 'add_to_favourites', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(
                    {"business_id":values.business_id,"user_id":values.user_id}
                             ),
                          })
            .then(response => {
              const statusCode = response.status;
              const data = response.json();
              return Promise.all([statusCode, data]);
            })
            .then(data => {
            //   console.log(data)
             // console.log(data[1].status);
              if(data[1].status==200){
                  console.log(data)
              alert("Successfully added to Favorites")
               // Actions.dashboard()
               dispatch(UpdateLoading(false))

              }
              else{
                alert('Check your internet connection, Try Again')
                dispatch(UpdateLoading(false))

              }
             
        
            })
            .catch(err => {
                console.log('failed',err)  
                dispatch(UpdateLoading(false))
                alert('Check your internet connection, Try Again')

              })
            }
            else{
alert('Please Create an Account')
Actions.login()
            } 
        } catch (error) {
            console.log(error);
            dispatch(UpdateLoading(false))
            alert('Check your internet connection, Try Again')

        }
    }
}




export const dellfavourite = (values) => {
    console.log('calling add favourite',values)
    return async (dispatch, state) => {
        try {
            dispatch(UpdateLoading(true))
            await fetch(state().url + 'remove_from_favourites', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(
                    {"business_id":values.business_id,"user_id":values.user_id}
                             ),
                          })
            .then(response => {
              const statusCode = response.status;
              const data = response.json();
              return Promise.all([statusCode, data]);
            })
            .then(data => {
            //   console.log(data)
             // console.log(data[1].status);
              if(data[1].status==200){
                  console.log('dell data',data[1].data)
              alert("Successfully Remove From Favorites")
               // Actions.dashboard()
               dispatch(UpdateLoading(false))
             //  dispatch(FavouritiesFlag(true))
             dispatch(UpdateFavourities(data[1].data))

              }
              else{
                alert(data[1].message)
                dispatch(UpdateLoading(false))

              }
             
        
            })
            .catch(err => {
                console.log('failed',err)  
                dispatch(UpdateLoading(false))
                alert('Check your internet connection, Try Again')


              })
            
        } catch (error) {
            console.log(error);
            dispatch(UpdateLoading(false))
            alert('Check your internet connection, Try Again')

        }
    }
}



export const getfavourite = (values) => {
    console.log('calling gwt favourite',values)
    
    return async (dispatch, state) => {
        try {
            if(state().user_id!=''){
            dispatch(UpdateLoading(true))
            await fetch(state().url + 'get_favourites', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(
                    {"user_id":values.user_id}                             ),
                          })
            .then(response => {
              const statusCode = response.status;
              const data = response.json();
              return Promise.all([statusCode, data]);
            })
            .then(data => {
            //   console.log(data)
             // console.log(data[1].status);
              if(data[1].status==200){
                  console.log(data)
             // alert(data[1].message)
               // Actions.dashboard()
               dispatch(UpdateFavourities(data[1].data))

               dispatch(UpdateLoading(false))

              }
              else{
               // alert('Check your internet connection, Try Again')
                dispatch(UpdateLoading(false))

              }
             
        
            })
            .catch(err => {
                console.log('failed',err)  
                dispatch(UpdateLoading(false))
              //  alert('Something Wrong Try Again')

              })
            }
            else{
                alert('Please Create an Account')
                Actions.login()
            }
        } catch (error) {
            console.log(error);
            dispatch(UpdateLoading(false))
         //   alert('Something Wrong Try Again')

        }
    }
}

export const getsearch = (values) => {
    console.log('calling search',values)
    
    return async (dispatch, state) => {
        try {
            dispatch(UpdateLoading(true))
            await fetch(state().url + 'search_business', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(
                    {"search_key":values.keyword}                                          
                     ),
                          })
            .then(response => {
              const statusCode = response.status;
              const data = response.json();
              return Promise.all([statusCode, data]);
            })
            .then(data => {
             // console.log(data[1].status);
              if(data[1].status==200){
                if(data[1].data.length!=0){
                    console.log(data[1].data.length)
                    dispatch(UpdateSearchBusinesses(data[1].data))
                    Actions.business_search()
                }
                else{
                    alert('There is no business')
                }

                //  dispatch(UpdateFavourities(data[1].data))

               dispatch(UpdateLoading(false))

              }
              else{
             //   alert('Something Wrong Try Again')
                dispatch(UpdateLoading(false))

              }
             
        
            })
            .catch(err => {
                console.log('failed',err)  
                dispatch(UpdateLoading(false))
            //    alert('Something Wrong Try Again')

              })
            
        } catch (error) {
            console.log(error);
            dispatch(UpdateLoading(false))
        //    alert('Something Wrong Try Again')

        }
    }
}



export const getcategory = (values) => {

    return async (dispatch, state) => {
        try {
            dispatch(UpdateLoading(true))
            await fetch(state().url + 'get_business_category', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(
                    {"business_id":values.business_id}                                          
                     ),
                          })
            .then(response => {
              const statusCode = response.status;
              const data = response.json();
              return Promise.all([statusCode, data]);
            })
            .then(data => {
              if(data[1].status==200){
                if(data[1].data.length!=0){
                    console.log('in counter ------>',data[1].data.name)
                    dispatch(Updatecategory(data[1].data.name))
                   // Actions.business_search()
                }
                else{
                    alert('There is no business')
                }

                //  dispatch(UpdateFavourities(data[1].data))

               dispatch(UpdateLoading(false))

              }
              else{
            //    alert('Something Wrong Try Again')
                dispatch(UpdateLoading(false))

              }
             
        
            })
            .catch(err => {
                console.log('failed',err)  
                dispatch(UpdateLoading(false))
             //   alert('Something Wrong Try Again')

              })
            
        } catch (error) {
            console.log(error);
            dispatch(UpdateLoading(false))
         //   alert('Something Wrong Try Again')

        }
    }
}


export const getinfluencers = (values) => {

    return async (dispatch, state) => {
        try {
            dispatch(UpdateLoading(true))
            await fetch(state().url + 'get_influencers', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                })
            .then(response => {
              const statusCode = response.status;
              const data = response.json();
              return Promise.all([statusCode, data]);
            })
            .then(data => {
                console.log(data[1].data)
              if(data[1].status==200){
                if(data[1].data.length!=0){
                    dispatch(UpdateInfluencers(data[1].data))
                   // Actions.business_search()
                }
                else{
                    alert('There are no influencers')
                    dispatch(UpdateInfluencers([]))

                    //Actions.dashboard()

                }

                 dispatch(UpdateFavourities(data[1].data))

               dispatch(UpdateLoading(false))

              }
              else{
            //    alert('Something Wrong Try Again')
                dispatch(UpdateLoading(false))

              }
             
        
            })
            .catch(err => {
                console.log('failed',err)  
                dispatch(UpdateLoading(false))
             //   alert('Something Wrong Try Again')

              })
            
        } catch (error) {
            console.log(error);
            dispatch(UpdateLoading(false))
         //   alert('Something Wrong Try Again')

        }
    }
}

export const getuserinfluencers = () => {

    return async (dispatch, state) => {
        try {
            if(state().user_id!=''){
            dispatch(UpdateLoading(true))
            await fetch(state().url + 'get_user_influencers', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(
                    {"user_id":state().user_id }                    ),
                })
            .then(response => {
              const statusCode = response.status;
              const data = response.json();
              return Promise.all([statusCode, data]);
            })
            .then(data => {
                console.log(data[1].data)
              if(data[1].status==200){
                if(data[1].data.length!=0){
                    dispatch(UpdateUsersInfluencers(data[1].data))
                   // Actions.business_search()
                }
                else{
                    alert('There are no influencers')
                    dispatch(UpdateUsersInfluencers([]))

                }

                 dispatch(UpdateFavourities(data[1].data))

               dispatch(UpdateLoading(false))

              }
              else{
            //    alert('Something Wrong Try Again')
                dispatch(UpdateLoading(false))

              }
             
        
            })
            .catch(err => {
                console.log('failed',err)  
                dispatch(UpdateLoading(false))
             //   alert('Something Wrong Try Again')

              })
            }
            else{
                alert('Please Create an Account')
                Actions.login() 
            }
        } catch (error) {
            console.log(error);
            dispatch(UpdateLoading(false))
         //   alert('Something Wrong Try Again')

        }
    }
}

export const addinfluencer = (values) => {
    console.log('calling add influncer',values)
    return async (dispatch, state) => {
        try {
            if(state().user_id!=''){
                dispatch(UpdateLoading(true))
            await fetch(state().url + 'add_influencers', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(
                    {"user_id":values.user_id,"influencer_id":values.influencer_id}                             ),
                          })
            .then(response => {
              const statusCode = response.status;
              const data = response.json();
              return Promise.all([statusCode, data]);
            })
            .then(data => {
                dispatch(UpdateLoading(false))

               console.log(data)
           if(data[0]==200){
               alert(data[1].message)
           }
        
            })
            .catch(err => {
                console.log('failed',err)  
                dispatch(UpdateLoading(false))
                alert('Check your internet connection, Try Again')

              })
            }
            else{
alert('Please Create an Account')
Actions.login()
            } 
        } catch (error) {
            console.log(error);
            dispatch(UpdateLoading(false))
            alert('Check your internet connection, Try Again')

        }
    }
}




export const dellinfluencer = (values) => {
    console.log('calling add influncer',values)
    return async (dispatch, state) => {
        try {
            if(state().user_id!=''){
                dispatch(UpdateLoading(true))
            await fetch(state().url + 'remove_influencers', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(
                    {"user_id":values.user_id,"influencer_id":values.influencer_id}                             ),
                          })
            .then(response => {
              const statusCode = response.status;
              const data = response.json();
              return Promise.all([statusCode, data]);
            })
            .then(data => {
                dispatch(UpdateLoading(false))

               console.log(data)
           if(data[0]==200){
               //alert(data[1].status)
               if(data[1].status==200){
             alert('Influencer Removed Successfully')
             dispatch(getuserinfluencers())

               }
               else{
                   
               }

           }
        
            })
            .catch(err => {
                console.log('failed',err)  
                dispatch(UpdateLoading(false))
                alert('Check your internet connection, Try Again')

              })
            }
            else{
alert('Please Create an Account')
Actions.login()
            } 
        } catch (error) {
            console.log(error);
            dispatch(UpdateLoading(false))
            alert('Check your internet connection, Try Again')

        }
    }
}





export const linking = (v,t) => {
    console.log('linking',v,t)
    return async (dispatch, state) => {
        try {
            dispatch(UpdateLoading(true))
            switch (t) {
                case 1:
                  Linking.openURL(v);
                  dispatch(UpdateLoading(false))

                break;
                case 2:
           let number = v;
             if (Platform.OS === 'ios') {
             number = 'telprompt:${'+number+'}';
             console.log('in iffffff...')
             }
             else {
             number = 'tel:${'+number+'}'; 
             }
             Linking.openURL(number);
             dispatch(UpdateLoading(false))

                break;
                case 3:
                    let mail=v;
                  Linking.openURL('mailto:'+v)
                  dispatch(UpdateLoading(false))

                break;
                case 4:
                    console.log(lat,lng)
                    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
                    var url = scheme + `${lat},${lng}`;
                    Linking.openURL(url);
            
              default:
                break;
            }
            
        } catch (error) {
            console.log(error);
            dispatch(UpdateLoading(false))
            alert('Something Wrong Not Added To Favourite')

        }
    }
}