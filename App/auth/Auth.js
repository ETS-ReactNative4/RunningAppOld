import { AsyncStorage } from "react-native";

let USER_TOKEN = "";
let USER_REFRESH_TOKEN = "";
let USER_ID = "";

export async function getToken(values) {

  let token = await

    fetch(`http://d2714e36.ngrok.io/api/login_check`, {

      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "username": values.email,
        "password": values.password,
      })
    })
    .then(async resp => {

        return resp.json()
    })
    .then(async responseData => {

      if (responseData.token) {

        let id = await fetch(`http://d2714e36.ngrok.io/users/check/` + values.email, {

          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        })
        .then(async resp => {

          return resp.json()
        })
        .then(async responseData => {
          return responseData.id
        })

        USER_ID = await id
        USER_TOKEN = await responseData.token
        USER_REFRESH_TOKEN = await responseData.refresh_token

        onSignIn()
        return 200
      }
      else if (responseData.code === 401) {
        return 401
      }
      else if (responseData.code === 500) {
        return 500
      }

    })
    .catch(err => {
      console.log(err)
    })

  return token
}

export const onSignIn = async () => {
  AsyncStorage.setItem("user_id", JSON.stringify(USER_ID))
  AsyncStorage.setItem("token", USER_TOKEN)
  AsyncStorage.setItem("refresh_token", USER_REFRESH_TOKEN)
};

export async function getUserId() {
  return await AsyncStorage.getItem("user_id")
}

export async function getUserToken() {
  return await AsyncStorage.getItem("token")
}

export const onSignOut = () => AsyncStorage.removeItem("token");

export const isSignedIn = () => {

  return new Promise((resolve, reject) => {

        AsyncStorage.getItem("token")
            .then(res => {

                if (res !== null) {

                    resolve(true);

                    // fetch(`http://d2714e36.ngrok.io/api/users`, {
                    //
                    //   method: 'GET',
                    //   headers: {
                    //     Accept: 'application/json',
                    //     'Content-Type': 'application/json',
                    //     'Authorization': 'Bearer ' + res
                    //   }
                    // })
                    // .then(async resp => {
                    //
                    //     return resp.json()
                    // })
                    // .then(async responseData => {
                    //
                    //   switch (responseData.message) {
                    //
                    //     case 'JWT Token Expired':
                    //
                    //       let refreshToken = await AsyncStorage.getItem('refresh_token')
                    //
                    //       fetch(`http://d2714e36.ngrok.io/api/token/refresh`, {
                    //
                    //         method: 'POST',
                    //         headers: {
                    //           Accept: 'application/json',
                    //           'Content-Type': 'application/json'
                    //         },
                    //         body: JSON.stringify({
                    //           "refresh_token": refreshToken
                    //         })
                    //
                    //       })
                    //       .then(async resp => {
                    //
                    //         return resp.json()
                    //       })
                    //       .then(async responseData => {
                    //
                    //         console.log(responseData)
                    //       })
                    //
                    //     case 'JWT Token not found':
                    //       reject(false)
                    //       break
                    //   }
                    //
                    //   if (responseData) {
                    //     console.log(responseData)
                    //     resolve(true)
                    //   }
                    // })
                    // .catch(err => {
                    //   console.log(err)
                    // })

                } else {

                    resolve(false);
                }
            })
            .catch(err => reject(err));
    });
};