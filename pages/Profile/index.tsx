import React from "react"
import { Text } from "react-native"
import { useSelector } from "react-redux"

import Layout from "../../layout"

function Profile() {
  const session = useSelector((state: any) => state.session)

  return (
    <Layout>
      <Text>Login: {session?.user.email}</Text>
    </Layout>
  )
}

export default Profile
