import React, { useState,useEffect } from "react";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { View,Button,Text,StyleSheet } from "react-native";

export default function Sample() {
    const [token, setToken] = useState("");
    const [userInfo, setUserInfo] = useState(null);
  
    const [request, response, promptAsync] = Google.useAuthRequest({
      iosClientId: "397240627119-hga5jemtu83srk1avct0gvsi3h3peh5a.apps.googleusercontent.com",
  
    });
  
    useEffect(() => {
      if (response?.type === "success") {
        setToken(response.authentication.accessToken);
        getUserInfo();
      }
    }, [response, token]);
  
    const getUserInfo = async () => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        const user = await response.json();
        setUserInfo(user);
      } catch (error) {
        // Add your own error handler here
      }
    };
  
    return (
      <View style={styles.container}>
        {userInfo === null ? (
          <Button
            title="Sign in with Google"
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
          />
        ) : (
          <Text style={styles.text}>{userInfo.name}</Text>
        )}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontSize: 20,
      fontWeight: "bold",
    },
  });