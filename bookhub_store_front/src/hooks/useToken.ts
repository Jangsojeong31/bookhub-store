import React from 'react'
import { useCookies } from 'react-cookie'

function useToken() {
  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;
  return token;
}

export default useToken