import React from 'react';
import {
 Text,
 TouchableOpacity,
 View,
 Alert,
 StyleSheet,
 ScrollView,
} from "react-native";
import { supabase } from "../../../lib/supabase";
import CustomButton from "../../component/CustomButtom";
import CustomInput from "../../component/customInput/CustomInput";
import { useAuth } from "../../context/auth-context";
import CustomInput2 from '../../component/customInput/CustomInput2';

const ProfileScreen = () => {
 const { user } = useAuth();

 return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 5,
        paddingVertical: 10,
        flex: 1,
        justifyContent: "center",
        rowGap:20,
        
      }}
      style={{ width: "100%" }}
    >
        <View style={{
          flexDirection: 'row',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
          width: '100%',
        }}>
        <Text style={{ textAlign: 'left', width:100}} className="font-bold text-blue-400  text-lg">assssssssssss</Text>
        </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '99%',
        }}
      >
        <Text style={{ textAlign: 'left', width:100}} className="font-bold text-blue-400 text-lg">Username</Text>
        <CustomInput2 style={{ flex: 1 }} value={user.user_metadata.username}  containerStyle={{ paddingHorizontal: 0 }}/>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
       <Text style={{ textAlign: 'left', width:100}} className="font-bold text-blue-400 text-lg">Email</Text>
        <CustomInput2 style={{ flex: 1 }} value={user.email}  containerStyle={{ paddingHorizontal: 0 }}/>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
       <Text style={{textAlign: 'left', width:100}} className="font-bold text-blue-400 text-lg">Number</Text>
        <CustomInput2 style={{ flex: 1 }} value={user.user_metadata.phone_num}  containerStyle={{ paddingHorizontal: 0 }}/>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
       <Text style={{ textAlign: 'left', width:100}} className="font-bold text-blue-400 text-lg">Role</Text>
        <CustomInput2 style={{ flex: 1 }} value={user.user_metadata.type}  containerStyle={{ paddingHorizontal: 0 }}/>
      </View>
    </ScrollView>
 );
};

export default ProfileScreen;
