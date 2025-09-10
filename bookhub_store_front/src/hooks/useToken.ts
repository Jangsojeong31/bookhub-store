import React from 'react'
import { useCookies } from 'react-cookie'

function useToken() {
  const [cookies] = useCookies(["accessToken"]);
  return cookies.accessToken ?? null;
}

export default useToken