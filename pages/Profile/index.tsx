import { View, Text } from "react-native";
import Layout from "../../layout";
import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const session = useSelector((state: any) => state.session);

  return (
    <Layout>
      <Text>Login: {session?.user.email}</Text>
    </Layout>
  )
}

export default Profile
